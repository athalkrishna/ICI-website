import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import CoachGrid from '@/components/coaches/CoachGrid'
import { getPublishedFacultyCoaches } from '@/lib/coaches'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'
import {
  LEADERSHIP_FACULTY_BODY_HTML,
  LEADERSHIP_FACULTY_DEFAULTS,
} from '@/lib/leadership-faculty-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about/leadership-faculty');
}

export default async function LeadershipFacultyPage() {
  const [content, facultyCoaches] = await Promise.all([
    getPublishedPageContent('/about/leadership-faculty'),
    getPublishedFacultyCoaches(),
  ])

  const d = LEADERSHIP_FACULTY_DEFAULTS

  return (
    <div className="bg-cream-50 min-h-screen">
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', d.hero_heading)}
            </h1>
            <p className="text-muted-dark text-base max-w-3xl">
              {cmsField(content, 'hero_subheading', d.hero_subheading)}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="compact" className="lg:py-24">
        <Container>
          <AnimatedSection className="max-w-4xl space-y-8">
            <p className="text-navy-700 text-base">
              {stripHtml(cmsHtml(content, 'hero_body', LEADERSHIP_FACULTY_BODY_HTML))}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Link href={cmsField(content, 'cta_link_1_url', d.cta_link_1_url)} className="btn-primary text-center">
                {cmsField(content, 'cta_link_1_text', d.cta_link_1_text)}
              </Link>
              <Link href={cmsField(content, 'cta_link_2_url', d.cta_link_2_url)} className="btn-secondary-light text-center">
                {cmsField(content, 'cta_link_2_text', d.cta_link_2_text)}
              </Link>
            </div>
          </AnimatedSection>

          {facultyCoaches.length > 0 && (
            <AnimatedSection delay={0.15} className="mt-20">
              <h2 className="text-h2 text-brand-navy-900 mb-8">
                {cmsField(content, 'faculty_section_heading', d.faculty_section_heading)}
              </h2>
              <CoachGrid coaches={facultyCoaches} />
            </AnimatedSection>
          )}
        </Container>
      </Section>
    </div>
  )
}
