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
  { id: 'article', label: 'Articles', note: 'Original thinking' },
  { id: 'case-study', label: 'Case Studies', note: 'Results with context' },
  { id: 'signal', label: 'Industry Signals', note: 'Reading the market' },
];

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

export const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${CARD_FIELDS},
    body,
    "coverAlt": coverImage.alt
  }
`;

/** Slugs for generateStaticParams, so each piece is prerendered. */
export const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

/**
 * Split the list into the pinned piece and the rest.
 *
 * The query already sorts featured-first, so the head of the list is either the
 * piece the editor pinned or, if nobody pinned one, the most recent. That is
 * exactly the "your best or latest" rule, and it needs no flag of its own.
 */
export function splitFeatured(posts = []) {
  const [lead, ...rest] = posts;
  return { lead: lead ?? null, rest };
}

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
