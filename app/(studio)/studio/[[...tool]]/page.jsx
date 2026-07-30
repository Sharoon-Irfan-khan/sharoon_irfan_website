'use client';

/**
 * /studio — the Sanity Studio, served by this app.
 *
 * The catch-all segment is required, not decorative: the Studio does its own
 * routing underneath this path (/studio/structure/post;abc123, and so on), and
 * without [[...tool]] every one of those is a 404 the moment an editor clicks
 * anything.
 *
 * 'use client' is load-bearing. As a server component this failed to build:
 * Turbopack traced `sanity` into the React Server Components graph, where
 * `swr` resolves through its "react-server" export condition to a build that
 * has no default export — and `sanity` imports it as one. The Studio is a
 * browser application from top to bottom, so keeping the whole tree on the
 * client is both the fix and the honest description of what it is.
 *
 * Which is also why `metadata` lives in the layout beside this: a client
 * component cannot export it.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
