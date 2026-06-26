/** Fallback copy for /about hero when CMS fields are empty. */
export const ABOUT_HERO_DEFAULTS = {
  hero_eyebrow: 'About the Institute',
  hero_heading: 'Coaching education with a soul and a standard',
  hero_body:
    'The International Coaching Institute exists because the world has enough people with advice and too few who can truly help someone change. We train coaches to do the harder, quieter work: to listen well, to see clearly, and to hold the space where real change happens. Our standards are demanding on purpose, because the people our graduates serve deserve nothing less.',
} as const;

export const ABOUT_HERO_BODY_HTML = `<p>${ABOUT_HERO_DEFAULTS.hero_body}</p>`;
