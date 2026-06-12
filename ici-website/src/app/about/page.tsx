import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'About the International Coaching Institute | ICI',
  description: 'The International Coaching Institute trains and certifies coaches one-to-one and online worldwide, blending coaching craft with psychology and neuroscience.'
}

export default function AboutPage() {
  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">ABOUT THE INSTITUTE</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Coaching education with a soul and a standard
            </h1>
            <p className="text-h4 text-navy-100 font-normal leading-relaxed">
              The International Coaching Institute exists because the world has enough people with advice and too few who can truly help someone change. We train coaches to do the harder, quieter work: to listen well, to see clearly, and to hold the space where real change happens. Our standards are demanding on purpose, because the people our graduates serve deserve nothing less.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Our Story ── */}
      <Section spacing="standard" className="bg-white border-t border-navy-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4">
              <AnimatedSection>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[1px] bg-brand-gold-500"></div>
                  <h2 className="text-h2 text-brand-navy-900">Our story</h2>
                </div>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-8">
              <AnimatedSection delay={0.1} className="prose prose-lg prose-brand max-w-3xl">
                <p>
                  ICI was created by a group of experienced coaches and educators who kept seeing the same gap. Plenty of coaching qualifications taught technique, but few taught the depth, self-awareness and rigour that distinguish a coach people trust. We built the institute to close that gap, with one unusual decision at its heart: we would teach coaching one-to-one, the way coaching itself is done, rather than herding people through a classroom.
                </p>
                <p>
                  Today we train coaches entirely online, one-to-one, for clients all over the world. Our graduates want more than a certificate. They want the judgement, the craft and the standing to do this work well.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </Section>

    </div>
  )
}
