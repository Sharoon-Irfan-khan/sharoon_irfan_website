'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal for the portfolio page, ported 1:1 from work.html's own
 * script: elements carrying .reveal or .reveal-stagger pick up .in the first
 * time they cross the viewport, then stop being observed. Scoped to a
 * container ref rather than the whole document so each section owns its own
 * observer instead of relying on one global scan.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return ref;
}

/**
 * Recomputes how many cards fit in one row of a CSS grid (by reading the
 * live grid-template-columns), and reveals the rest on demand — the same
 * "Load More" technique work.html used for projects, accounts and
 * brochures rather than a fixed page size.
 */
export function useLoadMoreRows(count, rows = 1) {
  const gridRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    const wrap = wrapRef.current;
    if (!grid || !wrap) return;

    const cards = Array.from(grid.children);

    function columnCount() {
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
      return Math.max(1, cols);
    }

    function applyLimit() {
      const visible = columnCount() * rows;
      if (cards.length <= visible) {
        wrap.classList.add('is-done');
        cards.forEach((c) => c.classList.remove('is-hidden-project'));
        return;
      }
      cards.forEach((c, i) => c.classList.toggle('is-hidden-project', i >= visible));
    }

    applyLimit();

    const btn = wrap.querySelector('button');
    const onClick = () => {
      cards.forEach((c) => c.classList.remove('is-hidden-project'));
      wrap.classList.add('is-done');
    };
    btn?.addEventListener('click', onClick);

    let rt;
    const onResize = () => {
      if (wrap.classList.contains('is-done')) return;
      clearTimeout(rt);
      rt = setTimeout(applyLimit, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      btn?.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, [count, rows]);

  return { gridRef, wrapRef };
}
