import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import HeroDark from '@/components/HeroDark';
import SystemDiagram from '@/components/SystemDiagram';
import Collage from '@/components/Collage';
import Words from '@/components/Words';
import VideoPanel from '@/components/VideoPanel';
import { Ambient, MediaPlate } from '@/components/Media';
import VideoBand from '@/components/VideoBand';
import {
  Action,
  CtaBand,
  DrawRule,
  Ledger,
  SectionHead,
  Sectors,
} from '@/components/Sections';
import { home } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ----------
           Swap for <HeroFilmHero /> to go back to the left-aligned film stage. */}
      <HeroDark />

      {/* ---------- Thesis ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={home.thesis.chapter}
        data-tone="light"
      >
        <div className="shell">
          {/* The one sentence the whole site argues from, so it gets the
              word-level reveal rather than the line-level one. */}
          <Words
            as="p"
            className="display display--l thesis__quote"
            text={home.thesis.quote}
            stagger={52}
          />
          <div className="thesis__grid">
            <Reveal as="p" className="muted prose" delay={220}>
              {home.intro[0]}
            </Reveal>
            <Reveal as="p" className="lede prose" delay={140}>
              {home.thesis.body}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- The system ----------
           The thesis has just said the parts don't connect. This is where the
           reader watches them connect. Also carries the five parts that used
           to live in the hero rail. */}
      <SystemDiagram />

      {/* ---------- The problem ---------- */}
      <section
        className="band surface-champagne"
        data-chapter={home.problem.chapter}
        data-tone="light"
        data-panel-scope
      >
        <div className="shell">
          {/* Vertical film left, the argument right. The panel is sticky, so
              the first clip hands over to the second as the reader works down
              the comparison rather than after they have left it. */}
          <div className="panel-grid">
            <VideoPanel />
            <div>
          <SectionHead
            eyebrow={home.problem.eyebrow}
            title={home.problem.title}
            wide
          />

          <div className="compare">
            {home.problem.columns.map((col) => (
              <div
                className={`compare__col compare__col--${col.tone} ${
                  col.tone === 'after' ? 'on-dark' : ''
                }`}
                key={col.label}
              >
                <Reveal as="p" className="label compare__label">
                  {col.label}
                </Reveal>
                <ul className="compare__list">
                  {col.items.map((item, i) => (
                    <Reveal as="li" className="compare__item" key={item} delay={i * 80}>
                      {item}
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Reveal as="p" className="lede compare__close">
            {home.problem.close}
          </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Interlude ---------- */}
      <VideoBand
        clip="band-city"
        height="tall"
        chapter="The market"
        label="Dubai · United Arab Emirates"
        title="A market that rewards brands built to be measured."
        caption="Downtown Dubai"
      />

      {/* ---------- What you get ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={home.offer.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={home.offer.eyebrow} title={home.offer.title} />
          <Ledger items={home.offer.items} numbered />
          <Reveal delay={160} style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <Action href="/services" variant="btn--ghost">
              Every service in detail
            </Action>
          </Reveal>
        </div>
      </section>

      {/* ---------- The proof ---------- */}
      <section
        className="band surface-black on-dark has-ambient"
        data-chapter={home.proof.chapter}
        data-tone="dark"
      >
        {/* Fine warm dust behind the revenue figure — depth, not decoration. */}
        <Ambient clip="galaxy" opacity={0.26} blur={4} />
        <div className="shell">
          <Reveal as="p" className="label" style={{ color: 'var(--sand)' }}>
            {home.proof.eyebrow}
          </Reveal>

          <div className="figure" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <Reveal delay={80}>
              <p className="figure__value">
                <span className="figure__unit">{home.proof.figure.unit}</span>
                <Counter
                  value={home.proof.figure.value}
                  suffix={home.proof.figure.suffix}
                />
              </p>
              <span className="label figure__label">{home.proof.figureLabel}</span>
              <DrawRule delay={520} />
            </Reveal>
            <Reveal className="figure__note" delay={220}>
              {home.proof.figureNote}
            </Reveal>
          </div>

          <div
            className="steps steps--2"
            style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}
          >
            {home.proof.points.map((point, i) => (
              <Reveal className="step" key={point} delay={i * 100}>
                <p className="step__name" style={{ fontSize: '1.25rem' }}>
                  {point}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Founder-led ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={home.founderLed.chapter}
        data-tone="light"
      >
        <div className="shell">
          <Reveal as="p" className="label shead__eyebrow">
            {home.founderLed.eyebrow}
          </Reveal>
          <div
            className="split split--wide"
            style={{ marginTop: 'clamp(1.75rem, 3.5vw, 2.75rem)', alignItems: 'center' }}
          >
            <div>
              <Reveal as="h2" className="display display--m" style={{ maxWidth: '18ch' }}>
                {home.founderLed.title}
              </Reveal>
              <Reveal
                className="lede prose"
                delay={120}
                style={{ marginTop: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--ink-72)' }}
              >
                {home.founderLed.body}
              </Reveal>
              <Reveal delay={200} style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
                <Action href="/about" variant="btn--ghost">
                  How I work
                </Action>
              </Reveal>
            </div>
            <MediaPlate clip="figure" caption="Dubai Marina" />
          </div>
        </div>
      </section>

      {/* ---------- Interlude ----------
           Was a single full-bleed desert plate. Now a collage, so the same
           slot carries four photographs at four depths rather than one held
           long enough to be recognised. */}
      <Collage />

      {/* ---------- Who this is for ---------- */}
      <section
        className="band surface-champagne"
        data-chapter={home.audience.chapter}
        data-tone="light"
      >
        <div className="shell">
          <div className="split split--aside">
            <Reveal as="p" className="label shead__eyebrow">
              {home.audience.eyebrow}
            </Reveal>
            <div className="stack">
              <Reveal as="h2" className="display display--m" style={{ maxWidth: '24ch' }}>
                {home.audience.title}
              </Reveal>
              <Sectors items={home.audience.sectors} />
              <Reveal as="p" className="muted" delay={140}>
                {home.audience.note}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
