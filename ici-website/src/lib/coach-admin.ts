import { z } from 'zod';
import { jsonError, serverError } from '@/lib/api';

const enrolledLevel = z.enum(['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY']);
const specialisation = z.enum([
  'LIFE_COACHING',
  'EXECUTIVE_LEADERSHIP',
  'BUSINESS_COACHING',
  'HEALTH_WELLNESS',
  'TEAM_ORGANISATIONAL',
]);
const availability = z.enum(['TAKING_CLIENTS', 'WAITLIST']);

/** Accept empty values and bare domains; normalise to https URLs for storage. */
export const optionalCoachUrl = z
  .string()
  .max(2048)
  .optional()
  .nullable()
  .or(z.literal(''))
  .transform((value) => {
    const trimmed = (value ?? '').trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  });

export const coachWriteSchema = z.object({
  slug: z.string().min(1).max(100).optional(),
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().min(1),
  imageUrl: z.string().max(2048).optional().nullable().or(z.literal('')),
  specialisation: specialisation.optional().nullable(),
  credentialLevel: enrolledLevel.optional().nullable(),
  languages: z.string().optional(),
  location: z.string().optional().nullable(),
  availability: availability.optional(),
  bookingUrl: optionalCoachUrl,
  email: z.string().email().optional().nullable().or(z.literal('')),
  linkedinUrl: optionalCoachUrl,
  showOnFaculty: z.boolean().optional(),
  showInDirectory: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const coachUpdateSchema = coachWriteSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'No fields to update' },
);

export function coachApiError(err: unknown, context: string) {
  console.error(context, err);

  if (err && typeof err === 'object') {
    const code = 'code' in err ? String((err as { code: string }).code) : '';
    const message =
      'message' in err ? String((err as { message: string }).message) : '';

    if (code === 'P2002') {
      return jsonError('That URL slug is already in use. Try a different slug.');
    }

    if (
      code === 'P2021' ||
      ((message.includes('coaches') || message.includes('Coach')) &&
        (message.includes('does not exist') || message.includes("doesn't exist")))
    ) {
      return jsonError(
        'Coaches table is missing in the database. On the server run: npx prisma db push',
        503,
      );
    }

    const cause =
      'cause' in err && err.cause && typeof err.cause === 'object'
        ? (err.cause as { message?: string; originalMessage?: string })
        : null;
    const causeMessage = cause?.message ?? cause?.originalMessage ?? '';

    if (
      causeMessage.includes('ECONNREFUSED') ||
      causeMessage.includes('pool timeout') ||
      message.includes('pool timeout')
    ) {
      return jsonError(
        'Database connection failed. Check that MySQL is running and DATABASE_URL is set correctly.',
        503,
      );
    }
  }

  return serverError();
}
