import Link from 'next/link';
import Reveal, { DrawRule } from './Reveal';

/** Arrow-bearing primary action. */
/* The default is rooted at "/" for the same reason the nav's anchors are: a
   bare "#contact" resolves against whatever page the reader is on, and the one
   place this component is used without an explicit href is the 404, where
   there is no contact section to find. */
export function Action({ href = '/#contact', children, variant = '', ...rest }) {
  return (
    <Link href={href} className={`btn ${variant}`} {...rest}>
      {children}
      <span className="btn__arrow" aria-hidden="true">
        →
      </span>
    </Link>
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

export { DrawRule };
