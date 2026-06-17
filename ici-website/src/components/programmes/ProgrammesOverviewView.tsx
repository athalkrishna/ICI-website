import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { cmsField, cmsHeroHeadingLines, cmsPlainBody } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import type { ProgrammesOverviewData } from '@/lib/programmes-overview-defaults';

const levelIcons = [<BookOpen key="0" />, <Layers key="1" />, <Award key="2" />, <Sparkles key="3" />];

type Props = {
  content: ContentMap;
  defaults: ProgrammesOverviewData;
};

export default function ProgrammesOverviewView({ content, defaults }: Props) {
  const heroHeading = cmsHeroHeadingLines(
    content,
    'hero_heading',
    'hero_heading_accent',
    defaults.heroHeading,
    defaults.heroHeadingAccent,
  );

  const levels = defaults.levels.map((item, i) => ({
    level: cmsField(content, `level_${i + 1}_label`, item.label),
    title: cmsField(content, `level_${i + 1}_name`, item.title),
    desc: cmsField(content, `level_${i + 1}_description`, item.desc),
    icon: levelIcons[i],
  }));

  const specialisations = defaults.specialisations.map((spec, i) => ({
    name: cmsField(content, `specialisation_${i + 1}_name`, spec.name),
    href: cmsField(content, `specialisation_${i + 1}_link`, spec.href),
    full: spec.full,
  }));

  const howSteps = defaults.howSteps.map((item, i) => ({
    title: cmsField(content, `how_step_${i + 1}_heading`, item.title),
    desc: cmsField(content, `how_step_${i + 1}_body`, item.desc),
  }));

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-500 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-display font-bold text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter mix-blend-overlay">
          ICI
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', defaults.heroEyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {heroHeading.line1}
              {heroHeading.line2 && (
                <>
                  <br />
                  <span className="text-h1-accent">{heroHeading.line2}</span>
                </>
              )}
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              {cmsPlainBody(content, 'hero_body', defaults.heroBody)}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection className="mb-16">
            <h2 className="text-h2 text-brand-navy-800 mb-6 flex items-center gap-4">
              <Sparkles className="text-brand-gold-500" size={40} />
              {cmsField(content, 'mastery_section_heading', defaults.masterySectionHeading)}
            </h2>
            <p className="text-muted max-w-3xl text-body">
              {cmsPlainBody(content, 'mastery_section_body', defaults.masterySectionBody)}
            </p>
          </AnimatedSection>

          <div className="relative mt-24">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-gray-200 via-brand-gold-400 to-gray-200 hidden lg:block -translate-y-1/2"></div>

            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
              {levels.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.15} className={`relative ${i % 2 === 0 ? 'lg:mt-0' : 'lg:mt-24'}`}>
                  <div className="bg-white p-8 md:p-10 hover:border-brand-gold-300 transition-all duration-500 group hover:shadow-2xl relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                    <div className="absolute -top-20 -right-20 text-9xl font-display font-bold text-navy-50 select-none transition-colors">
                      0{i + 1}
                    </div>
                    <div className="w-14 h-14 bg-cream-50 border-brand-gold-100 flex items-center justify-center text-brand-gold-700 mb-8 group-hover:scale-110 group-hover:bg-brand-gold-500 group-hover:text-white transition-all duration-500 rounded-2xl shadow-md border border-navy-100">
                      {item.icon}
                    </div>
                    <div className="mb-3 text-eyebrow">{item.level}</div>
                    <h3 className="text-h3 text-brand-navy-900 mb-4">{item.title}</h3>
                    <p className="text-muted text-body">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <div className="pt-24 lg:pt-32 pb-10 text-center relative z-20">
            <AnimatedSection delay={0.6}>
              <Link
                href={cmsField(content, 'credentials_link_url', defaults.credentialsLinkUrl)}
                className="btn-primary"
              >
                {cmsField(content, 'credentials_link_text', defaults.credentialsLinkText)}
                <ArrowRight size={18} />
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" className="bg-brand-navy-900 text-white relative overflow-hidden border-y border-brand-navy-800">
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <AnimatedSection className="lg:col-span-5">
              <div className="sticky top-32">
                <h2 className="text-h2 text-white mb-6">
                  {cmsField(content, 'specialisations_heading', defaults.specialisationsHeading)}
                  <br />
                  <span className="text-brand-gold-500">
                    {cmsField(content, 'specialisations_heading_accent', defaults.specialisationsHeadingAccent)}
                  </span>
                </h2>
                <p className="text-muted-dark mb-10 text-body">
                  {cmsPlainBody(content, 'specialisations_body', defaults.specialisationsBody)}
                </p>
              </div>
            </AnimatedSection>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {specialisations.map((spec, i) => (
                  <AnimatedSection key={i} delay={i * 0.1} className={spec.full ? 'sm:col-span-2 h-full' : 'h-full'}>
                    <Link href={spec.href} className="block group h-full">
                      <div className="bg-brand-navy-800 p-8 md:p-10 rounded-[32px] border border-faint hover:border-brand-gold-500/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/0 via-brand-gold-500/0 to-brand-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <h3 className="text-h3 text-white group-hover:text-brand-gold-400 transition-colors relative z-10 pr-12">
                          {spec.name}
                        </h3>
                        <div className="mt-8 flex justify-end relative z-10">
                          <div className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center text-white/50 group-hover:bg-brand-gold-500 group-hover:text-brand-navy-900 group-hover:border-brand-gold-500 transition-all duration-300 transform group-hover:translate-x-2">
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="large" className="relative z-20">
        <Container>
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-h2 text-brand-navy-900">
              {cmsField(content, 'how_it_works_heading', defaults.howItWorksHeading)}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {howSteps.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white p-10 md:p-14 relative overflow-hidden group hover:border-brand-gold-200 transition-colors duration-500 h-full rounded-[32px] shadow-2xl border border-navy-100">
                  <div className="absolute -right-8 -bottom-16 text-9xl font-display font-bold text-navy-50 select-none transition-colors leading-none pointer-events-none">
                    0{i + 1}
                  </div>
                  <div className="relative z-10">
                    <span className="text-brand-gold-700 font-display text-2xl mb-6 block italic">0{i + 1}</span>
                    <h3 className="font-sans text-brand-navy-800 text-h3 mb-4">{item.title}</h3>
                    <p className="text-muted text-body">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                href={cmsField(content, 'cta_link_1_url', defaults.ctaLink1Url)}
                className="btn-primary w-full sm:w-auto justify-center"
              >
                {cmsField(content, 'cta_link_1_text', defaults.ctaLink1Text)}
              </Link>
              <Link
                href={cmsField(content, 'cta_link_2_url', defaults.ctaLink2Url)}
                className="btn-secondary w-full sm:w-auto justify-center border-brand-navy-200 hover:border-brand-navy-900 text-brand-navy-700 hover:text-brand-navy-900 hover:bg-brand-navy-50"
              >
                {cmsField(content, 'cta_link_2_text', defaults.ctaLink2Text)}
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  );
}
