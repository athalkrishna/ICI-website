import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Faculty | International Coaching Institute',
}

export default async function FacultyPage() {
  const content = await getPageContent('faculty')

  return (
    <div className="bg-cream-50 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
          <div className="section-label mb-6">Community</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {content.heading || 'Taught by people who still do the work'}
          </h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            {content.body || 'A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers, people who carry real client work into the room with them.'}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="font-display text-3xl font-bold text-navy-800 mb-6">{content.faculty_heading || 'Our faculty'}</h2>
          <p className="font-body text-lg text-gray-700 leading-relaxed">
            {content.faculty_body || 'ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour...'}
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}
