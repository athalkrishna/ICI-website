import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import ProspectusForm from '@/components/shared/ProspectusForm'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import HeroDecor from '@/components/layout/HeroDecor'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Download the ICI Prospectus',
  description: 'Download the International Coaching Institute prospectus: the Mastery Pathway, specialisations, pricing and admissions, in one clear PDF.'
}

export default async function BrochurePage() {
  const content = await getPublishedPageContent('/resources/brochure')

  return (
    <div className="bg-cream-50 min-h-screen w-full max-w-full overflow-x-hidden font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 overflow-hidden border-b border-faint">
        <HeroDecor />

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-6 lg:mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', 'Prospectus')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'Everything in one place')}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', 'If you would rather read at your own pace, the prospectus brings together the whole picture: the Mastery Pathway and its four levels, the specialisations you can pursue, pricing, and how admissions work. Tell us where to send it and it is yours.'))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="standard" className="relative z-20">
        <div className="max-w-xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <h2 className="text-h3 text-brand-navy-900 mb-8 relative z-10 text-center">
                {cmsField(content, 'form_heading', 'Request the prospectus')}
              </h2>
              
              <ProspectusForm />
            </div>
          </AnimatedSection>
        </div>
      </Section>

    </div>
  )
}
