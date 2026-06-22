import type { Metadata } from 'next';
import type { Event } from '@prisma/client';
import { SITE_URL } from '@/lib/site-url';

export function buildEventMetadata(event: Event, slug: string): Metadata {
  const url = `${SITE_URL}/events/${slug}`;
  const displayTitle = event.metaTitle?.trim() || event.title;
  const description = event.metaDescription?.trim() || event.description;
  const imageAlt = event.coverImageAlt?.trim() || event.title;
  const useAbsoluteTitle = Boolean(event.metaTitle?.trim());

  const title = useAbsoluteTitle ? { absolute: displayTitle } : displayTitle;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: displayTitle,
      description,
      url,
      type: 'website',
      siteName: 'International Coaching Institute',
      locale: 'en_GB',
      ...(event.coverImageUrl
        ? {
            images: [
              {
                url: event.coverImageUrl,
                alt: imageAlt,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: event.coverImageUrl ? 'summary_large_image' : 'summary',
      title: displayTitle,
      description,
      ...(event.coverImageUrl ? { images: [event.coverImageUrl] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function buildEventJsonLd(event: Event, slug: string) {
  const url = `${SITE_URL}/events/${slug}`;
  const location =
    event.locationType === 'ONLINE'
      ? { '@type': 'VirtualLocation', url: event.registrationLink || url }
      : {
          '@type': 'Place',
          name: event.locationDetail || 'International Coaching Institute',
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.metaDescription?.trim() || event.description,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate.toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode:
      event.locationType === 'ONLINE'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : event.locationType === 'HYBRID'
          ? 'https://schema.org/MixedEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
    location,
    image: event.coverImageUrl ? [event.coverImageUrl] : undefined,
    url,
    organizer: {
      '@type': 'Organization',
      name: 'International Coaching Institute',
      url: SITE_URL,
    },
    ...(event.isFree
      ? { isAccessibleForFree: true }
      : { offers: { '@type': 'Offer', url: event.registrationLink || url, availability: 'https://schema.org/InStock' } }),
  };
}
