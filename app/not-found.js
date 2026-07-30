import './globals.css';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Grain from '@/components/Grain';
import NotFoundPanel from '@/components/NotFoundPanel';
import { fontVars } from '@/lib/fonts';

/**
 * THE 404 FOR EVERY UNMATCHED URL.
 *
 * The app has two root layouts, one per route group — app/(site) for the
 * website and app/(studio) for Sanity — and deliberately no root layout above
 * them. That is what route groups are for, and it has one consequence worth
 * spelling out: an address that matches neither group has no layout to be
 * rendered in, so a not-found file inside a group cannot catch it. Every
 * genuinely unknown URL was getting Next's stock black-on-white "404: This page
 * could not be found." — the one screen on the whole domain that looked like
 * nobody built it.
 *
 * This file catches those, and because there is no layout above it, it brings
 * its own <html> and <body>.
 *
 * It is not the full site chrome. Spine reads scroll progress and chapter
 * markers off a page that has neither; Lenis and the intro curtain are entrance
 * choreography for a homepage, not for an apology. Nav and Footer stay, because
 * the entire job of this page is to get the reader back to somewhere real.
 */
export const metadata = {
  title: 'Page not found — Sharoon Irfan',
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: '#050805',
  colorScheme: 'light',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <Grain />
        <Nav />
        <main id="main">
          <NotFoundPanel />
        </main>
        <Footer />
      </body>
    </html>
  );
}
