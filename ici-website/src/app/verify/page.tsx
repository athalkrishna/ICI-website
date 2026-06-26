import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import HeroDecor from '@/components/layout/HeroDecor'
import AnimatedSection from '@/components/shared/AnimatedSection'
import VerifyForm from '@/components/verify/VerifyForm'
import { ShieldCheck, FileSearch, BadgeCheck } from 'lucide-react'
import { pageMetadata } from '@/lib/page-metadata'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField } from '@/lib/cms-helpers'
import {
  VERIFY_DEFAULTS,
  defaultVerifyFormCopy,
  type VerifyFormCopy,
} from '@/lib/verify-defaults'
import type { ContentMap } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const base = await pageMetadata('/verify')
  return {
    ...base,
    robots: { index: false, follow: false },
  }
}

function buildVerifyFormCopy(content: ContentMap): VerifyFormCopy {
  const d = VERIFY_DEFAULTS
  const defaults = defaultVerifyFormCopy()

  return {
    formHeading: cmsField(content, 'form_heading', d.form_heading),
    formLabel: cmsField(content, 'form_label', d.form_label),
    placeholder: cmsField(content, 'form_placeholder', d.form_placeholder),
    submitText: cmsField(content, 'form_submit_text', d.form_submit_text),
    submittingText: cmsField(content, 'form_submitting_text', d.form_submitting_text),
    successHeading: cmsField(content, 'success_heading', d.success_heading),
    successSubheading: cmsField(content, 'success_subheading', d.success_subheading),
    notFoundHeading: cmsField(content, 'not_found_heading', d.not_found_heading),
    notFoundBody: cmsField(content, 'not_found_body', defaults.notFoundBody),
    labels: {
      coachName: cmsField(content, 'label_coach_name', d.label_coach_name),
      level: cmsField(content, 'label_credential_level', d.label_credential_level),
      specialisation: cmsField(content, 'label_specialisation', d.label_specialisation),
      issueDate: cmsField(content, 'label_issue_date', d.label_issue_date),
      referenceNumber: cmsField(content, 'label_reference_number', d.label_reference_number),
    },
  }
}

export default async function VerifyPage() {
  const content = await getPublishedPageContent('/verify')
  const d = VERIFY_DEFAULTS
  const formCopy = buildVerifyFormCopy(content)

  const steps = [
    cmsField(content, 'info_step_1', d.info_step_1),
    cmsField(content, 'info_step_2', d.info_step_2),
    cmsField(content, 'info_step_3', d.info_step_3),
  ]

  return (
    <div className="bg-cream-50 min-h-screen w-full max-w-full overflow-x-hidden font-sans selection:bg-brand-gold-500/30">

      <Section spacing="hero" className="bg-brand-navy-800 overflow-hidden border-b border-faint">
        <HeroDecor />

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-6 lg:mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold" />
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', d.hero_heading)}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl">
              {cmsField(content, 'hero_body', d.hero_body)}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="standard" className="relative z-20 -mt-10 sm:-mt-16 pb-24">
        <Container>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] gap-10 lg:gap-14 items-start">
            <AnimatedSection>
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-navy-100">
                <VerifyForm copy={formCopy} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="lg:sticky lg:top-32 min-w-0 space-y-6">
                <div className="bg-white rounded-3xl border border-navy-100 shadow-lg p-6 sm:p-8 min-w-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 border border-brand-gold-500/20 flex items-center justify-center text-brand-gold-600 shrink-0">
                      <FileSearch className="w-5 h-5" />
                    </div>
                    <h3 className="text-h4 text-brand-navy-900 min-w-0">
                      {cmsField(content, 'info_heading', d.info_heading)}
                    </h3>
                  </div>

                  <ol className="space-y-5">
                    {steps.map((step, index) => (
                      <li key={index} className="flex gap-4 min-w-0">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy-900 text-sm font-bold text-brand-gold-400">
                          {index + 1}
                        </span>
                        <p className="text-muted text-body pt-1 leading-relaxed min-w-0 break-words">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-3xl border border-brand-gold-500/25 bg-gradient-to-br from-brand-navy-900 to-brand-navy-800 p-6 sm:p-8 text-white shadow-xl overflow-hidden min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-brand-gold-500/15 border border-brand-gold-500/30 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-brand-gold-400" />
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <BadgeCheck className="w-4 h-4 text-brand-gold-400 shrink-0" />
                      <p className="text-sm font-sans font-bold uppercase tracking-wider text-brand-gold-400">
                        {cmsField(content, 'info_badge', d.info_badge)}
                      </p>
                    </div>
                  </div>
                  <p className="text-navy-100 text-sm leading-relaxed font-body break-words [overflow-wrap:anywhere]">
                    {cmsField(content, 'info_note', d.info_note)}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

    </div>
  )
}
