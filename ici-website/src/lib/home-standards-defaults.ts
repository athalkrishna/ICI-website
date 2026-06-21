/** Fixed homepage standards row — matches approved design spec. */
export const HOME_STANDARDS_ITEMS = [
  { name: 'CRAFT', subtitle: 'ONE-TO-ONE MASTERY' },
  { name: 'EVIDENCE', subtitle: 'NEUROSCIENCE-BACKED' },
  { name: 'STANDARDS', subtitle: 'REAL COACHING ASSESSED' },
  { name: 'INTEGRITY', subtitle: 'A PROFESSIONAL CODE' },
  { name: 'ACCESS', subtitle: 'DELIVERED WORLDWIDE' },
] as const;

export const HOME_STANDARDS_FIELD_KEYS = HOME_STANDARDS_ITEMS.flatMap((_, i) => [
  `accreditation_${i + 1}_name`,
  `accreditation_${i + 1}_subtitle`,
]);

export function lockedHomeStandardsDbValue(key: string): string {
  const match = key.match(/^accreditation_(\d+)_(name|subtitle)$/);
  if (!match) return '';
  const index = Number(match[1]) - 1;
  const item = HOME_STANDARDS_ITEMS[index];
  if (!item) return '';
  return match[2] === 'name' ? item.name : item.subtitle;
}
