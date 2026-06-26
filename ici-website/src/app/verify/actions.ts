'use server'

import { prisma } from '@/lib/prisma'
import { credentialLevelLabel } from '@/lib/coach-labels'
import type { EnrolledLevel, Specialisation } from '@prisma/client'

export type VerifyResult = {
  found: boolean
  coachName?: string
  level?: string
  specialisation?: string
  issueDate?: string
  credentialNumber?: string
}

const SPECIALISATION_DISPLAY: Record<Specialisation, string> = {
  LIFE_COACHING: 'Certified Life Coach',
  EXECUTIVE_LEADERSHIP: 'Executive & Leadership Coaching',
  BUSINESS_COACHING: 'Business Coach',
  HEALTH_WELLNESS: 'Health & Wellness Coach',
  TEAM_ORGANISATIONAL: 'Team & Organisational Coaching',
}

function specialisationDisplay(value: Specialisation | null | undefined): string {
  if (!value) return 'Not specified'
  return SPECIALISATION_DISPLAY[value] ?? value
}

export async function verifyCredential(referenceNumber: string): Promise<VerifyResult> {
  if (!referenceNumber || typeof referenceNumber !== 'string') {
    return { found: false }
  }

  const cleanRef = referenceNumber.trim().toUpperCase()
  if (!cleanRef) {
    return { found: false }
  }

  try {
    const profile = await prisma.studentProfile.findFirst({
      where: {
        credentialNumber: cleanRef,
        credentialIssued: true,
        deletedAt: null,
      },
      include: {
        user: { select: { name: true } },
      },
    })

    if (!profile?.credentialNumber) {
      return { found: false }
    }

    return {
      found: true,
      coachName: profile.user?.name || 'Unknown Coach',
      level: credentialLevelLabel(profile.enrolledLevel as EnrolledLevel | null) || 'Not specified',
      specialisation: specialisationDisplay(profile.enrolledSpecialisation),
      issueDate: profile.credentialIssueDate?.toISOString(),
      credentialNumber: profile.credentialNumber,
    }
  } catch (error) {
    console.error('Error verifying credential:', error)
    return { found: false }
  }
}
