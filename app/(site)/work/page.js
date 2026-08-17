import './work.css';
import WorkPage from '@/components/work/WorkPage';
import { site } from '@/lib/site';

/**
 * /work — the portfolio, ported from the standalone work.html supplied in
 * portfolio-source/. Its structure (layout, grids, hover mechanics) stayed;
 * its palette and type did not — work.css's --wp-* custom properties all
 * point at the site's own tokens (app/styles/tokens.css) rather than the
 * source file's own colors, so the page reads as native Sharoon.ae rather
 * than an imported template. Selectors stay scoped under .wp-page so this
 * stylesheet still can't bleed into any other page.
 *
 * Nav, Footer, Grain and Spine are the root layout's — this page supplies
 * everything between them.
 */

export const metadata = {
  // The root layout's title template appends " — Sharoon Irfan".
  title: 'Portfolio',
  description:
    "Explore Sharoon Irfan's portfolio of website design, branding identity, SEO case studies, social media campaigns, and digital marketing projects across real estate, technology, and luxury sectors in Dubai.",
  keywords: [
    'digital marketing portfolio Dubai',
    'branding portfolio',
    'SEO case studies',
    'social media portfolio',
    'real estate marketing portfolio',
    'website design portfolio',
    'Sharoon Irfan portfolio',
  ],
  alternates: { canonical: '/work' },
  openGraph: {
    title: `Portfolio — ${site.name}`,
    description:
      'Website design, branding, SEO case studies, and social media campaigns across real estate, technology, and luxury sectors.',
    url: '/work',
    type: 'website',
  },
};

export default function Page() {
  return <WorkPage />;
}
