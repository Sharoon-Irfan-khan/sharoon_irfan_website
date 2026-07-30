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
 *
 * Two compositions, one idea. Below 760px the wide fan cannot survive — five
 * letterspaced labels across a phone leaves about 65px each, and "SEO &
 * CONTENT" is not readable at that width. So the narrow layout turns the fan
 * on its side: the parts stack down the left with their labels intact, and the
 * connectors bundle out into the gutter and gather at the revenue node below
 * them. Same five-into-one statement, drawn to fit.
 *
 * It used to be a single straight rule down the stack, which said "these are
 * in a list" rather than "these converge" — the one thing the section exists
 * to show.
 */

const X = [120, 360, 600, 840, 1080];
const TOP = 140; // where connectors leave the parts
const BOTTOM = 360; // where they arrive at revenue
const MID = 600;

/* ---- Narrow composition, viewBox 400 x 620 ----

   The rail sits at 150 of 400 rather than hard against the left edge. Five
   arcs sharing a 26-unit gutter came out as a single braid — legible as one
   line, not as five things converging. They need real width between them, and
   the only place to take it from is the left margin, so the whole stack moves
   right and the fan opens into 130 units of clear space. The labels run right
   from the rail and still finish well inside a 375px screen. */
const N_X = 150; // the rail every node's dot sits on
const N_TOP = 60; // first node
const N_GAP = 90; // between nodes
const N_BOTTOM = 560; // the revenue node

// Each connector bows out into the gutter and comes back to the same point.
// The bow shortens down the stack so the five arcs nest instead of tracing
// each other — the top one has the furthest to travel, so it swings widest.
const narrowPath = (i) => {
  const y = N_TOP + i * N_GAP;
  const bow = 20 + i * 22;
  const run = N_BOTTOM - y;
  return `M ${N_X} ${y} C ${bow} ${y + run * 0.42}, ${bow} ${N_BOTTOM - run * 0.18}, ${N_X} ${N_BOTTOM}`;
};

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
        {/* A string still works; an array breaks where the writing breaks
            rather than wherever the measure happens to run out. */}
        <h2 className="display display--m sysd__title">
          {Array.isArray(title)
            ? title.map((line, i) => (
                <span className="sysd__title-line" key={i}>
                  {line}
                </span>
              ))
            : title}
        </h2>

        <div className="sysd__stage" ref={ref}>
          <svg
            className="sysd__wires sysd__wires--wide"
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

          {/* The same five connectors, drawn for the stacked layout. Only one
              of the two is ever displayed; CSS decides which. */}
          <svg
            className="sysd__wires sysd__wires--tall"
            viewBox="0 0 400 620"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {X.map((x, i) => (
              <path
                key={x}
                className="sysd__link"
                style={{ '--d': 0.18 + i * 0.06 }}
                pathLength="1"
                d={narrowPath(i)}
              />
            ))}
          </svg>

          <ul className="sysd__parts">
            {systemMap.map((part, i) => (
              <li
                className="sysd__node"
                key={part.label}
                style={{
                  '--d': i * 0.03,
                  '--x': `${10 + i * 20}%`,
                  // The stacked layout's row, as a percentage of the 620-unit
                  // narrow viewBox — so the dot lands on the end of its wire.
                  '--y': `${((N_TOP + i * N_GAP) / 620) * 100}%`,
                }}
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
