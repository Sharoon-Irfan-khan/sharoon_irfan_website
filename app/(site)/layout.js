// One level up: globals.css stays at app/ because both route groups sit
// beside it, and only this one wants it.
import '../globals.css';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Spine from '@/components/Spine';
import Grain from '@/components/Grain';
import Intro from '@/components/Intro';
import SmoothScroll from '@/components/SmoothScroll';
import { site } from '@/lib/site';
// The three faces moved to lib/fonts.js so the root not-found page can load the
// same ones — see the note there.
import { fontVars } from '@/lib/fonts';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'marketing consultant Dubai',
    'performance marketing Dubai',
    'go-to-market strategy UAE',
    'CRM and attribution',
    'real estate marketing Dubai',
    'B2B marketing UAE',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#050805',
  colorScheme: 'light',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  sameAs: [site.linkedin],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Intro />
        <SmoothScroll />
        <Grain />
        <Spine />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
