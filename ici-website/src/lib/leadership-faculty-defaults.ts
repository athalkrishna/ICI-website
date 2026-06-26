/** Client-approved copy for /about/leadership-faculty — matches live frontend fallbacks. */
export const LEADERSHIP_FACULTY_DEFAULTS = {
  hero_eyebrow: 'About ICI',
  hero_heading: 'Leadership & Faculty',
  hero_subheading: 'Taught by coaches, for coaches.',
  hero_body:
    'ICI programmes are delivered live, online and one-to-one, by faculty who still coach. You practise from early on, receive supervision, and are assessed on real coaching, not multiple-choice tests. The blend of leadership thinking, applied psychology, neuroscience and reflective practice means you come to understand both the person in front of you and yourself.',
  faculty_section_heading: 'Meet our faculty coaches',
  cta_link_1_text: 'Explore the Mastery Pathway',
  cta_link_1_url: '/credentials',
  cta_link_2_text: 'Speak to an advisor',
  cta_link_2_url: '/contact',
} as const;

export const LEADERSHIP_FACULTY_BODY_HTML = `<p>${LEADERSHIP_FACULTY_DEFAULTS.hero_body}</p>`;
