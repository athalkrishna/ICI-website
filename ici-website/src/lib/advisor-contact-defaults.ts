/** Client-approved copy for /admissions/contact — matches live frontend fallbacks. */
export const ADVISOR_CONTACT_DEFAULTS = {
  hero_eyebrow: 'Speak to an Advisor',
  hero_heading: 'Not sure? Talk it through',
  hero_subheading:
    'Choosing how to train as a coach is a real decision, and sometimes you simply want to talk it through with someone who knows. That is what our advisors are for. Ask anything: about levels, timing, cost, or whether coaching is right for you at all. No script, no pressure.',
  booking_heading: 'Book a conversation',
  booking_body: 'Tell us a little about yourself and we will arrange a call at a time that suits you.',
  form_label_name: 'Name',
  form_label_email: 'Email',
  form_label_phone: 'WhatsApp Number',
  form_label_country: 'Country and time zone',
  form_label_discuss: 'What would you like to discuss?',
  form_label_times: 'Preferred times',
  form_placeholder_name: 'Your full name',
  form_placeholder_email: 'you@example.com',
  form_placeholder_phone: '+1 (555) 000-0000',
  form_placeholder_country: 'e.g. India (IST)',
  form_placeholder_discuss: "Tell us a bit about your background and what you're looking for...",
  form_placeholder_times: 'e.g. Wednesday afternoons, or tomorrow morning',
  form_gdpr_prefix: 'I consent to the collection and processing of my personal data in accordance with the',
  form_gdpr_link_text: 'Privacy Policy',
  form_gdpr_suffix: 'for the purpose of handling this inquiry.',
  form_submit_text: 'Request a call',
  form_submitting_text: 'Submitting...',
  form_secondary_text: 'Take the free assessment',
  form_secondary_link: '/admissions/assessment',
  form_success_heading: 'Request received',
  form_success_body:
    'Thank you. An advisor will review your request and get back to you shortly to confirm a time for your conversation.',
  form_success_again_text: 'Send another request',
  form_error_message: 'There was an error submitting your request. Please try again later.',
  form_captcha_error: 'Please complete the CAPTCHA',
  direct_contact_prefix: 'Or reach us directly at',
  direct_contact_and: 'and',
  phone_display: '(+91) 98199 84575',
  phone_link: 'tel:+919819984575',
  contact_email: 'info@internationalcoachinginstitute.org',
} as const;

export const ADVISOR_CONTACT_SECTIONS = {
  booking: 'Book a Conversation',
  form: 'Contact Form',
  direct: 'Direct Contact',
} as const;

export type AdvisorContactFormCopy = {
  labels: {
    name: string;
    email: string;
    phone: string;
    country: string;
    discuss: string;
    times: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    country: string;
    discuss: string;
    times: string;
  };
  gdpr: {
    prefix: string;
    linkText: string;
    suffix: string;
  };
  submitText: string;
  submittingText: string;
  secondaryText: string;
  secondaryLink: string;
  successHeading: string;
  successBody: string;
  successAgainText: string;
  errorMessage: string;
  captchaError: string;
};

export function defaultAdvisorContactFormCopy(): AdvisorContactFormCopy {
  const d = ADVISOR_CONTACT_DEFAULTS;
  return {
    labels: {
      name: d.form_label_name,
      email: d.form_label_email,
      phone: d.form_label_phone,
      country: d.form_label_country,
      discuss: d.form_label_discuss,
      times: d.form_label_times,
    },
    placeholders: {
      name: d.form_placeholder_name,
      email: d.form_placeholder_email,
      phone: d.form_placeholder_phone,
      country: d.form_placeholder_country,
      discuss: d.form_placeholder_discuss,
      times: d.form_placeholder_times,
    },
    gdpr: {
      prefix: d.form_gdpr_prefix,
      linkText: d.form_gdpr_link_text,
      suffix: d.form_gdpr_suffix,
    },
    submitText: d.form_submit_text,
    submittingText: d.form_submitting_text,
    secondaryText: d.form_secondary_text,
    secondaryLink: d.form_secondary_link,
    successHeading: d.form_success_heading,
    successBody: d.form_success_body,
    successAgainText: d.form_success_again_text,
    errorMessage: d.form_error_message,
    captchaError: d.form_captcha_error,
  };
}

export function splitContactEmail(email: string): { user: string; domain: string } {
  const [user, ...rest] = email.split('@');
  return { user: user || 'info', domain: rest.join('@') || 'internationalcoachinginstitute.org' };
}
