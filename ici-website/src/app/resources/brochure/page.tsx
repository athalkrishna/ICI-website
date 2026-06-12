import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import ProspectusForm from '@/components/shared/ProspectusForm'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Download the ICI Prospectus',
  description: 'Download the International Coaching Institute prospectus: the Mastery Pathway, specialisations, pricing and admissions, in one clear PDF.'
}

export default function BrochurePage() {
  return (
    <div className="bg-brand-navy-900 min-h-screen font-sans text-navy-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <h1 className="text-h1 text-white mb-8">
              Everything in one place
            </h1>
            <p className="text-muted-dark mb-12 text-body">
              If you would rather read at your own pace, the prospectus brings together the whole picture: the Mastery Pathway and its four levels, the specialisations you can pursue, pricing, and how admissions work. Tell us where to send it and it is yours.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="standard" className="relative z-20">
        <div className="max-w-xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-brand-navy-800/50 backdrop-blur-sm border-subtle p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
              
              <h2 className="text-h3 text-white mb-8 relative z-10 text-center">
                Request the prospectus
              </h2>
              
              {/* Confirm whether prospectus is gated (email required) or a direct download, and wire up accordingly */}
              <ProspectusForm />
            </div>
          </AnimatedSection>
        </div>
      </Section>

    </div>
  )
}
