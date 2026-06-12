import ArticleLayout from '@/components/layout/ArticleLayout'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy | International Coaching Institute',
  description: 'Our refund and cancellation policies for all ICI coaching programmes.'
}

export default function RefundsPage() {
  return (
    <ArticleLayout
      title="Refunds"
      subtitle="Policies"
      image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
      lastUpdated={new Date('2024-01-01')}
    >
      <p className="lead text-brand-navy-800 text-body">
        Our refund and cancellation policy ensures transparency and clarity before you commit to an ICI programme. Because our programmes are taught one-to-one and require scheduling with our faculty, your place is confirmed upon payment.
      </p>

      <h2>Programme Enrolment & Refunds</h2>
      <p>
        If you change your mind before your first scheduled session, please tell us in writing and we will refund your fee in full, less any payment-processing charges or non-refundable deposit.
      </p>
      <p>
        Once sessions have begun, fees are generally not refundable. This is because we reserve a specific coach&apos;s time exclusively for you. However, you may pause and resume your level within its suggested duration.
      </p>

      <h2>Exceptions</h2>
      <p>
        If exceptional circumstances (such as medical emergencies) prevent you from continuing your programme, please contact our admissions team. We review these situations on a case-by-case basis and may offer deferrals or partial refunds at our discretion.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about our refund policy, or wish to request a cancellation, please email us at <a href="mailto:info@internationalcoachinginstitute.org">info@internationalcoachinginstitute.org</a>.
      </p>
      
      <p className="mt-8">
        For more information on payment terms and conditions, please see our <Link href="/terms">Terms of Service</Link>.
      </p>

    </ArticleLayout>
  )
}
