/** Canonical production domain — used when env points at staging/localhost. */
export const PRODUCTION_SITE_URL = 'https://internationalcoachinginstitute.org';

/** Primary ICI logo — default for OG/Twitter, JSON-LD, and social sharing. */
export const SITE_LOGO_PATH = '/logo-transparent.webp';

function normalizeOrigin(url: string): string {
  return url.replace(/\/$/, '');
}

/** Hostnames that must never be used for canonical/OG URLs in production. */
export function isNonProductionSiteHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.cloudwaysapps.com') ||
    host.endsWith('.local')
  );
}

function isNonProductionSiteUrl(url: string): boolean {
  try {
    return isNonProductionSiteHost(new URL(url).hostname);
  } catch {
    return true;
  }
}

/**
 * Resolve the public site URL for metadata, canonical tags, sitemap, and JSON-LD.
 * Ignores staging/localhost values in production even if baked into NEXT_PUBLIC_* at build time.
 */
export function resolveSiteUrl(): string {
  const candidates = [
    process.env.CANONICAL_SITE_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.NEXTAUTH_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ]
    .filter((v): v is string => Boolean(v?.trim()))
    .map(normalizeOrigin);

  for (const url of candidates) {
    if (!isNonProductionSiteUrl(url)) return url;
  }

  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_SITE_URL;
  }

  return candidates[0] || 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();
export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`;

/** Normalize social share image URLs — never emit localhost/staging/deprecated og-image assets. */
export function resolveOgImageUrl(raw: string | undefined | null): string {
  const fallback = SITE_LOGO_URL;
  const value = raw?.trim();
  if (!value) return fallback;

  const lower = value.toLowerCase();
  if (
    lower.includes('og-image') ||
    lower.includes('localhost') ||
    lower.includes('127.0.0.1') ||
    lower.includes('cloudwaysapps.com')
  ) {
    return fallback;
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const parsed = new URL(value);
      if (isNonProductionSiteHost(parsed.hostname)) return fallback;
      return value.replace(/^http:\/\//i, 'https://');
    } catch {
      return fallback;
    }
  }

  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}
