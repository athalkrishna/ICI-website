import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'
import { MISSION_DEFAULTS } from '@/lib/mission-defaults'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/about/mission');
}

function missionBody(content: Record<string, string | undefined>): string {
  const fromMission = content.mission_body?.trim();
  if (fromMission) return stripHtml(fromMission);
  const fromHero = content.hero_body?.trim();
  if (fromHero) return stripHtml(fromHero);
  return MISSION_DEFAULTS.mission_body;
}

function visionBody(content: Record<string, string | undefined>): string {
  const fromVision = content.vision_body?.trim();
  if (fromVision) return stripHtml(fromVision);
  const fromSection = content.section_1_body?.trim();
  if (fromSection) return stripHtml(fromSection);
  return MISSION_DEFAULTS.vision_body;
}

export default async function MissionPage() {
  const content = await getPublishedPageContent('/about/mission')
  const d = MISSION_DEFAULTS

  const valueTitles = cmsIndexedWithFallbacks(content, 'value_title_', [
    d.value_title_1,
    d.value_title_2,
    d.value_title_3,
    d.value_title_4,
  ])
  const valueDescs = cmsIndexedWithFallbacks(content, 'value_desc_', [
    d.value_desc_1,
    d.value_desc_2,
    d.value_desc_3,
    d.value_desc_4,
  ])

  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
        title={cmsField(content, 'hero_heading', d.hero_heading)}
      />

      <Section spacing="compact" className="lg:py-24 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <AnimatedSection>
              <div className="pl-6 border-l-2 border-brand-gold-400 relative">
                <span className="absolute -left-[3px] top-0 text-brand-gold-400 text-6xl leading-none font-display opacity-20">&quot;</span>
                <h2 className="text-h3 text-brand-navy-800 mb-6">
                  {cmsField(content, 'mission_heading', d.mission_heading)}
                </h2>
                <p className="text-xl md:text-2xl text-brand-navy-600 leading-relaxed font-light">
                  {missionBody(content)}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="pl-6 border-l-2 border-brand-navy-200 relative">
                <span className="absolute -left-[3px] top-0 text-brand-navy-200 text-6xl leading-none font-display opacity-20">&quot;</span>
                <h2 className="text-h3 text-brand-navy-800 mb-6">
                  {cmsField(content, 'vision_heading', cmsField(content, 'section_1_heading', d.vision_heading))}
                </h2>
                <p className="text-xl md:text-2xl text-brand-navy-600 leading-relaxed font-light">
                  {visionBody(content)}
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-brand-navy-800 mb-6">
                {cmsField(content, 'values_heading', cmsField(content, 'section_2_heading', d.values_heading))}
              </h2>
              <div className="w-24 h-1 bg-brand-gold-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {valueTitles.map((title, i) => (
                <div key={i} className="group relative bg-white p-10 lg:p-12 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cream-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="text-brand-gold-200 font-display text-6xl md:text-7xl font-bold italic mb-6 leading-none">{String(i + 1).padStart(2, '0')}</div>
                  <h4 className="font-display font-bold text-brand-navy-800 text-h4 mb-4 group-hover:text-brand-gold-600 transition-colors">{title}.</h4>
                  <p className="text-muted text-body">{valueDescs[i]}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
