import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import PostGrid from '@/components/PostGrid';
import { sanityFetch, urlFor } from '@/lib/sanity';
import {
  CATEGORIES,
  POSTS_IN_CATEGORY_QUERY,
  categoryLabel,
  categoryNote,
  formatDate,
  mergePosts,
  pathToId,
  readMinutes,
} from '@/lib/thoughtRoom';
import { getLocalPostsByCategory } from '@/lib/localPosts';
import { site } from '@/lib/site';

/**
 * One category — every piece filed under it.
 *
 * The three types are structural, so this route is prerendered from CATEGORIES
 * rather than from whatever category documents exist. A category with no
 * document still has a page; it just carries the label the code knows.
 *
 * Anything that is not one of the three paths must 404 rather than render an
 * empty category page for a mistyped URL. That is `pathToId` returning null and
 * the page calling notFound(), not `dynamicParams: false` — which was the first
 * attempt here and answered 404 for the real categories too, rendering the
 * right page under the wrong status.
 */

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.path }));
}

export async function generateMetadata({ params }) {
  const { category: path } = await params;
  const id = pathToId(path);
  if (!id) return { title: 'Not found' };

  const label = categoryLabel(id);
  const note = categoryNote(id);

  return {
    title: `${label} — The Thought Room`,
    description: note || undefined,
    alternates: { canonical: `/thought-room/${path}` },
    openGraph: {
      title: `${label} — The Thought Room`,
      description: note || undefined,
      url: `/thought-room/${path}`,
      type: 'website',
      siteName: site.name,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: path } = await params;
  // The URL says "articles"; the documents say "article".
  const id = pathToId(path);
  if (!id) notFound();

  const sanityPosts =
    (await sanityFetch(POSTS_IN_CATEGORY_QUERY, { category: id }, [])) ?? [];
  const posts = mergePosts(sanityPosts, getLocalPostsByCategory(id));

  const cards = posts.map((post) => {
    // A repo-local piece carries its cover as a plain public/ path already;
    // a Sanity one carries an image reference that still needs resolving.
    const img = post.coverImage?.isLocal ? null : urlFor(post.coverImage);
    return {
      id: post._id,
      href: `/thought-room/${path}/${post.slug}`,
      title: post.title,
      excerpt: post.excerpt || null,
      categoryLabel: categoryLabel(post.category),
      date: formatDate(post.publishedAt),
      readMinutes: readMinutes(post),
      image: post.coverImage?.isLocal
        ? { url: post.coverImage.src, alt: post.coverImage.alt || '' }
        : img
          ? {
              url: img.width(1600).quality(78).auto('format').url(),
              alt: post.coverImage?.alt || '',
            }
          : null,
    };
  });

  return (
    <section
      className="band surface-champagne troom"
      data-chapter="The Thought Room"
      data-tone="light"
    >
      <div className="shell">
        <Reveal as="p" className="label">
          <Link href="/thought-room" className="tlink">
            ← The Thought Room
          </Link>
        </Reveal>

        <Reveal as="h1" className="display display--l troom__title" delay={80}>
          {categoryLabel(id)}
        </Reveal>

        {categoryNote(id) && (
          <Reveal as="p" className="lede troom__standfirst" delay={160}>
            {categoryNote(id)}
          </Reveal>
        )}

        <PostGrid posts={cards} />
      </div>
    </section>
  );
}
