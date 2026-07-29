'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts a figure up when it enters view. Used only for the attributed-revenue
 * number — the one figure the whole practice is measured by. Reserve it for
 * that and it stays an event rather than a tic.
 */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1900,
  className = '',
}) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(value);
      return;
    }

    let frame;
    let start;

    const run = () => {
      const step = (now) => {
        if (start === undefined) start = now;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart — decisive, then settles
        setN(Math.round(eased * value));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
