'use client';

import useScrollProgress from './useScrollProgress';
import { Action } from './Sections';
import { byId, stillSrc } from '@/lib/media';

/**
 * THE WORK — a pinned sequence.
 *
 * The section holds still while the reader scrolls. Each card arrives from the
 * right, grows to full size at centre, holds, then crosses to the left and
 * parks on a shelf, where it stays. The deck builds one card at a time. Once
 * every card has landed, a closing block resolves in the space they came from.
 *
 * Replaces an earlier scattered collage — landscape crops drifting at
 * different rates, which read as a mood board: several things happening at
 * once, none of them the subject. This reads as a sequence, one thing at a
 * time, in an order that means something.
 *
 * The cards are portrait because a card that grows and then travels across the
 * screen reads as a held object, and a held object is upright.
 *
 * Scrubbed, not triggered, so scrolling back runs the whole thing in reverse.
 * All the arithmetic is in CSS off a single --p. See collage.css.
 */

/* Ordered as the work runs — map the numbers, agree the plan, make the thing,
   run it, review it, decide, close. Read left to right along the shelf, that
   sequence is the argument the section is making.

   Every card added here costs 0.6 of a screen of scroll — see --n in
   collage.css. Nine is about the ceiling before the deck outgrows the stage. */
const DEFAULT_ITEMS = [
  'work-numbers',
  'work-growth',
  'work-planning',
  'work-notes',
  'work-social',
  'work-focus',
  'work-boardroom',
  'work-deal',
  // Last card. The sequence runs through the work and ends on the person
  // behind it, which is the right shape for a founder-led practice.
  'work-portrait',
];

/*
  Deliberately NOT in the sequence, though the files exist in public/images:

    work-workshop, work-team   same shoot as work-growth — same room, same
                               flip chart. Three of them in a row reads as a
                               stutter, not as three ideas.
    work-review                same shoot as work-boardroom.
    work-tower                 fashion photography, not marketing work.
    work-cafe                  AI-generated. A picture of nobody.

  Pass an `items` array to bring any of them back.
*/

export default function Collage({
  chapter = 'The work',
  eyebrow = 'Strategy · Performance · Content',
  // Placeholder copy — worth your own pass.
  title = 'The system, in the room where it runs.',
  // Placeholder copy — worth your own pass.
  closeEyebrow = 'Where it lands',
  closeLine = 'Every part of it is built to move one number.',
  closeAction = 'See the results',
  closeHref = '/results',
  items = DEFAULT_ITEMS,
}) {
  const ref = useScrollProgress({ mode: 'self' });

  return (
    <section
      className="collage surface-champagne"
      data-chapter={chapter}
      data-tone="light"
    >
      <div className="collage__track" ref={ref} style={{ '--n': items.length }}>
        <div className="collage__stage">
          {/* The width limit lives on an inner wrapper, never on .shell —
              .shell has margin-inline: auto, so capping its width centres it
              instead of pinning it left, and it walks into the cards. */}
          <div className="shell collage__head">
            <div className="collage__head-inner">
              <p className="label collage__eyebrow">{eyebrow}</p>
              <h2 className="display display--m collage__title">{title}</h2>
            </div>
          </div>

          {/* The right half is empty once every card has parked. Rather than
              leave it, the section resolves there: the deck of work on the
              left, the point of it on the right. Fades in only after the last
              card lands — see --seq in collage.css, which ends the sequence at
              82% of the track and leaves the rest for this. */}
          <div className="shell collage__close">
            <div className="collage__close-inner">
              <p className="label collage__eyebrow">{closeEyebrow}</p>
              <p className="display display--s collage__close-line">{closeLine}</p>
              <Action href={closeHref} variant="btn--ghost">
                {closeAction}
              </Action>
            </div>
          </div>

          <div className="collage__cards">
            {items.map((id, i) => {
              const clip = byId(id);
              return (
                <figure className="collage__card" key={id} style={{ '--i': i }}>
                  <img
                    className="collage__media"
                    src={stillSrc(clip.id)}
                    alt={clip.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="label collage__caption">
                    {clip.caption}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
