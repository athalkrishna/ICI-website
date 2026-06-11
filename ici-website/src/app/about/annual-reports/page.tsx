import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import { FileBarChart2, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Annual Reports | International Coaching Institute',
}

export default function AnnualReportsPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <section className="bg-navy-700 text-white pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        {/* Diagonal grid texture overlay */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden />
        {/* Gold gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-80" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Transparency</div>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Annual Reports
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <AnimatedSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="font-display text-4xl font-bold text-navy-800 mb-8">Annual Reports</h2>
            <p className="font-body text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              We believe an institution that asks people to trust it should be willing to show its workings. As ICI completes each year, we will publish a report covering what we set out to do, what we achieved, and what we learned.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-xl shadow-navy-900/5 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 text-navy-50 opacity-50 transform rotate-12">
                <FileBarChart2 size={200} strokeWidth={1} />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-800 mb-8 relative z-10">
                Until this year is fully complete, this is what we commit to reporting on, openly and without spin:
              </h3>
              
              <div className="space-y-6 relative z-10">
                {[
                  "Coaches trained and credentials awarded",
                  "How we upheld our assessment standard",
                  "Community, alumni and social-impact activity",
                  "What worked, what did not, and what we are changing"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center shrink-0 mt-0.5 border border-gold-100">
                      <div className="w-2.5 h-2.5 bg-gold-500 rounded-full"></div>
                    </div>
                    <div className="font-body text-xl text-gray-700 font-light">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </div>
  )
}
