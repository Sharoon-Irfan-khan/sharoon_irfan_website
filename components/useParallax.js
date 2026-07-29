'use client';

import { useEffect, useRef } from 'react';

/**
 * Drifts an element against the scroll while its container is on screen.
 *
 * Only runs while the container is actually in view, and only ever writes a
 * transform, so it never triggers layout. `strength` is the total travel in
 * viewport-height units across one full pass.
 */
export default function useParallax(strength = 0.16) {
  const outer = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    const box = outer.current;
    const media = inner.current;
    if (!box || !media) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = null;
    let active = false;

    const tick = () => {
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;

      // -1 when the container is just below the fold, 1 when it is just above.
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const shift = -progress * strength * rect.height;

      media.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.001)`;

      if (active) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && active) {
          active = false;
          if (frame) cancelAnimationFrame(frame);
          frame = null;
        }
      },
      { rootMargin: '20% 0px 20% 0px' }
    );

    io.observe(box);
    return () => {
      io.disconnect();
      active = false;
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return { outer, inner };
}
