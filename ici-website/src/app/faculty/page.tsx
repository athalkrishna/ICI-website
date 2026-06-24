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

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/faculty');
}

export default async function FacultyResearchPage() {
  const [content, facultyCoaches] = await Promise.all([
    getPublishedPageContent('/faculty'),
    getPublishedFacultyCoaches(),
  ])

  const themeItems = cmsIndexedWithFallbacks(content, 'theme_', [
    'The inner life of high achievers, including the loneliness of success',
    'How change really happens in the brain and the nervous system',
    'Leadership as a practice of self-mastery',
    'Defence mechanisms, projection and the patterns that shape behaviour',
    'Contemplative traditions and modern behavioural science in dialogue',
  ])

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', 'Faculty & Research')}
        title={cmsField(content, 'hero_heading', 'Taught by people who still do the work')}
        body={stripHtml(cmsHtml(content, 'hero_body', 'A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers, people who carry real client work into the room with them. Alongside our teaching, we share thinking on coaching, leadership and the psychology of change, because the field only advances when practitioners keep questioning it.'))}
      />

      {/* ── Our Faculty ── */}
      <Section spacing="none" className="relative z-20 pt-24 pb-8">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'faculty_section_heading', 'Our faculty')}
            </h2>
            <p className="text-muted text-lg mb-12">
              {stripHtml(cmsHtml(content, 'faculty_section_body', 'ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour. Many continue to coach senior leaders while they teach, so what you learn reflects how coaching actually works today. Because we teach one-to-one, you work closely with a coach matched to your level and focus.'))}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CoachGrid coaches={facultyCoaches} />
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Research & Thinking ── */}
      <Section spacing="none" className="bg-cream-50 border-t border-navy-100 relative z-20 pt-12 pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'research_heading', 'Our approach to research and thinking')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'research_body', 'Coaching deserves rigour. We draw on coaching psychology, behavioural science and neuroscience, test ideas against real practice, and share what we learn through articles and teaching. The aim is not theory for its own sake, but better coaching for the people our graduates serve.')}
              </p>
              <div className="mt-8">
                <Link href={cmsField(content, 'cta_button_link', '/resources')} className="btn-primary">
                  {cmsField(content, 'cta_button_text', 'Read our latest insights')}
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-white p-8 md:p-10 rounded-3xl border border-navy-100 shadow-xl">
              <h3 className="text-h3 text-brand-navy-900 mb-6">
                {cmsField(content, 'themes_heading', 'Themes we explore')}
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
