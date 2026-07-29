# Motion system — design

**Date:** 2026-07-29
**Site:** sharoon.ae — founder-led marketing systems, Dubai
**Status:** approved, Phase 1 in build

## Problem

The site is asked to work as a portfolio, but has no portfolio media: `public/`
holds eight generic Dubai stock photographs, two ambient overlay clips and one
hero video. No client work, no case studies, no logos, no footage of the
founder. The Results page carries a single figure (AED 35M+) and prose.

Adding heavier motion to stock photography does not produce a portfolio. It
produces an agency template. So the motion has to carry the *argument* rather
than dress the *imagery*.

A second problem was introduced by the new `HeroDark`: it dropped the
`hero__rail`, so the five parts of the system (Strategy, Performance, SEO &
Content, Website, CRM) no longer appear on the home page at all.

## Constraints

- **No new dependencies.** `motion` (Framer Motion v12) is installed but
  imported nowhere. The existing hand-rolled system — CSS transitions driven by
  IntersectionObserver, plus a rAF parallax loop — is good. Adding Framer Motion
  would mean two parallel motion systems. Drop the dependency instead.
- **Restraint is the brand.** The site reads as expensive because most of it
  holds still. Roughly six deliberate motions, not sixty.
- **`prefers-reduced-motion` is honoured everywhere**, as the current code
  already does.
- **One rAF loop discipline.** Scroll work runs only while the element is in
  view, and writes only transform, opacity, or `stroke-dashoffset`.
- Assets stay stock-only. Everything must accept real work later without
  rework.

## Architecture

### Foundation: `useScrollProgress(ref, options)`

Generalises the existing `useParallax`. Returns 0 → 1 as the element passes
through the viewport and writes it to a `--p` custom property on the element.
Same in-view gating and rAF cancellation as `useParallax`. Every scrubbed
animation reads `--p` in CSS, so there is one scroll loop per element rather
than one per effect.

CSS consumes it as a normalised local progress:

```css
--t: clamp(0, (var(--p) - var(--delay)) / var(--span), 1);
```

### Set piece: `SystemDiagram`

Restores the five parts, in stronger form. Placed after the thesis section on
the home page — the reader is told "most brands have a connection problem",
then scrolls and watches the five parts connect into one Revenue node.

Structure is a hybrid, deliberately:

- **HTML for the nodes.** Each of the five is a real `<a>` to its section on
  `/services`, so it is focusable, hoverable and announced by screen readers.
  Positioned with percentages.
- **SVG for the connectors only**, `aria-hidden`, absolutely positioned behind.
  Paths use `pathLength="1"` so `stroke-dasharray: 1` / `stroke-dashoffset:
  calc(1 - var(--t))` draws them without measuring geometry in JS.

Scrub timeline across `--p`:

| Range | What happens |
|---|---|
| 0.00 – 0.20 | Five nodes fade and rise, staggered |
| 0.18 – 0.80 | Connector paths draw, staggered per path |
| 0.70 – 1.00 | Revenue node lights; label resolves |

Reversible, because it is scrubbed rather than triggered.

Mobile (< 760px): connectors are replaced by a single vertical spine that draws
down the stacked list. Same content, no distorted geometry.

### Scrubbed media

`MediaBand` and `MediaPlate` keep their existing clip-path reveal, and gain a
scroll-linked scale driven by `--p` rather than a fixed trigger. Makes the
existing stock photography read as directed rather than decorative.

## Phases

**Phase 1 (this build)**
1. `useScrollProgress` hook
2. `SystemDiagram` + styles, wired into the home page after the thesis
3. Scrubbed `MediaBand` / `MediaPlate`
4. Remove the unused `motion` dependency

**Phase 2 (after review)**
5. `Ledger` — hairlines draw progressively down the list
6. `Steps` — connecting line draws through the numbered method steps
7. Results figure — `Counter` driven by scroll progress, arc beneath
8. `PageCurtain` — route transition reusing the existing `.intro__bar`
   vocabulary; works without the View Transitions API
9. `Words` — word-level stagger primitive, used only on the thesis quote and
   section titles
10. Contact form focus and validation micro-states

## Explicitly excluded

Custom cursor, WebGL image distortion, pinned horizontal galleries, hover
displacement. All rejected as showreel treatment that would undercut the
restraint the site depends on.

## Open items

- The diagram's node → `/services` links assume anchor ids exist on that page.
  If they do not, add them as part of Phase 1.
- Real portfolio media, when it exists, should land in `MediaPlate` case-study
  cards on `/results`. Not designed here.
