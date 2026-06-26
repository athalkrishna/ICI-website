/** Client-approved copy for /about/annual-reports — matches live frontend fallbacks. */
export const ANNUAL_REPORTS_DEFAULTS = {
  hero_eyebrow: 'Transparency',
  hero_heading: 'Annual Reports',
  hero_body:
    'We believe an institution that asks people to trust it should be willing to show its workings. As ICI completes each year, we will publish a report covering what we set out to do, what we achieved, and what we learned.',
  commitments_heading:
    'Until this year is fully complete, this is what we commit to reporting on, openly and without spin:',
  commitments: [
    'Coaches trained and credentials awarded',
    'How we upheld our assessment standard',
    'Community, alumni and social-impact activity',
    'What worked, what did not, and what we are changing',
  ],
  subscribe_heading: 'Get notified when we publish',
  subscribe_body: 'Leave your email to receive our annual reports directly in your inbox.',
  subscribe_placeholder: 'Email Address',
  subscribe_button_text: 'Subscribe',
  subscribe_loading_text: 'Subscribing...',
  subscribe_success_title: 'Thank you!',
  subscribe_success_body:
    "You're now subscribed. We'll email you when our next annual report is published.",
  subscribe_error_message: 'There was an error. Please try again.',
} as const;

export const ANNUAL_REPORTS_HERO_BODY_HTML = `<p>${ANNUAL_REPORTS_DEFAULTS.hero_body}</p>`;

export const ANNUAL_REPORTS_SUBSCRIBE_SECTION = 'Email Subscription';
