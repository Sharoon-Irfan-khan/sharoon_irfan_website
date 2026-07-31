/**
 * Sanity Studio, embedded in the site.
 *
 * The team writes at /studio on the deployed domain rather than in a separate
 * app they would have to install, run and keep in step. One deploy ships both
 * the website and the place its words are written, and the schema below is the
 * same file the site reads — they cannot drift apart.
 *
 * `basePath` must match the route in app/studio, or the Studio's own links
 * point outside itself and navigating inside it 404s.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import post from './sanity/schemas/post';
import category from './sanity/schemas/category';

/*
  Two build systems read this file and they do not agree on env vars.

  Next.js exposes anything prefixed NEXT_PUBLIC_ to the browser, which is what
  the embedded Studio at /studio runs on. `sanity deploy` builds with Vite and
  exposes only SANITY_STUDIO_, so NEXT_PUBLIC_SANITY_PROJECT_ID is undefined
  there — the hosted Studio booted with no projectId and died on load with "An
  error occurred that Sanity Studio was unable to recover from".

  So: check both, then fall back to the literal ids, exactly as sanity.cli.js
  already does. Neither value is a secret; both ship in the browser bundle on
  every page load.
*/
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  '0z2uy7z3';

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  'production';

export default defineConfig({
  name: 'thought-room',
  title: 'The Thought Room',
  basePath: '/studio',
  projectId,
  dataset,

  schema: {
    types: [post, category],
  },

  plugins: [
    structureTool(),
    // A GROQ console, so a query can be tried against real content before it
    // goes into the site. Handy when a piece is not appearing and the question
    // is whether the data or the page is wrong.
    visionTool({ defaultApiVersion: '2024-10-01' }),
  ],

  document: {
    // The Studio's "open preview" link, pointed at where the piece actually
    // lives on the site.
    productionUrl: async (prev, { document }) => {
      if (document?._type !== 'post' || !document?.slug?.current) return prev;
      return `/thought-room/${document.slug.current}`;
    },
  },
});
