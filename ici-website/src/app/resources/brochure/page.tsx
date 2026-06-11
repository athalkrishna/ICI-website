import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import ProspectusForm from '@/components/shared/ProspectusForm'

export const metadata: Metadata = {
  title: 'Download the ICI Prospectus',
  description: 'Download the International Coaching Institute prospectus: the Mastery Pathway, specialisations, pricing and admissions, in one clear PDF.'
}

export default function BrochurePage() {
  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Everything in one place
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              If you would rather read at your own pace, the prospectus brings together the whole picture: the Mastery Pathway and its four levels, the specialisations you can pursue, pricing, and how admissions work. Tell us where to send it and it is yours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
              
              <h2 className="font-display text-3xl font-bold text-white mb-8 relative z-10 text-center">
                Request the prospectus
              </h2>
              
              {/* Confirm whether prospectus is gated (email required) or a direct download, and wire up accordingly */}
              <ProspectusForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
