import Reveal from '@/components/Reveal';
import CategoryHub from '@/components/CategoryHub';
import { sanityFetch, urlFor, sanityReady } from '@/lib/sanity';
import { CATEGORIES_QUERY, buildHub } from '@/lib/thoughtRoom';
import { site } from '@/lib/site';

/**
 * THE THOUGHT ROOM — the hub.
 *
 * Three doors, one per kind of piece. It used to be a single list with filter
 * tabs; the tabs are gone, and each category now has a page of its own at
 * /thought-room/<type>.
 *
 * A server component. Image URLs are resolved here, so the Sanity client and
 * the URL builder never reach the browser.
 */

export const metadata = {
  // The root layout's title template appends " — Sharoon Irfan".
  title: 'The Thought Room',
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

export const revalidate = 3600;

export default async function ThoughtRoomPage() {
  const docs = (await sanityFetch(CATEGORIES_QUERY, {}, [])) ?? [];

  /*
    The cards are built from the three types the code knows about, dressed with
    whatever the Studio holds. So the hub is complete before anybody has made a
    single category document — it simply has no pictures yet.
  */
  const items = buildHub(docs).map((item) => {
    const img = urlFor(item.image);
    return {
      ...item,
      // The Studio's picture if there is one, the repo's if there is not. The
      // card is never empty, and an editor who uploads one takes over.
      image: img
        ? {
            url: img.width(1400).quality(78).auto('format').url(),
            alt: item.image?.alt || '',
          }
        : { url: item.fallback, alt: item.fallbackAlt },
    };
  });

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

        {sanityReady ? (
          <CategoryHub items={items} />
        ) : (
          <p className="trempty">
            Not connected to Sanity yet — set NEXT_PUBLIC_SANITY_PROJECT_ID to
            bring this page to life.
          </p>
        )}
      </div>
    </section>
  );
}
