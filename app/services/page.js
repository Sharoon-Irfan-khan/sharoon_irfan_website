import Reveal from '@/components/Reveal';
import VideoBand from '@/components/VideoBand';
import { Action, CtaBand, PageHero } from '@/components/Sections';
import { services } from '@/lib/content';
import { slugify } from '@/lib/site';

export const metadata = {
  title: 'Services',
  description:
    'Go-to-market strategy, performance marketing, SEO and content, websites and conversion, CRM and attribution, brand positioning. Engage one area or the entire funnel.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={services.eyebrow}
        headline={services.headline}
        standfirst={services.standfirst}
        intro={services.intro}
        chapter="Services"
        video="band-office"
      />

      <section className="band surface-ivory" data-chapter="The services" data-tone="light">
        <div className="shell">
          {services.items.map((service, i) => (
            <article className="svc" id={slugify(service.name)} key={service.name}>
              <Reveal as="span" className="svc__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </Reveal>

              <Reveal delay={60}>
                <h2 className="display display--s svc__name">{service.name}</h2>
                {service.qualifier && (
                  <span className="svc__qualifier">{service.qualifier}</span>
                )}
                <p className="svc__summary">{service.summary}</p>
              </Reveal>

              <Reveal delay={140}>
                <ul className="svc__deliverables">
                  {service.deliverables.map((d) => (
                    <li className="svc__deliverable" key={d}>
                      {d}
                    </li>
                  ))}
                </ul>

                <dl className="svc__outcome">
                  <dt>Outcome</dt>
                  <dd>{service.outcome}</dd>
                </dl>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Interlude ---------- */}
      <VideoBand
        clip="band-sunset"
        height="mid"
        chapter="One system"
        label="Engage one area, or the whole funnel"
        title="Every piece built to reinforce the next."
        caption="Dubai at dusk"
      />

      <section
        className="band--tight band surface-champagne"
        data-chapter="Get started"
        data-tone="light"
      >
        <div className="shell">
          <div className="split split--aside">
            <Reveal as="p" className="label shead__eyebrow">
              Start anywhere
            </Reveal>
            <div className="stack">
              <Reveal as="p" className="display display--m" style={{ maxWidth: '20ch' }}>
                {services.close}
              </Reveal>
              <Reveal delay={140}>
                <Action href="/contact">Book a strategy call</Action>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
