'use client';

import Image from 'next/image';
import useScrollProgress from './useScrollProgress';
import { useInView } from './Reveal';
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

/*
  The four photographs that appear nowhere else on the site.

  Replaced 31 July. The row used to run on library filler — a moodboard, a
  fashion spread, a bed, a magazine stack — chosen because they were the four
  pictures the rest of the page had not already claimed. That is a reason to
  put something in a frame, not a reason for it to be there: the section above
  argues that the work is a system, and four editorial flatlays said nothing
  about it.

  These four carry the argument in order — position, system, work, number. The
  chess board is the only near-black frame and opens the row on it; the puzzle
  is the only one carrying a word; the desk is the work itself; the figures
  close on what it is for.

  `moodboard-floor`, `fashion-spread`, `reading-bed` and `kinfolk-stack` stay
  registered in the library but are now unused, as are `dark-desk`,
  `magazine-sofa`, `sculpture` and `white-desk` for the same reason.
*/
const DEFAULT = ['strategy-chess', 'crm-puzzle', 'build-desk', 'numbers-table'];

/*
  One frame.

  It watches for itself entering the viewport, which is only used on a phone.
  There is no scroll track down there — the row is a plain grid — so the
  desktop mechanism, which reads one `--p` off the track and turns it into each
  frame's slice, has nothing to read and the four photographs simply appeared.

  This is deliberately not the shared `Reveal` component. That marks its element
  with `data-reveal`, which the global rules style at every width, and it would
  have added a rise on desktop on top of the slide the frames already do. The
  bare hook adds `is-in` and nothing else, so the mobile block in the CSS is the
  only thing that reacts to it.
*/
function Frame({ id, index }) {
  const clip = byId(id);
  const seen = useInView({ threshold: 0.2 });

  return (
    // --i is the frame's place in the queue. On desktop the CSS turns it into
    // this frame's slice of the scroll track; on a phone, into its place in
    // the stagger.
    <figure className="sstack__item" ref={seen} style={{ '--i': index }}>
      {/* Four across the column on desktop, two on a phone — about a quarter
          and a half of the content measure. */}
      <Image
        className="sstack__img"
        src={workSrc(clip.id)}
        alt={clip.alt}
        fill
        sizes="(max-width: 899px) 45vw, 23vw"
        loading="lazy"
      />
    </figure>
  );
}

export default function ScaleStack({ items = DEFAULT, children }) {
  const ref = useScrollProgress({ mode: 'self' });

  return (
    <div className="sstack__track" ref={ref}>
      <div className="sstack__stage">
        {children}

        <div className="sstack">
          <div className="sstack__strip">
            {items.map((id, i) => (
              <Frame id={id} index={i} key={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
