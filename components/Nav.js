'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  // The nav sits on a black hero until the hero has passed, then it becomes
  // an ivory bar. One threshold, no flicker.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy. On one page the nav can no longer key its active state to the
  // route, so it watches the sections the links point at instead. rootMargin
  // pulls the trigger line to roughly a third down the viewport, which is
  // where a reader considers themselves to be.
  useEffect(() => {
    const ids = nav.map((n) => n.href.replace('#', ''));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent('#' + hit.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href) => href === current;

  return (
    <>
      <header className={`nav ${solid && !open ? 'is-solid' : ''}`}>
        <div className="nav__inner">
          <Link href="/" className="wordmark" aria-label={`${site.name} — home`}>
            Sharoon <em>Irfan</em>
            <span className="wordmark__dot" aria-hidden="true" />
          </Link>

          <nav className="nav__links nav__links--desk" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav__link ${isActive(item.href) ? 'is-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn--sm nav__cta">
              Book a call
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </nav>

          <button
            type="button"
            className={`burger ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <ul className="menu__list">
          {nav.map((item, i) => (
            <li className="menu__item" key={item.href}>
              <Link
                href={item.href}
                className="menu__link"
                style={{ '--i-delay': `${120 + i * 70}ms` }}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
                <span className="menu__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="menu__foot">
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
            {site.email}
          </a>
          <a href={`tel:${site.phoneHref}`} tabIndex={open ? 0 : -1}>
            {site.phone}
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
            {site.linkedinLabel}
          </a>
        </div>
      </div>
    </>
  );
}
