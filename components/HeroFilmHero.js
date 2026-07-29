import Lines from './Lines';
import Reveal from './Reveal';
import { Action } from './Sections';
import { Ambient, HeroFilm } from './Media';
import { home } from '@/lib/content';
import { systemParts } from '@/lib/site';

/**
 * HERO FILM — the original home stage.
 *
 * Left-aligned over moving film, with the five parts of the system laid out as
 * one connected rail along the bottom. Extracted from app/page.js unchanged so
 * swapping between this and HeroDark is a one-line edit.
 */
export default function HeroFilmHero() {
  return (
    <section
      className="hero hero--film on-dark has-ambient"
      data-chapter="Home"
      data-tone="dark"
    >
      <HeroFilm />
      {/* Light drifting across the skyline, over the film and under the type. */}
      <Ambient clip="butterflies" opacity={0.34} blur={16} />

      <div className="shell hero__body">
        <Lines
          lines={home.headline}
          as="h1"
          className="display display--xl hero__title"
          delay={260}
          stagger={130}
        />

        <div className="hero__lower">
          <Reveal className="lede hero__standfirst" delay={820}>
            {home.standfirst}
          </Reveal>
          <Reveal className="hero__actions" delay={940}>
            <Action href="/contact">Book a strategy call</Action>
            <Action href="/services" variant="btn--ghost">
              See the system
            </Action>
          </Reveal>
        </div>
      </div>

      {/* The five parts, already connected. The argument, stated on screen one. */}
      <div className="hero__rail">
        <div className="shell">
          <div className="hero__rail-inner">
            {systemParts.map((part, i) => (
              <span
                className="hero__part"
                key={part}
                style={{ '--i-delay': `${1150 + i * 110}ms` }}
              >
                {part}
              </span>
            ))}
          </div>
        </div>
        <span className="hero__scroll">Scroll</span>
      </div>
    </section>
  );
}
