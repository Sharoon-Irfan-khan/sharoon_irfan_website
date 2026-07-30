'use client';

import { useCallback, useRef } from 'react';
import useScrollProgress from './useScrollProgress';

/**
 * THE FIGURE — a pinned instrument.
 *
 * The site's whole claim is that the work is measured, so on the page that
 * says so, the number should be measured in front of the reader rather than
 * simply printed. It counts as you scroll, an axis draws beneath it, and the
 * outcomes read in one at a time alongside.
 *
 * Scrubbed rather than triggered, which is the point: the reader controls it,
 * can scroll back and watch it fall, and the number is tied to their own
 * movement instead of running once and being over.
 *
 * The count is written straight to the DOM from the scroll callback. Putting
 * it in React state would re-render this subtree on every frame of a scroll,
 * to change three characters of text.
 */
export default function ProofFigure({
  eyebrow,
  figure,
  items = [],
  chapter = 'The numbers',
}) {
  const num = useRef(null);

  const onProgress = useCallback(
    (p) => {
      if (!num.current) return;
      // The count occupies the first 60% of the track; the rest is the hold
      // where the outcomes finish arriving and the reader reads the total.
      const t = Math.min(1, Math.max(0, (p - 0.04) / 0.56));
      const eased = t * t * (3 - 2 * t);
      num.current.textContent = String(Math.round(eased * figure.value));
    },
    [figure.value]
  );

  const ref = useScrollProgress({ mode: 'self', onProgress });

  return (
    <section
      className="proof band--seam surface-linen"
      data-chapter={chapter}
      data-tone="light"
    >
      <div
        className="proof__track"
        ref={ref}
        style={{ '--n': Math.max(items.length, 1) }}
      >
        <div className="proof__stage">
          <div className="shell proof__grid">
            <div className="proof__figure">
              <p className="label proof__eyebrow">{eyebrow}</p>

              <p className="proof__value">
                <span className="proof__unit">{figure.unit}</span>
                {/* Starts at 0 and is written by the scroll callback. */}
                <span ref={num}>0</span>
                <span className="proof__suffix">{figure.suffix}</span>
              </p>

              {/* The axis. Draws left to right as the number climbs, so the
                  figure reads as a measurement rather than a slogan. */}
              <span className="proof__axis" aria-hidden="true">
                <span className="proof__axis-line" />
                <span className="proof__axis-ticks" />
              </span>

              <p className="label proof__label">{figure.label}</p>
              {figure.note && <p className="proof__note">{figure.note}</p>}
            </div>

            <ul className="proof__items">
              {items.map((item, i) => (
                <li className="proof__item" key={item.name} style={{ '--i': i }}>
                  <h3 className="proof__item-name">{item.name}</h3>
                  <p className="proof__item-detail">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
