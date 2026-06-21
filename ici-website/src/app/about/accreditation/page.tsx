import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Award, Scale, BookOpen } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Recognition & Accreditation | International Coaching Institute',
}

export default async function AccreditationPage() {
  const content = await getPublishedPageContent('/about/accreditation')

  const standardItems = cmsIndexedWithFallbacks(content, 'standard_', [
    'Every level is assessed on real coaching, not attendance',
    'Faculty are practising coaches held to a professional code',
    'Curriculum aligned to international coaching competency standards',
    'Independent review of our assessment process',
  ])

  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', 'Recognition & Accreditation')}
        title={cmsField(content, 'hero_heading', 'Standards you can stand behind')}
        body={stripHtml(cmsHtml(content, 'hero_body', 'A credential is only worth what it can be trusted to mean. This page sets out how ICI holds its standard, the bodies it works with, and the recognition behind its credentials, stated plainly and only where it is genuinely earned. We would rather say less and be believed than claim more and be doubted.'))}
      />

      {/* ── Main Content ── */}
      <Section spacing="standard">
        <Container>
          
          <div className="max-w-3xl mx-auto mb-32">
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-10 lg:p-14 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cream-100 rounded-bl-full -z-10"></div>
                <h3 className="text-h3 text-brand-navy-800 mb-10">
                  {cmsField(content, 'standards_heading', 'How we hold our standard')}
                </h3>
                
                <div className="space-y-8">
                  {[
                    { icon: <Award /> },
                    { icon: <Scale /> },
                    { icon: <BookOpen /> },
                    { icon: <ShieldCheck /> },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center shrink-0 text-brand-gold-700 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div className="pt-2.5">
                        <span className="font-body text-lg text-navy-700 group-hover:text-brand-navy-900 transition-colors">{standardItems[i]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                <Link href="/credentials" className="btn-primary text-center">
                  {cmsField(content, 'cta_link_1_text', 'See the Mastery Pathway')}
                </Link>
                <Link href="/admissions/contact" className="btn-secondary-light text-center">
                  {cmsField(content, 'cta_link_2_text', 'Contact us')}
                </Link>
              </div>
            </AnimatedSection>
          </div>

        </Container>
      </Section>
    </div>
  )
}
