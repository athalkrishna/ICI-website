import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'

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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
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
            <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
              
              <h2 className="font-display text-3xl font-bold text-white mb-8 relative z-10">
                Book a conversation
              </h2>
              
              <form className="space-y-6 relative z-10" action="#">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                      Name <span className="text-gold-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                      placeholder="Your full name"
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                      Phone <span className="text-blue-100/40 text-xs font-normal lowercase tracking-normal">(Optional)</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="country" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                      Country and time zone <span className="text-gold-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="country" 
                      required
                      className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                      placeholder="e.g. India (IST)"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="discuss" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                    What would you like to discuss? <span className="text-gold-500">*</span>
                  </label>
                  <textarea 
                    id="discuss" 
                    rows={4}
                    required
                    className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body resize-none"
                    placeholder="Tell us a bit about your background and what you're looking for..."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="times" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                    Preferred times <span className="text-gold-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="times" 
                    required
                    className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                    placeholder="e.g. Wednesday afternoons, or tomorrow morning"
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    Request a call
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <p className="font-body text-gray-600 mb-8 text-lg">
              Or reach us directly at <a href="tel:+919819984575" className="text-navy-900 font-bold hover:text-gold-500 transition-colors">(+91) 98199 84575</a> and <a href="mailto:info@internationalcoachinginstitute.org" className="text-navy-900 font-bold hover:text-gold-500 transition-colors">info@internationalcoachinginstitute.org</a>
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="#book" className="btn-primary">
                Request a call
              </Link>
              <Link href="/admissions" className="btn-outline">
                Take the free assessment
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </section>

    </div>
  )
}
