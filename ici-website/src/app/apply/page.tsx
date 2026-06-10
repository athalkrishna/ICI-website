import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import ApplyForm from '@/components/admissions/ApplyForm'

export const metadata: Metadata = {
  title: {
    absolute: 'Apply to the International Coaching Institute',
  },
  description: 'Apply to ICI in minutes. Tell us your goals, choose your level, and an advisor will help you take the next step. Free to apply, no commitment.'
}

export default function ApplyPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <div className="section-label mb-8 justify-center text-gold-400">Admissions</div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Apply to ICI
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you. Most people say the hardest part was deciding to begin. You are already here.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="py-16 lg:py-24 relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[32px] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-100 rounded-full blur-[100px] opacity-50 translate-x-1/3 -translate-y-1/3" />
              
              <ApplyForm />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">After you apply</h2>
            <p className="font-body text-gray-600 leading-relaxed max-w-lg mx-auto">
              We review your application and arrange a short conversation to confirm the right level and answer your questions. Then, if it is a fit, we help you enrol and begin.
            </p>
          </AnimatedSection>

        </div>
      </section>

    </div>
  )
}
