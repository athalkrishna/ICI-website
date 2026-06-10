/**
 * ICI Sanity Schema — insights
 * Import this file into your Sanity Studio schemaTypes array.
 * Studio setup: https://www.sanity.io/docs/getting-started
 */

export default {
  name: 'insight',
  title: 'Insights',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Coaching',
          'Leadership',
          'Neuroscience',
          'Psychology',
          'Practice',
        ],
      },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: 'title', author: 'author', date: 'publishedAt' },
    prepare({ title, author, date }: any) {
      return {
        title,
        subtitle: `${author || 'No author'} · ${
          date ? new Date(date).toLocaleDateString('en-GB') : 'Unpublished'
        }`,
      }
    },
  },
}
