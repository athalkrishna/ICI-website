import ArticleLayout from '@/components/layout/ArticleLayout'
import { Metadata } from 'next'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsLegalHtml } from '@/lib/cms-helpers'
import { PRIVACY_CONTENT_HTML, PRIVACY_CONTENT_STUB } from '@/lib/legal-defaults'

export const metadata: Metadata = {
  title: 'Privacy Policy | International Coaching Institute',
  description: 'How the International Coaching Institute collects, uses and protects your personal data, and the rights you have over it.'
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
