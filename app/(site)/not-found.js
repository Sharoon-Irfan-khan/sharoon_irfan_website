import NotFoundPanel from '@/components/NotFoundPanel';

/**
 * The 404 for the site group.
 *
 * This one handles `notFound()` thrown from a route inside app/(site) — an
 * unpublished Thought Room slug, say — and renders inside the site's own root
 * layout, so it arrives with the nav, the spine and the footer around it.
 *
 * It does not catch unmatched URLs. Nothing in a route group can: there is no
 * root layout above the two groups for Next to render a 404 in, so those go to
 * app/not-found.js instead.
 */
export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return <NotFoundPanel />;
}
