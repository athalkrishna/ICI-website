import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import { FileBarChart2, Download } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Annual Reports | International Coaching Institute',
}

export default function AnnualReportsPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        <Container className="relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">Transparency</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Annual Reports
            </h1>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Main Content ── */}
      <Section spacing="standard" className="lg:py-32">
        <Container>
          
          <AnimatedSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-h2 text-brand-navy-800 mb-8">Annual Reports</h2>
            <p className="font-body text-xl md:text-2xl text-navy-700 leading-relaxed font-light">
              We believe an institution that asks people to trust it should be willing to show its workings. As ICI completes each year, we will publish a report covering what we set out to do, what we achieved, and what we learned.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <div className="absolute -right-8 -top-8 text-brand-navy-50 opacity-50 transform rotate-12">
                <FileBarChart2 size={200} strokeWidth={1} />
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 relative z-10">
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
                    <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center shrink-0 mt-0.5 border border-brand-gold-100">
                      <div className="w-2.5 h-2.5 bg-brand-gold-500 rounded-full"></div>
                    </div>
                    <div className="font-body text-xl text-navy-700 font-light">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </Container>
      </Section>
    </div>
  )
}
