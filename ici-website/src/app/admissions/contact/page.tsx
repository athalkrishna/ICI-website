import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/admissions/ContactForm'

export const metadata: Metadata = {
  title: 'Speak to an Advisor | ICI Admissions',
  description: 'Talk to an ICI advisor about programmes, levels, timing or cost. No script and no pressure, just a straight conversation to help you decide.'
}

export default function ContactAdmissionsPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <div className="section-label mb-8 justify-center text-gold-400">Speak to an Advisor</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Not sure? Talk it through
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              Choosing how to train as a coach is a real decision, and sometimes you simply want to talk it through with someone who knows. That is what our advisors are for. Ask anything: about levels, timing, cost, or whether coaching is right for you at all. No script, no pressure.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="py-24 relative z-20" id="book">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-navy-900 border border-navy-700 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
              
              <h2 className="font-display text-3xl font-bold text-white mb-8 relative z-10">
                Book a conversation
              </h2>
              
              <ContactForm />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <p className="font-body text-gray-600 text-lg">
              Or reach us directly at <a href="tel:+919819984575" className="text-navy-900 font-bold hover:text-gold-500 transition-colors">(+91) 98199 84575</a> and <a href="mailto:info@internationalcoachinginstitute.org" className="text-navy-900 font-bold hover:text-gold-500 transition-colors">info@internationalcoachinginstitute.org</a>
            </p>
          </AnimatedSection>

        </div>
      </section>

    </div>
  )
}
