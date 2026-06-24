/** Approved homepage SEO — fixed and not editable via CMS (same pattern as home hero). */
export const HOME_SEO_KEYWORDS_ADDITIONAL = [
  'online coaching certification',
  'coaching certification institute',
  'become a coach',
  'life coach certification',
  'executive coach certification',
] as const;

export const HOME_SEO_DEFAULTS = {
  meta_title: 'International Coaching Institute | Become a Certified Coach',
  meta_description:
    'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
  focus_keyword: 'international coaching institute',
  seo_keywords: HOME_SEO_KEYWORDS_ADDITIONAL.join(', '),
} as const;

export const HOME_SEO_KEYWORD_LIST = [
  HOME_SEO_DEFAULTS.focus_keyword,
  ...HOME_SEO_KEYWORDS_ADDITIONAL,
] as const;

export const HOME_SEO_FIELD_KEYS = Object.keys(HOME_SEO_DEFAULTS) as (keyof typeof HOME_SEO_DEFAULTS)[];

const HOME_SEO_LOCKED_KEYS = new Set<string>(HOME_SEO_FIELD_KEYS);

export function isHomeSeoLockedField(key: string): boolean {
  return HOME_SEO_LOCKED_KEYS.has(key);
}

export function lockedHomeSeoDbValue(key: string): string {
  const canonical = HOME_SEO_DEFAULTS[key as keyof typeof HOME_SEO_DEFAULTS];
  return canonical ?? '';
}

/** Homepage canonical must match the trailing-slash URL browsers use. */
export function homeCanonicalUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, '')}/`;
}
