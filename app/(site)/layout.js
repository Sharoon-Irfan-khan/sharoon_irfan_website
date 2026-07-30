import { Cormorant_Garamond, Jost, Poppins } from 'next/font/google';
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

/* Type system — The Seasons · Glacial Indifference · Poppins
   ---------------------------------------------------------
   Poppins is on Google Fonts and loads exactly as specified. The other two are
   declared in app/styles/brand-fonts.css against /public/fonts and take over
   automatically once the licensed files are dropped in. Until then these two
   free faces stand in, chosen to hold the same shape and weight on the page:

     Cormorant Garamond — for The Seasons. High-contrast, delicate hairlines,
     generous ascenders. The closest free serif to The Seasons' airy elegance.

     Jost — for Glacial Indifference. Both are Futura-line geometric sans faces,
     so the body copy keeps the same even, quiet colour. */

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--f-display',
});

const body = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--f-body',
});

const ui = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--f-ui',
});

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
  // Font variables go on <html> so they resolve at :root, which is where the
  // --font-* tokens that reference them are declared.
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${ui.variable}`}>
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
