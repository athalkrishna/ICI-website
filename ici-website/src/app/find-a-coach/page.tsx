import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import { SlidersHorizontal } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import CoachDirectory from '@/components/coaches/CoachDirectory'
import { getPublishedPageContent } from '@/lib/content'
import { getPublishedDirectoryCoaches } from '@/lib/coaches'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/find-a-coach');
}

export default async function FindACoachPage() {
  const [content, coaches] = await Promise.all([
    getPublishedPageContent('/find-a-coach'),
    getPublishedDirectoryCoaches(),
  ])

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', 'Find a Coach')}
        title={cmsField(content, 'hero_heading', 'Find a coach you can trust')}
        body={stripHtml(cmsHtml(content, 'hero_body', 'Anyone can call themselves a coach. The coaches listed here have earned an ICI credential through real training, one-to-one, and assessment on real coaching, which means you can approach them with confidence. Tell us what you are looking for and we will help you find someone who fits.'))}
      />

      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection>
            <div className="bg-white border border-navy-100 shadow-xl p-6 md:p-8 rounded-[24px] mb-12 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-navy-100 relative z-10">
                <SlidersHorizontal size={20} className="text-brand-gold-600" />
                <h2 className="font-sans text-h2 text-brand-navy-900">
                  {cmsField(content, 'filter_heading', 'Search and filter')}
                </h2>
              </div>

              <CoachDirectory
                coaches={coaches}
                labels={{
                  specialism: cmsField(content, 'filter_specialism_label', 'By specialism'),
                  specialismAll: cmsField(content, 'filter_specialism_default', 'All Specialisms'),
                  level: cmsField(content, 'filter_level_label', 'By level'),
                  levelAll: cmsField(content, 'filter_level_default', 'All Levels'),
                  language: cmsField(content, 'filter_language_label', 'By language'),
                  languageAll: cmsField(content, 'filter_language_default', 'All Languages'),
                  availability: cmsField(content, 'filter_availability_label', 'By availability'),
                  availabilityAll: cmsField(content, 'filter_availability_default', 'Any Availability'),
                  empty: cmsField(content, 'directory_empty_message', 'No coaches match your filters yet. Try adjusting your search or contact us for a personal recommendation.'),
                }}
              />
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'why_heading', 'Why choose an ICI coach')}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'why_body', 'Every coach in this directory holds a credential that was earned, not bought. They have been trained in coaching craft, psychology, neuroscience and human behaviour, and are held to a professional standard of ethics and practice.')}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
