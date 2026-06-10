/**
 * ICI Sanity Schema — faculty
 * Import this file into your Sanity Studio schemaTypes array.
 * Studio setup: https://www.sanity.io/docs/getting-started
 */

export default {
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title / role',
      type: 'string',
      description: 'e.g. Senior Coach, ICI-S',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 6,
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'specialisms',
      title: 'Specialisms',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Life Coaching',
          'Executive & Leadership',
          'Business Coaching',
          'Health & Wellness',
          'Team & Organisational',
        ],
      },
    },
    {
      name: 'active',
      title: 'Active faculty member',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
}
