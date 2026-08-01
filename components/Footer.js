import Image from 'next/image';
import Reveal from './Reveal';
import { site } from '@/lib/site';

/**
 * THE FOOTER — one centred column, six lines deep.
 *
 * Name, role, city, then the marks and the small print. Nothing else: the
 * standfirst, the row of social icons and the repeat of the header nav were
 * all struck out on review, and each for the same reason — the page has just
 * finished making its argument and ends on a signature, not on another set of
 * things to click.
 *
 * That leaves no newsletter block either. The layout this follows opens with
 * one; there is no list to sign up to here, and a form that collects addresses
 * nobody sends to is worse than no form.
 *
 * The channels are not lost with the icon row — email, phone and LinkedIn all
 * live in the contact section three screens up, which is where someone looking
 * to get in touch is sent.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer on-dark">
      <div className="shell footer__inner">
        <Reveal as="p" className="footer__mark">
          Sharoon <em>Irfan</em>
        </Reveal>

        <Reveal as="p" className="footer__role" delay={60}>
          {site.role}
        </Reveal>

        <Reveal as="p" className="footer__place" delay={100}>
          {site.location}
        </Reveal>

        {/* A label for the row under it, not a statement of its own — so it is
            set as one, and it renders only when there are marks to label. */}
        {site.credentials && site.badges?.length > 0 && (
          <Reveal as="h2" className="footer__credentials" delay={160}>
            {site.credentials}
          </Reveal>
        )}

        {site.badges?.length > 0 && (
          <Reveal as="ul" className="footer__badges" delay={200}>
            {site.badges.map((b) => {
              const mark = (
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.width}
                  height={b.height}
                  unoptimized
                />
              );
              return (
                <li key={b.src}>
                  {b.href ? (
                    <a href={b.href} target="_blank" rel="noreferrer">
                      {mark}
                    </a>
                  ) : (
                    mark
                  )}
                </li>
              );
            })}
          </Reveal>
        )}

        {/* Place, not domain: the supplied line ends "Dubai, UAE", and the
            domain is already in the address bar of whoever is reading it.

            The one element on the page with no reveal on it. It is the last
            line in the document, which puts it inside the observer's bottom
            margin at the moment the page stops scrolling — so it could sit at
            opacity 0 with the whole footer visible above it, and did. Small
            print that may not render is worse than small print that does not
            animate. */}
        <p className="footer__base">
          © {year} {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
