import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact | International Coaching Institute',
}

export default async function ContactPage() {
  const content = await getPageContent('contact')

  return (
    <div className="bg-cream-50 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
          <div className="section-label mb-6">Contact</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {content.heading || 'Talk to a human'}
          </h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            {content.body || 'Whatever brought you here, there is a person at ICI happy to help...'}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <p className="font-body text-gray-700 mb-6 text-center">For admissions enquiries, please visit the Admissions Contact page.</p>
          <Link href="/admissions/contact" className="btn-primary">Go to Admissions Contact</Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
