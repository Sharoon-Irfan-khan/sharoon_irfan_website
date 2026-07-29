'use client';

import Link from 'next/link';
import useScrollProgress from './useScrollProgress';
import { systemMap } from '@/lib/site';

/**
 * THE SYSTEM DIAGRAM
 *
 * The site's central claim — five parts wired to one number — drawn rather
 * than asserted. Scrolling through the section draws each part's connector
 * into the revenue node, so the reader watches the argument assemble instead
 * of reading that it does.
 *
 * Scrubbed, not triggered: scrolling back up runs it in reverse.
 *
 * Deliberately a hybrid. The nodes are real anchors in HTML, so each one is
 * focusable, hoverable and announced, and each links to the service that
 * delivers it. Only the connectors are SVG, and they are hidden from assistive
 * tech because a line between two things the reader can already read is
 * decoration.
 *
 * Geometry note: the SVG viewBox and the HTML node positions are two
 * descriptions of the same layout, so they have to agree. Nodes sit at 10/30/
 * 50/70/90% across, matching x = 120/360/600/840/1080 in the 1200-wide
 * viewBox. Change one and you change both.
 */

const X = [120, 360, 600, 840, 1080];
const TOP = 140; // where connectors leave the parts
const BOTTOM = 360; // where they arrive at revenue
const MID = 600;

export default function SystemDiagram({
  eyebrow = 'The system',
  // Placeholder copy — worth your own pass. It deliberately avoids "Five
  // parts, wired to one number", which is already the heading of the "What
  // you get" section further down this same page.
  title = 'Everything points at the same number.',
  target = 'Revenue',
}) {
  const ref = useScrollProgress({ from: 0.12, to: 0.72 });

  return (
    <section
      className="band surface-ivory sysd"
      data-chapter="The system"
      data-tone="light"
    >
      <div className="shell">
        <p className="label sysd__eyebrow">{eyebrow}</p>
        <h2 className="display display--m sysd__title">{title}</h2>

        <div className="sysd__stage" ref={ref}>
          <svg
            className="sysd__wires"
            viewBox="0 0 1200 460"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            {X.map((x, i) => (
              <path
                key={x}
                className="sysd__link"
                style={{ '--d': 0.18 + i * 0.06 }}
                pathLength="1"
                d={`M ${x} ${TOP} C ${x} ${TOP + 110}, ${MID} ${BOTTOM - 110}, ${MID} ${BOTTOM}`}
              />
            ))}
          </svg>

          <ul className="sysd__parts">
            {systemMap.map((part, i) => (
              <li
                className="sysd__node"
                key={part.label}
                style={{ '--d': i * 0.03, '--x': `${10 + i * 20}%` }}
              >
                <Link className="sysd__part" href={part.href}>
                  <span className="sysd__dot" aria-hidden="true" />
                  <span className="sysd__part-label">{part.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="sysd__target">
            <span className="sysd__target-ring" aria-hidden="true" />
            <span className="display display--s sysd__target-label">{target}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
