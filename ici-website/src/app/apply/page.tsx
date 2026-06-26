import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import ApplyForm from '@/components/admissions/ApplyForm'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'
import {
  APPLY_DEFAULTS,
  APPLY_HERO_BODY_HTML,
  defaultApplyFormCopy,
  type ApplyFormCopy,
} from '@/lib/apply-defaults'
import type { ContentMap } from '@/lib/content'

import { pageMetadata } from '@/lib/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/apply');
}

function buildApplyFormCopy(content: ContentMap): ApplyFormCopy {
  const defaults = defaultApplyFormCopy();
  const d = APPLY_DEFAULTS;

  return {
    labels: {
      name: cmsField(content, 'form_label_name', d.form_label_name),
      email: cmsField(content, 'form_label_email', d.form_label_email),
      phone: cmsField(content, 'form_label_phone', d.form_label_phone),
      country: cmsField(content, 'form_label_country', d.form_label_country),
      level: cmsField(content, 'form_label_level', d.form_label_level),
      specialism: cmsField(content, 'form_label_specialism', d.form_label_specialism),
      experience: cmsField(content, 'form_label_experience', d.form_label_experience),
      goals: cmsField(content, 'form_label_goals', d.form_label_goals),
      source: cmsField(content, 'form_label_source', d.form_label_source),
      sourceOptional: cmsField(content, 'form_label_source_optional', d.form_label_source_optional),
    },
    placeholders: {
      name: cmsField(content, 'form_placeholder_name', d.form_placeholder_name),
      email: cmsField(content, 'form_placeholder_email', d.form_placeholder_email),
      phone: cmsField(content, 'form_placeholder_phone', d.form_placeholder_phone),
      country: cmsField(content, 'form_placeholder_country', d.form_placeholder_country),
      level: cmsField(content, 'form_placeholder_level', d.form_placeholder_level),
      specialism: cmsField(content, 'form_placeholder_specialism', d.form_placeholder_specialism),
      experience: cmsField(content, 'form_placeholder_experience', d.form_placeholder_experience),
      goals: cmsField(content, 'form_placeholder_goals', d.form_placeholder_goals),
      source: cmsField(content, 'form_placeholder_source', d.form_placeholder_source),
    },
    submitText: cmsField(content, 'form_submit_text', d.form_submit_text),
    submittingText: cmsField(content, 'form_submitting_text', d.form_submitting_text),
    footerNote: cmsField(content, 'form_footer_note', d.form_footer_note),
    errorMessage: cmsField(content, 'form_error_message', d.form_error_message),
    captchaError: cmsField(content, 'form_captcha_error', d.form_captcha_error),
    successHeading: cmsField(content, 'success_heading', defaults.successHeading),
    successBody: cmsField(content, 'success_body', defaults.successBody),
  };
}

export default async function ApplyPage() {
  const content = await getPublishedPageContent('/apply')
  const d = APPLY_DEFAULTS
  const formCopy = buildApplyFormCopy(content)

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
        title={cmsField(content, 'hero_heading', d.hero_heading)}
        body={stripHtml(cmsHtml(content, 'hero_body', APPLY_HERO_BODY_HTML))}
      />

      <Section spacing="compact" className="lg:py-24 relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-100 rounded-full blur-[100px] opacity-50 translate-x-1/3 -translate-y-1/3" />
              <ApplyForm copy={formCopy} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-4">
              {cmsField(content, 'after_apply_heading', d.after_apply_heading)}
            </h2>
            <p className="text-muted max-w-lg mx-auto text-body">
              {cmsField(content, 'after_apply_body', d.after_apply_body)}
            </p>
          </AnimatedSection>
        </div>
      </Section>
    </div>
  )
}
