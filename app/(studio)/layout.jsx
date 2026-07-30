/**
 * Root layout for the Studio.
 *
 * The site has its own root layout in app/(site), and this is deliberately not
 * it. Everything that makes the website feel like the website is hostile to an
 * editing tool: Lenis takes over scrolling, which fights the Studio's panes;
 * the nav is fixed over the top of it; the intro curtain covers it on load; and
 * the grain overlay sits above everything. None of that belongs here.
 *
 * Two route groups, two root layouts, one app — which is exactly what route
 * groups are for. The Studio ships its own styles, so the site stylesheet is
 * not imported either.
 */

export const metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

// The Studio wants the full viewport and manages its own scrolling.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
