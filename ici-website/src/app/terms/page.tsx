import ArticleLayout from '@/components/layout/ArticleLayout'
import { Metadata } from 'next'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Terms of Service | International Coaching Institute',
  description: 'The terms that govern your use of the ICI website and our programmes, including enrolment, payment, intellectual property and liability.'
}

const TERMS_CONTENT_FALLBACK = `
<p class="lead text-brand-navy-800 text-body">These terms govern your use of the International Coaching Institute website and your enrolment in our programmes. By using this site or enrolling, you agree to them.</p>
<h2>Who we are</h2>
<p>This website is operated by [legal entity name], registered at [address] (we, us, our).</p>
<h2>Using our website</h2>
<p>You agree to use the site lawfully and not to misuse it, disrupt it, or attempt to access areas you are not authorised to access.</p>
<h2>Enrolment and programmes</h2>
<p>When you enrol, you agree to the level details, schedule and requirements provided to you. Places may be limited and are confirmed on payment or an agreed payment plan.</p>
<h2>Fees, payment and refunds</h2>
<p>Fees, payment terms, instalment options and our refund and cancellation policy are set out at the point of enrolment. [State your actual policy here in full, including any cooling-off period and the conditions for refunds.]</p>
<h2>Credentials</h2>
<p>Credentials are awarded only on successful completion of the relevant requirements and assessment. The ICI credentials are Catalyst, Architect, Sage and Luminary, awarded by the International Coaching Institute.</p>
<h2>Code of conduct</h2>
<p>Students and members agree to engage respectfully and ethically. We may suspend or remove access for serious or repeated breaches.</p>
<h2>Intellectual property</h2>
<p>All course materials, content and branding remain the property of [legal entity name] or its licensors. You may use materials for your own learning but may not copy, share or resell them without written permission.</p>
<h2>Disclaimers</h2>
<p>Our programmes provide coaching education. Coaching is not therapy, counselling or medical advice, and we make no guarantee of any specific income, career or personal outcome.</p>
<h2>Limitation of liability and governing law</h2>
<p>To the extent permitted by law, our liability is limited as set out here. These terms are governed by the laws of [jurisdiction], and disputes are subject to the courts of [jurisdiction]. [Confirm with counsel.]</p>
<h2>Changes and contact</h2>
<p>We may update these terms from time to time; the current version will always be on this page. Questions: [email].</p>
`.trim()

export default async function TermsPage() {
  const content = await getPublishedPageContent('/terms')

  return (
    <ArticleLayout
      title={cmsField(content, 'page_heading', 'Terms of Service')}
      subtitle={cmsField(content, 'page_subtitle', 'Terms')}
      image="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1920&q=80"
      lastUpdated={new Date('2024-01-01')}
    >
      <div dangerouslySetInnerHTML={{ __html: cmsHtml(content, 'content', TERMS_CONTENT_FALLBACK) }} />
    </ArticleLayout>
  )
}
