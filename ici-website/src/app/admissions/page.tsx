import type { Metadata } from 'next';

import AdmissionsOverviewView from '@/components/admissions/AdmissionsOverviewView';

import FaqPageJsonLd from '@/components/seo/FaqPageJsonLd';

import { getPublishedPageContent } from '@/lib/content';

import { pageMetadata } from '@/lib/page-metadata';

import { ADMISSIONS_OVERVIEW } from '@/lib/admissions-overview-defaults';



export async function generateMetadata(): Promise<Metadata> {

  return pageMetadata('/admissions');

}



export default async function AdmissionsPage() {

  const content = await getPublishedPageContent('/admissions');



  return (

    <>

      <FaqPageJsonLd cmsSlug="/admissions" faqDefaults={ADMISSIONS_OVERVIEW.faqs} />

      <AdmissionsOverviewView content={content} defaults={ADMISSIONS_OVERVIEW} />

    </>

  );

}

