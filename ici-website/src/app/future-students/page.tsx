import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Future Students | International Coaching Institute',
}

export default async function FutureStudentsPage() {
  const content = await getPageContent('future-students')

  return (
    <div className="bg-cream-50 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
          <div className="section-label mb-6">Hub</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {content.heading || 'Thinking about becoming a coach?'}
          </h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            {content.body || 'If you have ever been the person others come to, and wondered whether you could do it properly, this is where to start.'}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="max-w-4xl mx-auto bg-white p-10 text-center rounded-3xl shadow-sm border border-gray-100">
          <a href="/admissions" className="btn-primary inline-block">View Admissions Info</a>
        </AnimatedSection>
      </div>
    </div>
  )
}
