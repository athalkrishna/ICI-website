import { prisma } from './prisma';
import type { NewsletterBranding } from './newsletter-blocks';
import { SITE_URL } from './site-url';

export const DEFAULT_NEWSLETTER_BRANDING: NewsletterBranding = {
  logoUrl: `${SITE_URL}/logo-transparent.webp`,
  primaryColor: '#1a2744',
  accentColor: '#c9a227',
  footerAddress: 'International Coaching Institute · Mumbai, India',
  footerTagline:
    'Insights from the institute — Stay updated with institute news, events, and coaching insights.',
  socialLinks: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/school/internationalcoachinginstitute',
    },
  ],
  senderName: 'International Coaching Institute',
  senderEmail: 'info@internationalcoachinginstitute.org',
  unsubscribeText: 'You are receiving this because you are an ICI student or newsletter subscriber.',
};

function parseSocialLinks(raw: unknown): NewsletterBranding['socialLinks'] {
  if (!Array.isArray(raw)) return DEFAULT_NEWSLETTER_BRANDING.socialLinks;
  return raw
    .filter((item): item is { label: string; url: string } => {
      if (!item || typeof item !== 'object') return false;
      const row = item as { label?: unknown; url?: unknown };
      return typeof row.label === 'string' && typeof row.url === 'string';
    })
    .map((item) => ({ label: item.label, url: item.url }));
}

export async function getNewsletterBranding(): Promise<NewsletterBranding> {
  try {
    const row = await prisma.newsletterBrandingSettings.findUnique({
      where: { id: 'singleton' },
    });
    if (!row) return DEFAULT_NEWSLETTER_BRANDING;

    return {
      logoUrl: row.logoUrl || DEFAULT_NEWSLETTER_BRANDING.logoUrl,
      primaryColor: row.primaryColor || DEFAULT_NEWSLETTER_BRANDING.primaryColor,
      accentColor: row.accentColor || DEFAULT_NEWSLETTER_BRANDING.accentColor,
      footerAddress: row.footerAddress || DEFAULT_NEWSLETTER_BRANDING.footerAddress,
      footerTagline: row.footerTagline || DEFAULT_NEWSLETTER_BRANDING.footerTagline,
      socialLinks: parseSocialLinks(row.socialLinks),
      senderName: row.senderName || DEFAULT_NEWSLETTER_BRANDING.senderName,
      senderEmail: row.senderEmail || DEFAULT_NEWSLETTER_BRANDING.senderEmail,
      unsubscribeText: row.unsubscribeText || DEFAULT_NEWSLETTER_BRANDING.unsubscribeText,
    };
  } catch {
    return DEFAULT_NEWSLETTER_BRANDING;
  }
}
