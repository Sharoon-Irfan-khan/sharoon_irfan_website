/**
 * Sanity CLI config.
 *
 * Only the command line reads this — `sanity deploy`, `sanity dataset`, and so
 * on. The site and the embedded Studio at /studio do not; they take their
 * settings from sanity.config.js and the environment.
 *
 * The literal ids are the fallback rather than the source of truth, so the CLI
 * still works in a shell that has not loaded .env.local. Neither value is a
 * secret — both already ship in the browser bundle on every page load.
 *
 * `studioHost` fixes the subdomain of the hosted Studio, which is what makes
 * the "Open Sanity Studio" button in sanity.io/manage point somewhere real:
 *   https://sharoon-thought-room.sanity.studio
 *
 * That hosted copy and the one at /studio are the same Studio editing the same
 * content — two doors into one room.
 */

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0z2uy7z3',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  studioHost: 'sharoon-thought-room',
  autoUpdates: true,

  // Written down so redeploys are not interactive. Without it the CLI asks
  // which application this is every single time, which is fine by hand and
  // fatal in anything automated.
  deployment: {
    appId: 'iscetiulcminmek8mhxpzuyo',
  },
});
