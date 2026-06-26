import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import ProspectusForm from '@/components/shared/ProspectusForm'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import HeroDecor from '@/components/layout/HeroDecor'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'
import {
  BROCHURE_DEFAULTS,
  BROCHURE_HERO_BODY_HTML,
  defaultProspectusFormCopy,
  type ProspectusFormCopy,
} from '@/lib/prospectus-defaults'
import type { ContentMap } from '@/lib/content'

import { pageMetadata } from '@/lib/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/resources/brochure');
}

function buildProspectusFormCopy(content: ContentMap): ProspectusFormCopy {
  const d = BROCHURE_DEFAULTS;
  const defaults = defaultProspectusFormCopy();

  return {
    labels: {
      name: cmsField(content, 'form_label_name', d.form_label_name),
      email: cmsField(content, 'form_label_email', d.form_label_email),
      country: cmsField(content, 'form_label_country', d.form_label_country),
      interest: cmsField(content, 'form_label_interest', d.form_label_interest),
      interestOptional: cmsField(content, 'form_label_interest_optional', d.form_label_interest_optional),
    },
    placeholders: {
      name: cmsField(content, 'form_placeholder_name', d.form_placeholder_name),
      email: cmsField(content, 'form_placeholder_email', d.form_placeholder_email),
      country: cmsField(content, 'form_country_placeholder', d.form_country_placeholder),
      interest: cmsField(content, 'form_interest_placeholder', d.form_interest_placeholder),
    },
    countryOptions: {
      uk: cmsField(content, 'form_country_uk', d.form_country_uk),
      us: cmsField(content, 'form_country_us', d.form_country_us),
      in: cmsField(content, 'form_country_in', d.form_country_in),
      au: cmsField(content, 'form_country_au', d.form_country_au),
      other: cmsField(content, 'form_country_other', d.form_country_other),
    },
    interestOptions: {
      catalyst: cmsField(content, 'form_interest_catalyst', d.form_interest_catalyst),
      executive: cmsField(content, 'form_interest_executive', d.form_interest_executive),
      team: cmsField(content, 'form_interest_team', d.form_interest_team),
      other: cmsField(content, 'form_interest_other', d.form_interest_other),
    },
    submitText: cmsField(content, 'form_submit_text', d.form_submit_text),
    submittingText: cmsField(content, 'form_submitting_text', d.form_submitting_text),
    footerNote: cmsField(content, 'form_footer_note', d.form_footer_note),
    successMessage: cmsField(content, 'form_success_message', defaults.successMessage),
    errorPrefix: cmsField(content, 'form_error_prefix', d.form_error_prefix),
    contactEmail: cmsField(content, 'contact_email', d.contact_email),
  };
}

export default async function BrochurePage() {
  const content = await getPublishedPageContent('/resources/brochure')
  const d = BROCHURE_DEFAULTS
  const formCopy = buildProspectusFormCopy(content)

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
                {cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', d.hero_heading)}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', BROCHURE_HERO_BODY_HTML))}
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
                {cmsField(content, 'form_heading', d.form_heading)}
              </h2>
              
              <ProspectusForm copy={formCopy} />
            </div>
          </AnimatedSection>
        </div>
      </Section>

    </div>
  )
}
