import Reveal from '@/components/Reveal';
import VideoBand from '@/components/VideoBand';
import { Action, CtaBand, PageHero, SectionHead, Steps } from '@/components/Sections';
import { about } from '@/lib/content';

export const metadata = {
  title: 'About',
  description:
    'Founder-led marketing built on one belief: marketing earns its budget when it produces revenue. The method, the standard, and what founder-led means in practice.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        headline={about.headline}
        standfirst={about.standfirst}
        intro={about.intro}
        chapter="About"
        video="band-aerial"
      />

      {/* ---------- How marketing should work ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={about.howItWorks.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={about.howItWorks.eyebrow} title={about.howItWorks.title} wide />
          <div className="split split--wide">
            {about.howItWorks.body.map((para, i) => (
              <Reveal as="p" className="lede prose" key={i} delay={i * 120}>
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Interlude ---------- */}
      <VideoBand
        clip="band-dunes"
        height="mid"
        chapter="Where I work"
        label="Based in Dubai"
        title="Working with founders across the UAE."
        caption="The Empty Quarter"
      />

      {/* ---------- The method ---------- */}
      <section
        className="band surface-champagne"
        data-chapter={about.method.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={about.method.eyebrow} title={about.method.title} />
          <Steps steps={about.method.steps} columns={4} numbered />
        </div>
      </section>

      {/* ---------- What founder-led means ---------- */}
      <section
        className="band surface-black on-dark"
        data-chapter={about.founderLed.chapter}
        data-tone="dark"
      >
        <div className="shell">
          <div className="split split--aside">
            <Reveal as="p" className="label shead__eyebrow">
              {about.founderLed.eyebrow}
            </Reveal>
            <ul className="compare__list" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {about.founderLed.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={i * 90}
                  className="compare__item"
                  style={{
                    borderColor: 'var(--rule-light-soft)',
                    color: 'var(--paper)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.15rem, 2vw, 1.6rem)',
                    lineHeight: 1.32,
                    paddingBlock: 'clamp(1.1rem, 2.2vw, 1.6rem)',
                  }}
                >
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- What drives me ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={about.drive.chapter}
        data-tone="light"
      >
        <div className="shell">
          <Reveal as="p" className="label shead__eyebrow" style={{ marginBottom: '2rem' }}>
            {about.drive.eyebrow}
          </Reveal>
          <Reveal as="p" className="display display--l thesis__quote" delay={90}>
            {about.drive.quote}
          </Reveal>
          <div className="thesis__grid">
            <Reveal className="lede prose" delay={180}>
              {about.drive.body}
            </Reveal>
          </div>
          <Reveal delay={260} style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <Action href="/results" variant="btn--ghost">
              See the results
            </Action>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
