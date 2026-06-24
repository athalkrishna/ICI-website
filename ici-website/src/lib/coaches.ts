import type { CoachAvailability, EnrolledLevel, Specialisation } from '@prisma/client';
import { prisma, hasDatabaseUrl } from '@/lib/prisma';
import { parseLanguages } from '@/lib/coach-labels';

export type CoachListing = {
  id: string;
  slug: string | null;
  name: string;
  title: string;
  bio: string;
  imageUrl: string | null;
  specialisation: Specialisation | null;
  credentialLevel: EnrolledLevel | null;
  languages: string[];
  location: string | null;
  availability: CoachAvailability;
  bookingUrl: string | null;
  email: string | null;
  linkedinUrl: string | null;
  source: 'cms' | 'alumni';
};

async function safeCoachQuery<T>(label: string, query: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabaseUrl()) return fallback;
  try {
    return await query();
  } catch (error) {
    console.warn(`[coaches] ${label} failed:`, error);
    return fallback;
  }
}

function mapCmsCoach(coach: {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string | null;
  specialisation: Specialisation | null;
  credentialLevel: EnrolledLevel | null;
  languages: string;
  location: string | null;
  availability: CoachAvailability;
  bookingUrl: string | null;
  email: string | null;
  linkedinUrl: string | null;
}): CoachListing {
  return {
    id: coach.id,
    slug: coach.slug,
    name: coach.name,
    title: coach.title,
    bio: coach.bio,
    imageUrl: coach.imageUrl,
    specialisation: coach.specialisation,
    credentialLevel: coach.credentialLevel,
    languages: parseLanguages(coach.languages),
    location: coach.location,
    availability: coach.availability,
    bookingUrl: coach.bookingUrl,
    email: coach.email,
    linkedinUrl: coach.linkedinUrl,
    source: 'cms',
  };
}

export async function getPublishedDirectoryCoaches(): Promise<CoachListing[]> {
  return safeCoachQuery('getPublishedDirectoryCoaches', async () => {
    const [cmsCoaches, alumni] = await Promise.all([
      prisma.coach.findMany({
        where: { isPublished: true, showInDirectory: true },
        orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      }),
      prisma.studentProfile.findMany({
        where: {
          credentialIssued: true,
          directoryOptIn: true,
          deletedAt: null,
          user: { status: 'ACTIVE' },
        },
        include: {
          user: { select: { name: true, avatarUrl: true } },
        },
        orderBy: { user: { name: 'asc' } },
      }),
    ]);

    const listings: CoachListing[] = cmsCoaches.map(mapCmsCoach);

    for (const profile of alumni) {
      const location = [profile.city, profile.country].filter(Boolean).join(', ') || profile.country;
      listings.push({
        id: `alumni-${profile.id}`,
        slug: null,
        name: profile.user.name,
        title: 'ICI Certified Coach',
        bio: 'ICI-certified coach available through the Find a Coach directory.',
        imageUrl: profile.user.avatarUrl,
        specialisation: profile.enrolledSpecialisation,
        credentialLevel: profile.enrolledLevel,
        languages: ['English'],
        location: location || null,
        availability: 'TAKING_CLIENTS',
        bookingUrl: null,
        email: null,
        linkedinUrl: null,
        source: 'alumni',
      });
    }

    return listings;
  }, []);
}

export async function getPublishedFacultyCoaches(): Promise<CoachListing[]> {
  return safeCoachQuery('getPublishedFacultyCoaches', async () => {
    const coaches = await prisma.coach.findMany({
      where: { isPublished: true, showOnFaculty: true },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });
    return coaches.map(mapCmsCoach);
  }, []);
}
