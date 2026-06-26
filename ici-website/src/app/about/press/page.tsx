import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { Download, FileText, Image as ImageIcon, Mail } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'
import { PRESS_DEFAULTS, PRESS_HERO_BODY_HTML } from '@/lib/press-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about/press');
}

export default async function PressPage() {
  const content = await getPublishedPageContent('/about/press')
  const d = PRESS_DEFAULTS

  const pressKitTitles = cmsIndexedWithFallbacks(
    content,
    'press_kit_item_',
    d.press_kit_items.map((item) => item.title),
  )
  const pressKitTypes = cmsIndexedWithFallbacks(
    content,
    'press_kit_type_',
    d.press_kit_items.map((item) => item.type),
  )
  const pressKitUrls = cmsIndexedWithFallbacks(
    content,
    'press_kit_url_',
    d.press_kit_items.map((item) => item.url),
  )

  const mediaEmail = cmsField(content, 'media_email', d.media_email)
  const ctaLink = cmsField(content, 'cta_button_link', d.cta_button_link)

  return (
    <div className="bg-cream-50 min-h-screen">
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
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
              {stripHtml(cmsHtml(content, 'hero_body', PRESS_HERO_BODY_HTML))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="standard" className="lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16">
            <AnimatedSection className="lg:col-span-6 space-y-12">
              <div>
                <h3 className="text-h3 text-brand-navy-800 mb-6">
                  {cmsField(content, 'media_enquiries_heading', d.media_enquiries_heading)}
                </h3>
                <p className="text-navy-700 mb-8 text-body">
                  {cmsField(content, 'media_response_time', d.media_response_time)}
                </p>

                <a
                  href={`mailto:${mediaEmail}`}
                  className="inline-flex items-center gap-4 p-6 bg-white hover:shadow-md transition-shadow group w-full rounded-2xl shadow-md border border-navy-100"
                >
                  <div className="w-12 h-12 bg-brand-navy-50 rounded-full flex items-center justify-center text-brand-navy-600 group-hover:bg-brand-navy-800 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="mb-1 text-eyebrow">
                      {cmsField(content, 'media_email_label', d.media_email_label)}
                    </div>
                    <div className="font-body text-lg text-brand-navy-800 font-medium break-all">
                      {mediaEmail}
                    </div>
                  </div>
                </a>
              </div>

              <div className="bg-cream-100 p-10 rounded-3xl border border-brand-gold-200/50">
                <h3 className="text-h3 text-brand-navy-800 mb-4">
                  {cmsField(content, 'topics_heading', d.topics_heading)}
                </h3>
                <p className="text-navy-700 text-body">
                  {cmsField(content, 'topics_body', d.topics_body)}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-6">
              <div className="bg-white p-10 md:p-14 h-full rounded-[32px] shadow-2xl border border-navy-100">
                <h3 className="text-h3 text-brand-navy-800 mb-2">
                  {cmsField(content, 'press_kit_heading', d.press_kit_heading)}
                </h3>
                <p className="text-muted mb-10 text-body">
                  {cmsField(content, 'press_kit_body', d.press_kit_body)}
                </p>

                <div className="space-y-4">
                  {pressKitTitles.map((title, i) => {
                    const downloadUrl = pressKitUrls[i]?.trim()
                    const rowClassName =
                      'flex items-center justify-between p-6 rounded-2xl border border-navy-100 hover:border-brand-gold-300 hover:bg-brand-gold-50/30 transition-all group'
                    const rowContent = (
                      <>
                        <div className="flex items-center gap-5">
                          <div className="text-navy-400 group-hover:text-brand-gold-600 transition-colors">
                            {i === 0 ? <ImageIcon size={24} /> : <FileText size={24} />}
                          </div>
                          <div>
                            <div className="font-body font-bold text-brand-navy-800 text-lg mb-1 group-hover:text-brand-gold-700 transition-colors">
                              {title}
                            </div>
                            <div className="font-sans text-xs uppercase tracking-wider text-navy-400">
                              {pressKitTypes[i]}
                            </div>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center text-brand-navy-600 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                          <Download size={18} />
                        </div>
                      </>
                    )

                    return downloadUrl ? (
                      <a
                        key={i}
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${rowClassName} cursor-pointer`}
                      >
                        {rowContent}
                      </a>
                    ) : (
                      <div key={i} className={rowClassName}>
                        {rowContent}
                      </div>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="mt-24 text-center">
            <a href={ctaLink || `mailto:${mediaEmail}`} className="btn-primary">
              {cmsField(content, 'cta_button_text', d.cta_button_text)}
            </a>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
