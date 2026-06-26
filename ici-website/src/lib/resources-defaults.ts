/** Client-approved copy for /resources — matches live frontend fallbacks. */
export const RESOURCES_DEFAULTS = {
  hero_eyebrow: 'Resources',
  hero_heading: 'Thinking worth your time',
  hero_body:
    'Good coaching rests on good thinking. Here we share articles, guides and tools on leadership, psychology, neuroscience and the real work of change, written to be useful rather than impressive. Whether you are deciding whether to train, sharpening an established practice, or simply trying to understand yourself a little better, start here.',
  insights_heading: 'Insights and articles',
  insights_body:
    'Regular writing from ICI faculty on the themes at the heart of our work: self-mastery, leadership, relationships, the psychology of high achievers, and how change actually happens.',
  insights_cta_text: 'Browse our blog',
  insights_cta_link: '/blog',
  prospectus_heading: 'Download the prospectus',
  resource_1_description:
    'Everything about our programmes, credentials and admissions in one place.',
  prospectus_cta_text: 'Download the prospectus',
  brochure_download_link: '/resources/brochure',
  guides_heading: 'Guides and tools',
  guides_body: 'Practical resources for coaches and curious clients.',
  guides_cta_text: 'Browse all resources',
  guides_cta_link: '#insights',
} as const;

export const RESOURCES_HERO_BODY_HTML = `<p>${RESOURCES_DEFAULTS.hero_body}</p>`;

export const RESOURCES_SECTIONS = {
  hero: 'Hero',
  insights: 'Insights & Articles',
  prospectus: 'Download the Prospectus',
  guides: 'Guides and Tools',
} as const;
