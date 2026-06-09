import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { Metadata } from 'next'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Joining ICI | Admissions',
}

export default async function AdmissionsPage() {
  const content = await getPageContent('admissions')

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        
        {/* Hero */}
        <AnimatedSection className="max-w-4xl mb-20 text-center mx-auto">
          <div className="section-label mb-6">Admissions</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {content.heading || 'Joining ICI'}
          </h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {content.body || 'Applying to ICI is meant to be human, not bureaucratic. There is no entrance exam and no long wait. We want to understand where you are, what you want to build, and which level will get you there, then help you take the next step with confidence. Here is exactly how it works.'}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          <AnimatedSection className="lg:col-span-8">
            <h2 className="font-display text-3xl font-bold text-navy-800 mb-8">{content.how_heading || 'How to apply'}</h2>
            <div className="space-y-6">
              {[
                content.how_1 || 'Choose your level, or take the free assessment if you are unsure.',
                content.how_2 || 'Submit a short application. It takes a few minutes and costs nothing.',
                content.how_3 || 'Speak with an advisor to confirm the right fit and answer your questions.',
                content.how_4 || 'Confirm your place and complete enrolment, in full or by instalments.',
                content.how_5 || 'Get matched with your coach and begin.'
              ].map((step, i) => (
                <div key={i} className="flex gap-6 bg-cream-50 p-6 md:p-8 rounded-2xl border border-gray-100">
                  <div className="text-gold-500 font-display text-3xl italic shrink-0">0{i+1}</div>
                  <div className="font-body text-lg text-gray-700 pt-1">{step}</div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/apply" className="btn-primary text-lg px-8 py-4">Start your application</Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-4 bg-navy-900 p-8 md:p-10 rounded-3xl text-white shadow-xl sticky top-32">
            <h2 className="font-display text-2xl font-bold mb-6 text-white">{content.entry_heading || 'Entry requirements'}</h2>
            <p className="font-body text-blue-100 leading-relaxed mb-8">
              {content.entry_body || 'Catalyst is open to anyone serious about learning to coach, with no prior qualification required. Higher levels require the level below or equivalent experience, which we confirm with you.'}
            </p>
            <div className="border-t border-white/10 pt-8 mt-8">
              <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-gold-400 mb-4">Still have questions?</h3>
              <p className="font-body text-sm text-blue-200 mb-6">
                Choosing a coaching programme is a real decision. Speak to an advisor, with no script and no pressure.
              </p>
              <Link href="/admissions/contact" className="btn-outline text-sm w-full text-center">Speak to an advisor</Link>
            </div>
          </AnimatedSection>

        </div>

      </div>
    </div>
  )
}
