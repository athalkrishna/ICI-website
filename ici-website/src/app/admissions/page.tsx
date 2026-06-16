import { Metadata } from 'next';
import AdmissionsOverviewView from '@/components/admissions/AdmissionsOverviewView';
import { getPublishedPageContent } from '@/lib/content';
import { ADMISSIONS_OVERVIEW } from '@/lib/admissions-overview-defaults';

export const metadata: Metadata = {
  title: {
    absolute: 'Admissions | International Coaching Institute',
  },
  description:
    'Everything you need to enrol at ICI. Explore entry requirements, programme levels, and speak to an advisor. Enrolment is open now.',
};

export default async function AdmissionsPage() {
  const content = await getPublishedPageContent('/admissions');

  return <AdmissionsOverviewView content={content} defaults={ADMISSIONS_OVERVIEW} />;
}
