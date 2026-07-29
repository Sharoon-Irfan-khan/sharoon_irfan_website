'use client';

import useScrollProgress from './useScrollProgress';
import { byId, workSrc } from '@/lib/media';

/**
 * SCALE STACK — a pinned row that builds itself.
 *
 * The section holds still while the four photographs arrive one after another,
 * each wiping in from the right of its own frame. Once the row is complete it
 * releases and the rest of the section scrolls normally.
 *
 * Each frame owns a staggered slice of the track — see the note in
 * scale-stack.css. All the motion needs from scroll is the one `--p` value on
 * the track plus each frame's index; the rest is CSS, so nothing here
 * re-renders while the user scrolls.
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
            {items.map((id, i) => {
              const clip = byId(id);
              return (
                // --i is the frame's place in the queue. The CSS turns it into
                // this frame's slice of the scroll track.
                <figure className="sstack__item" key={id} style={{ '--i': i }}>
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
