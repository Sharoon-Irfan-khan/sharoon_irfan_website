import Link from 'next/link';
import { nav, site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer on-dark">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <p className="footer__mark">
              Sharoon <em>Irfan</em>
            </p>
            <p className="muted" style={{ marginTop: '1.25rem', maxWidth: '32ch' }}>
              {site.role}. {site.location}.
            </p>
          </div>

          <div className="footer__col">
            <h3>Pages</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
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
          </div>
        </div>

        <div className="footer__base">
          <span>
            © {year} {site.name}
          </span>
          <span>{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
