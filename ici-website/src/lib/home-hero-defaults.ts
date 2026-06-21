import type { ContentMap } from './content';

/** Canonical home hero copy — fixed one-to-one homepage design. Do not change via CMS. */
export const HOME_HERO_DEFAULTS: Record<string, string> = {
  hero_eyebrow: 'One-to-one, online coaching certification',
  hero_heading: 'Where great coaches are made.',
  hero_body:
    'The International Coaching Institute trains and certifies coaches who want to do work that genuinely changes lives. Every programme is delivered one-to-one and online, blending rigorous coaching practice with leadership, psychology, neuroscience and human behaviour. Whether you are starting out or deepening an established practice, you will leave able to hold a room, read a person, and create lasting change. Become the coach people trust.',
  stat_1_number: '25000',
  stat_1_suffix: '+',
  stat_1_label: 'Coaches trained',
  stat_2_number: '60',
  stat_2_suffix: '+',
  stat_2_label: 'Countries reached',
  stat_3_number: '4',
  stat_3_suffix: '',
  stat_3_label: 'Credential levels',
  stat_4_number: '5',
  stat_4_suffix: '',
  stat_4_label: 'Campuses',
  hero_primary_button_text: 'Explore the Mastery Pathway',
  hero_primary_button_link: '/credentials',
  hero_secondary_button_text: 'Download Prospectus',
  hero_secondary_button_link: '/resources/brochure',
  hero_form_heading: 'Start your coaching journey',
  hero_form_subheading:
    'Free enquiry, no commitment. Tell us where you are and we will point you to the right level.',
  hero_form_button_text: 'Get Started',
  trust_point_1: 'One-to-one, never group classes',
  trust_point_2: 'Online, delivered worldwide',
  trust_point_3: 'Assessed on real coaching',
};

export const HOME_HERO_FIELD_KEYS = Object.keys(HOME_HERO_DEFAULTS) as (keyof typeof HOME_HERO_DEFAULTS)[];

const HOME_HERO_LOCKED_KEYS = new Set<string>(HOME_HERO_FIELD_KEYS);

export function isHomePageSlug(slug: string): boolean {
  return slug === '/';
}

export function isHomeHeroLockedField(key: string): boolean {
  return HOME_HERO_LOCKED_KEYS.has(key);
}

export function lockedHomeHeroDbValue(key: string): string {
  const canonical = HOME_HERO_DEFAULTS[key];
  if (!canonical) return '';
  return key === 'hero_body' ? `<p>${canonical}</p>` : canonical;
}

/** Always apply fixed hero copy — CMS values for these keys are ignored on the public site. */
export function normalizeHomeHeroContent(content: ContentMap): ContentMap {
  const next = { ...content };

  for (const key of HOME_HERO_FIELD_KEYS) {
    next[key] = lockedHomeHeroDbValue(key);
  }

  return next;
}
