import ArticleLayout from '@/components/layout/ArticleLayout'
import { Metadata } from 'next'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Privacy Policy | International Coaching Institute',
  description: 'How the International Coaching Institute collects, uses and protects your personal data, and the rights you have over it.'
}

const PRIVACY_CONTENT_FALLBACK = `
<p class="lead text-brand-navy-800 text-body">The International Coaching Institute ([legal entity name], we, us, our) respects your privacy and is committed to protecting your personal data. This policy explains what we collect, why, how we use it, and the rights you have.</p>
<h2>Who we are</h2>
<p>[Legal entity name], registered at [address], is the data controller for the personal data described here. For any privacy question, contact [privacy email].</p>
<h2>What we collect</h2>
<ul>
<li><strong>Information you give us:</strong> name, contact details, application and enrolment details, payment information, and anything you share when you contact us.</li>
<li><strong>Information collected automatically:</strong> device and usage data through cookies and similar technologies.</li>
<li><strong>Information from others:</strong> for example if your organisation enrols you.</li>
</ul>
<h2>How we use it</h2>
<ul>
<li>To respond to enquiries and process your application and enrolment</li>
<li>To deliver our programmes and support your learning</li>
<li>To manage payments and our relationship with you</li>
<li>To send information you have asked for, and, where permitted, relevant updates you can opt out of at any time</li>
<li>To improve our website and services</li>
<li>To meet legal obligations</li>
</ul>
<h2>Legal bases</h2>
<p>Where applicable law requires a legal basis, we rely on your consent, the performance of a contract, our legitimate interests, and compliance with legal obligations, as relevant to each use above.</p>
<h2>Sharing your data</h2>
<p>We do not sell your personal data. We share it only with service providers who help us run the institute (such as payment, hosting and email providers) under appropriate safeguards, and where required by law.</p>
<h2>International transfers</h2>
<p>As an institute serving clients in many countries, your data may be processed outside your home country. Where this happens, we put appropriate safeguards in place. [Confirm specifics with counsel.]</p>
<h2>How long we keep it</h2>
<p>We keep personal data only as long as necessary for the purposes described, or as required by law, then delete or anonymise it.</p>
<h2>Your rights</h2>
<p>Depending on where you live, you may have the right to access, correct, delete or restrict the use of your data, to object to certain processing, to data portability, and to withdraw consent. To exercise any right, contact [privacy email]. You may also have the right to complain to a data protection authority.</p>
<h2>Cookies</h2>
<p>We use cookies to make the site work and to understand how it is used. You can manage your preferences through our cookie settings.</p>
<h2>Changes and contact</h2>
<p>We may update this policy from time to time; the latest version will always be on this page. Questions: [privacy email], or write to us at [address].</p>
`.trim()

export default async function PrivacyPage() {
  const content = await getPublishedPageContent('/privacy')

  return (
    <ArticleLayout
      title={cmsField(content, 'page_heading', 'Privacy Policy')}
      subtitle={cmsField(content, 'page_subtitle', 'Privacy')}
      image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
      lastUpdated={new Date('2024-01-01')}
    >
      <div dangerouslySetInnerHTML={{ __html: cmsHtml(content, 'content', PRIVACY_CONTENT_FALLBACK) }} />
    </ArticleLayout>
  )
}
