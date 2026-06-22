import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml } from '@/lib/cms-helpers'
import { ABOUT_HERO_DEFAULTS } from '@/lib/about-page-hero-defaults'
import { pageMetadata } from '@/lib/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about');
}

export default async function AboutPage() {
  const content = await getPublishedPageContent('/about')

  const storyFallback =
    '<p>ICI was created by a group of experienced coaches and educators who kept seeing the same gap. Plenty of coaching qualifications taught technique, but few taught the depth, self-awareness and rigour that distinguish a coach people trust. We built the institute to close that gap, with one unusual decision at its heart: we would teach coaching one-to-one, the way coaching itself is done, rather than herding people through a classroom.</p><p>Today we train coaches entirely online, one-to-one, for clients all over the world. Our graduates want more than a certificate. They want the judgement, the craft and the standing to do this work well.</p>'

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
              <div className="text-eyebrow text-brand-gold-400">
                {ABOUT_HERO_DEFAULTS.hero_eyebrow}
              </div>
            </div>
            <h1 className="text-h1 text-white">
              {ABOUT_HERO_DEFAULTS.hero_heading}
            </h1>
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
                  <h2 className="text-h2 text-brand-navy-900">
                    {cmsField(content, 'story_heading', 'Our story')}
                  </h2>
                </div>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-8">
              <AnimatedSection delay={0.1} className="prose prose-lg prose-brand max-w-3xl">
                <div dangerouslySetInnerHTML={{ __html: cmsHtml(content, 'story_body', storyFallback) }} />
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </Section>

    </div>
  )
}
