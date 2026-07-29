import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Lines from '@/components/Lines';
import Words from '@/components/Words';
import SystemDiagram from '@/components/SystemDiagram';
import ServiceList from '@/components/ServiceList';
import ScaleStack from '@/components/ScaleStack';
import ProofFigure from '@/components/ProofFigure';
import ContactForm from '@/components/ContactForm';
import Accordion from '@/components/Accordion';
import { Plate } from '@/components/Media';
import { Action, Ledger, SectionHead, Sectors, Steps } from '@/components/Sections';
import {
  about,
  audience,
  contact,
  method,
  problem,
  results,
  services,
  system,
  thesis,
} from '@/lib/content';
import { site } from '@/lib/site';

/**
 * ONE PAGE.
 *
 * Home, about, services, results and contact were five thin routes for a solo
 * practice. They are one document now, in the order a reader needs: the claim,
 * why it matters, the system, the services, the proof, the person, the ask.
 *
 * Section ids are the nav's scroll targets — see `sections` in lib/content.
 */
export default function Page() {
  return (
    <>
      <Hero />

      {/* ---------- Thesis ---------- */}
      <section className="band surface-ivory" data-chapter={thesis.chapter} data-tone="light">
        <div className="shell">
          <Words
            as="p"
            className="display display--l thesis__quote"
            text={thesis.quote}
            stagger={52}
          />
          <div className="thesis__grid">
            {thesis.body.map((para, i) => (
              <Reveal as="p" className={i ? 'lede prose' : 'muted prose'} key={i} delay={i * 120}>
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The problem ---------- */}
      <section
        className="band surface-champagne"
        data-chapter={problem.chapter}
        data-tone="light"
      >
        <div className="shell">
          {/* The section holds while the four frames slide in from the right
              and build the row, then releases and carries on. */}
          <ScaleStack>
            <SectionHead eyebrow={problem.eyebrow} title={problem.title} wide />
          </ScaleStack>

          <div className="compare">
            {problem.columns.map((col) => (
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
            {problem.close}
          </Reveal>
        </div>
      </section>

      {/* ---------- The system ----------
           The thesis has just said the parts don't connect. This is where the
           reader watches them connect. */}
      <div id="system">
        <SystemDiagram eyebrow={system.eyebrow} title={system.title} />
      </div>

      {/* ---------- What you get ---------- */}
      <section className="band surface-ivory" data-chapter="What you get" data-tone="light">
        <div className="shell">
          <SectionHead eyebrow={system.eyebrow} title={system.title} />
          <Ledger items={system.items} numbered />
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section
        className="band surface-champagne"
        id="services"
        data-chapter={services.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={services.eyebrow} title={services.title} wide>
            <Reveal as="p" className="lede prose" delay={160} style={{ marginTop: '1.5rem' }}>
              {services.intro}
            </Reveal>
          </SectionHead>
        </div>

        <ServiceList items={services.items} />

        <div className="shell">
          <Reveal as="p" className="lede compare__close">
            {services.close}
          </Reveal>
        </div>
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

      {/* ---------- The method ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={method.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead eyebrow={method.eyebrow} title={method.title} />
          <Steps steps={method.steps} columns={4} numbered />

          <div className="split split--wide" style={{ marginTop: 'clamp(3.5rem, 7vw, 6rem)' }}>
            <Plate clip={method.image} caption="The method" />
            <div>
              <Reveal as="p" className="label shead__eyebrow">
                {method.repeat.eyebrow}
              </Reveal>
              <Reveal
                as="p"
                className="display display--m"
                delay={90}
                style={{ marginTop: '1.5rem', maxWidth: '20ch' }}
              >
                {method.repeat.quote}
              </Reveal>
              <Reveal
                as="p"
                className="lede prose"
                delay={180}
                style={{ marginTop: '1.75rem', color: 'var(--ink-72)' }}
              >
                {method.repeat.body}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
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
            style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: '18ch' }}
          >
            {about.title}
          </Reveal>

          <div className="thesis__grid" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {about.body.map((para, i) => (
              <Reveal as="p" className="lede prose" key={i} delay={i * 120}>
                {para}
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(4rem, 8vw, 7rem)' }}>
            <Reveal as="p" className="label shead__eyebrow">
              {about.howItWorks.eyebrow}
            </Reveal>
            <div className="thesis__grid" style={{ marginTop: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              {about.howItWorks.body.map((para, i) => (
                <Reveal as="p" className="prose" key={i} delay={i * 120}>
                  {para}
                </Reveal>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'clamp(4rem, 8vw, 7rem)' }}>
            <div className="split split--aside">
              <Reveal as="p" className="label shead__eyebrow">
                {about.founderLed.eyebrow}
              </Reveal>
              <div className="stack">
                <Reveal as="h3" className="display display--m" style={{ maxWidth: '20ch' }}>
                  {about.founderLed.title}
                </Reveal>
                <Reveal as="p" className="lede prose" delay={120}>
                  {about.founderLed.body}
                </Reveal>
                <ul className="compare__list" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {about.founderLed.items.map((item, i) => (
                    <Reveal as="li" className="compare__item" key={item} delay={i * 90}>
                      {item}
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'clamp(4rem, 8vw, 7rem)' }}>
            <Reveal as="p" className="label shead__eyebrow">
              {about.drive.eyebrow}
            </Reveal>
            <Reveal
              as="p"
              className="display display--m"
              delay={90}
              style={{ marginTop: '1.75rem', maxWidth: '24ch' }}
            >
              {about.drive.quote}
            </Reveal>
            <Reveal as="p" className="lede prose" delay={180} style={{ marginTop: '1.75rem' }}>
              {about.drive.body}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section
        className="band surface-champagne"
        data-chapter={audience.chapter}
        data-tone="light"
      >
        <div className="shell">
          <div className="split split--wide" style={{ alignItems: 'center' }}>
            <div>
              <Reveal as="p" className="label shead__eyebrow">
                {audience.eyebrow}
              </Reveal>
              <Reveal
                as="h2"
                className="display display--m"
                delay={90}
                style={{ marginTop: '1.5rem', maxWidth: '20ch' }}
              >
                {audience.title}
              </Reveal>
              <Sectors items={audience.sectors} />
              <Reveal as="p" className="muted" delay={200} style={{ marginTop: '1.5rem' }}>
                {audience.note}
              </Reveal>
            </div>
            <Plate clip={audience.image} caption="Premium services" />
          </div>
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
          <Lines
            lines={contact.headline}
            as="h2"
            className="display display--l"
            delay={80}
          />
          <Reveal
            as="p"
            className="lede prose"
            delay={320}
            style={{ marginTop: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--ink-72)' }}
          >
            {contact.standfirst}
          </Reveal>

          <div className="split split--wide" style={{ marginTop: 'clamp(3.5rem, 7vw, 6rem)' }}>
            <div>
              <Lines
                lines={contact.callTitle}
                as="h3"
                className="display display--m"
                delay={80}
              />
              <Reveal as="p" className="prose" delay={200} style={{ marginTop: '1.75rem' }}>
                {contact.callBody}
              </Reveal>

              <div style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                <Reveal as="p" className="label shead__eyebrow">
                  {contact.forEyebrow}
                </Reveal>
                <ul className="compare__list" style={{ margin: '1.25rem 0 0', padding: 0, listStyle: 'none' }}>
                  {contact.forItems.map((item, i) => (
                    <Reveal as="li" className="compare__item" key={item} delay={i * 80}>
                      {item}
                    </Reveal>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                <Reveal as="p" className="label shead__eyebrow">
                  {contact.nextEyebrow}
                </Reveal>
                <ul className="compare__list" style={{ margin: '1.25rem 0 0', padding: 0, listStyle: 'none' }}>
                  {contact.nextItems.map((item, i) => (
                    <Reveal as="li" className="compare__item" key={item} delay={i * 80}>
                      {item}
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>

            <ContactForm />
          </div>

          <div style={{ marginTop: 'clamp(4rem, 8vw, 7rem)' }}>
            <Reveal as="p" className="label shead__eyebrow">
              {contact.faqEyebrow}
            </Reveal>
            <div style={{ marginTop: '1.75rem' }}>
              <Accordion items={contact.faq.map((f) => ({ q: f.q, a: f.a }))} />
            </div>
          </div>

          <div className="cta__contacts" style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
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
      </section>
    </>
  );
}
