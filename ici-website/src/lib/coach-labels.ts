import type { CoachAvailability, EnrolledLevel, Specialisation } from '@prisma/client';

export const COACH_SPECIALISATION_OPTIONS: { value: Specialisation; label: string }[] = [
  { value: 'LIFE_COACHING', label: 'Life' },
  { value: 'EXECUTIVE_LEADERSHIP', label: 'Executive' },
  { value: 'BUSINESS_COACHING', label: 'Business' },
  { value: 'HEALTH_WELLNESS', label: 'Wellness' },
  { value: 'TEAM_ORGANISATIONAL', label: 'Team' },
];

export const COACH_LEVEL_OPTIONS: { value: EnrolledLevel; label: string }[] = [
  { value: 'CATALYST', label: 'Catalyst' },
  { value: 'ARCHITECT', label: 'Architect' },
  { value: 'SAGE', label: 'Sage' },
  { value: 'LUMINARY', label: 'Luminary' },
];

export const COACH_AVAILABILITY_OPTIONS: { value: CoachAvailability; label: string }[] = [
  { value: 'TAKING_CLIENTS', label: 'Taking clients' },
  { value: 'WAITLIST', label: 'Waitlist' },
];

export function specialisationLabel(value: Specialisation | null | undefined): string {
  if (!value) return '';
  return COACH_SPECIALISATION_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function credentialLevelLabel(value: EnrolledLevel | null | undefined): string {
  if (!value) return '';
  return COACH_LEVEL_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function availabilityLabel(value: CoachAvailability): string {
  return COACH_AVAILABILITY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function parseLanguages(raw: string | null | undefined): string[] {
  if (!raw?.trim()) return ['English'];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function slugifyCoachName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
