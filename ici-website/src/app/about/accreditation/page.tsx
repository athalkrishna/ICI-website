import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Award, Scale, BookOpen } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
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
      {/* ── Hero Section ── */}
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
                {cmsField(content, 'hero_eyebrow', 'Recognition & Accreditation')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'Standards you can stand behind')}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl">
              {stripHtml(cmsHtml(content, 'hero_body', 'A credential is only worth what it can be trusted to mean. This page sets out how ICI holds its standard, the bodies it works with, and the recognition behind its credentials, stated plainly and only where it is genuinely earned. We would rather say less and be believed than claim more and be doubted.'))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

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
