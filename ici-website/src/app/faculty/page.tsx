import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import CoachGrid from '@/components/coaches/CoachGrid'
import { getPublishedFacultyCoaches } from '@/lib/coaches'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'
import {
  FACULTY_DEFAULTS,
  FACULTY_HERO_BODY_HTML,
  FACULTY_SECTION_BODY_HTML,
  FACULTY_THEME_ITEMS,
} from '@/lib/faculty-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/faculty');
}

export default async function FacultyResearchPage() {
  const [content, facultyCoaches] = await Promise.all([
    getPublishedPageContent('/faculty'),
    getPublishedFacultyCoaches(),
  ])

  const d = FACULTY_DEFAULTS
  const themeItems = cmsIndexedWithFallbacks(content, 'theme_', [...FACULTY_THEME_ITEMS])

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
        title={cmsField(content, 'hero_heading', d.hero_heading)}
        body={stripHtml(cmsHtml(content, 'hero_body', FACULTY_HERO_BODY_HTML))}
      />

      {/* ── Our Faculty ── */}
      <Section spacing="none" className="relative z-20 pt-24 pb-8">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'faculty_section_heading', d.faculty_section_heading)}
            </h2>
            <p className="text-muted text-lg mb-12">
              {stripHtml(cmsHtml(content, 'faculty_section_body', FACULTY_SECTION_BODY_HTML))}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CoachGrid
              coaches={facultyCoaches}
              emptyMessage={cmsField(content, 'faculty_empty_message', d.faculty_empty_message)}
            />
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Research & Thinking ── */}
      <Section spacing="none" className="bg-cream-50 border-t border-navy-100 relative z-20 pt-12 pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'research_heading', d.research_heading)}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'research_body', d.research_body)}
              </p>
              <div className="mt-8">
                <Link href={cmsField(content, 'cta_button_link', d.cta_button_link)} className="btn-primary">
                  {cmsField(content, 'cta_button_text', d.cta_button_text)}
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-white p-8 md:p-10 rounded-3xl border border-navy-100 shadow-xl">
              <h3 className="text-h3 text-brand-navy-900 mb-6">
                {cmsField(content, 'themes_heading', d.themes_heading)}
              </h3>
              <ul className="space-y-4 text-muted text-body">
                {themeItems.map((theme, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 shrink-0"></div>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

    </div>
  )
}
