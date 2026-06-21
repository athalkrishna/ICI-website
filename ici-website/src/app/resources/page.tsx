import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import HeroDecor from '@/components/layout/HeroDecor'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/resources');
}

export default async function ResourcesPage() {
  const content = await getPublishedPageContent('/resources')

  return (
    <div className="bg-cream-50 min-h-screen w-full max-w-full overflow-x-hidden font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 overflow-hidden border-b border-faint">
        <HeroDecor />

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', 'Resources')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'Thinking worth your time')}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', 'Good coaching rests on good thinking. Here we share articles, guides and tools on leadership, psychology, neuroscience and the real work of change, written to be useful rather than impressive. Whether you are deciding whether to train, sharpening an established practice, or simply trying to understand yourself a little better, start here.'))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Insights and articles ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'insights_heading', 'Insights and articles')}
            </h2>
            <p className="text-muted text-lg mb-12">
              {cmsField(content, 'insights_body', 'Regular writing from ICI faculty on the themes at the heart of our work: self-mastery, leadership, relationships, the psychology of high achievers, and how change actually happens.')}
            </p>
            <div className="mt-8">
              <Link href="/blog" className="btn-secondary-light">
                {cmsField(content, 'insights_cta_text', 'Browse our blog')}
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Download the prospectus & Guides ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'prospectus_heading', 'Download the prospectus')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'resource_1_description', 'Everything about our programmes, credentials and admissions in one place.')}
              </p>
              <Link href={cmsField(content, 'brochure_download_link', '/resources/brochure')} className="btn-primary inline-flex items-center gap-2">
                {cmsField(content, 'prospectus_cta_text', 'Download the prospectus')} <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'guides_heading', 'Guides and tools')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'guides_body', 'Practical resources for coaches and curious clients.')}
              </p>
              
              <div className="mt-12">
                <Link href="#insights" className="btn-secondary-light inline-flex items-center gap-2">
                  {cmsField(content, 'guides_cta_text', 'Browse all resources')}
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </Container>
      </Section>

    </div>
  )
}
