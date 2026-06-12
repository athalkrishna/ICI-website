import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/admissions/ContactForm'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Speak to an Advisor | ICI Admissions',
  description: 'Talk to an ICI advisor about programmes, levels, timing or cost. No script and no pressure, just a straight conversation to help you decide.'
}

export default function ContactAdmissionsPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">Speak to an Advisor</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Not sure? Talk it through
            </h1>
            <p className="text-muted-dark mb-12 text-body">
              Choosing how to train as a coach is a real decision, and sometimes you simply want to talk it through with someone who knows. That is what our advisors are for. Ask anything: about levels, timing, cost, or whether coaching is right for you at all. No script, no pressure.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="standard" className="relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-brand-navy-900 border-brand-navy-700 p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
              
              <h2 className="text-h3 text-white mb-8 relative z-10">
                Book a conversation
              </h2>
              
              <ContactForm />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <p className="text-muted text-body">
              Or reach us directly at <a href="tel:+919819984575" className="text-brand-navy-900 font-bold hover:text-brand-gold-500 transition-colors">(+91) 98199 84575</a> and <a href="mailto:info@internationalcoachinginstitute.org" className="text-brand-navy-900 font-bold hover:text-brand-gold-500 transition-colors">info@internationalcoachinginstitute.org</a>
            </p>
          </AnimatedSection>

        </div>
      </Section>

    </div>
  )
}
