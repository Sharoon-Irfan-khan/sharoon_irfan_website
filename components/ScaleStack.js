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

  This row is the only place in the build that had no pictures of its own: the
  hero cycles eleven, the service list carries seven, and every one of the 29
  July batch is already in the hero. Reusing any of them here put the same
  photograph on two consecutive screens. These four are the remainder — the
  ones the rest of the page never claimed.

  `dark-desk`, `magazine-sofa`, `sculpture` and `white-desk` are also unused,
  but only because this row is what dropped them; they are the library filler
  that stood in before the supplied photographs arrived, and they are not
  coming back.

  Ordered so the row does not build as four variations of the same picture:
  the moodboard is the only one with strong colour, the spread and the bed are
  both soft greys but one is printed matter and one is a person, and the stack
  closes on the coolest note.
*/
const DEFAULT = [
  'moodboard-floor',
  'fashion-spread',
  'reading-bed',
  'kinfolk-stack',
];

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
