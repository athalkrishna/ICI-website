/** Client-approved copy for /apply — matches live frontend fallbacks. */
export const APPLY_DEFAULTS = {
  hero_eyebrow: 'APPLY',
  hero_heading: 'Take the first step',
  hero_body:
    'This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you. Most people say the hardest part was deciding to begin. You are already here.',
  after_apply_heading: 'After you apply',
  after_apply_body:
    'We review your application and arrange a short conversation to confirm the right level and answer your questions. Then, if it is a fit, we help you enrol and begin.',
  success_heading: 'Application received',
  success_body:
    'Thank you for applying to the International Coaching Institute. We will review your application and an advisor will be in touch within 2 working days.',
  form_label_name: 'Full name',
  form_label_email: 'Email',
  form_label_phone: 'WhatsApp Number',
  form_label_country: 'Country',
  form_label_level: 'Level of interest',
  form_label_specialism: 'Specialism of interest',
  form_label_experience: 'Your current experience with coaching',
  form_label_goals: 'What you hope to achieve',
  form_label_source: 'How did you hear about us?',
  form_label_source_optional: '(Optional)',
  form_placeholder_name: 'Your full name',
  form_placeholder_email: 'you@example.com',
  form_placeholder_phone: '+1 (555) 000-0000',
  form_placeholder_country: 'Select your country',
  form_placeholder_level: 'Select a level',
  form_placeholder_specialism: 'e.g. Executive Coaching, Health & Wellness',
  form_placeholder_experience: 'Briefly describe your background...',
  form_placeholder_goals: 'What are your goals for taking this programme?',
  form_placeholder_source: 'e.g. LinkedIn, a colleague, Google search',
  form_submit_text: 'Submit application',
  form_submitting_text: 'Submitting...',
  form_footer_note: 'Free to apply. No commitment. An advisor will be in touch within 2 working days.',
  form_error_message: 'There was an error submitting your application. Please try again later.',
  form_captcha_error: 'Please complete the CAPTCHA',
} as const;

export const APPLY_HERO_BODY_HTML = `<p>${APPLY_DEFAULTS.hero_body}</p>`;

export const APPLY_FORM_SECTION = 'Application Form';
export const APPLY_AFTER_SECTION = 'After You Apply';

export type ApplyFormCopy = {
  labels: {
    name: string;
    email: string;
    phone: string;
    country: string;
    level: string;
    specialism: string;
    experience: string;
    goals: string;
    source: string;
    sourceOptional: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    country: string;
    level: string;
    specialism: string;
    experience: string;
    goals: string;
    source: string;
  };
  submitText: string;
  submittingText: string;
  footerNote: string;
  errorMessage: string;
  captchaError: string;
  successHeading: string;
  successBody: string;
};

export function defaultApplyFormCopy(): ApplyFormCopy {
  const d = APPLY_DEFAULTS;
  return {
    labels: {
      name: d.form_label_name,
      email: d.form_label_email,
      phone: d.form_label_phone,
      country: d.form_label_country,
      level: d.form_label_level,
      specialism: d.form_label_specialism,
      experience: d.form_label_experience,
      goals: d.form_label_goals,
      source: d.form_label_source,
      sourceOptional: d.form_label_source_optional,
    },
    placeholders: {
      name: d.form_placeholder_name,
      email: d.form_placeholder_email,
      phone: d.form_placeholder_phone,
      country: d.form_placeholder_country,
      level: d.form_placeholder_level,
      specialism: d.form_placeholder_specialism,
      experience: d.form_placeholder_experience,
      goals: d.form_placeholder_goals,
      source: d.form_placeholder_source,
    },
    submitText: d.form_submit_text,
    submittingText: d.form_submitting_text,
    footerNote: d.form_footer_note,
    errorMessage: d.form_error_message,
    captchaError: d.form_captcha_error,
    successHeading: d.success_heading,
    successBody: d.success_body,
  };
}
