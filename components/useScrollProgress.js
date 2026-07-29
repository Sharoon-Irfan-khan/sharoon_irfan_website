'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll progress for one element, written to CSS rather than to React state.
 *
 * Returns a ref. While the element is on screen, `--p` on that element runs
 * 0 → 1 across its pass through the viewport, and everything else is done in
 * CSS. Keeping the value out of React is the whole point: a scrubbed animation
 * that re-rendered a component every frame would be far more expensive than
 * the animation itself.
 *
 * Same discipline as useParallax, which this generalises: the loop only runs
 * while the element is in view, it is cancelled on the way out, and it writes
 * a single custom property so nothing it drives can trigger layout.
 *
 *   `from` / `to` place the 0 and 1 points, in viewport heights, relative to
 *   the element's own pass. The defaults start counting when the element's top
 *   reaches the bottom of the viewport and finish when its bottom reaches the
 *   top — i.e. the full pass.
 */
export default function useScrollProgress({
  from = 0,
  to = 1,
  settle = true,
  mode = 'through',
  measure,
  onProgress,
} = {}) {
  const ref = useRef(null);

  // Held in a ref so a caller passing an inline arrow doesn't tear down and
  // rebuild the observer on every render.
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion gets the finished state, not a frozen half-drawn one.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      return;
    }

    let frame = null;
    let active = false;
    let last = -1;

    // The element that defines the scroll range is not always the element the
    // progress is written to. A sticky reel is exactly one viewport tall, so
    // measuring itself gives zero travel and progress snaps to 1 — it has to
    // be measured against the section it sticks within.
    const box = (measure && measure(el)) || el;

    const tick = () => {
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;

      let raw;
      if (mode === 'self') {
        // Progress through the element's OWN scroll length: 0 while its top is
        // at the top of the viewport, 1 once its bottom has arrived there.
        //
        // This is the right mapping for a full-height section sitting at the
        // top of the page. The 'through' mapping below would report 0.33 at
        // scroll zero — a hero using it opens a third of the way into its own
        // animation, which is exactly wrong.
        const travel = rect.height - vh;
        raw = travel > 0 ? -rect.top / travel : rect.top <= 0 ? 1 : 0;
      } else {
        // 0 when the element's top hits the bottom of the viewport,
        // 1 when its bottom clears the top.
        const span = rect.height + vh;
        raw = span > 0 ? (vh - rect.top) / span : 0;
      }

      // Remap into the requested window, then clamp.
      const width = to - from || 1;
      const p = Math.min(1, Math.max(0, (raw - from) / width));

      // Skip the write when nothing moved. Most frames during a slow scroll
      // land on the same 1/1000th, and a no-op style write still costs.
      const rounded = Math.round(p * 1000) / 1000;
      if (rounded !== last) {
        el.style.setProperty('--p', String(rounded));
        last = rounded;
        // Fires only on change, and outside React — callers write to the DOM
        // directly. Routing this through state would re-render on every frame
        // of a scroll, which is exactly what the ref-based design avoids.
        cb.current?.(rounded, el);
      }

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
          // Park at whichever end it left by, so scrolling past fast doesn't
          // strand the animation mid-draw.
          if (settle) {
            const above = el.getBoundingClientRect().bottom < 0;
            el.style.setProperty('--p', above ? '1' : '0');
          }
        }
      },
      { rootMargin: '15% 0px 15% 0px' }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      active = false;
      if (frame) cancelAnimationFrame(frame);
    };
  }, [from, to, settle, mode, measure]);

  return ref;
}
