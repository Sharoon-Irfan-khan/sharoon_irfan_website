'use client';

import { useEffect, useRef, useState } from 'react';
import { ambient, byId, heroClips, pickIndex, stillSrc } from '@/lib/media';
import { useInView } from './Reveal';
import useParallax from './useParallax';
import { playSafe } from '@/lib/video';

/**
 * AMBIENT — a light layer over a dark section.
 *
 * Screen-blended, so the source's black background disappears and only the
 * moving light lands on the page. Sits behind everything and is always
 * decorative, so it is hidden from assistive tech and dropped entirely when
 * reduced motion is requested.
 */
export function Ambient({ clip = 'butterflies', opacity = 0.5, blur = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShow(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '20% 0px 20% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) playSafe(el);
    else el.pause();
  }, [inView]);

  if (!show) return null;

  return (
    <div
      className="ambient"
      style={{ '--ambient-opacity': opacity, '--ambient-blur': `${blur}px` }}
      aria-hidden="true"
    >
      <video ref={ref} src={ambient[clip]} preload="none" muted loop playsInline />
    </div>
  );
}

/**
 * HERO FILM — the home page's opening stage.
 *
 * A different photograph on each visit, drifting slowly across the frame. The
 * motion is what a video was doing before; the difference is that every pixel
 * here is real rather than upscaled from 360p.
 */
export function HeroFilm({ seed = 0, fixed }) {
  const [index, setIndex] = useState(seed);
  const { outer, inner } = useParallax(0.1);
  const clip = fixed ? byId(fixed) : heroClips[index];

  // A `fixed` clip opts out of the rotation. Drop the prop to let the home page
  // open on a different photograph each visit again.
  useEffect(() => {
    if (!fixed) setIndex(pickIndex(seed));
  }, [seed, fixed]);

  // The `video` branch and its hero-sand.mp4 are gone. That clip was cut from
  // unlicensed footage, and nothing rendered it once the home page moved to
  // HeroDark's reel. This falls back to the rotating stills, which is what
  // HeroFilm did without the prop anyway.
  return (
    <div className="film" ref={outer} aria-hidden="true">
      <div className="film__inner" ref={inner}>
        <img
          key={clip.id}
          className="film__media film__media--drift"
          src={stillSrc(clip.id)}
          alt=""
          fetchPriority="high"
        />
      </div>
      <span className="film__veil film__veil--hero" />
    </div>
  );
}

/**
 * A looping clip behind an inner-page hero.
 *
 * The moving counterpart to HeroStill, sharing its parallax and its hero veil,
 * so the two are interchangeable and a page can be switched back to a still
 * without touching anything else.
 *
 * preload is "auto" here rather than "none" as in VideoBand: this is the first
 * thing on the page and the largest paint, so waiting for an observer would
 * show the poster and then swap. The poster still covers the gap while it
 * arrives, and reduced motion never starts it at all — the poster becomes the
 * finished state.
 */
export function HeroFilmVideo({ clip, poster }) {
  const { outer, inner } = useParallax(0.12);
  const video = useRef(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playSafe(el);
        else el.pause();
      },
      { rootMargin: '20% 0px 20% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="film" ref={outer} aria-hidden="true">
      <div className="film__inner" ref={inner}>
        <video
          ref={video}
          className="film__media"
          src={`/video/${clip}.mp4`}
          poster={`/video/${poster || clip}.jpg`}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <span className="film__veil film__veil--hero" />
    </div>
  );
}

/** A still behind an inner-page hero. Same slow drift, one register quieter. */
export function HeroStill({ clip: clipId }) {
  const { outer, inner } = useParallax(0.12);
  const clip = byId(clipId);

  return (
    <div className="film" ref={outer} aria-hidden="true">
      <div className="film__inner" ref={inner}>
        <img
          className="film__media film__media--drift"
          src={stillSrc(clip.id)}
          alt=""
          fetchPriority="high"
        />
      </div>
      <span className="film__veil film__veil--hero" />
    </div>
  );
}

/**
 * MEDIA BAND — a full-bleed interlude between sections.
 *
 * Reveals with a clip-path wipe, then drifts against the scroll. Optional text
 * sits on top; when there is none the band is a breath between arguments.
 */
export function MediaBand({
  clip: clipId,
  height = 'mid',
  label,
  title,
  chapter,
  align = 'end',
  drift = true,
}) {
  const clip = byId(clipId);
  const reveal = useInView({ threshold: 0.08 });
  const { outer, inner } = useParallax(0.2);

  return (
    <section
      className={`band-media band-media--${height} band-media--${align}`}
      data-chapter={chapter}
      data-tone="dark"
      ref={reveal}
    >
      <div className="band-media__frame" ref={outer}>
        <div className="film__inner" ref={inner}>
          <img
            className={`film__media ${drift ? 'film__media--drift' : ''}`}
            src={stillSrc(clip.id)}
            alt={clip.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="film__veil" />
      </div>

      {(title || label) && (
        <div className="band-media__body on-dark">
          <div className="shell">
            {label && <p className="label band-media__label">{label}</p>}
            {title && <p className="display display--m band-media__title">{title}</p>}
          </div>
        </div>
      )}

      <span className="band-media__caption" aria-hidden="true">
        {clip.caption}
      </span>
    </section>
  );
}

/** A framed still used inside a normal section rather than full bleed. */
export function MediaPlate({ clip: clipId, caption, ratio }) {
  const reveal = useInView({ threshold: 0.1 });
  const { outer, inner } = useParallax(0.13);
  const clip = byId(clipId);

  return (
    <figure className="plate" ref={reveal}>
      <div
        className="plate__frame"
        ref={outer}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <div className="film__inner" ref={inner}>
          <img
            className="film__media"
            src={stillSrc(clip.id)}
            alt={clip.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      {caption && <figcaption className="label plate__caption">{caption}</figcaption>}
    </figure>
  );
}
