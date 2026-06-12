import ArticleLayout from '@/components/layout/ArticleLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complaints Policy | International Coaching Institute',
  description: 'How to file a complaint with the International Coaching Institute and our process for resolving it.'
}

export default function ComplaintsPage() {
  return (
    <ArticleLayout
      title="Complaints Policy"
      subtitle="Complaints"
      image="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1920&q=80"
      lastUpdated={new Date('2024-01-01')}
    >
      <p className="lead text-brand-navy-800 text-body">
        The International Coaching Institute is committed to providing a high-quality service to all our students and clients. If you are unhappy with any aspect of our service, we want to know about it so we can put it right.
      </p>

      <h2>How to make a complaint</h2>
      <p>
        If you have a complaint, please contact us with the details. You can do this by:
      </p>
      <ul>
        <li>Emailing us at: info@internationalcoachinginstitute.org</li>
        <li>Writing to us at our registered office address</li>
      </ul>

      <h2>What happens next?</h2>
      <p>
        We will send you a letter or email acknowledging receipt of your complaint within three days of receiving it, enclosing a copy of this procedure.
      </p>
      <p>
        We will then investigate your complaint. This will normally involve passing your complaint to our management team, who will review your file and speak to any members of staff who dealt with you.
      </p>

      <h2>Resolution</h2>
      <p>
        We will invite you to a meeting or arrange a phone call to discuss and hopefully resolve your complaint. We will do this within 14 days of sending you the acknowledgement letter.
      </p>
      <p>
        Within three days of the meeting, we will write to you to confirm what took place and any solutions we have agreed with you.
      </p>

    </ArticleLayout>
  )
}
