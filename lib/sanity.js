// Sanity connection.
//
// The team writes in their own Sanity project; this file only reads from it.
// Nothing here provisions or owns content — the projectId points at the
// project they already have, so the Studio they already use is the Studio that
// feeds this site.
//
// Both values are NEXT_PUBLIC_ because the image URL builder runs in the
// browser. Neither is a secret: a projectId and a dataset name are public
// information for a published dataset, which is why Sanity puts them in the
// client bundle by design. A read token is only needed for a private dataset
// or for drafts, and that one stays server-side.

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Pinned rather than floating. GROQ and the image API are versioned by date,
// and letting this drift means a query that works today can behave differently
// after an upstream change nobody here asked for.
const apiVersion = '2024-10-01';

/**
 * Whether there is a project to talk to at all.
 *
 * Until the projectId is set the page renders its empty state rather than
 * throwing — the same shape the contact route already uses for missing SMTP
 * credentials. A build that dies because an env var is absent is a build
 * nobody can run locally.
 */
export const sanityReady = Boolean(projectId);

export const client = sanityReady
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The CDN is the published, cached view — right for a public blog, and
      // it keeps reads off the API rate limit.
      useCdn: true,
      perspective: 'published',
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;

const builder = sanityReady ? imageUrlBuilder({ projectId, dataset }) : null;

/**
 * Image URL builder. Returns null when there is no project or no image, so
 * every call site has to decide what an absent picture looks like rather than
 * rendering a broken one.
 */
export function urlFor(source) {
  if (!builder || !source?.asset) return null;
  return builder.image(source);
}

/** Fetch helper that degrades to a fallback instead of throwing. */
export async function sanityFetch(query, params = {}, fallback = null) {
  if (!client) return fallback;
  try {
    return await client.fetch(query, params);
  } catch (err) {
    console.error('[sanity] query failed:', err.message);
    return fallback;
  }
}
