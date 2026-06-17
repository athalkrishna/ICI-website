export type ProgrammeInterestValue =
  | 'LIFE_COACHING'
  | 'EXECUTIVE_LEADERSHIP'
  | 'BUSINESS_COACHING'
  | 'HEALTH_WELLNESS'
  | 'TEAM_ORGANISATIONAL'
  | 'NOT_SURE';

export type LeadSourceValue =
  | 'HOME_FORM'
  | 'CONTACT_FORM'
  | 'APPLY_FORM'
  | 'ASSESSMENT_FORM'
  | 'OTHER';

export function mapProgrammeInterest(value?: string | null): ProgrammeInterestValue {
  if (!value?.trim()) return 'NOT_SURE';

  const key = value.trim().toLowerCase();

  const map: Record<string, ProgrammeInterestValue> = {
    'life-coaching': 'LIFE_COACHING',
    'life coaching': 'LIFE_COACHING',
    life_coaching: 'LIFE_COACHING',
    'executive-leadership': 'EXECUTIVE_LEADERSHIP',
    'executive & leadership': 'EXECUTIVE_LEADERSHIP',
    'executive and leadership': 'EXECUTIVE_LEADERSHIP',
    executive_leadership: 'EXECUTIVE_LEADERSHIP',
    'executive coaching': 'EXECUTIVE_LEADERSHIP',
    'business-coaching': 'BUSINESS_COACHING',
    'business coaching': 'BUSINESS_COACHING',
    business_coaching: 'BUSINESS_COACHING',
    'health-wellness': 'HEALTH_WELLNESS',
    'health & wellness': 'HEALTH_WELLNESS',
    health_wellness: 'HEALTH_WELLNESS',
    'team-organisational': 'TEAM_ORGANISATIONAL',
    'team & organisational': 'TEAM_ORGANISATIONAL',
    'team and organisational': 'TEAM_ORGANISATIONAL',
    team_organisational: 'TEAM_ORGANISATIONAL',
    'team coaching': 'TEAM_ORGANISATIONAL',
    'not sure': 'NOT_SURE',
    not_sure: 'NOT_SURE',
  };

  if (map[key]) return map[key];

  const upper = value.trim().toUpperCase().replace(/[\s-]+/g, '_');
  const enums: ProgrammeInterestValue[] = [
    'LIFE_COACHING',
    'EXECUTIVE_LEADERSHIP',
    'BUSINESS_COACHING',
    'HEALTH_WELLNESS',
    'TEAM_ORGANISATIONAL',
    'NOT_SURE',
  ];
  if (enums.includes(upper as ProgrammeInterestValue)) return upper as ProgrammeInterestValue;

  return 'NOT_SURE';
}

export function isBotFieldValue(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function submitLeadRequest(payload: {
  fullName: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  programmeInterest: ProgrammeInterestValue;
  source: LeadSourceValue;
  message?: string | null;
  turnstileToken?: string;
}) {
  const res = await fetch('/api/leads/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Submission failed. Please try again.');
  }

  return res.json();
}
