/** Production site URL — used for metadataBase, canonical URLs, sitemap, and JSON-LD. */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_APP_URL || 'https://internationalcoachinginstitute.org').replace(/\/$/, '');
