'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const pathname = usePathname();

  // The nav rides transparent over the champagne hero, then lays down an ivory
  // bar once the hero has passed. One threshold, no flicker.
  useEffect(() => {
    // Only the homepage has a hero for the bar to ride over. Everywhere else
    // there is nothing behind it but page, and a transparent bar there means
    // the wordmark sits on the article's own copy.
    if (pathname !== '/') {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Scroll spy. On one page the nav can no longer key its active state to the
  // route, so it watches the sections the links point at instead. rootMargin
  // pulls the trigger line to roughly a third down the viewport, which is
  // where a reader considers themselves to be.
  useEffect(() => {
    // Anchors are "/#system" now, so the id is what follows the hash. Entries
    // without one — the Thought Room — are routes, not sections, and simply
    // produce nothing to observe.
    const ids = nav.map((n) => n.href.split('#')[1]).filter(Boolean);
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

  // A section link is active when its anchor is the section in view; a route
  // link is active when we are on that route. Comparing the raw href against a
  // hash would never match either now that the anchors carry a leading "/".
  const isActive = (href) => {
    const id = href.split('#')[1];
    if (id) return pathname === '/' && current === `#${id}`;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Closing on click is the whole point of a menu item — without it the sheet
  // stays up over the section the reader just asked for.
  //
  // The body unlock happens here rather than being left to the effect above.
  // The anchor scroll runs during this click; the effect does not run until
  // after the next paint, so the scroll would land against a still-locked body
  // and be dropped. The effect then sets the same value again, which is
  // harmless.
  const closeMenu = () => {
    document.body.style.overflow = '';
    setOpen(false);
  };

  return (
    <>
      <header
        className={`nav ${solid && !open ? 'is-solid' : ''} ${open ? 'is-over-menu' : ''}`}
      >
        <div className="nav__inner">
          <Link href="/" className="wordmark" aria-label={`${site.name} — home`}>
            Sharoon <em>Irfan</em>
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
                onClick={closeMenu}
              >
                {item.label}
                <span className="menu__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* These close it too. The mail and phone links hand off to another
            app, but LinkedIn opens a new tab — come back and the menu would
            still be sitting there. */}
        <div className="menu__foot">
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} onClick={closeMenu}>
            {site.email}
          </a>
          <a href={`tel:${site.phoneHref}`} tabIndex={open ? 0 : -1} onClick={closeMenu}>
            {site.phone}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={closeMenu}
          >
            {site.linkedinLabel}
          </a>
        </div>
      </div>
    </>
  );
}
