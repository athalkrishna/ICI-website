/** Client-approved copy for /about/partnerships — matches live frontend fallbacks. */
export const PARTNERSHIPS_DEFAULTS = {
  hero_eyebrow: 'Collaborate with us',
  hero_heading: 'Partnerships & Alliances',
  hero_body:
    'Good coaching does not happen in isolation, and neither does good coaching education. We work with organisations that share our standard: universities and colleges, professional bodies, employers building a coaching culture, and platforms that help good coaches reach the people who need them. We partner where it genuinely raises the quality or reach of coaching, and we decline where it would only add a logo.',
  ways_heading: 'Ways we work together',
  ways: [
    'Training and certifying coaches inside organisations',
    'Co-developing programmes with institutions and employers',
    'Referral and delivery alliances with aligned platforms',
    'Community and social-impact collaborations',
  ],
  cta_heading: 'Partner with ICI',
  cta_body:
    'If your organisation develops people, or serves a community we could serve better together, we would like to hear from you.',
  cta_button_text: 'Discuss a partnership',
  cta_button_link: '/contact',
} as const;

export const PARTNERSHIPS_HERO_BODY_HTML = `<p>${PARTNERSHIPS_DEFAULTS.hero_body}</p>`;

export const PARTNERSHIPS_CTA_SECTION = 'Partner With ICI';
