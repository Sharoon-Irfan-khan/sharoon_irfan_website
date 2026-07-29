import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Lines from '@/components/Lines';
import Words from '@/components/Words';
import SystemDiagram from '@/components/SystemDiagram';
import ServiceList from '@/components/ServiceList';
import ScaleStack from '@/components/ScaleStack';
import ProofFigure from '@/components/ProofFigure';
import ContactForm from '@/components/ContactForm';
import { about, contact, problem, results, services, system } from '@/lib/content';
import { site } from '@/lib/site';

/**
 * ONE PAGE, SIX BEATS.
 *
 * Name → problem → what I do → proof → why founder-led → ask.
 *
 * The page used to run eleven sections deep, and several of them argued the
 * same point twice: a thesis that restated the problem, a "what you get"
 * ledger that restated the system diagram, a method section, an audience
 * section, and an about section of four essays. All of it is gone. What is
 * left says each thing once and moves on — a portfolio reads in a minute or it
 * does not read at all.
 *
 * Section ids are the nav's scroll targets — see `sections` in lib/content.
 */
export default function Page() {
  return (
    <>
      <Hero />

      {/* ---------- The problem ----------
           A claim and four short symptoms. No before/after table: the "after"
           column was the next two sections saying it better.

           The section holds still while the strip of photographs slides in
           from the right and the row builds itself, then releases into the
           symptoms. The statement is what the reader is pinned with. */}
      <section
        className="band surface-champagne"
        data-chapter={problem.chapter}
        data-tone="light"
      >
        <div className="shell">
          <ScaleStack>
            <Reveal as="p" className="label shead__eyebrow">
              {problem.eyebrow}
            </Reveal>
            <Words
              as="p"
              className="display display--l thesis__quote problem__quote"
              text={problem.quote}
              stagger={52}
            />
          </ScaleStack>

          <ul className="symptoms">
            {problem.items.map((item, i) => (
              <Reveal as="li" className="symptoms__item" key={item} delay={i * 90}>
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- What I do ----------
           Drawn, not written. Five nodes converging on one number carries the
           argument, so the section under it is the service list itself. */}
      <div id="system">
        <SystemDiagram eyebrow={system.eyebrow} title={system.title} />
      </div>

      {/* ---------- The services ---------- */}
      <section
        className="band surface-champagne"
        id="services"
        data-chapter={services.chapter}
        data-tone="light"
      >
        <ServiceList items={services.items} />
      </section>

      {/* ---------- Results ---------- */}
      <div id="results">
        <ProofFigure
          chapter={results.chapter}
          eyebrow={results.eyebrow}
          figure={results.figure}
          items={results.items}
        />
      </div>

      {/* ---------- Why founder-led ----------
           Two sentences. It is a promise, not a biography. */}
      <section
        className="band surface-linen"
        id="about"
        data-chapter={about.chapter}
        data-tone="light"
      >
        <div className="shell">
          <Reveal as="p" className="label shead__eyebrow">
            {about.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            className="display display--l"
            delay={80}
            style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: '22ch' }}
          >
            {about.title}
          </Reveal>
          <Reveal
            as="p"
            className="lede prose"
            delay={200}
            style={{ marginTop: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--ink-72)' }}
          >
            {about.body}
          </Reveal>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section
        className="band surface-linen contact"
        id="contact"
        data-chapter={contact.chapter}
        data-tone="light"
      >
        <div className="shell">
          <Reveal as="p" className="label shead__eyebrow">
            {contact.eyebrow}
          </Reveal>
          <Lines lines={contact.headline} as="h2" className="display display--l" delay={80} />

          <div className="split split--wide" style={{ marginTop: 'clamp(3.5rem, 7vw, 6rem)' }}>
            <div>
              <Reveal as="p" className="lede prose" delay={200} style={{ maxWidth: '26ch' }}>
                {contact.callBody}
              </Reveal>

              <div className="cta__contacts" style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                <a className="tlink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <a className="tlink" href={`tel:${site.phoneHref}`}>
                  {site.phone}
                </a>
                <a className="tlink" href={site.linkedin} target="_blank" rel="noreferrer">
                  {site.linkedinLabel}
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
