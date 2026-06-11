import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coaching Resources, Insights & Prospectus | ICI',
  description: 'Free coaching resources from ICI: articles on leadership, psychology and change, plus the prospectus. Practical thinking for coaches and the people they serve.'
}

export default function ResourcesPage() {
  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="section-label mb-8 justify-start text-gold-400">Resources</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Thinking worth your time
            </h1>
            <p className="font-body text-xl md:text-2xl text-blue-100/80 leading-relaxed font-light max-w-3xl mb-12">
              Good coaching rests on good thinking. Here we share articles, guides and tools on leadership, psychology, neuroscience and the real work of change, written to be useful rather than impressive. Whether you are deciding whether to train, sharpening an established practice, or simply trying to understand yourself a little better, start here.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Insights and articles ── */}
      <section className="py-24 relative z-20" id="insights">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-6">Insights and articles</h2>
            <p className="font-body text-xl md:text-2xl text-blue-100/80 leading-relaxed font-light max-w-3xl mb-12">
              Regular writing from ICI faculty on the themes at the heart of our work: self-mastery, leadership, relationships, the psychology of high achievers, and how change actually happens.
            </p>
            {/* Link to live insights/blog feed at /blog */}
            <div className="mt-8">
              <Link href="/blog" className="btn-outline">
                Browse our blog
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Download the prospectus & Guides ── */}
      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            <AnimatedSection>
              <h2 className="font-display text-4xl font-bold text-white mb-6">Download the prospectus</h2>
              <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-8">
                Everything about our programmes, credentials and admissions in one place.
              </p>
              <Link href="/resources/brochure" className="btn-primary inline-flex items-center gap-2">
                Download the prospectus <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="font-display text-4xl font-bold text-white mb-6">Guides and tools</h2>
              <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-8">
                Practical resources for coaches and curious clients.
              </p>
              {/* Additional guides and tools to be added as published */}
              
              <div className="mt-12">
                <Link href="#insights" className="text-gold-400 font-sans font-bold hover:text-gold-300 transition-colors inline-flex items-center gap-1">
                  Browse all resources
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

    </div>
  )
}
