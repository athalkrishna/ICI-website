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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Annual Reports
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 mb-24">
            <AnimatedSection className="lg:col-span-5 space-y-8">
              <h2 className="font-display text-4xl font-bold text-navy-800">Measuring what matters.</h2>
              <p className="font-body text-xl text-gray-700 leading-relaxed font-light">
                Because we believe in the measurable impact of good coaching, we believe in measuring our own. 
              </p>
              <p className="font-body text-xl text-gray-700 leading-relaxed font-light">
                Our first annual report will be published at the close of our first full financial year.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute -right-8 -top-8 text-navy-50 opacity-50 transform rotate-12">
                  <FileBarChart2 size={200} strokeWidth={1} />
                </div>
                <h3 className="font-display text-2xl font-bold text-navy-800 mb-8 relative z-10">What we will report on:</h3>
                
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                  {[
                    "Student outcomes and pass rates",
                    "Demographics and global spread",
                    "Scholarship and bursary distribution",
                    "Financial performance and reinvestment",
                    "Updates to our curriculum and faculty"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-gold-50 flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                      </div>
                      <div className="font-body text-lg text-gray-700">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold text-navy-800 mb-6">Archive</h2>
              <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Placeholder Card for future report */}
              <div className="bg-white p-8 rounded-[32px] border border-dashed border-gray-300 flex flex-col items-center justify-center text-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center text-navy-300 mb-6">
                  <FileBarChart2 size={32} />
                </div>
                <div className="font-sans text-sm font-bold uppercase tracking-widest text-navy-400 mb-2">Upcoming</div>
                <h3 className="font-display text-2xl font-bold text-navy-800 mb-6">2024 / 25 Impact Report</h3>
                <button disabled className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-400 rounded-full font-sans text-sm font-bold tracking-wide uppercase cursor-not-allowed">
                  <Download size={16} />
                  Available soon
                </button>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </div>
  )
}
