import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Community | International Coaching Institute',
}

export default async function CommunityPage() {
  const content = await getPageContent('community')

  return (
    <div className="bg-cream-50 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
          <div className="section-label mb-6">Community</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {content.heading || 'You will not be coaching alone'}
          </h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            {content.body || 'Coaching can be quietly isolating...'}
          </p>
        </AnimatedSection>
        
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <AnimatedSection delay={0.2}>
            <h2 className="font-display text-3xl font-bold text-navy-800 mb-8">{content.offers_heading || 'What the community offers'}</h2>
            <ul className="space-y-6">
              {[content.offer_1, content.offer_2, content.offer_3, content.offer_4, content.offer_5].filter(Boolean).map((offer, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="text-gold-500 font-display text-2xl mt-1">✦</span>
                  <span className="font-body text-lg text-gray-700">{offer}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
