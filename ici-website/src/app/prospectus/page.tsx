import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'
import ProspectusQuickForm from '@/components/shared/ProspectusQuickForm'
import {
  PROSPECTUS_DEFAULTS,
  PROSPECTUS_HERO_BODY_HTML,
  defaultProspectusQuickFormCopy,
  type ProspectusQuickFormCopy,
} from '@/lib/prospectus-defaults'
import type { ContentMap } from '@/lib/content'

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/prospectus');
}

function buildProspectusQuickFormCopy(content: ContentMap): ProspectusQuickFormCopy {
  const d = PROSPECTUS_DEFAULTS;
  const defaults = defaultProspectusQuickFormCopy();

  return {
    placeholderEmail: cmsField(content, 'form_placeholder_email', d.form_placeholder_email),
    submitText: cmsField(content, 'form_submit_text', d.form_submit_text),
    submittingText: cmsField(content, 'form_submitting_text', d.form_submitting_text),
    successMessage: cmsField(content, 'form_success_message', defaults.successMessage),
    errorMessage: cmsField(content, 'form_error_message', d.form_error_message),
  };
}

export default async function ProspectusPage() {
  const content = await getPublishedPageContent('/prospectus')
  const d = PROSPECTUS_DEFAULTS
  const formCopy = buildProspectusQuickFormCopy(content)

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

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
            <p className="text-muted-dark mb-12 text-body">
              {stripHtml(cmsHtml(content, 'hero_body', PROSPECTUS_HERO_BODY_HTML))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <Container>
          <AnimatedSection delay={0.2} className="max-w-4xl mx-auto bg-white p-8 md:p-16 text-center rounded-3xl shadow-xl border border-navy-100">
            <h2 className="text-h3 text-brand-navy-900 mb-6">
              {cmsField(content, 'form_heading', d.form_heading)}
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-body">
              {cmsField(content, 'form_subheading', d.form_subheading)}
            </p>
            <ProspectusQuickForm copy={formCopy} />
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
