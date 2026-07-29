'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * THE SPINE — the site's signature element.
 *
 * The brief's central claim is that most brands have a connection problem:
 * strategy sits in one place, performance in another, revenue nowhere. So the
 * page is threaded by one unbroken hairline that fills as you read, naming the
 * chapter you're standing in. The argument of the site, drawn down its edge.
 *
 * Sections opt in with `data-chapter="…"` and `data-tone="light|dark"`.
 */
export default function Spine() {
  const fillRef = useRef(null);
  const nodeRef = useRef(null);
  const labelRef = useRef(null);

  const [chapter, setChapter] = useState('');
  const [onLight, setOnLight] = useState(false);
  const pathname = usePathname();

  // Progress: one rAF loop, transform-only, so it never triggers layout.
  useEffect(() => {
    let frame;
    let current = 0;

    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      // Ease toward the target so the marker glides rather than snaps.
      current += (target - current) * 0.12;
      const p = Math.abs(target - current) < 0.0005 ? target : current;

      if (fillRef.current) fillRef.current.style.setProperty('--p', p.toFixed(4));
      if (nodeRef.current) nodeRef.current.style.setProperty('--p', p.toFixed(4));

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Chapter + tone: an observer watching a 1px line at the viewport midpoint.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-chapter]'));
    if (!sections.length) {
      setChapter('');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          setChapter(el.dataset.chapter || '');
          setOnLight(el.dataset.tone !== 'dark');
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  // Swap the label text out and back so it never hard-cuts mid-word.
  const [shown, setShown] = useState('');
  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    if (!shown) {
      setShown(chapter);
      return;
    }
    if (chapter === shown) return;

    el.classList.add('is-swapping');
    const t = setTimeout(() => {
      setShown(chapter);
      el.classList.remove('is-swapping');
    }, 300);
    return () => clearTimeout(t);
  }, [chapter, shown]);

  return (
    <div className={`spine ${onLight ? 'spine--on-light' : ''}`} aria-hidden="true">
      <span className="spine__track" />
      <span className="spine__fill" ref={fillRef} />
      <span className="spine__node" ref={nodeRef} />
      <span
        className="spine__chapter"
        ref={labelRef}
        style={{ opacity: shown ? 1 : 0 }}
      >
        <span>{shown}</span>
      </span>
    </div>
  );
}
