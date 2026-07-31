/**
 * THE THOUGHT ROOM — the `category` document type.
 *
 * One document per card on the Thought Room hub: the picture, the wording and
 * the order they sit in. Like `post`, this file belongs to the Studio and
 * nothing in `app/` or `components/` imports it.
 *
 * It does NOT define what the categories are. `slug` is a join key that must
 * match one of the `category` values on a post — article, case-study, signal,
 * which are listed in CATEGORIES in lib/thoughtRoom.js. A document whose slug
 * matches nothing is simply a card that leads to an empty page.
 *
 * The split is deliberate. The three types are structural: the schema's radio
 * list, the routes and the queries all agree on those ids, and changing them is
 * a code change. What lives here is only presentation — swap the photograph or
 * rewrite the description and the site follows without a deploy.
 */
const category = {
  name: 'category',
  title: 'Thought Room category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name on the card — "Articles", "Case Studies".',
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: 'slug',
      title: 'Which type this card is for',
      type: 'slug',
      description:
        'Must be exactly article, case-study or signal — this is what ties the card to the pieces filed under it. Getting it wrong gives you a card that opens an empty page.',
      options: {
        source: 'title',
        maxLength: 40,
        // Not derived from the title: "Case Studies" would slugify to
        // "case-studies", and the id the posts carry is "case-study".
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const allowed = ['article', 'case-study', 'signal'];
          if (!value?.current) return 'Required.';
          return allowed.includes(value.current)
            ? true
            : `Must be one of: ${allowed.join(', ')}`;
        }),
    },
    {
      name: 'eyebrow',
      title: 'Label above the title',
      type: 'string',
      description:
        'The small line over the name — "Original thinking", "Results with context". Optional; leave it out and the card just carries its title.',
      validation: (Rule) => Rule.max(40),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'One sentence on what a reader finds in here.',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      title: 'Card image',
      type: 'image',
      // The card is wide and short; the centre of a photograph is rarely what
      // wants to survive that crop.
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'What the picture shows, for screen readers and for when it fails to load.',
        },
      ],
    },
    {
      name: 'order',
      title: 'Position',
      type: 'number',
      description:
        'Lowest first, left to right. Ties fall back to alphabetical, so give each card its own number.',
      initialValue: 1,
      validation: (Rule) => Rule.min(1).max(99),
    },
  ],

  orderings: [
    {
      title: 'Card order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      order: 'order',
      media: 'image',
    },
    prepare({ title, slug, order, media }) {
      return {
        title,
        subtitle: [order != null ? `${order}.` : null, slug]
          .filter(Boolean)
          .join(' '),
        media,
      };
    },
  },
};

export default category;
