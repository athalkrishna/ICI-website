import ArticleLayout from '@/components/layout/ArticleLayout'
import { Metadata } from 'next'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsLegalHtml } from '@/lib/cms-helpers'
import { TERMS_CONTENT_HTML, TERMS_CONTENT_STUB } from '@/lib/legal-defaults'

export const metadata: Metadata = {
  title: 'Terms of Service | International Coaching Institute',
  description: 'The terms that govern your use of the ICI website and our programmes, including enrolment, payment, intellectual property and liability.'
}

export default async function TermsPage() {
  const content = await getPublishedPageContent('/terms')

  return (
    <ArticleLayout
      title={cmsField(content, 'page_heading', 'Terms of Service')}
      subtitle={cmsField(content, 'page_subtitle', 'Terms')}
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
