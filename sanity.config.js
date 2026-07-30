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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'thought-room',
  title: 'The Thought Room',
  basePath: '/studio',
  projectId,
  dataset,

  schema: {
    types: [post],
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
