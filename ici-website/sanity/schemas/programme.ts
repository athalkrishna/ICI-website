/**
 * Programme / course document — hero & card images via Bunny CDN URLs.
 */
export default {
  name: 'programme',
  title: 'Programmes',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: { required: () => unknown }) => Rule.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Credential Level',
      type: 'string',
      options: {
        list: [
          'L1 Catalyst',
          'L2 Architect',
          'L3 Sage',
          'L4 Luminary',
        ],
      },
    },
    { name: 'hours', title: 'Hours', type: 'number' },
    { name: 'price', title: 'Price (INR)', type: 'number' },
    { name: 'heroImage', title: 'Hero Image', type: 'bunnyImage' },
    { name: 'cardImage', title: 'Card Image', type: 'bunnyImage' },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [{ type: 'module' }],
    },
    { name: 'seo', title: 'SEO Settings', type: 'seoFields' },
  ],
  preview: {
    select: { title: 'title', level: 'level', media: 'cardImage.url' },
    prepare({ title, level }: { title: string; level?: string }) {
      return { title, subtitle: level };
    },
  },
};
