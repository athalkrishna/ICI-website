import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import AdmissionsFaq from './AdmissionsFaq'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: {
    absolute: 'Admissions | International Coaching Institute',
  },
  description: 'Everything you need to enrol at ICI. Explore entry requirements, programme levels, and speak to an advisor. Enrolment is open now.'
}

export default function AdmissionsPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="text-eyebrow flex items-center gap-3 mb-8 justify-start">Admissions</div>
            <h1 className="text-h1 text-white mb-8">
              Joining ICI
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Applying to ICI is meant to be human, not bureaucratic. There is no entrance exam and no long wait. We want to understand where you are, what you want to build, and which level will get you there, then help you take the next step with confidence. Here is exactly how it works.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Content Grid ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: How to apply */}
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-12">How to apply</h2>
              <ol className="space-y-8">
                {[
                  'Choose your level, or speak to an advisor if you are unsure.',
                  'Submit a short application. It takes a few minutes and costs nothing.',
                  'Speak with an advisor to confirm the right fit and answer your questions.',
                  'Confirm your place and complete enrolment, in full or by instalments.',
                  'Get matched with your coach and begin.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-6 text-muted font-body text-lg items-start">
                    <div className="text-brand-gold-500 font-display text-3xl italic shrink-0 leading-none mt-1">
                      0{i + 1}
                    </div>
                    <div className="pt-1">{item}</div>
                  </li>
                ))}
              </ol>
            </AnimatedSection>

            {/* Right Column: Entry & Pricing */}
            <div className="space-y-16">
              <AnimatedSection delay={0.1}>
                <h3 className="text-h3 text-brand-navy-900 mb-6 pb-4 border-b border-brand-navy-200">
                  Entry requirements
                </h3>
                <p className="text-muted mb-8 text-body">
                  Catalyst is open to anyone serious about learning to coach, with no prior qualification required. Higher levels require the level below or equivalent experience, which we confirm with you.
                </p>
                <div className="bg-white p-8 rounded-2xl shadow-md border border-navy-100">
                  <h4 className="font-sans font-bold text-h4 text-brand-navy-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-gold-500"></div>
                    Free assessment: which level is right for me?
                  </h4>
                  <p className="text-muted mb-6 text-body">
                    Not sure whether to start at Catalyst or higher? Our short, free assessment asks about your experience and goals and points you to the right starting place. No email wall, no pressure.
                  </p>
                  <Link href="/admissions/contact" className="text-brand-gold-700 font-sans font-bold hover:text-brand-gold-800 transition-colors inline-flex items-center gap-1">
                    Not sure where to start? Speak to an advisor <ChevronRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h3 className="text-h3 text-brand-navy-900 mb-6 pb-4 border-b border-brand-navy-200">
                  Tuition and pricing
                </h3>
                <p className="text-muted mb-6 text-body">
                  Every price is complete and set out plainly on our Pricing page, with instalment options available.
                </p>
                <Link href="/pricing" className="text-brand-gold-400 font-sans font-bold hover:text-brand-gold-300 transition-colors inline-flex items-center gap-1">
                  See pricing <ChevronRight size={16} />
                </Link>
              </AnimatedSection>
            </div>

          </div>
        </Container>
      </Section>

      {/* ── FAQs ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <div className="max-w-[800px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-h2 text-brand-navy-900 mb-4">Frequently asked questions</h2>
            <div className="w-24 h-1 bg-brand-gold-500 mx-auto" />
          </AnimatedSection>

          <AdmissionsFaq />

          <AnimatedSection delay={0.4} className="mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/apply" className="btn-primary">
                Start your application
              </Link>
              <Link href="/admissions/contact" className="btn-secondary-light">
                Speak to an Advisor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Section>

    </div>
  )
}
