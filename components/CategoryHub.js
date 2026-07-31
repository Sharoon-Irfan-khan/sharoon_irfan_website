import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';

/**
 * THE THOUGHT ROOM — the hub.
 *
 * Three cards, one per kind of piece, each opening its own page. This replaced
 * a single list with filter tabs above it: with only three types the tabs were
 * a control the reader had to operate before the page said anything, and a
 * category that is worth writing is worth a door of its own.
 *
 * A server component with no state. Image URLs arrive already resolved, so the
 * Sanity client never reaches the browser.
 */

function Card({ item, index }) {
  return (
    <Reveal className="thub__item" delay={index * 110}>
      <Link href={item.href} className="thub__link">
        {item.image?.url ? (
          <div className="thub__frame">
            <Image
              className="thub__img"
              src={item.image.url}
              alt={item.image.alt || ''}
              fill
              sizes="(max-width: 899px) 92vw, 44vw"
              // The hub is the whole page above the fold; all three are the
              // largest paint on it.
              priority={index < 2}
            />
          </div>
        ) : (
          /*
            A card with no picture is the normal state of a Studio nobody has
            finished setting up yet. It keeps the frame so the row does not
            collapse into three lines of text, and says what is missing rather
            than showing a broken image.
          */
          <div className="thub__frame thub__frame--bare">
            <span className="thub__placeholder">No image yet</span>
          </div>
        )}

        <div className="thub__body">
          {item.eyebrow && <p className="label thub__eyebrow">{item.eyebrow}</p>}

          <h2 className="display thub__title">{item.title}</h2>

          {item.description && (
            <p className="thub__desc">{item.description}</p>
          )}

          <p className="thub__more">
            {/* The count is the honest version of "Explore": a category with
                nothing in it should not promise anything. */}
            {item.count > 0
              ? `Explore ${item.title} →`
              : 'Nothing here yet'}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function CategoryHub({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <div className="thub">
      {items.map((item, i) => (
        <Card item={item} index={i} key={item.id} />
      ))}
    </div>
  );
}
