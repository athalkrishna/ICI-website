import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { FileBarChart2 } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import AnnualReportSubscription from '@/components/about/AnnualReportSubscription'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'
import {
  ANNUAL_REPORTS_DEFAULTS,
  ANNUAL_REPORTS_HERO_BODY_HTML,
} from '@/lib/annual-reports-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about/annual-reports');
}

export default async function AnnualReportsPage() {
  const content = await getPublishedPageContent('/about/annual-reports')
  const d = ANNUAL_REPORTS_DEFAULTS

  const commitments = cmsIndexedWithFallbacks(content, 'commitment_', [...d.commitments])

  return (
    <div className="bg-cream-50 min-h-screen">
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
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
              {stripHtml(cmsHtml(content, 'hero_body', ANNUAL_REPORTS_HERO_BODY_HTML))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="standard" className="lg:py-32">
        <Container>
          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <div className="absolute -right-8 -top-8 text-brand-navy-50 opacity-50 transform rotate-12">
                <FileBarChart2 size={200} strokeWidth={1} />
              </div>
              <h3 className="text-h3 text-brand-navy-800 mb-8 relative z-10">
                {cmsField(content, 'commitments_heading', d.commitments_heading)}
              </h3>

              <div className="space-y-6 relative z-10">
                {commitments.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center shrink-0 mt-0.5 border border-brand-gold-100">
                      <div className="w-2.5 h-2.5 bg-brand-gold-500 rounded-full"></div>
                    </div>
                    <div className="font-body text-xl text-navy-700 font-light">{item}</div>
                  </div>
                ))}
              </div>

              <AnnualReportSubscription
                heading={cmsField(content, 'subscribe_heading', d.subscribe_heading)}
                body={cmsField(content, 'subscribe_body', d.subscribe_body)}
                placeholder={cmsField(content, 'subscribe_placeholder', d.subscribe_placeholder)}
                buttonText={cmsField(content, 'subscribe_button_text', d.subscribe_button_text)}
                loadingText={cmsField(content, 'subscribe_loading_text', d.subscribe_loading_text)}
                successTitle={cmsField(content, 'subscribe_success_title', d.subscribe_success_title)}
                successBody={cmsField(content, 'subscribe_success_body', d.subscribe_success_body)}
                errorMessage={cmsField(content, 'subscribe_error_message', d.subscribe_error_message)}
              />
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
