import Lines from '@/components/Lines';
import Reveal from '@/components/Reveal';
import { Action } from '@/components/Sections';

/**
 * The 404, as a panel rather than a page.
 *
 * It is rendered from two places and they are not interchangeable. The app has
 * two root layouts — one per route group — and no root layout above them, so an
 * unmatched URL has nothing to render inside: app/(site)/not-found.js only
 * catches `notFound()` thrown from within the site group, and every genuinely
 * unknown address fell through to Next's own stock 404. app/not-found.js exists
 * to catch those, and it has to bring its own <html> with it.
 *
 * Both render this. One 404, two entry points.
 */
export default function NotFoundPanel() {
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
        <Reveal
          delay={540}
          style={{
            marginTop: 'clamp(2rem, 4vw, 3rem)',
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <Action href="/">Back to home</Action>
          {/* "/#contact". It was "/contact", which does not exist — a 404 page
              whose second button led to the 404 page. */}
          <Action href="/#contact" variant="btn--ghost">
            Book a call
          </Action>
        </Reveal>
      </div>
    </section>
  );
}
