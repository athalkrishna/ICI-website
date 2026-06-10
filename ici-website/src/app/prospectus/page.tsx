import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Prospectus | International Coaching Institute',
}

export default async function ProspectusPage() {
  const content = await getPageContent('prospectus')

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
            <div className="section-label mb-8 justify-center text-gold-400">Resources</div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Request Prospectus
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              {content.body || 'If you would rather read at your own pace, the prospectus brings together the whole picture, from philosophy to practicalities, in a single document.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="py-16 lg:py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection delay={0.2} className="max-w-4xl mx-auto bg-white p-8 md:p-16 text-center rounded-[32px] shadow-xl border border-gray-100">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Download the ICI Prospectus</h2>
            <p className="font-body text-gray-600 mb-8 max-w-xl mx-auto">Enter your email to receive an instant link to download our comprehensive guide to coaching credentials.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
               <input type="email" placeholder="Your email address" required className="flex-1 bg-cream-50 border border-gray-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
               <button type="submit" className="btn-primary justify-center">Download PDF</button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
