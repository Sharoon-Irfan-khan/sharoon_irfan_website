/**
 * THE THOUGHT ROOM — the `post` document type.
 *
 * This file belongs to the Sanity Studio, not to the Next.js app. Nothing in
 * `app/` or `components/` imports it, and it is kept here so the shape the site
 * reads and the shape the team writes live in the same repository and can be
 * changed in one commit.
 *
 * To use it, copy into the Studio project and register it in the schema list:
 *
 *   import post from './post'
 *   export const schemaTypes = [post]
 *
 * Written as a plain object rather than with `defineType`, so it can sit in
 * this repo without pulling the whole `sanity` package into a site that only
 * ever reads.
 *
 * `category` values must match CATEGORIES in lib/thoughtRoom.js. Renaming a
 * label there is free; renaming an `id` after anything is published orphans
 * those documents from the filter.
 */
const post = {
  name: 'post',
  title: 'Thought Room piece',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'The address of the piece. Generate it from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Type',
      type: 'string',
      description: 'What kind of piece this is. Drives the filter on the index.',
      options: {
        list: [
          { title: 'Article — original thinking', value: 'article' },
          { title: 'Case Study — results with context', value: 'case-study' },
          { title: 'Industry Signal — reading the market', value: 'signal' },
        ],
        layout: 'radio',
      },
      initialValue: 'article',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Standfirst',
      type: 'text',
      rows: 3,
      description:
        'One or two sentences. This is the only body copy shown on the index, so it has to earn the click on its own.',
      validation: (Rule) => Rule.max(240),
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      // Hotspot lets the editor choose what survives the crop. The cards are
      // 3:2 and the lead is much wider, so the same file is cropped two
      // different ways and the centre is rarely the right answer for both.
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'What the picture shows, for screen readers and for when it fails to load. Leave empty only if it is purely decorative.',
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      description: 'Sorts the index. Newest first.',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Pin to the top',
      type: 'boolean',
      description:
        'Shows this piece large at the top of the page. Pin one at a time — if several are pinned the most recent of them wins. Pin none and the newest piece leads.',
      initialValue: false,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
    },
    {
      name: 'readTimeOverride',
      title: 'Read time override (minutes)',
      type: 'number',
      description:
        'Leave empty. Read time is counted from the body automatically — set this only when the estimate reads wrong, which usually means the piece is mostly tables or images.',
      validation: (Rule) => Rule.min(1).max(120),
    },
  ],

  orderings: [
    {
      title: 'Newest first',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
      featured: 'featured',
      media: 'coverImage',
    },
    prepare({ title, category, publishedAt, featured, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-GB')
        : 'unpublished';
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: [category, date].filter(Boolean).join(' · '),
        media,
      };
    },
  },
};

export default post;
