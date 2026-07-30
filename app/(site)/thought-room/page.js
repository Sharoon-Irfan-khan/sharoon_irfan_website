import Reveal from '@/components/Reveal';
import ThoughtRoomList from '@/components/ThoughtRoomList';
import { sanityFetch, urlFor, sanityReady } from '@/lib/sanity';
import {
  POSTS_QUERY,
  categoryLabel,
  formatDate,
  readMinutes,
  splitFeatured,
} from '@/lib/thoughtRoom';
import { site } from '@/lib/site';

/**
 * THE THOUGHT ROOM.
 *
 * The second page. Everything on it is written by the team in Sanity; nothing
 * here is authored in the repository except the heading.
 *
 * This is a server component and it stays one. It resolves image URLs, dates
 * and read times into plain strings before handing them to the client
 * component that does the filtering — so the Sanity client, the image URL
 * builder and the GROQ queries never reach the browser.
 */

export const metadata = {
  title: `The Thought Room — ${site.name}`,
  description:
    'Articles, case studies and industry signals on marketing systems that connect strategy, performance and revenue.',
  alternates: { canonical: '/thought-room' },
  openGraph: {
    title: `The Thought Room — ${site.name}`,
    description:
      'Articles, case studies and industry signals on marketing systems.',
    url: '/thought-room',
    type: 'website',
  },
};

/*
  Rebuild hourly.

  The team publishes from the Studio, not from a deploy, so the page cannot be
  built once and forgotten. An hour is the compromise: fresh enough that an
  editor sees their work the same morning, cheap enough that the site is still
  static for practically every visitor. A webhook from Sanity would make it
  instant, and that is the upgrade when publishing gets frequent enough to
  care.
*/
export const revalidate = 3600;

/** Flattens a Sanity document into exactly what a card needs, and nothing more. */
function toCard(post) {
  const img = urlFor(post.coverImage);

  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || null,
    category: post.category,
    categoryLabel: categoryLabel(post.category),
    date: formatDate(post.publishedAt),
    readMinutes: readMinutes(post),
    image: img
      ? {
          // 1600 wide is the widest this layout ever asks for — the lead on a
          // large screen. Requesting the original would ship a print-resolution
          // file to a card 400px across.
          url: img.width(1600).quality(78).auto('format').url(),
          alt: post.coverImage?.alt || '',
        }
      : null,
  };
}

export default async function ThoughtRoomPage() {
  const posts = (await sanityFetch(POSTS_QUERY, {}, [])) ?? [];
  const cards = posts.map(toCard);
  const { lead, rest } = splitFeatured(cards);

  return (
    <section
      className="band surface-champagne troom"
      data-chapter="The Thought Room"
      data-tone="light"
    >
      <div className="shell">
        <Reveal as="p" className="label shead__eyebrow">
          Writing
        </Reveal>
        <Reveal as="h1" className="display display--l troom__title" delay={80}>
          The Thought Room
        </Reveal>
        <Reveal as="p" className="lede troom__standfirst" delay={160}>
          Working notes on marketing systems — what I am thinking about, what
          the numbers showed, and what the market is doing.
        </Reveal>

        {cards.length > 0 ? (
          <ThoughtRoomList lead={lead} rest={rest} />
        ) : (
          /*
            Two different nothings, and they are worth telling apart. An
            unconfigured project is a setup step; an empty dataset is a page
            waiting on its first piece. Showing the same message for both sends
            somebody looking for a bug that is not there.
          */
          <p className="trempty">
            {sanityReady
              ? 'The first pieces are being written. Check back shortly.'
              : 'Not connected to Sanity yet — set NEXT_PUBLIC_SANITY_PROJECT_ID to bring this page to life.'}
          </p>
        )}
      </div>
    </section>
  );
}
