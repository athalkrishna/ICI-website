'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Section from '@/components/layout/Section'

export default function NewsEvents() {
  return (
    <Section spacing="standard" className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <div className="text-eyebrow flex items-center gap-3 justify-center mb-4">Latest Updates</div>
          <h2 className="text-h2 text-brand-navy-700">News & Events</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="bg-cream-50 p-8 rounded-2xl h-full border border-gray-100">
              <h3 className="text-h3 text-brand-navy-700 mb-4">Upcoming Events</h3>
              <ul className="space-y-4">
                 {[1, 2].map((i) => (
                   <li key={i} className="flex gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                     <div className="bg-white px-4 py-2 rounded shadow-sm text-center border border-gray-100">
                       <div className="text-xs font-sans text-brand-gold-600 font-bold uppercase">Sep</div>
                       <div className="text-xl font-display font-bold text-brand-navy-700">1{i}</div>
                     </div>
                     <div>
                       <h4 className="font-sans font-bold text-brand-navy-700 text-sm">Global Summit 2026</h4>
                       <p className="font-body text-xs text-muted mt-1">Join thousands of coaches worldwide for our annual summit.</p>
                     </div>
                   </li>
                 ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="bg-cream-50 p-8 rounded-2xl h-full border border-gray-100">
              <h3 className="text-h3 text-brand-navy-700 mb-4">Institute News</h3>
              <ul className="space-y-4">
                {[1, 2].map((i) => (
                  <li key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                     <div className="text-xs font-sans text-gray-400 mb-1">August 12, 2026</div>
                     <h4 className="font-sans font-bold text-brand-navy-700 text-sm hover:text-brand-gold-500 cursor-pointer transition-colors">ICI Announces New Research Lab in Dubai</h4>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Section>
  )
}
