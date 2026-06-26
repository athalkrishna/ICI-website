/** Client-approved copy for /about/accreditation — matches live frontend fallbacks. */
export const ACCREDITATION_DEFAULTS = {
  hero_eyebrow: 'Recognition & Accreditation',
  hero_heading: 'Standards you can stand behind',
  hero_body:
    'A credential is only worth what it can be trusted to mean. This page sets out how ICI holds its standard, the bodies it works with, and the recognition behind its credentials, stated plainly and only where it is genuinely earned. We would rather say less and be believed than claim more and be doubted.',
  standards_heading: 'How we hold our standard',
  standard_points: [
    'Every level is assessed on real coaching, not attendance',
    'Faculty are practising coaches held to a professional code',
    'Curriculum aligned to international coaching competency standards',
    'Independent review of our assessment process',
  ],
  accreditations_heading: 'Recognition & professional bodies',
  accreditations_intro:
    'We work with and align to recognised professional bodies where it genuinely applies to our programmes.',
  cta_link_1_text: 'See the Mastery Pathway',
  cta_link_1_url: '/credentials',
  cta_link_2_text: 'Contact us',
  cta_link_2_url: '/admissions/contact',
} as const;

export const ACCREDITATION_HERO_BODY_HTML = `<p>${ACCREDITATION_DEFAULTS.hero_body}</p>`;

export const ACCREDITATION_SECTION = 'How We Hold Our Standard';
