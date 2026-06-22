/**
 * Reusable SEO fields for any Sanity page document.
 */
export default {
  name: 'seoFields',
  title: 'SEO Settings',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Ideal: 50–60 characters',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Ideal: 150–160 characters',
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Leave blank to auto-generate from slug',
    },
    {
      name: 'ogTitle',
      title: 'OG Title',
      type: 'string',
    },
    {
      name: 'ogDescription',
      title: 'OG Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'ogImage',
      title: 'OG Image (1200×630)',
      type: 'bunnyImage',
      description: 'Used for Facebook, LinkedIn previews. Recommended 1200×630px.',
    },
    {
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
    },
    {
      name: 'twitterDesc',
      title: 'Twitter Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'twitterImage',
      title: 'Twitter Card Image (1200×630)',
      type: 'bunnyImage',
    },
    {
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary Large Image', value: 'summary_large_image' },
        ],
      },
      initialValue: 'summary_large_image',
    },
    {
      name: 'noIndex',
      title: 'No Index (robots: noindex, nofollow)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'structuredData',
      title: 'Custom JSON-LD',
      type: 'text',
      rows: 6,
      description: 'Paste raw JSON-LD for rich results (Course, Event, etc.)',
    },
  ],
};
