'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useScrollProgress from './useScrollProgress';
import { playSafe } from '@/lib/video';

/**
 * HERO REEL — four clips crossfading on scroll.
 *
 * A note on the technique, because there are two ways to do this and only one
 * of them is safe. The showy version scrubs a single video's currentTime to
 * scroll position; it needs a densely-keyframed re-encode, it stutters badly
 * on Safari and mid-range Android, and it fights the smooth-scroll layer.
 * This is the robust version: separate clips, each owning a slice of the
 * scroll, crossfading between them. It reads almost identically and it holds
 * up on a phone.
 *
 * Opacity is written from JS rather than CSS because the natural expression —
 * `1 - abs(p - centre) / width` — needs CSS abs(), which is too new to rely
 * on. Doing the arithmetic here also means the play/pause decision and the
 * fade come from the same number.
 *
 * Only the front clip plays. Four simultaneously decoding h264 streams is a
 * real cost on battery and on low-end hardware, and three of them would be
 * invisible.
 *
 * ORIENTATION. Every clip ships twice: a landscape encode and a portrait one
 * cropped from the same source. A phone given the landscape file throws away
 * most of each frame to object-fit: cover, which is why so much stock video
 * looks worse on mobile than it is.
 *
 * The selection is done in JS rather than with <source media="...">, because
 * that attribute is only consulted during the initial resource selection and
 * browsers disagree about honouring it inside <video> at all. Every clip
 * therefore starts at preload="none" — nothing is fetched until the media
 * query has resolved, so a phone never downloads a landscape file it is about
 * to discard.
 */

const REEL = [
  { id: 'reel-skyline', alt: 'The Dubai skyline at golden hour' },
  { id: 'reel-sunset', alt: 'Sunset over Dubai, cloud breaking open' },
  { id: 'reel-desert', alt: 'A woman walking the dunes at sunset' },
];

/* The reel is sticky and one viewport tall, so its own box has no scroll
   travel. The range that matters is the hero section it sticks inside. */
const toSection = (el) => el.closest('.hero-dark') || el.parentElement;

/** Phones and small tablets get the portrait cut. */
const PORTRAIT_QUERY = '(max-width: 760px)';

export default function HeroReel({ clips = REEL }) {
  const els = useRef([]);
  const active = useRef(-1);

  // null until the media query has been read on the client. Rendering the
  // landscape src as a placeholder is fine only because preload is "none" —
  // the file is named but never fetched.
  const [portrait, setPortrait] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY);
    const apply = () => setPortrait(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Once the orientation is known, kick the opening clip. preload is handled
  // declaratively below; load() is still explicit because changing the src
  // attribute is not reliably enough on its own to restart fetching.
  useEffect(() => {
    if (portrait === null) return;
    active.current = -1;
    const first = els.current[0];
    if (!first) return;
    first.load();
    playSafe(first);
  }, [portrait]);

  const onProgress = useCallback(
    (p) => {
      // A stack, not a set of independent fades.
      //
      // The obvious approach — give every clip an opacity that peaks at its
      // own centre and falls away either side — dips to black between clips,
      // because at the crossover point BOTH neighbours are part-transparent
      // and the background shows through. With three clips that dip is about
      // 35%, which is a visible flash.
      //
      // Instead the first clip is an opaque base that never fades, and each
      // later clip fades in over the one beneath it. Something is always
      // fully opaque, so there is no way for the background to show.
      const last = clips.length - 1;
      const step = last === 0 ? 1 : 1 / last;
      let best = 0;

      clips.forEach((_, i) => {
        const opacity =
          i === 0 ? 1 : Math.max(0, Math.min(1, (p - (i - 1) * step) / step));

        const el = els.current[i];
        if (el) el.style.opacity = String(opacity);

        // The front clip is the topmost one that has covered its predecessor.
        if (opacity >= 0.5) best = i;
      });

      // Only touch playback when the front clip actually changes. play() and
      // pause() are not free, and this callback can run on any frame.
      if (best !== active.current) {
        els.current.forEach((el, i) => {
          if (!el) return;
          if (i === best) playSafe(el);
          else el.pause();
        });

        // Warm the next clip so it has something decoded by the time it fades
        // up. Without this the reader crosses into a poster frame and the
        // motion only starts a beat later.
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

  // 'self' rather than the default, because the hero starts at the top of the
  // page: progress has to read 0 at scroll zero so the reader opens on the
  // first clip rather than a third of the way into the sequence.
  const ref = useScrollProgress({ mode: 'self', measure: toSection, onProgress });

  return (
    <div className="reel" ref={ref} aria-hidden="true">
      {clips.map((clip, i) => (
        <video
          key={clip.id}
          className="reel__clip"
          ref={(el) => {
            els.current[i] = el;
          }}
          src={`/video/${clip.id}${portrait ? '-p' : ''}.mp4`}
          poster={`/video/${clip.id}${portrait ? '-p' : ''}.jpg`}
          // Declarative, not imperative. Setting this from the effect alone
          // does not survive: React re-applies the JSX value on the next
          // render and puts it straight back to "none", so the opening clip
          // never starts fetching.
          //
          // "none" until the orientation is known, so nothing is fetched in
          // the wrong aspect ratio; then the opening clip goes to "auto" and
          // the rest are warmed as the reader approaches them.
          preload={portrait !== null && i === 0 ? 'auto' : 'none'}
          style={{ opacity: i === 0 ? 1 : 0 }}
          muted
          loop
          playsInline
        />
      ))}
      <span className="reel__veil" />
    </div>
  );
}
