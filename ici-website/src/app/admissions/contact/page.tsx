import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import ContactForm from '@/components/admissions/ContactForm'
import Section from '@/components/layout/Section'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField } from '@/lib/cms-helpers'
import ObfuscatedEmail from '@/components/shared/ObfuscatedEmail'
import {
  ADVISOR_CONTACT_DEFAULTS,
  defaultAdvisorContactFormCopy,
  splitContactEmail,
  type AdvisorContactFormCopy,
} from '@/lib/advisor-contact-defaults'
import type { ContentMap } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/admissions/contact');
}

function buildAdvisorContactFormCopy(content: ContentMap): AdvisorContactFormCopy {
  const d = ADVISOR_CONTACT_DEFAULTS;
  const defaults = defaultAdvisorContactFormCopy();

  return {
    labels: {
      name: cmsField(content, 'form_label_name', d.form_label_name),
      email: cmsField(content, 'form_label_email', d.form_label_email),
      phone: cmsField(content, 'form_label_phone', d.form_label_phone),
      country: cmsField(content, 'form_label_country', d.form_label_country),
      discuss: cmsField(content, 'form_label_discuss', d.form_label_discuss),
      times: cmsField(content, 'form_label_times', d.form_label_times),
    },
    placeholders: {
      name: cmsField(content, 'form_placeholder_name', d.form_placeholder_name),
      email: cmsField(content, 'form_placeholder_email', d.form_placeholder_email),
      phone: cmsField(content, 'form_placeholder_phone', d.form_placeholder_phone),
      country: cmsField(content, 'form_placeholder_country', d.form_placeholder_country),
      discuss: cmsField(content, 'form_placeholder_discuss', d.form_placeholder_discuss),
      times: cmsField(content, 'form_placeholder_times', d.form_placeholder_times),
    },
    gdpr: {
      prefix: cmsField(content, 'form_gdpr_prefix', d.form_gdpr_prefix),
      linkText: cmsField(content, 'form_gdpr_link_text', d.form_gdpr_link_text),
      suffix: cmsField(content, 'form_gdpr_suffix', d.form_gdpr_suffix),
    },
    submitText: cmsField(content, 'form_submit_text', d.form_submit_text),
    submittingText: cmsField(content, 'form_submitting_text', d.form_submitting_text),
    secondaryText: cmsField(content, 'form_secondary_text', d.form_secondary_text),
    secondaryLink: cmsField(content, 'form_secondary_link', d.form_secondary_link),
    successHeading: cmsField(content, 'form_success_heading', defaults.successHeading),
    successBody: cmsField(content, 'form_success_body', defaults.successBody),
    successAgainText: cmsField(content, 'form_success_again_text', d.form_success_again_text),
    errorMessage: cmsField(content, 'form_error_message', d.form_error_message),
    captchaError: cmsField(content, 'form_captcha_error', d.form_captcha_error),
  };
}

export default async function ContactAdmissionsPage() {
  const content = await getPublishedPageContent('/admissions/contact')
  const d = ADVISOR_CONTACT_DEFAULTS
  const formCopy = buildAdvisorContactFormCopy(content)
  const contactEmail = cmsField(content, 'contact_email', d.contact_email)
  const { user: emailUser, domain: emailDomain } = splitContactEmail(contactEmail)

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
        title={cmsField(content, 'hero_heading', d.hero_heading)}
        body={cmsField(content, 'hero_subheading', d.hero_subheading)}
      />

      <Section spacing="standard" className="relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <h2 className="text-h3 text-brand-navy-900 mb-3 relative z-10">
                {cmsField(content, 'booking_heading', d.booking_heading)}
              </h2>
              <p className="text-muted text-body mb-8 relative z-10">
                {cmsField(content, 'booking_body', d.booking_body)}
              </p>

              <ContactForm copy={formCopy} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <p className="text-muted text-body">
              {cmsField(content, 'direct_contact_prefix', d.direct_contact_prefix)}{' '}
              <a
                href={cmsField(content, 'phone_link', d.phone_link)}
                className="text-brand-navy-900 font-bold hover:text-brand-gold-500 transition-colors"
              >
                {cmsField(content, 'phone_display', d.phone_display)}
              </a>{' '}
              {cmsField(content, 'direct_contact_and', d.direct_contact_and)}{' '}
              <ObfuscatedEmail
                user={emailUser}
                domain={emailDomain}
                className="text-brand-navy-900 font-bold hover:text-brand-gold-500 transition-colors"
              />
            </p>
          </AnimatedSection>
        </div>
      </Section>
    </div>
  )
}
