'use client';

import { useEffect, useRef, useState } from 'react';
import { byId, workSrc } from '@/lib/media';

/**
 * SWITCH FRAME — one frame, several photographs, crossfading on a timer.
 *
 * A stack rather than a set of independent fades: the first picture sits
 * underneath at full opacity as a base and the others fade in over it, so
 * something is always opaque and the frame can never flash empty mid-dissolve.
 *
 * `offset` staggers the timer per frame. Without it every frame in the hero
 * would change on the same beat, which reads as a slideshow rather than as
 * three photographs quietly living their own lives.
 *
 * Pauses when off screen, and reduced motion gets the first picture only.
 */

const HOLD = 4600; // ms each picture is the front one
const FADE = 1400; // ms of crossfade, must match --fade in the CSS

export default function SwitchFrame({ items = [], offset = 0, className = '' }) {
  const [i, setI] = useState(0);
  const [run, setRun] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run || items.length < 2) return;

    // The stagger is a one-shot delay before the repeating timer starts, not a
    // phase applied to every tick — otherwise the frames drift back into sync
    // over a few minutes.
    let interval;
    const start = setTimeout(() => {
      setI((n) => (n + 1) % items.length);
      interval = setInterval(
        () => setI((n) => (n + 1) % items.length),
        HOLD + FADE
      );
    }, offset);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [run, items.length, offset]);

  return (
    <div className={`sframe ${className}`} ref={box}>
      {items.map((id, n) => {
        const clip = byId(id);
        return (
          <img
            key={id}
            className={`sframe__img ${n === i ? 'is-on' : ''}`}
            src={workSrc(clip.id)}
            alt={n === 0 ? clip.alt : ''}
            aria-hidden={n === 0 ? undefined : true}
            loading={n === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        );
      })}
    </div>
  );
}
