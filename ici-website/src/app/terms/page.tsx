import ArticleLayout from '@/components/layout/ArticleLayout'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsLegalHtml, cmsHeroEyebrow } from '@/lib/cms-helpers'
import { TERMS_CONTENT_HTML, TERMS_CONTENT_STUB } from '@/lib/legal-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/terms');
}

export default async function TermsPage() {
  const content = await getPublishedPageContent('/terms')

  return (
    <ArticleLayout
      title={cmsField(content, 'page_heading', 'Terms of Service')}
      subtitle={cmsHeroEyebrow(content, 'Terms')}
      image="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1920&q=80"
      lastUpdated={new Date('2024-01-01')}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: cmsLegalHtml(content, 'content', TERMS_CONTENT_HTML, [TERMS_CONTENT_STUB]),
        }}
      />
    </ArticleLayout>
  )
}
