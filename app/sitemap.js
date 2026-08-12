import { site } from '@/lib/site';
import { sanityFetch } from '@/lib/sanity';
import { LOCAL_POSTS } from '@/lib/localPosts';
import { idToPath } from '@/lib/thoughtRoom';

/*
  The homepage's nav entries are in-page anchors and stay out of this: listing
  anchors tells a crawler about five documents that do not exist.

  The Thought Room is different — it is a real route, and every piece under it
  is a real document with its own title, its own date and its own reason to be
  indexed. Those are pulled from Sanity rather than hardcoded, so publishing a
  piece puts it in the sitemap without anyone remembering to. Pieces written
  straight into the repo (lib/localPosts.js) are added the same way a Sanity
  one would be, category and all — see the note there.
*/
const PIECES_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    category,
    "updated": coalesce(_updatedAt, publishedAt)
  }
`;

export default async function sitemap() {
  const now = new Date();

  const sanityPieces = (await sanityFetch(PIECES_QUERY, {}, [])) ?? [];
  const localPieces = LOCAL_POSTS.map((p) => ({
    slug: p.slug,
    category: p.category,
    updated: p.modifiedAt || p.publishedAt,
  }));
  const pieces = [...sanityPieces, ...localPieces].filter((p) => idToPath(p.category));

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
      // The piece lives at /thought-room/<category>/<slug>, not one level up.
      url: `${site.url}/thought-room/${idToPath(p.category)}/${p.slug}`,
      lastModified: p.updated ? new Date(p.updated) : now,
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ];
}
