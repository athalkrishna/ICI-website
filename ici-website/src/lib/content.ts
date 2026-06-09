import { query } from '@/lib/db';

export type ContentMap = Record<string, string>;

// These fallbacks are identical to the seed script to guarantee the site never breaks
const FALLBACKS: Record<string, ContentMap> = {
  home: {
    hero_eyebrow: 'One-to-one, online coaching certification',
    hero_heading: 'Where great coaches are made.',
    hero_body: 'The International Coaching Institute trains and certifies coaches who want to do work that genuinely changes lives. Every programme is delivered one-to-one and online, blending rigorous coaching practice with leadership, psychology, neuroscience and human behaviour. Whether you are starting out or deepening an established practice, you will leave able to hold a room, read a person, and create lasting change. Become the coach people trust.',
    hero_btn_primary: 'Explore the Mastery Pathway',
    hero_btn_primary_url: '/credentials',
    hero_btn_secondary: 'Download Prospectus',
    hero_btn_secondary_url: '/resources/brochure',
  },
  global: {
    site_name: 'International Coaching Institute',
    phone: '(+91) 98199 84575',
    email: 'info@internationalcoachinginstitute.org',
  }
};

export async function getPageContent(pageSlug: string): Promise<ContentMap> {
  try {
    const rows: any = await query(
      `SELECT section_key, content_value FROM site_content WHERE page_slug = ? OR page_slug = 'global'`,
      [pageSlug]
    );

    if (!rows || rows.length === 0) {
      console.warn(`[CMS WARNING] No DB content found for ${pageSlug}. Using fallbacks.`);
      return { ...FALLBACKS.global, ...FALLBACKS[pageSlug] } || {};
    }

    const contentMap: ContentMap = {};
    for (const row of rows) {
      contentMap[row.section_key] = row.content_value;
    }

    // Merge with fallbacks so missing keys don't break the UI
    const pageFallbacks = FALLBACKS[pageSlug] || {};
    return { ...FALLBACKS.global, ...pageFallbacks, ...contentMap };

  } catch (error) {
    console.error(`[CMS CRITICAL ERROR] Failed to fetch content for ${pageSlug}:`, error);
    // In production, this could trigger an email or Slack alert to the dev team
    return { ...FALLBACKS.global, ...FALLBACKS[pageSlug] } || {};
  }
}
