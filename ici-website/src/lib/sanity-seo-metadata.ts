import type { Metadata } from 'next';

type BunnyImage = {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: BunnyImage;
  twitterTitle?: string;
  twitterDesc?: string;
  twitterImage?: BunnyImage;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  structuredData?: string;
};

type SanitySeoDoc = {
  title: string;
  slug?: { current?: string };
  seo?: SeoFields;
};

const SITE = 'https://internationalcoachinginstitute.org';

function ogImageMeta(image?: BunnyImage) {
  if (!image?.url) return [];
  return [
    {
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      alt: image.alt ?? '',
    },
  ];
}

/** Build Next.js Metadata from a Sanity document with seoFields. */
export function metadataFromSanitySeo(
  doc: SanitySeoDoc,
  pathPrefix: string,
): Metadata {
  const seo = doc.seo;
  const slug = doc.slug?.current ?? '';
  const canonical = seo?.canonicalUrl ?? `${SITE}${pathPrefix}/${slug}`.replace(/\/+/g, '/');
  const metaTitle = seo?.metaTitle ?? `${doc.title} | International Coaching Institute`;
  const metaDescription = seo?.metaDescription ?? '';
  const ogTitle = seo?.ogTitle ?? metaTitle;
  const ogDescription = seo?.ogDescription ?? metaDescription;
  const ogImages = ogImageMeta(seo?.ogImage);
  const twitterTitle = seo?.twitterTitle ?? metaTitle;
  const twitterDesc = seo?.twitterDesc ?? metaDescription;
  const twitterImages = seo?.twitterImage?.url ? [seo.twitterImage.url] : ogImages.map((i) => i.url);

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      type: 'website',
      locale: 'en_GB',
      siteName: 'International Coaching Institute',
      ...(ogImages.length ? { images: ogImages } : {}),
    },
    twitter: {
      card: seo?.twitterCard ?? 'summary_large_image',
      title: twitterTitle,
      description: twitterDesc,
      ...(twitterImages.length ? { images: twitterImages } : {}),
    },
  };
}

export function parseStructuredDataJson(raw?: string) {
  if (!raw?.trim()) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}
