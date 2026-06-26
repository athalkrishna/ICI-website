/** Client-approved copy for /about/press — matches live frontend fallbacks. */
export const PRESS_DEFAULTS = {
  hero_eyebrow: 'Press & Media',
  hero_heading: 'Information for journalists and editors',
  hero_body:
    'For journalists, editors and event producers: ICI faculty speak and write on coaching, leadership, the inner life of high achievers, and how people actually change. We are glad to provide commentary, contributed articles and interviews on these themes.',
  media_enquiries_heading: 'Media Enquiries',
  media_response_time: 'All enquiries will be answered within 2 working days.',
  media_email: 'info@internationalcoachinginstitute.org',
  media_email_label: 'Email us',
  topics_heading: 'Topics our faculty can speak to',
  topics_body:
    'Coaching, leadership, the psychology of high achievers, and how people actually change.',
  press_kit_heading: 'Press Kit',
  press_kit_body: 'Download official ICI brand assets and background information.',
  press_kit_items: [
    { title: 'Logo & Brand Guidelines', type: 'ZIP', url: '' },
    { title: 'Institute Fact Sheet', type: 'PDF', url: '' },
    { title: 'Approved Descriptions', type: 'PDF', url: '' },
  ],
  cta_button_text:
    'For an interview or expert comment, contact info@internationalcoachinginstitute.org',
  cta_button_link: 'mailto:info@internationalcoachinginstitute.org',
} as const;

export const PRESS_HERO_BODY_HTML = `<p>${PRESS_DEFAULTS.hero_body}</p>`;

export const PRESS_SECTIONS = {
  media: 'Media Enquiries',
  topics: 'Topics Our Faculty Can Speak To',
  pressKit: 'Press Kit',
  cta: 'Bottom CTA',
} as const;
