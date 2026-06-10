import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
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
              <form className="space-y-6 relative z-10" action="#">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                    Name <span className="text-gold-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                    Email <span className="text-gold-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="country" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                    Country <span className="text-gold-500">*</span>
                  </label>
                  <select 
                    id="country" 
                    required
                    defaultValue=""
                    className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
                  >
                    <option value="" disabled>Select your country</option>
                    <option value="UK">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    <option value="AU">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                    Level or specialism of interest <span className="text-blue-100/40 text-xs font-normal lowercase tracking-normal">(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    id="interest" 
                    className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                    placeholder="e.g. Catalyst, Executive Coaching"
                  />
                </div>

                <div className="pt-4 text-center">
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base mb-4">
                    Send me the prospectus
                  </button>
                  <p className="font-body text-sm text-blue-100/50 leading-relaxed">
                    We will email the PDF straight away and, with your permission, occasional updates you can opt out of at any time.
                  </p>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
