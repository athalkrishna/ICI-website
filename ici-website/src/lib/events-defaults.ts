/** Client-approved copy for /events — matches live frontend fallbacks. */
export const EVENTS_DEFAULTS = {
  hero_eyebrow: 'Events',
  hero_heading: 'Where the community comes together',
  hero_body:
    'Some things only happen when people gather, even online. ICI events bring together coaches, leaders and the people we teach for masterclasses, summits and live sessions that go deeper than any recording can. Below are the events coming up. Each one is a chance to learn something real and meet people worth knowing.',
  upcoming_heading: 'Upcoming events',
  empty_state_body:
    'Our first public events are being scheduled. Register your interest and we will tell you first.',
  register_button_text: 'Register for event',
  cta_1_text: 'See all events',
  cta_1_link: '#all-events',
  cta_2_text: 'Register your interest',
  cta_2_link: '#events-form',
  masterclasses_heading: 'Masterclasses',
  masterclasses_body:
    'Short, focused live sessions led by ICI faculty and guests on specific aspects of the craft. Open to students, alumni and, where noted, the public.',
  masterclasses_cta_text: 'Register your interest',
  masterclasses_cta_link: '#events-form',
  form_placeholder_email: 'Your email address',
  form_submit_text: 'Notify me',
  form_submitting_text: 'Sending...',
  form_success_message: 'Thank you — we will be in touch.',
  form_error_message: 'Something went wrong. Please try again.',
} as const;

export const EVENTS_HERO_BODY_HTML = `<p>${EVENTS_DEFAULTS.hero_body}</p>`;

export const EVENTS_SECTIONS = {
  hero: 'Hero',
  upcoming: 'Upcoming Events',
  interestForm: 'Register Interest Form',
  masterclasses: 'Masterclasses',
} as const;

export type EventsFormCopy = {
  placeholderEmail: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
};

export function defaultEventsFormCopy(): EventsFormCopy {
  const d = EVENTS_DEFAULTS;
  return {
    placeholderEmail: d.form_placeholder_email,
    submitText: d.form_submit_text,
    submittingText: d.form_submitting_text,
    successMessage: d.form_success_message,
    errorMessage: d.form_error_message,
  };
}
