import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import ApplyForm from '@/components/admissions/ApplyForm'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: {
    absolute: 'Apply to the International Coaching Institute',
  },
  description: 'Apply to ICI in minutes. Tell us your goals, choose your level, and an advisor will help you take the next step. Free to apply, no commitment.'
}

export default function ApplyPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <div className="text-eyebrow flex items-center gap-3 mb-8 justify-center">Admissions</div>
            <h1 className="text-h1 text-white mb-8">
              Apply to ICI
            </h1>
            <p className="font-body text-xl text-muted-dark leading-relaxed mb-12">
              This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you. Most people say the hardest part was deciding to begin. You are already here.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-100 rounded-full blur-[100px] opacity-50 translate-x-1/3 -translate-y-1/3" />
              
              <ApplyForm />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <h2 className="font-display text-2xl font-bold text-brand-navy-900 mb-4">After you apply</h2>
            <p className="font-body text-muted leading-relaxed max-w-lg mx-auto">
              We review your application and arrange a short conversation to confirm the right level and answer your questions. Then, if it is a fit, we help you enrol and begin.
            </p>
          </AnimatedSection>

        </div>
      </Section>

    </div>
  )
}
