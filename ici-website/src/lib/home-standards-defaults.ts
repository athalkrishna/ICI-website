import { cmsField } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';

/** Client-approved homepage standards row — CMS fallbacks and repair baseline. */
export const HOME_STANDARDS_ITEMS = [
  { name: 'CRAFT', subtitle: 'ONE-TO-ONE MASTERY' },
  { name: 'EVIDENCE', subtitle: 'NEUROSCIENCE-BACKED' },
  { name: 'STANDARDS', subtitle: 'REAL COACHING ASSESSED' },
  { name: 'INTEGRITY', subtitle: 'A PROFESSIONAL CODE' },
  { name: 'ACCESS', subtitle: 'DELIVERED WORLDWIDE' },
] as const;

export const HOME_STANDARDS_SECTION_HEADING = 'The standard we hold ourselves to';

export const HOME_STANDARDS_FIELD_KEYS = HOME_STANDARDS_ITEMS.flatMap((_, i) => [
  `accreditation_${i + 1}_name`,
  `accreditation_${i + 1}_subtitle`,
]);

export const HOME_STANDARDS_LOCKED_KEYS = [
  'standards_section_heading',
  ...HOME_STANDARDS_FIELD_KEYS,
] as const;

export function lockedHomeStandardsDbValue(key: string): string {
  if (key === 'standards_section_heading') return HOME_STANDARDS_SECTION_HEADING;
  const match = key.match(/^accreditation_(\d+)_(name|subtitle)$/);
  if (!match) return '';
  const index = Number(match[1]) - 1;
  const item = HOME_STANDARDS_ITEMS[index];
  if (!item) return '';
  return match[2] === 'name' ? item.name : item.subtitle;
}

/** Read standards row from CMS with approved fallbacks. */
export function homeStandardsFromContent(content: ContentMap = {}) {
  return HOME_STANDARDS_ITEMS.map((item, i) => {
    const n = i + 1;
    return {
      name: cmsField(content, `accreditation_${n}_name`, item.name),
      subtitle: cmsField(content, `accreditation_${n}_subtitle`, item.subtitle),
    };
  });
}
