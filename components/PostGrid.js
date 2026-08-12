import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';

/**
 * A category's pieces — one lead, then a grid.
 *
 * This replaced ThoughtRoomList, which carried the filter tabs as well. The
 * hub is the filter now, so what is left is the list itself, and with no
 * filtering to do it has no state and stays a server component.
 *
 * Takes plain, already-resolved data: image URLs are strings built on the
 * server, so nothing from Sanity is bundled for the browser.
 */

function Card({ post, lead = false }) {
  return (
    <article className={`trc ${lead ? 'trc--lead' : ''}`}>
      <Link href={post.href} className="trc__link">
        {post.image?.url ? (
          <div className="trc__frame">
            <Image
              className="trc__img"
              src={post.image.url}
              alt={post.image.alt || ''}
              fill
              sizes={
                lead
                  ? '(max-width: 899px) 90vw, 55vw'
                  : '(max-width: 619px) 88vw, (max-width: 1099px) 44vw, 30vw'
              }
              priority={lead}
            />
          </div>
        ) : (
          // No picture is a legitimate state — an insight is often three
          // paragraphs and no art. The rule keeps the card's top edge.
          <div className="trc__frame trc__frame--bare" aria-hidden="true" />
        )}

        <div className="trc__body">
          <p className="label trc__meta">
            <span className="trc__cat">{post.categoryLabel}</span>
            {post.date && <span className="trc__dot">·</span>}
            {post.date && <span>{post.date}</span>}
            <span className="trc__dot">·</span>
            <span>{post.readMinutes} min read</span>
          </p>

          <h3 className={`display trc__title ${lead ? 'trc__title--lead' : ''}`}>
            {post.title}
          </h3>

          {post.excerpt && <p className="trc__excerpt">{post.excerpt}</p>}
        </div>
      </Link>
    </article>
  );
}

export default function PostGrid({ posts = [] }) {
  if (posts.length === 0) {
    return <p className="trempty">Nothing filed under this yet.</p>;
  }

  // The query already sorts pinned-first then newest, so the head of the list
  // is either the piece the editor pinned or the most recent one. That is the
  // whole "best or latest" rule and it needs no flag of its own.
  const [lead, ...rest] = posts;

  return (
    <>
      <Reveal className="trlead" delay={60}>
        <Card post={lead} lead />
      </Reveal>

      {rest.length > 0 && (
        <div className="trgrid">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 70}>
              <Card post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
