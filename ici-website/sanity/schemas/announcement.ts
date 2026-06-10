/**
 * ICI Sanity Schema — announcements
 * Import this file into your Sanity Studio schemaTypes array.
 * Studio setup: https://www.sanity.io/docs/getting-started
 */

export default {
  name: 'announcement',
  title: 'Announcements',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Announcement text',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'link',
      title: 'Link URL',
      type: 'string',
      description: 'Internal path e.g. /credentials or /apply',
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only active announcements show in the bar',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'text', active: 'active' },
    prepare({ title, active }: any) {
      return { title, subtitle: active ? 'Active' : 'Inactive' }
    },
  },
}
