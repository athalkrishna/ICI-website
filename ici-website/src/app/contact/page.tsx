import AnimatedSection from '@/components/shared/AnimatedSection'
import ContactForm from '@/components/contact/ContactForm'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { Phone, Mail, Clock } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import HeroDecor from '@/components/layout/HeroDecor'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField } from '@/lib/cms-helpers'
import { ObfuscatedEmailText } from '@/components/shared/ObfuscatedEmail'
import {
  CONTACT_DEFAULTS,
  defaultContactFormCopy,
  splitContactEmail,
  type ContactFormCopy,
} from '@/lib/contact-defaults'
import type { ContentMap } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/contact');
}

function buildContactFormCopy(content: ContentMap): ContactFormCopy {
  const d = CONTACT_DEFAULTS;
  const defaults = defaultContactFormCopy();

  return {
    labels: {
      name: cmsField(content, 'form_label_name', d.form_label_name),
      email: cmsField(content, 'form_label_email', d.form_label_email),
      phone: cmsField(content, 'form_label_phone', d.form_label_phone),
      topic: cmsField(content, 'form_label_topic', d.form_label_topic),
      message: cmsField(content, 'form_label_message', d.form_label_message),
    },
    placeholders: {
      name: cmsField(content, 'form_placeholder_name', d.form_placeholder_name),
      email: cmsField(content, 'form_placeholder_email', d.form_placeholder_email),
      phone: cmsField(content, 'form_placeholder_phone', d.form_placeholder_phone),
      topic: cmsField(content, 'form_topic_placeholder', d.form_topic_placeholder),
      message: cmsField(content, 'form_placeholder_message', d.form_placeholder_message),
    },
    topicOptions: {
      programmes: cmsField(content, 'form_topic_programmes', d.form_topic_programmes),
      organisational: cmsField(content, 'form_topic_organisational', d.form_topic_organisational),
      alumni: cmsField(content, 'form_topic_alumni', d.form_topic_alumni),
      media: cmsField(content, 'form_topic_media', d.form_topic_media),
      other: cmsField(content, 'form_topic_other', d.form_topic_other),
    },
    gdpr: {
      prefix: cmsField(content, 'form_gdpr_prefix', d.form_gdpr_prefix),
      linkText: cmsField(content, 'form_gdpr_link_text', d.form_gdpr_link_text),
      suffix: cmsField(content, 'form_gdpr_suffix', d.form_gdpr_suffix),
    },
    submitText: cmsField(content, 'form_submit_text', d.form_submit_text),
    submittingText: cmsField(content, 'form_submitting_text', d.form_submitting_text),
    successHeading: cmsField(content, 'form_success_heading', d.form_success_heading),
    successMessage: cmsField(content, 'form_success_message', defaults.successMessage),
    errorPrefix: cmsField(content, 'form_error_prefix', d.form_error_prefix),
    errorSuffix: cmsField(content, 'form_error_suffix', d.form_error_suffix),
    contactEmail: cmsField(content, 'contact_email', d.contact_email),
  };
}

export default async function ContactPage() {
  const content = await getPublishedPageContent('/contact')
  const d = CONTACT_DEFAULTS
  const formCopy = buildContactFormCopy(content)
  const contactEmail = cmsField(content, 'contact_email', d.contact_email)
  const { user: emailUser, domain: emailDomain } = splitContactEmail(contactEmail)

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
              {cmsField(content, 'hero_subheading', d.hero_subheading)}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="standard" className="relative z-20">
        <div className="max-w-5xl mx-auto w-full px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
            
            {/* Form */}
            <AnimatedSection>
              <div className="bg-white p-8 md:p-10 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                <ContactForm copy={formCopy} />
              </div>
            </AnimatedSection>

            {/* Info Block */}
            <AnimatedSection delay={0.1}>
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-h3 text-brand-navy-900 mb-6">
                    {cmsField(content, 'info_heading', d.info_heading)}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-navy-100 shadow-sm flex items-center justify-center shrink-0 text-brand-gold-600">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-1">
                          {cmsField(content, 'phone_label', d.phone_label)}
                        </div>
                        <div className="font-body text-brand-navy-900">
                          {cmsField(content, 'phone_display', d.phone_display)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-navy-100 shadow-sm flex items-center justify-center shrink-0 text-brand-gold-600">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-1">
                          {cmsField(content, 'email_label', d.email_label)}
                        </div>
                        <div className="font-body text-brand-navy-900 break-words">
                          <ObfuscatedEmailText user={emailUser} domain={emailDomain} />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-navy-100 shadow-sm flex items-center justify-center shrink-0 text-brand-gold-600">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-1">
                          {cmsField(content, 'hours_label', d.hours_label)}
                        </div>
                        <div className="font-body text-brand-navy-900 text-sm leading-relaxed">
                          {cmsField(content, 'hours_display', d.hours_display)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>

        </div>
      </Section>

    </div>
  )
}
