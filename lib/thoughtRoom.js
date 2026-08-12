// THE THOUGHT ROOM — content model and queries.
//
// One place for the three things the schema, the filter and the cards all have
// to agree on: what the categories are, how a piece is queried, and how long it
// takes to read. Split across three files they drift, and a category renamed in
// the Studio quietly stops matching the filter on the page.

/**
 * The three kinds of piece. `id` is what is stored in Sanity and must not
 * change once anything is published — the labels are free to.
 */
export const CATEGORIES = [
  {
    id: 'article',
    path: 'articles',
    label: 'Articles',
    note: 'Original thinking',
    fallbackAlt: 'An open journal, pen and camera on a wooden desk',
  },
  {
    id: 'case-study',
    path: 'case-studies',
    label: 'Case Studies',
    note: 'Results with context',
    fallbackAlt: 'A calculator and printed figures on a marble table',
  },
  {
    id: 'insight',
    path: 'insights',
    label: 'Insights',
    note: 'Reading the market',
    fallbackAlt: 'A notebook, phone, coffee and headphones in morning light',
  },
];

/*
  `id` is what Sanity stores and must not change. `path` is what the URL says,
  and it is plural because the page is a list: /thought-room/articles reads as
  a place, /thought-room/article reads as a piece. Nothing but the router uses
  it, so the two can differ without the documents knowing.
*/
export const pathToId = (path) =>
  CATEGORIES.find((c) => c.path === path)?.id ?? null;

export const idToPath = (id) =>
  CATEGORIES.find((c) => c.id === id)?.path ?? null;

export const categoryLabel = (id) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? 'Writing';

/*
  READ TIME.

  Counted in GROQ rather than here, because doing it in JavaScript would mean
  pulling every article's full body down just to render the index — the one
  page that does not display any of it.

  `pt::text(body)` flattens portable text to a plain string, and 1210 is
  characters per minute: about 5.5 characters to a word including its space, at
  220 words a minute, which is the usual figure for adult reading of prose.

  It is an estimate and it is allowed to be. `readTimeOverride` exists for the
  pieces where it reads wrong — a short article that is mostly a table, say.
*/
const READ_TIME = `"readTimeRaw": round(length(pt::text(body)) / 1210), readTimeOverride`;

/** Never claim less than a minute; a "0 min read" reads as an error. */
export function readMinutes(post) {
  const value = post?.readTimeOverride ?? post?.readTimeRaw;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 1;
}

/*
  The card fields, and only those. The body is deliberately absent: it is the
  largest field on the document and the index never shows it.
*/
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  featured,
  coverImage,
  ${READ_TIME}
`;

/*
  Ordered so the pinned piece surfaces first and everything else falls back to
  newest. Sorting here rather than in the page means the "featured or latest"
  rule is one line, and it is the same line whichever the editor chose.
*/
export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(featured desc, publishedAt desc) {
    ${CARD_FIELDS}
  }
`;

/* One category's pieces, same ordering — pinned first, then newest. */
export const POSTS_IN_CATEGORY_QUERY = `
  *[_type == "post" && defined(slug.current) && category == $category]
  | order(featured desc, publishedAt desc) {
    ${CARD_FIELDS}
  }
`;

/*
  The hub cards.

  `count` is resolved in the same query rather than by fetching every post and
  grouping in JavaScript — the hub shows three cards and has no other use for
  the pieces themselves.
*/
export const CATEGORIES_QUERY = `
  *[_type == "category" && defined(slug.current)]
  | order(order asc, title asc) {
    _id,
    title,
    eyebrow,
    description,
    image,
    order,
    "slug": slug.current,
    "count": count(*[_type == "post" && defined(slug.current) && category == ^.slug.current])
  }
`;

/**
 * Merge what the Studio holds with what the code knows.
 *
 * The three types are structural — they exist whether or not anybody has made a
 * category document yet. So the hub is built from CATEGORIES and each entry is
 * dressed with its document if one exists. A half-configured Studio gives a
 * hub with real cards and no pictures, rather than an empty page that looks
 * broken.
 */
export function buildHub(docs = [], counts = {}) {
  const bySlug = new Map(docs.map((d) => [d.slug, d]));

  return CATEGORIES.map((c, i) => {
    const doc = bySlug.get(c.id);
    return {
      id: c.id,
      href: `/thought-room/${c.path}`,
      title: doc?.title || c.label,
      eyebrow: doc?.eyebrow || c.note,
      description: doc?.description || null,
      image: doc?.image || null,
      /*
        The picture the card falls back to when no category document carries
        one. Supplied 31 July and committed to the repo rather than uploaded,
        so the hub is never three grey boxes on a fresh dataset. A document
        with its own image wins — this is the floor, not the ceiling.
      */
      fallback: `/images/thought-room/${c.path}.jpg`,
      fallbackAlt: c.fallbackAlt ?? '',
      order: doc?.order ?? i + 1,
      // Sanity's count and the repo-local count are two different piles of the
      // same kind of document, so the card's number is both added together
      // rather than one replacing the other.
      count: (doc?.count ?? 0) + (counts[c.id] ?? 0),
    };
  }).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/**
 * One list of pieces, Sanity's and the repo-local ones, in the order the
 * cards already expect: pinned first, then newest. A slug published in both
 * places is not expected to happen, but Sanity wins if it does — it is the
 * editor's own record, and this file's copy is only ever a stand-in for it.
 */
export function mergePosts(sanityPosts = [], localPosts = []) {
  const bySlug = new Map(localPosts.map((post) => [post.slug, post]));
  for (const post of sanityPosts) bySlug.set(post.slug, post);

  return Array.from(bySlug.values()).sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      new Date(b.publishedAt) - new Date(a.publishedAt)
  );
}

export const categoryNote = (id) =>
  CATEGORIES.find((c) => c.id === id)?.note ?? null;

export const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${CARD_FIELDS},
    body,
    "coverAlt": coverImage.alt
  }
`;

/*
  Slug and category together, because a piece now lives under its category and
  generateStaticParams has to produce both halves of the path.
*/
export const SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    category
  }
`;

/** 3 August 2026 — long form, because a blog index is not a changelog. */
export function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
