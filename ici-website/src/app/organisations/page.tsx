import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Organisations | International Coaching Institute',
}

export default async function OrganisationsPage() {
  const content = await getPageContent('organizations') // DB key is organizations

  return (
    <div className="bg-cream-50 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
          <div className="section-label mb-6">Hub</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {content.heading || 'Build a coaching culture, not just send people on a course'}
          </h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            {content.body || 'Most leadership training is forgotten within a month because it teaches ideas, not habits...'}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="max-w-4xl mx-auto bg-white p-10 text-center rounded-3xl shadow-sm border border-gray-100">
          <a href="/programmes/team-coaching" className="btn-primary inline-block">Explore Team Coaching</a>
        </AnimatedSection>
      </div>
    </div>
  )
}
