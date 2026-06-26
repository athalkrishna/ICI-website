/** Client-approved copy for /prospectus — matches live frontend fallbacks. */
export const PROSPECTUS_DEFAULTS = {
  hero_eyebrow: 'Resources',
  hero_heading: 'Request Prospectus',
  hero_body:
    'If you would rather read at your own pace, the prospectus brings together the whole picture, from philosophy to practicalities, in a single document.',
  form_heading: 'Download the ICI Prospectus',
  form_subheading:
    'Enter your email to receive an instant link to download our comprehensive guide to coaching credentials.',
  form_placeholder_email: 'Your email address',
  form_submit_text: 'Download PDF',
  form_submitting_text: 'Sending...',
  form_success_message: 'Thank you. We will email you the prospectus shortly.',
  form_error_message: 'Something went wrong. Please try again.',
} as const;

export const PROSPECTUS_HERO_BODY_HTML = `<p>${PROSPECTUS_DEFAULTS.hero_body}</p>`;

export const PROSPECTUS_FORM_SECTION = 'Request Form';

export type ProspectusQuickFormCopy = {
  placeholderEmail: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
};

export function defaultProspectusQuickFormCopy(): ProspectusQuickFormCopy {
  const d = PROSPECTUS_DEFAULTS;
  return {
    placeholderEmail: d.form_placeholder_email,
    submitText: d.form_submit_text,
    submittingText: d.form_submitting_text,
    successMessage: d.form_success_message,
    errorMessage: d.form_error_message,
  };
}

/** Client-approved copy for /resources/brochure — matches live frontend fallbacks. */
export const BROCHURE_DEFAULTS = {
  hero_eyebrow: 'Prospectus',
  hero_heading: 'Everything in one place',
  hero_body:
    'If you would rather read at your own pace, the prospectus brings together the whole picture: the Mastery Pathway and its four levels, the specialisations you can pursue, pricing, and how admissions work. Tell us where to send it and it is yours.',
  form_heading: 'Request the prospectus',
  form_label_name: 'Name',
  form_label_email: 'Email',
  form_label_country: 'Country',
  form_label_interest: 'Level or specialism of interest',
  form_label_interest_optional: '(Optional)',
  form_placeholder_name: 'Your name',
  form_placeholder_email: 'you@example.com',
  form_country_placeholder: 'Select your country',
  form_country_uk: 'United Kingdom',
  form_country_us: 'United States',
  form_country_in: 'India',
  form_country_au: 'Australia',
  form_country_other: 'Other',
  form_interest_placeholder: 'Select a specialism',
  form_interest_catalyst: 'Catalyst',
  form_interest_executive: 'Executive Coaching',
  form_interest_team: 'Team Coaching',
  form_interest_other: 'Other',
  form_submit_text: 'Send me the prospectus',
  form_submitting_text: 'Sending...',
  form_footer_note:
    'We will email you the prospectus as soon as it is released, within the next few weeks.',
  form_success_message: 'Thank you. We will email you the prospectus shortly.',
  form_error_prefix: 'Something went wrong. Please email',
  contact_email: 'info@internationalcoachinginstitute.org',
} as const;

export const BROCHURE_HERO_BODY_HTML = `<p>${BROCHURE_DEFAULTS.hero_body}</p>`;

export const BROCHURE_SECTIONS = {
  hero: 'Hero',
  form: 'Request Form',
} as const;

export const BROCHURE_FORM_SECTION = BROCHURE_SECTIONS.form;

export type ProspectusFormCopy = {
  labels: {
    name: string;
    email: string;
    country: string;
    interest: string;
    interestOptional: string;
  };
  placeholders: {
    name: string;
    email: string;
    country: string;
    interest: string;
  };
  countryOptions: {
    uk: string;
    us: string;
    in: string;
    au: string;
    other: string;
  };
  interestOptions: {
    catalyst: string;
    executive: string;
    team: string;
    other: string;
  };
  submitText: string;
  submittingText: string;
  footerNote: string;
  successMessage: string;
  errorPrefix: string;
  contactEmail: string;
};

export function defaultProspectusFormCopy(): ProspectusFormCopy {
  const d = BROCHURE_DEFAULTS;
  return {
    labels: {
      name: d.form_label_name,
      email: d.form_label_email,
      country: d.form_label_country,
      interest: d.form_label_interest,
      interestOptional: d.form_label_interest_optional,
    },
    placeholders: {
      name: d.form_placeholder_name,
      email: d.form_placeholder_email,
      country: d.form_country_placeholder,
      interest: d.form_interest_placeholder,
    },
    countryOptions: {
      uk: d.form_country_uk,
      us: d.form_country_us,
      in: d.form_country_in,
      au: d.form_country_au,
      other: d.form_country_other,
    },
    interestOptions: {
      catalyst: d.form_interest_catalyst,
      executive: d.form_interest_executive,
      team: d.form_interest_team,
      other: d.form_interest_other,
    },
    submitText: d.form_submit_text,
    submittingText: d.form_submitting_text,
    footerNote: d.form_footer_note,
    successMessage: d.form_success_message,
    errorPrefix: d.form_error_prefix,
    contactEmail: d.contact_email,
  };
}

export function splitBrochureContactEmail(email: string): { user: string; domain: string } {
  const [user, ...rest] = email.split('@');
  return { user: user || 'info', domain: rest.join('@') || 'internationalcoachinginstitute.org' };
}
