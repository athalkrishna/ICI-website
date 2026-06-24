import AnimatedSection from '@/components/shared/AnimatedSection'
import ContactForm from '@/components/contact/ContactForm'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { Phone, Mail, Clock } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import HeroDecor from '@/components/layout/HeroDecor'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'
import { ObfuscatedEmailText } from '@/components/shared/ObfuscatedEmail'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/contact');
}

export default async function ContactPage() {
  const content = await getPublishedPageContent('/contact')

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
                {cmsField(content, 'hero_eyebrow', 'Contact')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'Talk to a human')}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_subheading', 'Whatever brought you here, there is a person at ICI happy to help. Ask about programmes, credentials, timing, cost, or training a team. No script and no pressure, just a straight conversation.'))}
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
                
                <ContactForm successMessage={cmsField(content, 'form_success_message', 'Thank you. An advisor will be in touch within 2 working days.')} />
              </div>
            </AnimatedSection>

            {/* Info Block */}
            <AnimatedSection delay={0.1}>
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-h3 text-brand-navy-900 mb-6">
                    {cmsField(content, 'info_heading', 'Other ways to reach us')}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-navy-100 shadow-sm flex items-center justify-center shrink-0 text-brand-gold-600">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-1">
                          {cmsField(content, 'phone_label', 'WhatsApp Number')}
                        </div>
                        <div className="font-body text-brand-navy-900">
                          {cmsField(content, 'phone_display', '+91 98199 84575')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-navy-100 shadow-sm flex items-center justify-center shrink-0 text-brand-gold-600">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-1">
                          {cmsField(content, 'email_label', 'Email')}
                        </div>
                        <div className="font-body text-brand-navy-900 break-words">
                          <ObfuscatedEmailText user="info" domain="internationalcoachinginstitute.org" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-navy-100 shadow-sm flex items-center justify-center shrink-0 text-brand-gold-600">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-1">
                          {cmsField(content, 'hours_label', 'Hours')}
                        </div>
                        <div className="font-body text-brand-navy-900 text-sm leading-relaxed">
                          {cmsField(content, 'hours_display', 'Mon-Fri, 9:00 AM - 6:00 PM (IST)')}
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
