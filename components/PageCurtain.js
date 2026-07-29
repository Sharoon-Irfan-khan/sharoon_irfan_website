'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Route transition.
 *
 * A note on what this can and cannot do. The App Router hands us the new
 * pathname *after* the navigation has already committed, so there is no honest
 * way to run a cover animation before the swap without intercepting every link
 * ourselves. Rather than fake a loading state that isn't happening, this marks
 * the arrival: a sand hairline sweeps the top of the viewport and a brief veil
 * clears, which is enough to stop a route change reading as a hard cut.
 *
 * Skips the first render — the Intro curtain already owns that moment, and two
 * curtains on top of each other is one too many.
 */
export default function PageCurtain() {
  const pathname = usePathname();
  const [run, setRun] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setRun((n) => n + 1);
  }, [pathname]);

  // Backstop. Chrome freezes animations in a hidden tab, so a navigation that
  // happens in the background can leave animationend un-fired and the veil
  // sitting over the page. Keyed to `run`, so each navigation gets its own
  // fresh countdown rather than inheriting the previous one.
  useEffect(() => {
    if (!run) return;
    const bail = setTimeout(() => setRun(0), 2000);
    return () => clearTimeout(bail);
  }, [run]);

  if (!run) return null;

  // The key remounts the node on every navigation, which is what restarts the
  // CSS animations. Without it a second navigation would render nothing new.
  //
  // Unmounting is driven by the bar's own animationend rather than by a timer.
  // A timer has to guess the duration, and it loses that guess whenever two
  // navigations land close together — the second run inherits the first run's
  // countdown and the curtain vanishes mid-sweep.
  return (
    <div
      className="curtain"
      key={run}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName.startsWith('curtain-bar')) setRun(0);
      }}
    >
      <span className="curtain__veil" />
      <span className="curtain__bar" />
    </div>
  );
}
