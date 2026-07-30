/**
 * The type system, in one place.
 *
 * It used to live inside app/(site)/layout.js, which was fine while that was
 * the only file that needed it. The root not-found page needs it too — it
 * renders its own <html> because there is no root layout for it to render
 * inside (see app/not-found.js) — and a second copy of the loader config is a
 * second place for the stack to drift.
 *
 * Brand faces: The Seasons · Glacial Indifference · Poppins
 * ---------------------------------------------------------
 * Poppins is on Google Fonts and loads exactly as specified. The other two are
 * declared in app/styles/brand-fonts.css against /public/fonts and take over
 * automatically once the licensed files are dropped in. Until then these two
 * free faces stand in, chosen to hold the same shape and weight on the page:
 *
 *   Cormorant Garamond — for The Seasons. High-contrast, delicate hairlines,
 *   generous ascenders. The closest free serif to The Seasons' airy elegance.
 *
 *   Jost — for Glacial Indifference. Both are Futura-line geometric sans faces,
 *   so the body copy keeps the same even, quiet colour.
 */

import { Cormorant_Garamond, Jost, Poppins } from 'next/font/google';

export const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--f-display',
});

export const body = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--f-body',
});

export const ui = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--f-ui',
});

/** Goes on <html>, so the --f-* variables resolve at :root — which is where
 *  the --font-* tokens that reference them are declared. */
export const fontVars = `${display.variable} ${body.variable} ${ui.variable}`;
