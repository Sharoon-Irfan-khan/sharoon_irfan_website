import Reveal from '@/components/Reveal';
import ProofFigure from '@/components/ProofFigure';
import VideoBand from '@/components/VideoBand';
import {
  CtaBand,
  PageHero,
  SectionHead,
  Sectors,
  Steps,
} from '@/components/Sections';
import { results } from '@/lib/content';

export const metadata = {
  title: 'Results',
  description:
    'AED 35M+ in attributed revenue, predictable pipeline, efficient cost per lead and compounding organic authority — built through a repeatable method rather than luck.',
};

export default function ResultsPage() {
  const { headline: figure } = results.delivers;

  return (
    <>
      <PageHero
        eyebrow={results.eyebrow}
        headline={results.headline}
        standfirst={results.standfirst}
        chapter="Results"
        video="band-desk"
      />

      {/* ---------- The number ----------
           A pinned instrument rather than a printed figure: the number counts
           to the scroll, an axis draws under it, and the outcomes read in one
           at a time in what used to be half a screen of empty black. */}
      <ProofFigure
        chapter={results.delivers.chapter}
        eyebrow={results.delivers.eyebrow}
        figure={figure}
        items={results.delivers.items}
      />

      {/* ---------- The method ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={results.method.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={results.method.eyebrow} title={results.method.title} />
          <Steps steps={results.method.steps} columns={4} numbered />
        </div>
      </section>

      {/* ---------- Interlude ---------- */}
      <VideoBand
        clip="band-dusk"
        height="mid"
        chapter="The record"
        align="center"
        caption="Business Bay"
      />

      {/* ---------- Why it repeats ---------- */}
      <section
        className="band surface-champagne"
        data-chapter={results.repeat.chapter}
        data-tone="light"
      >
        <div className="shell">
          <Reveal as="p" className="label shead__eyebrow" style={{ marginBottom: '2rem' }}>
            {results.repeat.eyebrow}
          </Reveal>
          <Reveal as="p" className="display display--l thesis__quote" delay={90}>
            {results.repeat.quote}
          </Reveal>
          <div className="thesis__grid">
            <Reveal className="lede prose" delay={180}>
              {results.repeat.body}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Where the work lands ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={results.lands.chapter}
        data-tone="light"
      >
        <div className="shell">
          <div className="split split--aside">
            <Reveal as="p" className="label shead__eyebrow">
              {results.lands.eyebrow}
            </Reveal>
            <div className="stack">
              <Sectors items={results.lands.sectors} />
              <Reveal as="p" className="lede prose" delay={140} style={{ color: 'var(--ink-72)' }}>
                {results.lands.note}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
