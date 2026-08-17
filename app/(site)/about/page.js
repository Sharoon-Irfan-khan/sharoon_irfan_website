import './about.css';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';
import { SectionHead, Action, DrawRule, Steps } from '@/components/Sections';
import { site } from '@/lib/site';
import {
  hero,
  positioning,
  whatIDo,
  evolution,
  expertise,
  philosophy,
  founder,
  finalCta,
} from '@/lib/about-content';

/**
 * /about — the personal brand story. A standalone route, built from the same
 * primitives the homepage uses (Reveal, Words, SectionHead, Action, Steps,
 * the .display/.label/.shell/.band type and layout system in base.css) so it
 * reads as the same site rather than an imported page. New composition-only
 * classes are prefixed .ap- (about.css) — nothing here touches the
 * homepage's own .about section, which is a different block entirely and is
 * untouched.
 */

export const metadata = {
  // The root layout's title template appends " — Sharoon Irfan"; this page's
  // title is a full standalone string, so it's set as absolute to bypass
  // that and print exactly as specified.
  title: {
    absolute: 'Sharoon Irfan — Founder of SHARIO | Revenue Marketing Architect',
  },
  description:
    'Sharoon Irfan, founder of SHARIO — a performance marketer and digital growth strategist building marketing systems that connect strategy, performance, and revenue.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Sharoon Irfan — Founder of SHARIO | Revenue Marketing Architect',
    description:
      'Sharoon Irfan, founder of SHARIO — a performance marketer and digital growth strategist building marketing systems that connect strategy, performance, and revenue.',
    url: '/about',
    type: 'profile',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <header
        className="ap-hero surface-champagne"
        data-chapter={hero.chapter}
        data-tone="light"
      >
        <div className="shell ap-hero__inner">
          <div>
            <Reveal as="p" className="label ap-hero__kicker">
              About
            </Reveal>
            <Reveal as="h1" className="display display--xl ap-hero__name" delay={100}>
              {hero.name}
            </Reveal>
            <Reveal as="p" className="hero__role ap-hero__role" delay={220}>
              {hero.role}
            </Reveal>
          </div>

          <DrawRule className="ap-hero__rule" delay={420} />

          <div className="ap-hero__row">
            <Reveal className="ap-hero__portrait" delay={340}>
              <Image
                src={hero.portrait}
                alt={hero.name}
                fill
                sizes="(max-width: 900px) 60vw, 34vw"
                priority
              />
            </Reveal>

            <div className="ap-hero__story">
              {hero.standfirst.map((p, i) => (
                <Reveal as="p" className="ap-hero__p" key={i} delay={480 + i * 90}>
                  {p}
                </Reveal>
              ))}
              <Reveal className="ap-hero__cta" delay={480 + hero.standfirst.length * 90 + 60}>
                <Action href={hero.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </Action>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* ================= PROFESSIONAL POSITIONING ================= */}
      <section
        className="band band--seam surface-ivory"
        data-chapter={positioning.chapter}
        data-tone="light"
      >
        <div className="shell ap-position__grid">
          <SectionHead eyebrow={positioning.eyebrow} title={positioning.title} wide>
            <div className="ap-position__body">
              <Reveal as="p" className="ap-position__lead" delay={140}>
                {positioning.lead}
              </Reveal>
              {positioning.body.map((p, i) => (
                <Reveal as="p" key={i} delay={200 + i * 80}>
                  {p}
                </Reveal>
              ))}
              <Reveal as="p" className="ap-position__span" delay={360}>
                {positioning.span}
              </Reveal>
            </div>
          </SectionHead>

          <Reveal className="ap-position__figure" delay={200}>
            <p className="figure__value">
              <span className="figure__unit">{positioning.figure.unit}</span>
              {positioning.figure.value}
              <span>{positioning.figure.suffix}</span>
            </p>
            <span className="figure__label">{positioning.figure.label}</span>
          </Reveal>
        </div>
      </section>

      {/* ================= WHAT I DO ================= */}
      <section
        className="band band--seam surface-linen"
        data-chapter={whatIDo.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={whatIDo.eyebrow} title={whatIDo.title}>
            <Reveal as="p" className="ap-do__lead" delay={140}>
              {whatIDo.lead}
            </Reveal>
          </SectionHead>

          <div className="ap-do__list">
            {whatIDo.items.map((name, i) => {
              const isLast = i === whatIDo.items.length - 1;
              const oddCount = whatIDo.items.length % 2 === 1;
              return (
                <Reveal
                  as="div"
                  className={`ap-do__row ${isLast && oddCount ? 'ap-do__row--full' : ''}`}
                  key={name}
                  delay={i * 60}
                >
                  <span className="ap-do__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="ap-do__name">{name}</h3>
                </Reveal>
              );
            })}
          </div>

          <Reveal as="p" className="label ap-do__platforms" delay={whatIDo.items.length * 60 + 80}>
            {whatIDo.platforms}
          </Reveal>
        </div>
      </section>

      {/* ================= CAREER EVOLUTION ================= */}
      <section
        className="band band--seam surface-black on-dark"
        data-chapter={evolution.chapter}
        data-tone="dark"
      >
        <div className="shell">
          <SectionHead eyebrow={evolution.eyebrow} title={evolution.title} />

          <Reveal as="p" className="ap-evolution__chain">
            {evolution.stages.join(' → ')}
          </Reveal>

          <div className="ap-evolution">
            <Steps
              steps={evolution.stages.map((name) => ({ name, detail: '' }))}
              columns={5}
            />
          </div>

          <Reveal as="p" className="ap-evolution__body" delay={evolution.stages.length * 90 + 120}>
            {evolution.body}
          </Reveal>
        </div>
      </section>

      {/* ================= AREAS OF EXPERTISE ================= */}
      <section
        className="band band--seam surface-champagne"
        data-chapter={expertise.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={expertise.eyebrow} title={expertise.title} />
          <Reveal>
            <p className="ap-expertise__list">
              {expertise.items.map((term) => (
                <span className="ap-expertise__term" key={term}>
                  {term}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= WORKING PHILOSOPHY ================= */}
      <section
        className="band band--seam surface-ivory ap-philosophy"
        data-chapter={philosophy.chapter}
        data-tone="light"
      >
        <div className="shell ap-philosophy__inner">
          <Words
            as="h2"
            className="display display--l ap-philosophy__title"
            text={philosophy.title}
          />
          <div className="ap-philosophy__body">
            {philosophy.body.map((p, i) => (
              <Reveal as="p" key={i} delay={160 + i * 100}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOUNDER OF SHARIO ================= */}
      <section
        className="band band--seam surface-linen"
        data-chapter={founder.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={founder.eyebrow} title={founder.title}>
            <Reveal as="p" className="ap-founder__body" delay={140}>
              {founder.body}
            </Reveal>
            <Reveal delay={220}>
              <a
                className="tlink ap-founder__link"
                href={founder.href}
                target="_blank"
                rel="noreferrer"
              >
                {founder.label} →
              </a>
            </Reveal>
          </SectionHead>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section
        className="band cta on-dark ap-final"
        data-chapter={finalCta.chapter}
        data-tone="dark"
      >
        <div className="shell cta__inner">
          <div>
            <Reveal as="h2" className="display display--l cta__title">
              {finalCta.title[0]}
              <br />
              {finalCta.title[1]}
            </Reveal>
            <Reveal as="p" className="cta__body" delay={120}>
              {finalCta.body}
            </Reveal>
          </div>
          <Reveal delay={220}>
            <Action href="/#contact">{finalCta.action}</Action>
          </Reveal>
        </div>
      </section>
    </>
  );
}
