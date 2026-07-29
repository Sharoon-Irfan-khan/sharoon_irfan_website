import Reveal from './Reveal';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer on-dark">
      <div className="shell">
        <div className="footer__grid">
          <Reveal>
            <p className="footer__mark">
              Sharoon <em>Irfan</em>
            </p>
            <p className="muted" style={{ marginTop: '1.25rem', maxWidth: '32ch' }}>
              {site.role}. {site.location}.
            </p>
          </Reveal>

          <Reveal className="footer__col" delay={120}>
            <h3>Reach me</h3>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noreferrer">
                  {site.linkedinLabel}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="footer__base" delay={220}>
          <span>
            © {year} {site.name}
          </span>
          <span>{site.domain}</span>
        </Reveal>
      </div>
    </footer>
  );
}
