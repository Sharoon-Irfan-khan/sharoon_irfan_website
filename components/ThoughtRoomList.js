'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import { CATEGORIES } from '@/lib/thoughtRoom';

/**
 * THE THOUGHT ROOM — the index.
 *
 * Takes plain, already-resolved data. Image URLs are built on the server and
 * arrive here as strings, so neither the Sanity client nor the image-url
 * builder is bundled for the browser: this component's only job is choosing
 * which cards to show.
 *
 * The filter is client-side on purpose. The whole list is already in memory —
 * a blog of this size is tens of pieces, not thousands — so filtering in the
 * browser is instant and costs no round trip. If it ever grows past a few
 * hundred, this becomes a server-side search param and the cards stop being
 * held in state.
 */

function Card({ post, lead = false }) {
  return (
    <article className={`trc ${lead ? 'trc--lead' : ''}`}>
      <Link href={`/thought-room/${post.slug}`} className="trc__link">
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
              // The lead is the largest paint on this page.
              priority={lead}
            />
          </div>
        ) : (
          // No picture is a legitimate state — a signal is often three
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

export default function ThoughtRoomList({ lead, rest }) {
  const [active, setActive] = useState('all');

  const all = useMemo(() => (lead ? [lead, ...rest] : rest), [lead, rest]);

  // Only offer a filter for categories that actually have something in them.
  // A tab that leads to an empty page is a dead end the reader has to discover
  // by clicking it.
  const available = useMemo(() => {
    const present = new Set(all.map((p) => p.category));
    return CATEGORIES.filter((c) => present.has(c.id));
  }, [all]);

  const shown = useMemo(
    () => (active === 'all' ? all : all.filter((p) => p.category === active)),
    [all, active]
  );

  // The pinned piece keeps its billing only in the unfiltered view. Inside a
  // category it is just another piece of that category, and giving it the lead
  // treatment there would imply it is the best of that type, which nobody said.
  const isUnfiltered = active === 'all';
  const leadCard = isUnfiltered ? shown[0] : null;
  const gridCards = isUnfiltered ? shown.slice(1) : shown;

  return (
    <>
      {available.length > 1 && (
        <Reveal className="trfilter" delay={120}>
          <button
            type="button"
            className={`trfilter__btn ${active === 'all' ? 'is-on' : ''}`}
            onClick={() => setActive('all')}
            aria-pressed={active === 'all'}
          >
            Everything
            <span className="trfilter__n">{all.length}</span>
          </button>

          {available.map((c) => {
            const n = all.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                className={`trfilter__btn ${active === c.id ? 'is-on' : ''}`}
                onClick={() => setActive(c.id)}
                aria-pressed={active === c.id}
                title={c.note}
              >
                {c.label}
                <span className="trfilter__n">{n}</span>
              </button>
            );
          })}
        </Reveal>
      )}

      {leadCard && (
        <Reveal className="trlead" delay={60}>
          <Card post={leadCard} lead />
        </Reveal>
      )}

      {gridCards.length > 0 && (
        <div className="trgrid">
          {gridCards.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 70}>
              <Card post={post} />
            </Reveal>
          ))}
        </div>
      )}

      {shown.length === 0 && (
        <p className="trempty">Nothing filed under this yet.</p>
      )}
    </>
  );
}
