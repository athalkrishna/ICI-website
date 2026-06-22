import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import CredentialCourseJsonLd from '@/components/seo/CredentialCourseJsonLd';
import { getPublishedPageContent } from '@/lib/content';
import { CATALYST_CREDENTIAL } from '@/lib/credential-defaults';

const CMS_SLUG = '/credentials/catalyst';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(CMS_SLUG);
}

export default async function CatalystPage() {
  const content = await getPublishedPageContent(CMS_SLUG);
  return (
    <>
      <CredentialCourseJsonLd cmsSlug={CMS_SLUG} />
      <CredentialDetailView content={content} defaults={CATALYST_CREDENTIAL} />
    </>
  );
}
