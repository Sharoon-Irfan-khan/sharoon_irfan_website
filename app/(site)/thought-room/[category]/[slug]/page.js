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
  readMinutes,
} from '@/lib/thoughtRoom';

/**
 * One piece.
 *
 * The index has to lead somewhere, so this exists even though the brief only
 * described the listing — a card that opens nothing is a card nobody clicks
 * twice.
 */

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = (await sanityFetch(SLUGS_QUERY, {}, [])) ?? [];
  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

/*
  Unknown slugs are rendered on demand rather than 404'd at the edge: a piece
  published after the last build should be readable the moment its link is
  shared, not an hour later.
*/
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await sanityFetch(POST_QUERY, { slug });
  // The layout's template appends the site name; naming it here as well gave
  // "Not found — Sharoon Irfan — Sharoon Irfan".
  if (!post) return { title: 'Not found' };

  const img = urlFor(post.coverImage);

  return {
    title: `${post.title} — The Thought Room`,
    description: post.excerpt || undefined,
    alternates: { canonical: `/thought-room/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      url: `/thought-room/${slug}`,
      images: img
        ? [{ url: img.width(1200).height(630).fit('crop').url() }]
        : undefined,
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
  const { slug } = await params;
  const post = await sanityFetch(POST_QUERY, { slug });

  if (!post) notFound();

  const img = urlFor(post.coverImage);
  const date = formatDate(post.publishedAt);

  return (
    <article
      className="band surface-champagne tpost"
      data-chapter="The Thought Room"
      data-tone="light"
    >
      <div className="shell tpost__head">
        <Reveal as="p" className="label">
          <Link href="/thought-room" className="tlink">
            ← The Thought Room
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

      {img && (
        <Reveal className="shell tpost__cover" delay={220}>
          <Image
            src={img.width(1800).quality(78).auto('format').url()}
            alt={post.coverAlt || ''}
            width={1800}
            height={1012}
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
  );
}
