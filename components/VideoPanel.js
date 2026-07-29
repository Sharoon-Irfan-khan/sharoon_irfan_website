'use client';

import { useCallback, useRef } from 'react';
import useScrollProgress from './useScrollProgress';
import { playSafe } from '@/lib/video';

/**
 * VIDEO PANEL — a vertical clip beside a section, handing over to a second
 * clip as the reader scrolls through.
 *
 * Same stack technique as HeroReel and for the same reason: the first clip is
 * an opaque base and the second fades in over it, so the background can never
 * show through mid-dissolve. Only the front clip plays.
 *
 * Measured against the section rather than itself — the panel is sticky and
 * shorter than the section, so its own box has no useful scroll travel.
 *
 * Uses the default 'through' mapping, NOT the hero's 'self'. This section is
 * only fractionally taller than the viewport (about 1120px against 1111px),
 * so 'self' gives it roughly 9px of travel and the handover snaps between
 * clips in a single wheel notch. Measuring the section's whole pass through
 * the viewport instead gives the crossfade about a screen's worth of scroll,
 * windowed to the part of that pass where the section is actually being read.
 */

const DEFAULT = [
  { id: 'panel-downtown', alt: 'Downtown Dubai at dusk, seen from above' },
  { id: 'panel-burj', alt: 'The Burj Khalifa lit at night' },
];

const toSection = (el) => el.closest('[data-panel-scope]') || el.parentElement;

export default function VideoPanel({ clips = DEFAULT }) {
  const els = useRef([]);
  const active = useRef(-1);

  const onProgress = useCallback(
    (p) => {
      const last = clips.length - 1;
      const step = last === 0 ? 1 : 1 / last;
      let best = 0;

      clips.forEach((_, i) => {
        const opacity =
          i === 0 ? 1 : Math.max(0, Math.min(1, (p - (i - 1) * step) / step));
        const el = els.current[i];
        if (el) el.style.opacity = String(opacity);
        if (opacity >= 0.5) best = i;
      });

      if (best !== active.current) {
        els.current.forEach((el, i) => {
          if (!el) return;
          if (i === best) playSafe(el);
          else el.pause();
        });
        const next = els.current[best + 1];
        if (next && next.preload !== 'auto') {
          next.preload = 'auto';
          next.load();
        }
        active.current = best;
      }
    },
    [clips]
  );

  const ref = useScrollProgress({
    measure: toSection,
    from: 0.25,
    to: 0.75,
    onProgress,
  });

  return (
    <div className="vpanel" ref={ref} aria-hidden="true">
      <div className="vpanel__frame">
        {clips.map((clip, i) => (
          <video
            key={clip.id}
            className="vpanel__clip"
            ref={(el) => {
              els.current[i] = el;
            }}
            src={`/video/${clip.id}.mp4`}
            poster={`/video/${clip.id}.jpg`}
            preload={i === 0 ? 'metadata' : 'none'}
            style={{ opacity: i === 0 ? 1 : 0 }}
            muted
            loop
            playsInline
          />
        ))}
        <span className="vpanel__veil" />
      </div>
    </div>
  );
}
