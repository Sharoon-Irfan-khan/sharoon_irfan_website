'use client';

import useScrollProgress from './useScrollProgress';
import { byId, workSrc } from '@/lib/media';

/**
 * SCALE STACK — a pinned row that builds itself.
 *
 * The section holds still while the strip slides in from the right and the
 * four photographs arrive one after another. Once the row is complete it
 * releases and the rest of the section scrolls normally.
 *
 * The strip is deliberately a single moving element rather than four
 * independently animated frames — see the note in scale-stack.css for why that
 * change was made. Everything it needs from scroll is the one `--p` value on
 * the track; the motion itself is entirely CSS, so nothing here re-renders
 * while the user scrolls.
 *
 * The pinning is why this component owns the scroll progress rather than
 * living inside something that does: the stage is sticky and exactly one
 * viewport tall, so measuring it would give no travel at all. The track
 * around it is what has the height, and `mode: 'self'` reads progress across
 * that track.
 *
 * Scrubbed, so scrolling back sends the row out to the right again.
 */

const DEFAULT = ['dark-desk', 'magazine-sofa', 'sculpture', 'white-desk'];

export default function ScaleStack({ items = DEFAULT, children }) {
  const ref = useScrollProgress({ mode: 'self' });

  return (
    <div className="sstack__track" ref={ref}>
      <div className="sstack__stage">
        {children}

        <div className="sstack">
          <div className="sstack__strip">
            {items.map((id) => {
              const clip = byId(id);
              return (
                <figure className="sstack__item" key={id}>
                  <img
                    className="sstack__img"
                    src={workSrc(clip.id)}
                    alt={clip.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
