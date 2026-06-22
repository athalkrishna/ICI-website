/** Production site URL — used for metadataBase, canonical URLs, sitemap, and JSON-LD. */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_APP_URL || 'https://internationalcoachinginstitute.org').replace(/\/$/, '');

/** Primary ICI logo — default for OG/Twitter, JSON-LD, and social sharing. */
export const SITE_LOGO_PATH = '/logo-transparent.webp';
export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;
