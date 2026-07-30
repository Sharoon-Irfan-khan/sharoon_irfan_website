'use client';

import Image from 'next/image';
import { byId, workSrc } from '@/lib/media';
import { useInView } from './Reveal';
import useParallax from './useParallax';

/**
 * PLATE — a framed photograph inside a normal section.
 *
 * The only image primitive left. The full-bleed bands and the hero film are
 * gone with the footage they carried: at 1400px these pictures hold up at
 * card scale and fall apart across a whole screen, so the component that
 * would have stretched them no longer exists.
 */
export function Plate({ clip: clipId, caption, ratio }) {
  const reveal = useInView({ threshold: 0.1 });
  const { outer, inner } = useParallax(0.13);
  const clip = byId(clipId);

  return (
    <figure className="plate" ref={reveal}>
      <div
        className="plate__frame"
        ref={outer}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <div className="film__inner" ref={inner}>
          <Image
            className="film__media"
            src={workSrc(clip.id)}
            alt={clip.alt}
            fill
            sizes="(max-width: 899px) 90vw, 45vw"
            loading="lazy"
          />
        </div>
      </div>
      {caption && <figcaption className="label plate__caption">{caption}</figcaption>}
    </figure>
  );
}
