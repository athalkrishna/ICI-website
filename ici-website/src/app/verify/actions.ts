'use server'

import { prisma } from '@/lib/db'

export type VerifyResult = {
  found: boolean;
  coachName?: string;
  level?: string;
  specialisation?: string;
  issueDate?: string;
};

export async function verifyCredential(referenceNumber: string): Promise<VerifyResult> {
  if (!referenceNumber || typeof referenceNumber !== 'string') {
    return { found: false };
  }

  // Clean the input
  const cleanRef = referenceNumber.trim();

  try {
    const profile = await prisma.studentProfile.findUnique({
      where: {
        credentialNumber: cleanRef,
      },
      include: {
        user: true,
      },
    });

    if (!profile) {
      return { found: false };
    }

    // Format enums nicely
    const formatEnum = (val: string | null | undefined) => {
      if (!val) return 'Not Specified';
      return val.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return {
      found: true,
      coachName: profile.user?.name || 'Unknown Coach',
      level: formatEnum(profile.enrolledLevel),
      specialisation: formatEnum(profile.enrolledSpecialisation),
      issueDate: profile.credentialIssueDate ? profile.credentialIssueDate.toISOString() : undefined,
    };
  } catch (error) {
    console.error('Error verifying credential:', error);
    return { found: false };
  }
}
