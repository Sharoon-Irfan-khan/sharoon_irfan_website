'use client';

import { useEffect, useState } from 'react';

/**
 * A short curtain on first load. It lifts after ~1.1s, handing off to the hero
 * headline so the page arrives as one continuous motion rather than two.
 * Runs once per tab — a loader you see on every navigation is an obstacle.
 */
export default function Intro() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('si-intro');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || reduced) {
      setGone(true);
      document.documentElement.dataset.intro = 'done';
      return;
    }

    setMounted(true);
    sessionStorage.setItem('si-intro', '1');
    document.body.style.overflow = 'hidden';

    const lift = setTimeout(() => setDone(true), 1150);
    const clear = setTimeout(() => {
      setGone(true);
      document.body.style.overflow = '';
      document.documentElement.dataset.intro = 'done';
    }, 2100);

    return () => {
      clearTimeout(lift);
      clearTimeout(clear);
      document.body.style.overflow = '';
    };
  }, []);

  if (gone || !mounted) return null;

  return (
    <div className={`intro ${done ? 'is-done' : ''}`} aria-hidden="true">
      <p className="intro__mark">
        Sharoon <em>Irfan</em>
      </p>
      <span className="intro__bar" />
    </div>
  );
}
