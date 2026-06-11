import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Coaching Resources, Insights & Prospectus | ICI',
  description: 'Free coaching resources from ICI: articles on leadership, psychology and change, plus the prospectus. Practical thinking for coaches and the people they serve.'
}

export default function ResourcesPage() {
  return (
    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="text-eyebrow flex items-center gap-3 mb-8 justify-start">Resources</div>
            <h1 className="text-h1 text-white mb-8">
              Thinking worth your time
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Good coaching rests on good thinking. Here we share articles, guides and tools on leadership, psychology, neuroscience and the real work of change, written to be useful rather than impressive. Whether you are deciding whether to train, sharpening an established practice, or simply trying to understand yourself a little better, start here.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Insights and articles ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-h2 text-white mb-6">Insights and articles</h2>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Regular writing from ICI faculty on the themes at the heart of our work: self-mastery, leadership, relationships, the psychology of high achievers, and how change actually happens.
            </p>
            {/* Link to live insights/blog feed at /blog */}
            <div className="mt-8">
              <Link href="/blog" className="btn-outline">
                Browse our blog
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Download the prospectus & Guides ── */}
      <Section spacing="standard" className="bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            <AnimatedSection>
              <h2 className="text-h2 text-white mb-6">Download the prospectus</h2>
              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                Everything about our programmes, credentials and admissions in one place.
              </p>
              <Link href="/resources/brochure" className="btn-primary inline-flex items-center gap-2">
                Download the prospectus <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-h2 text-white mb-6">Guides and tools</h2>
              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                Practical resources for coaches and curious clients.
              </p>
              {/* Additional guides and tools to be added as published */}
              
              <div className="mt-12">
                <Link href="#insights" className="text-brand-gold-400 font-sans font-bold hover:text-brand-gold-300 transition-colors inline-flex items-center gap-1">
                  Browse all resources
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </Container>
      </Section>

    </div>
  )
}
