import Lines from '@/components/Lines';
import Reveal from '@/components/Reveal';
import { Action } from '@/components/Sections';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="phero on-dark" style={{ minHeight: '82svh' }} data-tone="dark">
      <div className="hero__light" aria-hidden="true" />
      <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
        <p className="label phero__eyebrow">Error 404</p>
        <Lines
          lines={['That page', 'is not here.']}
          as="h1"
          className="display display--l"
          delay={80}
        />
        <Reveal className="lede phero__standfirst" delay={420}>
          The link may have moved or never existed. Everything worth reading is a
          click away.
        </Reveal>
        <Reveal delay={540} style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Action href="/">Back to home</Action>
          <Action href="/contact" variant="btn--ghost">
            Book a call
          </Action>
        </Reveal>
      </div>
    </section>
  );
}
