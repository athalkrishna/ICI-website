/**
 * ICI Sanity Schema — testimonials
 * Import this file into your Sanity Studio schemaTypes array.
 * Studio setup: https://www.sanity.io/docs/getting-started
 */

export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role and credential',
      type: 'string',
      description: 'e.g. People and Culture leader turned coach, ICI-C',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Bengaluru, India',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Only add a photo when written consent has been given',
    },
    {
      name: 'featured',
      title: 'Show on site',
      type: 'boolean',
      description: 
        'ONLY set to true when this is a real graduate with written consent. ' +
        'All sample/placeholder testimonials must remain false.',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'name', role: 'role', featured: 'featured' },
    prepare({ title, role, featured }: any) {
      return {
        title,
        subtitle: `${role || ''} · ${featured ? '✓ Showing on site' : '⚠ Hidden'}`,
      }
    },
  },
}
