import Accordion from '@/components/Accordion';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { PageHero, SectionHead, Steps } from '@/components/Sections';
import { contact } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Contact',
  description:
    'Book a fifteen-minute strategy call. A short conversation about your goals and your numbers, and where your marketing can win more revenue.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        headline={contact.headline}
        standfirst={contact.standfirst}
        chapter="Contact"
        video="band-stars"
      />

      {/* ---------- Form ---------- */}
      <section className="band surface-ivory" data-chapter="Book a call" data-tone="light">
        <div className="shell">
          <div className="contact">
            <div className="contact__aside">
              <div>
                <Reveal as="h2" className="display display--m" style={{ maxWidth: '14ch' }}>
                  {contact.call.title}
                </Reveal>
                <Reveal
                  className="prose"
                  delay={100}
                  style={{ marginTop: '1.5rem', color: 'var(--ink-72)' }}
                >
                  {contact.call.body}
                </Reveal>
              </div>

              <div>
                <Reveal as="p" className="label shead__eyebrow" style={{ marginBottom: '0.5rem' }}>
                  {contact.audience.eyebrow}
                </Reveal>
                <ul className="contact__list">
                  {contact.audience.items.map((item, i) => (
                    <Reveal as="li" key={item} delay={i * 80}>
                      {item}
                    </Reveal>
                  ))}
                </ul>
              </div>

              <div>
                <Reveal as="p" className="label shead__eyebrow" style={{ marginBottom: '1rem' }}>
                  Reach me
                </Reveal>
                <Reveal className="contact__direct" delay={80}>
                  <a className="tlink" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  <a className="tlink" href={`tel:${site.phoneHref}`}>
                    {site.phone}
                  </a>
                  <a
                    className="tlink"
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {site.linkedinLabel}
                  </a>
                </Reveal>
              </div>
            </div>

            <Reveal delay={140}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- What happens next ---------- */}
      <section
        className="band surface-champagne"
        data-chapter={contact.next.chapter}
        data-tone="light"
      >
        <div className="shell">
          <SectionHead
            eyebrow={contact.next.eyebrow}
            title="Three steps from first message to a plan."
          />
          <Steps steps={contact.next.steps} columns={3} numbered />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section
        className="band surface-ivory"
        data-chapter={contact.faq.chapter}
        data-tone="light"
      >
        <div className="shell">
          <div className="split split--aside">
            <Reveal as="p" className="label shead__eyebrow">
              {contact.faq.eyebrow}
            </Reveal>
            <Reveal delay={90}>
              <Accordion items={contact.faq.items} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
