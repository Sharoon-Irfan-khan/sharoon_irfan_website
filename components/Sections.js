import Link from 'next/link';
import Lines from './Lines';
import Reveal, { DrawRule } from './Reveal';
import { Ambient, HeroFilmVideo, HeroStill } from './Media';
import { cta as ctaCopy } from '@/lib/content';
import { site } from '@/lib/site';

/** Arrow-bearing primary action. */
export function Action({ href = '/contact', children, variant = '', ...rest }) {
  return (
    <Link href={href} className={`btn ${variant}`} {...rest}>
      {children}
      <span className="btn__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/** Inner-page hero. Same black stage as home, one register quieter.
    Takes `video` for a looping clip or `film` for a still. */
export function PageHero({ eyebrow, headline, standfirst, intro, chapter, film, video }) {
  return (
    <section
      className={`phero on-dark ${film || video ? 'phero--film' : ''}`}
      data-chapter={chapter || eyebrow}
      data-tone="dark"
    >
      {/* `video` wins over `film`, and either can be dropped for the plain
          light wash. Keeping both means a page can fall back to a still
          without any other change. */}
      {video ? (
        <HeroFilmVideo clip={video} />
      ) : film ? (
        <HeroStill clip={film} />
      ) : (
        <div className="hero__light" aria-hidden="true" />
      )}
      <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
        <p className="label phero__eyebrow">{eyebrow}</p>
        <Lines lines={headline} as="h1" className="display display--l" delay={120} />
        {standfirst && (
          <Reveal className="lede phero__standfirst" delay={520}>
            {standfirst}
          </Reveal>
        )}
        {intro && (
          <Reveal className="phero__intro" delay={640}>
            {intro}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** Eyebrow + title header used at the top of most sections. */
export function SectionHead({ eyebrow, title, wide = false, children }) {
  return (
    <div className="shead shead--split">
      <Reveal as="p" className="label shead__eyebrow">
        {eyebrow}
      </Reveal>
      <div>
        <Reveal
          as="h2"
          className={`display display--m shead__title ${wide ? 'shead__title--wide' : ''}`}
          delay={90}
        >
          {title}
        </Reveal>
        {children}
      </div>
    </div>
  );
}

/**
 * The ledger. Services and method steps are line items, and hovering one draws
 * a sand rule beneath it — the way a finger tracks down a page of figures.
 */
export function Ledger({ items, numbered = false }) {
  return (
    <div className="ledger">
      {items.map((item, i) => (
        <Reveal className="ledger__row" key={item.name} delay={i * 80}>
          <span className="ledger__index" aria-hidden="true">
            {numbered ? String(i + 1).padStart(2, '0') : '—'}
          </span>
          <h3 className="ledger__name">{item.name}</h3>
          <p className="ledger__detail">{item.detail}</p>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Steps. Numbered only when the content genuinely is a sequence — the method
 * runs in order, so the numbers carry information the reader needs.
 */
export function Steps({ steps, columns = 4, numbered = true }) {
  return (
    <div className={`steps steps--${columns}`}>
      {steps.map((step, i) => (
        <Reveal className="step" key={step.name} delay={i * 90}>
          {numbered && (
            <span className="step__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className="step__name">{step.name}</h3>
          <p className="step__detail">{step.detail}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function Sectors({ items }) {
  return (
    <ul className="sectors">
      {items.map((s, i) => (
        <Reveal as="li" className="sector" key={s} delay={i * 70}>
          {s}
        </Reveal>
      ))}
    </ul>
  );
}

/** Closing call to action. Same on every page, so the ask never moves. */
export function CtaBand({ chapter = 'Next step' }) {
  return (
    <section
      className="cta band on-dark has-ambient"
      data-chapter={chapter}
      data-tone="dark"
    >
      {/* Drifting light on the closing ask — the one place on the page where a
          little warmth earns its keep. Blurred hard so it reads as moving light
          rather than as a recognisable subject. */}
      <Ambient clip="butterflies" opacity={0.55} blur={12} />
      <div className="hero__light" aria-hidden="true" />
      <div className="shell">
        <div className="cta__inner">
          <div>
            <Reveal as="p" className="label" style={{ color: 'var(--sand)' }}>
              {ctaCopy.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              className="display display--m cta__title"
              delay={90}
              style={{ marginTop: '1.5rem' }}
            >
              {ctaCopy.title}
            </Reveal>
            <Reveal className="cta__body" delay={180}>
              {ctaCopy.body}
            </Reveal>
          </div>
          <Reveal delay={260}>
            <Action href="/contact">{ctaCopy.action}</Action>
          </Reveal>
        </div>

        <div className="cta__contacts">
          <a className="tlink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="tlink" href={`tel:${site.phoneHref}`}>
            {site.phone}
          </a>
          <a className="tlink" href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export { DrawRule };
