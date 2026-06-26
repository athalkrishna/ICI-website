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
import { RESOURCES_DEFAULTS, RESOURCES_HERO_BODY_HTML } from '@/lib/resources-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/resources');
}

export default async function ResourcesPage() {
  const content = await getPublishedPageContent('/resources')
  const d = RESOURCES_DEFAULTS

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
                {cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', d.hero_heading)}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', RESOURCES_HERO_BODY_HTML))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Insights and articles ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'insights_heading', d.insights_heading)}
            </h2>
            <p className="text-muted text-lg mb-12">
              {cmsField(content, 'insights_body', d.insights_body)}
            </p>
            <div className="mt-8">
              <Link href={cmsField(content, 'insights_cta_link', d.insights_cta_link)} className="btn-secondary-light">
                {cmsField(content, 'insights_cta_text', d.insights_cta_text)}
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
                {cmsField(content, 'prospectus_heading', d.prospectus_heading)}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'resource_1_description', d.resource_1_description)}
              </p>
              <Link href={cmsField(content, 'brochure_download_link', d.brochure_download_link)} className="btn-primary inline-flex items-center gap-2">
                {cmsField(content, 'prospectus_cta_text', d.prospectus_cta_text)} <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'guides_heading', d.guides_heading)}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'guides_body', d.guides_body)}
              </p>
              
              <div className="mt-12">
                <Link href={cmsField(content, 'guides_cta_link', d.guides_cta_link)} className="btn-secondary-light inline-flex items-center gap-2">
                  {cmsField(content, 'guides_cta_text', d.guides_cta_text)}
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </Container>
      </Section>

    </div>
  )
}
