/** Client-approved copy for /about/mission — matches live frontend fallbacks. */
export const MISSION_DEFAULTS = {
  hero_eyebrow: 'About the Institute',
  hero_heading: 'Mission, vision and values',
  mission_heading: 'Our mission',
  mission_body:
    'To raise the standard of coaching by training and certifying coaches who combine genuine skill with genuine self-awareness.',
  vision_heading: 'Our vision',
  vision_body:
    'A world where good coaching is widely available and widely trusted, and where leaders are measured by how well they help others grow.',
  values_heading: 'What we value',
  value_title_1: 'Depth over performance',
  value_desc_1: 'We prize real understanding of people over polished technique.',
  value_title_2: 'Evidence with humanity',
  value_desc_2: 'We teach what the science supports, in language that respects the person in front of you.',
  value_title_3: 'Practice, not theory',
  value_desc_3: 'Every concept is tied to what happens in a real session.',
  value_title_4: 'Self-mastery first',
  value_desc_4: 'A coach can only take a client as far as they have gone themselves.',
} as const;

export const MISSION_BODY_HTML = `<p>${MISSION_DEFAULTS.mission_body}</p>`;
export const VISION_BODY_HTML = `<p>${MISSION_DEFAULTS.vision_body}</p>`;

export const MISSION_SECTIONS = {
  hero: 'Hero',
  mission: 'Our Mission',
  vision: 'Our Vision',
  values: 'What We Value',
} as const;
