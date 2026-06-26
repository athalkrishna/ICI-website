import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { Users, GraduationCap, Building2, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'
import {
  PARTNERSHIPS_DEFAULTS,
  PARTNERSHIPS_HERO_BODY_HTML,
} from '@/lib/partnerships-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about/partnerships');
}

export default async function PartnershipsPage() {
  const content = await getPublishedPageContent('/about/partnerships')
  const d = PARTNERSHIPS_DEFAULTS

  const wayDescriptions = cmsIndexedWithFallbacks(content, 'way_', [...d.ways])

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-500 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <Container className="relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', d.hero_heading)}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl">
              {stripHtml(cmsHtml(content, 'hero_body', PARTNERSHIPS_HERO_BODY_HTML))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Main Content ── */}
      <Section spacing="standard" className="lg:py-32">
        <Container>

          <AnimatedSection delay={0.2} className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-brand-navy-800">
                {cmsField(content, 'ways_heading', d.ways_heading)}
              </h2>
            </div>
            <Container size="mid" className="grid md:grid-cols-2 gap-8">
              {[
                { icon: <Building2 className="w-8 h-8" /> },
                { icon: <GraduationCap className="w-8 h-8" /> },
                { icon: <Users className="w-8 h-8" /> },
                { icon: <ArrowRight className="w-8 h-8" /> },
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-navy-100 flex items-center gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center text-brand-gold-700 shrink-0 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors">
                    {card.icon}
                  </div>
                  <p className="text-brand-navy-800 font-medium text-body">
                    {wayDescriptions[i]}
                  </p>
                </div>
              ))}
            </Container>
          </AnimatedSection>

          {/* ── CTA Card ── */}
          <AnimatedSection delay={0.3}>
            <div className="max-w-4xl mx-auto bg-brand-navy-800 p-10 md:p-16 text-center text-white relative overflow-hidden rounded-[32px] shadow-2xl border border-navy-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[80px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-500 rounded-full blur-[80px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative z-10">
                <h2 className="text-h3 text-white mb-6">
                  {cmsField(content, 'cta_heading', d.cta_heading)}
                </h2>
                <p className="text-white mb-10 max-w-2xl mx-auto text-body">
                  {cmsField(content, 'cta_body', d.cta_body)}
                </p>
                <Link href={cmsField(content, 'cta_button_link', d.cta_button_link)} className="btn-primary">
                  {cmsField(content, 'cta_button_text', d.cta_button_text)}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </AnimatedSection>

        </Container>
      </Section>
    </div>
  )
}
