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
import Image from 'next/image';
import { workSrc } from '@/lib/media';

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

           The claim and the symptoms are one block. They were split for a
           while — the statement rode inside the pinned stage and the four
           lines came after it, which put 2.4 screens of photographs between a
           sentence and the list that explains it. By the time the reader
           reached the symptoms the claim had scrolled away and they read as
           four fragments belonging to nothing.

           So the argument is made in full first, and the photographs build
           underneath it. The stage still pins and the row still assembles one
           frame at a time; it just no longer carries the words. */}
      <section
        className="band surface-champagne"
        data-chapter={problem.chapter}
        data-tone="light"
      >
        <div className="shell">
          <Reveal as="p" className="label shead__eyebrow">
            {problem.eyebrow}
          </Reveal>
          <Words
            as="p"
            className="display display--l thesis__quote problem__quote"
            text={problem.quote}
            stagger={52}
          />

          <ul className="symptoms">
            {problem.items.map((item, i) => (
              <Reveal as="li" className="symptoms__item" key={item} delay={i * 90}>
                {item}
              </Reveal>
            ))}
          </ul>

          <ScaleStack />
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
           Two sentences. It is a promise, not a biography.

           The one dark panel on the page. It was a third light band sitting
           between two others, and the promise at the centre of the pitch read
           as another paragraph. On a photograph it stops and it is looked at.

           The picture carries its own darkness, so the scrim over it is doing
           very little work and the photograph is still legible underneath.

           It is portrait, and that is the reason it is this one. The first
           attempt used `dark-desk`, which is 3:2 — on a phone this panel is
           far taller than it is wide, so a landscape file gets cropped to a
           narrow vertical slice through its middle. What survived was the
           corner of a laptop and two blank cards, which read as grey shapes
           rather than as a desk. A portrait source has the height the panel
           actually asks for. */}
      <section
        className="band about on-dark"
        id="about"
        data-chapter={about.chapter}
        data-tone="dark"
      >
        <div className="about__bg" aria-hidden="true">
          {/* Full bleed, so it is the one image on the page that genuinely
              wants the whole viewport width. */}
          <Image
            src={workSrc('magazine-sofa')}
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
          />
        </div>

        <div className="shell about__inner">
          <Reveal as="p" className="label shead__eyebrow">
            {about.eyebrow}
          </Reveal>
          <Reveal as="h2" className="display display--l about__title" delay={80}>
            {about.title}
          </Reveal>
          <Reveal as="p" className="lede about__body" delay={200}>
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
            {/* The aside carries the form's own padding at the top so the two
                columns start on the same line — see the note in sections.css.
                Its grid gap spaces the copy from the contact links, which is
                why neither carries a margin of its own. */}
            <div className="contact__aside">
              <Reveal as="p" className="lede prose" delay={200} style={{ maxWidth: '26ch' }}>
                {contact.callBody}
              </Reveal>

              <div className="cta__contacts">
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
