import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Award, Scale, BookOpen } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

import { pageMetadata } from '@/lib/page-metadata'
import {
  ACCREDITATION_DEFAULTS,
  ACCREDITATION_HERO_BODY_HTML,
} from '@/lib/accreditation-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about/accreditation');
}

const STANDARD_ICONS = [<Award key="award" />, <Scale key="scale" />, <BookOpen key="book" />, <ShieldCheck key="shield" />]

export default async function AccreditationPage() {
  const content = await getPublishedPageContent('/about/accreditation')
  const d = ACCREDITATION_DEFAULTS

  const standardItems = cmsIndexedWithFallbacks(content, 'standard_', [...d.standard_points])

  const accreditationBodies = [1, 2, 3, 4, 5].map((n) => ({
    name: cmsField(content, `accreditation_${n}_name`, ''),
    description: stripHtml(cmsHtml(content, `accreditation_${n}_description`, '')),
  })).filter((item) => item.name)

  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
        title={cmsField(content, 'hero_heading', d.hero_heading)}
        body={stripHtml(cmsHtml(content, 'hero_body', ACCREDITATION_HERO_BODY_HTML))}
      />

      <Section spacing="standard">
        <Container>
          <div className="max-w-3xl mx-auto mb-24">
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-10 lg:p-14 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cream-100 rounded-bl-full -z-10" />
                <h3 className="text-h3 text-brand-navy-800 mb-10">
                  {cmsField(content, 'standards_heading', d.standards_heading)}
                </h3>

                <div className="space-y-8">
                  {STANDARD_ICONS.map((icon, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center shrink-0 text-brand-gold-700 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors">
                        {icon}
                      </div>
                      <div className="pt-2.5">
                        <span className="font-body text-lg text-navy-700 group-hover:text-brand-navy-900 transition-colors">
                          {standardItems[i]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {accreditationBodies.length > 0 && (
            <AnimatedSection delay={0.25} className="mb-24">
              <div className="text-center mb-12">
                <h2 className="text-h2 text-brand-navy-800 mb-4">
                  {cmsField(content, 'accreditations_heading', d.accreditations_heading)}
                </h2>
                <p className="text-muted max-w-2xl mx-auto text-body">
                  {cmsField(content, 'accreditations_intro', d.accreditations_intro)}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accreditationBodies.map((body) => (
                  <div
                    key={body.name}
                    className="bg-white p-8 rounded-3xl shadow-xl border border-navy-100 hover:shadow-2xl transition-shadow"
                  >
                    <h3 className="text-h4 text-brand-navy-800 mb-3">{body.name}</h3>
                    {body.description ? (
                      <p className="text-muted text-body">{body.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href={cmsField(content, 'cta_link_1_url', d.cta_link_1_url)}
                className="btn-primary text-center"
              >
                {cmsField(content, 'cta_link_1_text', d.cta_link_1_text)}
              </Link>
              <Link
                href={cmsField(content, 'cta_link_2_url', d.cta_link_2_url)}
                className="btn-secondary-light text-center"
              >
                {cmsField(content, 'cta_link_2_text', d.cta_link_2_text)}
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
