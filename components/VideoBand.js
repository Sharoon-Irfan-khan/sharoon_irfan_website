'use client';

import { useEffect, useRef } from 'react';
import { useInView } from './Reveal';
import { playSafe } from '@/lib/video';

/**
 * VIDEO BAND — a full-bleed film interlude.
 *
 * The moving counterpart to MediaBand, and a drop-in for it: same props, same
 * classes, so it inherits the clip-path wipe, the scrim behind the type and
 * the caption treatment already defined in media.css. Only the frame's
 * contents change, from a still to a loop.
 *
 * Plays only while on screen. An interlude four sections down has no business
 * decoding video while the reader is still at the top of the page, and a
 * muted loop nobody can see is pure battery cost.
 */
export default function VideoBand({
  clip,
  poster,
  height = 'mid',
  label,
  title,
  chapter,
  caption,
  align = 'end',
}) {
  const reveal = useInView({ threshold: 0.08 });
  const video = useRef(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // preload is "none" until here, so this is also what starts the
          // download — the file is never fetched for a band nobody reaches.
          if (el.preload !== 'auto') el.preload = 'auto';
          playSafe(el);
        } else {
          el.pause();
        }
      },
      { rootMargin: '25% 0px 25% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={`band-media band-media--${height} band-media--${align}`}
      data-chapter={chapter}
      data-tone="dark"
      ref={reveal}
    >
      <div className="band-media__frame">
        <video
          ref={video}
          className="film__media"
          src={`/video/${clip}.mp4`}
          poster={`/video/${poster || clip}.jpg`}
          preload="none"
          muted
          loop
          playsInline
        />
        <span className="film__veil" />
      </div>

      {(title || label) && (
        <div className="band-media__body on-dark">
          <div className="shell">
            {label && <p className="label band-media__label">{label}</p>}
            {title && <p className="display display--m band-media__title">{title}</p>}
          </div>
        </div>
      )}

      {caption && (
        <span className="band-media__caption" aria-hidden="true">
          {caption}
        </span>
      )}
    </section>
  );
}
