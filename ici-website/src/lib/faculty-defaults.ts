/** Client-approved copy for /faculty — matches live frontend fallbacks. */
export const FACULTY_DEFAULTS = {
  hero_eyebrow: 'Faculty & Research',
  hero_heading: 'Taught by people who still do the work',
  hero_body:
    'A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers, people who carry real client work into the room with them. Alongside our teaching, we share thinking on coaching, leadership and the psychology of change, because the field only advances when practitioners keep questioning it.',
  faculty_section_heading: 'Our faculty',
  faculty_section_body:
    'ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour. Many continue to coach senior leaders while they teach, so what you learn reflects how coaching actually works today. Because we teach one-to-one, you work closely with a coach matched to your level and focus.',
  research_heading: 'Our approach to research and thinking',
  research_body:
    'Coaching deserves rigour. We draw on coaching psychology, behavioural science and neuroscience, test ideas against real practice, and share what we learn through articles and teaching. The aim is not theory for its own sake, but better coaching for the people our graduates serve.',
  cta_button_text: 'Read our latest insights',
  cta_button_link: '/resources',
  themes_heading: 'Themes we explore',
  theme_1: 'The inner life of high achievers, including the loneliness of success',
  theme_2: 'How change really happens in the brain and the nervous system',
  theme_3: 'Leadership as a practice of self-mastery',
  theme_4: 'Defence mechanisms, projection and the patterns that shape behaviour',
  theme_5: 'Contemplative traditions and modern behavioural science in dialogue',
  faculty_empty_message: 'Coach profiles will appear here once published in the admin.',
} as const;

export const FACULTY_HERO_BODY_HTML = `<p>${FACULTY_DEFAULTS.hero_body}</p>`;
export const FACULTY_SECTION_BODY_HTML = `<p>${FACULTY_DEFAULTS.faculty_section_body}</p>`;

export const FACULTY_THEME_ITEMS = [
  FACULTY_DEFAULTS.theme_1,
  FACULTY_DEFAULTS.theme_2,
  FACULTY_DEFAULTS.theme_3,
  FACULTY_DEFAULTS.theme_4,
  FACULTY_DEFAULTS.theme_5,
] as const;

export const FACULTY_SECTIONS = {
  hero: 'Hero',
  faculty: 'Our Faculty',
  research: 'Research & Thinking',
  themes: 'Themes We Explore',
} as const;
