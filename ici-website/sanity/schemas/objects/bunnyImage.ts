/**
 * Reusable Bunny CDN image object — paste URL or upload via BunnyImageInput.
 * Import into Sanity Studio schemaTypes.
 */
export default {
  name: 'bunnyImage',
  title: 'Image (Bunny CDN)',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'Bunny CDN URL',
      type: 'string',
      description: 'e.g. https://ici-website.b-cdn.net/site/logo-transparent.webp',
      components: { input: 'bunnyImageInput' },
      validation: (Rule: { uri: (opts: { scheme: string[] }) => unknown }) =>
        Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'alt',
      title: 'Alt Text (required for SEO)',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'width',
      title: 'Width (px)',
      type: 'number',
    },
    {
      name: 'height',
      title: 'Height (px)',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'alt', subtitle: 'url', media: 'url' },
  },
};
