import { site } from '@/lib/site';
import { sanityFetch } from '@/lib/sanity';

/*
  The homepage's nav entries are in-page anchors and stay out of this: listing
  anchors tells a crawler about five documents that do not exist.

  The Thought Room is different — it is a real route, and every piece under it
  is a real document with its own title, its own date and its own reason to be
  indexed. Those are pulled from Sanity rather than hardcoded, so publishing a
  piece puts it in the sitemap without anyone remembering to.
*/
const PIECES_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    "updated": coalesce(_updatedAt, publishedAt)
  }
`;

export default async function sitemap() {
  const now = new Date();

  const pieces = (await sanityFetch(PIECES_QUERY, {}, [])) ?? [];

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/thought-room`,
      // The index changes whenever anything is published under it.
      lastModified: pieces[0]?.updated ? new Date(pieces[0].updated) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...pieces.map((p) => ({
      url: `${site.url}/thought-room/${p.slug}`,
      lastModified: p.updated ? new Date(p.updated) : now,
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ];
}
