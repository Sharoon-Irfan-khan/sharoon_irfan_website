import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Reveal from '@/components/Reveal';
import { sanityFetch, urlFor } from '@/lib/sanity';
import {
  POST_QUERY,
  SLUGS_QUERY,
  categoryLabel,
  formatDate,
  idToPath,
  pathToId,
  readMinutes,
} from '@/lib/thoughtRoom';
import { LOCAL_POSTS, getLocalPost } from '@/lib/localPosts';
import { site } from '@/lib/site';

/**
 * One piece.
 *
 * The index has to lead somewhere, so this exists even though the brief only
 * described the listing — a card that opens nothing is a card nobody clicks
 * twice.
 *
 * Lives under its category since 31 July: /thought-room/articles/my-piece. The
 * category segment is part of the address rather than decoration, so a piece
 * reached through the wrong one 404s instead of rendering twice at two URLs.
 */

export const revalidate = 3600;

export async function generateStaticParams() {
  const rows = (await sanityFetch(SLUGS_QUERY, {}, [])) ?? [];
  const local = LOCAL_POSTS.map((p) => ({ slug: p.slug, category: p.category }));
  return [...rows, ...local]
    .filter((r) => r?.slug && idToPath(r?.category))
    .map((r) => ({ category: idToPath(r.category), slug: r.slug }));
}

/** Sanity's own record if there is one; the repo's copy of it otherwise. */
async function getPost(slug) {
  const post = await sanityFetch(POST_QUERY, { slug });
  return post ?? getLocalPost(slug);
}

/*
  Unknown slugs are rendered on demand rather than 404'd at the edge: a piece
  published after the last build should be readable the moment its link is
  shared, not an hour later.
*/
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { category: path, slug } = await params;
  const post = await getPost(slug);
  // The layout's template appends the site name; naming it here as well gave
  // "Not found — Sharoon Irfan — Sharoon Irfan".
  if (!post || post.category !== pathToId(path)) return { title: 'Not found' };

  const ogImageUrl = post.coverImage?.isLocal
    ? `${site.url}${post.coverImage.src}`
    : urlFor(post.coverImage)?.width(1200).height(630).fit('crop').url();
  const href = `/thought-room/${path}/${slug}`;
  const description = post.metaDescription || post.excerpt || undefined;

  return {
    // A piece can carry its own absolute SEO title — written for the search
    // result rather than for the page header — and bypass the layout's
    // "%s — Sharoon Irfan" template, which was never written with a title
    // this long in mind. Pieces without one fall back to the template as
    // before.
    title: post.seoTitle ? { absolute: post.seoTitle } : `${post.title} — The Thought Room`,
    description,
    authors: [{ name: site.name }],
    alternates: { canonical: href },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.seoTitle || post.title,
      description,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.modifiedAt || post.publishedAt || undefined,
      authors: [site.name],
      url: href,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

/* Body images carry their own alt and are lazy — they are all below the fold
   by definition, since the cover is above them. */
const components = {
  types: {
    image: ({ value }) => {
      const img = urlFor(value);
      if (!img) return null;
      return (
        <figure className="tpost__figure">
          <Image
            src={img.width(1600).quality(78).auto('format').url()}
            alt={value?.alt || ''}
            width={1600}
            height={1000}
            sizes="(max-width: 899px) 92vw, 62rem"
          />
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '';
      const external = /^https?:\/\//.test(href);
      return (
        <a
          className="tlink"
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function ThoughtPage({ params }) {
  const { category: path, slug } = await params;
  const id = pathToId(path);
  const post = await getPost(slug);

  /*
    The category in the URL has to be the piece's own. Without this check every
    piece would answer at all three addresses, which is three URLs for one page
    and a "← Case Studies" link on an article.
  */
  if (!post || !id || post.category !== id) notFound();

  const date = formatDate(post.publishedAt);

  // A repo-local cover already carries a public/ path and its own pixel size;
  // a Sanity one is still a reference that needs resolving and is rendered at
  // a fixed 1800x1012, the size every Studio-supplied cover is cropped to.
  const cover = post.coverImage?.isLocal
    ? {
        src: post.coverImage.src,
        alt: post.coverImage.alt || '',
        width: post.coverImage.width,
        height: post.coverImage.height,
      }
    : (() => {
        const img = urlFor(post.coverImage);
        return img
          ? {
              src: img.width(1800).quality(78).auto('format').url(),
              alt: post.coverAlt || '',
              width: 1800,
              height: 1012,
            }
          : null;
      })();

  const href = `${site.url}/thought-room/${path}/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: cover ? [`${cover.src.startsWith('http') ? '' : site.url}${cover.src}`] : undefined,
    author: {
      '@type': 'Person',
      name: site.name,
      url: `${site.url}/#about`,
      sameAs: [site.linkedin],
    },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    datePublished: post.publishedAt || undefined,
    dateModified: post.modifiedAt || post.publishedAt || undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': href },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        className="band surface-champagne tpost"
        data-chapter="The Thought Room"
        data-tone="light"
      >
        <div className="shell tpost__head">
          {/* Back to the category, not to the hub: the reader came from a list
              of these, and that list is where the next one they want is. */}
          <Reveal as="p" className="label">
            <Link href={`/thought-room/${path}`} className="tlink">
              ← {categoryLabel(id)}
            </Link>
          </Reveal>

          <Reveal as="p" className="label tpost__meta" delay={60}>
            <span>{categoryLabel(post.category)}</span>
            {date && <span className="trc__dot">·</span>}
            {date && <span>{date}</span>}
            <span className="trc__dot">·</span>
            <span>{readMinutes(post)} min read</span>
          </Reveal>

          <Reveal as="h1" className="display display--l tpost__title" delay={110}>
            {post.title}
          </Reveal>

          {post.excerpt && (
            <Reveal as="p" className="lede tpost__standfirst" delay={180}>
              {post.excerpt}
            </Reveal>
          )}
        </div>

        {cover && (
          <Reveal className="shell tpost__cover" delay={220}>
            <Image
              src={cover.src}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              sizes="(max-width: 899px) 92vw, 72rem"
              priority
            />
          </Reveal>
        )}

        {Array.isArray(post.body) && post.body.length > 0 && (
          <div className="shell tpost__body">
            <PortableText value={post.body} components={components} />
          </div>
        )}
      </article>
    </>
  );
}
