/**
 * ICI Sanity Schema — events
 * Import this file into your Sanity Studio schemaTypes array.
 * Studio setup: https://www.sanity.io/docs/getting-started
 */

export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: ['Online', 'In person', 'Hybrid'],
      },
      initialValue: 'Online',
    },
    {
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'registerLink',
      title: 'Registration link',
      type: 'url',
    },
    {
      name: 'type',
      title: 'Event type',
      type: 'string',
      options: {
        list: ['Summit', 'Masterclass', 'Webinar', 'Community'],
      },
    },
  ],
  orderings: [
    {
      title: 'Date, upcoming first',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'date', format: 'format' },
    prepare({ title, date, format }: any) {
      return {
        title,
        subtitle: date 
          ? `${new Date(date).toLocaleDateString('en-GB')} · ${format}` 
          : 'No date set',
      }
    },
  },
}
