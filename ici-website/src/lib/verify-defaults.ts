/** Client-approved copy for /verify — matches live frontend fallbacks. */
export const VERIFY_DEFAULTS = {
  hero_eyebrow: 'Credential Verification',
  hero_heading: 'Verify a Credential',
  hero_body:
    'Enter the unique reference number found on the coach\'s certificate to verify their active standing and credential level with the International Coaching Institute.',
  form_heading: 'Check a reference number',
  form_label: 'Coach reference number',
  form_placeholder: 'e.g. ICI-C-2026-00001',
  form_submit_text: 'Verify credential',
  form_submitting_text: 'Verifying…',
  success_heading: 'Authentic credential',
  success_subheading: 'This reference number is valid and currently active with ICI.',
  not_found_heading: 'Credential not found',
  not_found_body:
    'We could not find any active coach credential matching the reference number "{reference}". Please check the number and try again.',
  label_coach_name: 'Coach name',
  label_credential_level: 'Credential level',
  label_specialisation: 'Specialisation',
  label_issue_date: 'Issue date',
  label_reference_number: 'Reference number',
  info_heading: 'Where to find the number',
  info_step_1: 'Look at the bottom of the official ICI certificate or digital credential PDF.',
  info_step_2: 'The reference follows the format ICI-C-YYYY-##### (for example, ICI-C-2026-00001).',
  info_step_3: 'Enter the full reference exactly as printed, including hyphens.',
  info_note:
    'Only credentials issued by the International Coaching Institute can be verified here. If you need help, contact us at info@internationalcoachinginstitute.org.',
  info_badge: 'Official registry',
} as const;

export const VERIFY_SECTIONS = {
  hero: 'Hero',
  form: 'Verification Form',
  results: 'Result Messages',
  resultFields: 'Result Field Labels',
  sidebar: 'Sidebar Help',
} as const;

export type VerifyFormCopy = {
  formHeading: string;
  formLabel: string;
  placeholder: string;
  submitText: string;
  submittingText: string;
  successHeading: string;
  successSubheading: string;
  notFoundHeading: string;
  notFoundBody: string;
  labels: {
    coachName: string;
    level: string;
    specialisation: string;
    issueDate: string;
    referenceNumber: string;
  };
};

export function defaultVerifyFormCopy(): VerifyFormCopy {
  const d = VERIFY_DEFAULTS;
  return {
    formHeading: d.form_heading,
    formLabel: d.form_label,
    placeholder: d.form_placeholder,
    submitText: d.form_submit_text,
    submittingText: d.form_submitting_text,
    successHeading: d.success_heading,
    successSubheading: d.success_subheading,
    notFoundHeading: d.not_found_heading,
    notFoundBody: d.not_found_body,
    labels: {
      coachName: d.label_coach_name,
      level: d.label_credential_level,
      specialisation: d.label_specialisation,
      issueDate: d.label_issue_date,
      referenceNumber: d.label_reference_number,
    },
  };
}

export function formatNotFoundMessage(template: string, reference: string): string {
  return template.replace(/\{reference\}/g, reference);
}
