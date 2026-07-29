import Link from 'next/link';
import Lines from './Lines';
import Reveal from './Reveal';
import { Action } from './Sections';
import { Ambient } from './Media';
import HeroReel from './HeroReel';
import { home } from '@/lib/content';
import { byId, stillSrc } from '@/lib/media';

/**
 * HERO DARK — centred stage.
 *
 * A port of the centred dark hero pattern into the house style: same
 * composition (badge → split headline → standfirst → action → framed plate
 * below the fold line), but every value comes from tokens.css, the type is the
 * brand's display face rather than a UI sans, and the glow is sand rather than
 * violet. The gradient falls on the second line only — the phrase that carries
 * the promise — so the colour is doing work rather than decorating.
 *
 * The reference put a product screenshot in the frame. There is no product
 * here, so the frame holds the same photography the rest of the site uses and
 * fades out at the bottom edge.
 */
export default function HeroDark({
  badge = home.kicker,
  badgeHref = '/about',
  lead = 'Marketing systems that turn',
  accent = 'spend into revenue.',
  standfirst = home.standfirst,
  // Off by default now the reel carries the hero. A framed still sitting on
  // top of full-bleed moving footage is two focal points fighting, and the
  // still loses. Pass a clip id to bring it back.
  plate = null,
}) {
  const clip = plate ? byId(plate) : null;

  return (
    <section
      className="hero-dark on-dark has-ambient"
      data-chapter="Home"
      data-tone="dark"
    >
      {/* Four clips crossfading as the reader scrolls the hero. */}
      <HeroReel />
      {/* Sand light behind the type — the reference's radial glow, in palette. */}
      <div className="hero-dark__glow" aria-hidden="true" />
      <Ambient clip="butterflies" opacity={0.2} blur={20} />

      <div className="shell hero-dark__body">
        <Reveal className="hero-dark__badge-wrap" delay={120}>
          <Link href={badgeHref} className="hero-dark__badge">
            <span className="label">{badge}</span>
            <span className="hero-dark__badge-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </Reveal>

        <Lines
          as="h1"
          className="display display--xl hero-dark__title"
          delay={280}
          stagger={140}
          lines={[
            lead,
            <span className="hero-dark__accent" key="accent">
              {accent}
            </span>,
          ]}
        />

        <Reveal className="lede hero-dark__standfirst" delay={900}>
          {standfirst}
        </Reveal>

        <Reveal className="hero-dark__actions" delay={1020}>
          <span className="hero-dark__cta">
            <Action href="/contact">Book a strategy call</Action>
          </span>
          <Action href="/services" variant="btn--ghost">
            See the system
          </Action>
        </Reveal>
      </div>

      {/* The framed plate. Hairline, sand bloom, and a fade at the bottom so it
          reads as continuing past the fold rather than stopping dead. */}
      {clip && (
        <Reveal className="hero-dark__plate" delay={1180}>
          <div className="hero-dark__frame">
            <img
              className="hero-dark__frame-media"
              src={stillSrc(clip.id)}
              alt={clip.alt}
              fetchPriority="high"
            />
          </div>
        </Reveal>
      )}
    </section>
  );
}
