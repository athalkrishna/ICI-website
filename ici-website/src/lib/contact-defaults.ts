/** Client-approved copy for /contact — matches live frontend fallbacks. */
export const CONTACT_DEFAULTS = {
  hero_eyebrow: 'Contact',
  hero_heading: 'Talk to a human',
  hero_subheading:
    'Whatever brought you here, there is a person at ICI happy to help. Ask about programmes, credentials, timing, cost, or training a team. No script and no pressure, just a straight conversation.',
  info_heading: 'Other ways to reach us',
  phone_label: 'WhatsApp Number',
  phone_display: '+91 98199 84575',
  email_label: 'Email',
  contact_email: 'info@internationalcoachinginstitute.org',
  hours_label: 'Hours',
  hours_display: 'Mon-Fri, 9:00 AM - 6:00 PM (IST)',
  form_label_name: 'Name',
  form_label_email: 'Email',
  form_label_phone: 'WhatsApp Number',
  form_label_topic: 'What can we help with?',
  form_label_message: 'Your message',
  form_placeholder_name: 'Your name',
  form_placeholder_email: 'you@example.com',
  form_placeholder_phone: '+1 (555) 000-0000',
  form_topic_placeholder: 'Select a topic',
  form_topic_programmes: 'Programmes & admissions',
  form_topic_organisational: 'Organisational training',
  form_topic_alumni: 'Alumni & community',
  form_topic_media: 'Media & press',
  form_topic_other: 'Something else',
  form_placeholder_message: 'How can we help you?',
  form_gdpr_prefix:
    'I consent to the collection and processing of my personal data in accordance with the',
  form_gdpr_link_text: 'Privacy Policy',
  form_gdpr_suffix: 'for the purpose of handling this inquiry.',
  form_submit_text: 'Send message',
  form_submitting_text: 'Sending...',
  form_success_heading: 'Message Sent!',
  form_success_message: 'Thank you. An advisor will be in touch within 2 working days.',
  form_error_prefix: 'Something went wrong. Please email',
  form_error_suffix: '.',
} as const;

export const CONTACT_SECTIONS = {
  hero: 'Hero',
  contactInfo: 'Contact Information',
  form: 'Contact Form',
} as const;

export type ContactFormCopy = {
  labels: {
    name: string;
    email: string;
    phone: string;
    topic: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    topic: string;
    message: string;
  };
  topicOptions: {
    programmes: string;
    organisational: string;
    alumni: string;
    media: string;
    other: string;
  };
  gdpr: {
    prefix: string;
    linkText: string;
    suffix: string;
  };
  submitText: string;
  submittingText: string;
  successHeading: string;
  successMessage: string;
  errorPrefix: string;
  errorSuffix: string;
  contactEmail: string;
};

export function defaultContactFormCopy(): ContactFormCopy {
  const d = CONTACT_DEFAULTS;
  return {
    labels: {
      name: d.form_label_name,
      email: d.form_label_email,
      phone: d.form_label_phone,
      topic: d.form_label_topic,
      message: d.form_label_message,
    },
    placeholders: {
      name: d.form_placeholder_name,
      email: d.form_placeholder_email,
      phone: d.form_placeholder_phone,
      topic: d.form_topic_placeholder,
      message: d.form_placeholder_message,
    },
    topicOptions: {
      programmes: d.form_topic_programmes,
      organisational: d.form_topic_organisational,
      alumni: d.form_topic_alumni,
      media: d.form_topic_media,
      other: d.form_topic_other,
    },
    gdpr: {
      prefix: d.form_gdpr_prefix,
      linkText: d.form_gdpr_link_text,
      suffix: d.form_gdpr_suffix,
    },
    submitText: d.form_submit_text,
    submittingText: d.form_submitting_text,
    successHeading: d.form_success_heading,
    successMessage: d.form_success_message,
    errorPrefix: d.form_error_prefix,
    errorSuffix: d.form_error_suffix,
    contactEmail: d.contact_email,
  };
}

export function splitContactEmail(email: string): { user: string; domain: string } {
  const [user, ...rest] = email.split('@');
  return { user: user || 'info', domain: rest.join('@') || 'internationalcoachinginstitute.org' };
}
