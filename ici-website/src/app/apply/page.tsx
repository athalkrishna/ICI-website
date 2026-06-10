import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply to the International Coaching Institute',
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
              
              <form className="space-y-6 relative z-10" action="#">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Full name <span className="text-gold-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required 
                      className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Email <span className="text-gold-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Phone <span className="text-gray-500 text-xs font-normal lowercase tracking-normal">(Optional)</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="country" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Country <span className="text-gold-500">*</span>
                    </label>
                    <select 
                      id="country" 
                      required
                      defaultValue=""
                      className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
                    >
                      <option value="" disabled>Select your country</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="AU">Australia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                    Level of interest <span className="text-gold-500">*</span>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {['Catalyst', 'Architect', 'Sage', 'Luminary', 'Not sure yet'].map((level) => (
                      <label key={level} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-cream-50 cursor-pointer hover:border-gold-500 transition-colors">
                        <input type="radio" name="level" value={level} className="w-4 h-4 text-gold-500 bg-white border-gray-300 focus:ring-gold-500/50" required />
                        <span className="font-body text-navy-900">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialism" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                    Specialism of interest <span className="text-gray-500 text-xs font-normal lowercase tracking-normal">(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    id="specialism" 
                    className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                    placeholder="e.g. Executive Coaching, Health & Wellness"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="experience" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                    Your current experience with coaching <span className="text-gold-500">*</span>
                  </label>
                  <textarea 
                    id="experience" 
                    rows={3}
                    required
                    className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body resize-none"
                    placeholder="Briefly describe your background..."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="goals" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                    What you hope to achieve <span className="text-gold-500">*</span>
                  </label>
                  <textarea 
                    id="goals" 
                    rows={3}
                    required
                    className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body resize-none"
                    placeholder="What are your goals for taking this programme?"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="source" className="block font-sans text-sm font-bold text-navy-900 uppercase tracking-wider">
                    How did you hear about us? <span className="text-gray-500 text-xs font-normal lowercase tracking-normal">(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    id="source" 
                    className="w-full bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                    placeholder="e.g. LinkedIn, a colleague, Google search"
                  />
                </div>

                <div className="pt-6 text-center">
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base mb-4">
                    Submit application
                  </button>
                  <p className="font-body text-sm text-gray-500">
                    Free to apply. No commitment. An advisor will be in touch within 2 working days.
                  </p>
                </div>
              </form>
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
