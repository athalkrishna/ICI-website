import ArticleLayout from '@/components/layout/ArticleLayout'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsLegalHtml } from '@/lib/cms-helpers'
import { PRIVACY_CONTENT_HTML, PRIVACY_CONTENT_STUB } from '@/lib/legal-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/privacy');
}

export default async function PrivacyPage() {
  const content = await getPublishedPageContent('/privacy')

  return (
    <ArticleLayout
      title={cmsField(content, 'page_heading', 'Privacy Policy')}
      subtitle={cmsField(content, 'page_subtitle', 'Privacy')}
      image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
      lastUpdated={new Date('2024-01-01')}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: cmsLegalHtml(content, 'content', PRIVACY_CONTENT_HTML, [PRIVACY_CONTENT_STUB]),
        }}
      />
    </ArticleLayout>
  )
}
