import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { cmsField } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import type { AdmissionsOverviewData } from '@/lib/admissions-overview-defaults';
import AdmissionsFaq from '@/app/admissions/AdmissionsFaq';

type Props = {
  content: ContentMap;
  defaults: AdmissionsOverviewData;
};

export default function AdmissionsOverviewView({ content, defaults }: Props) {
  const applySteps = defaults.applySteps.map((item, i) =>
    cmsField(content, `apply_step_${i + 1}`, item),
  );

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
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
                {cmsField(content, 'hero_eyebrow', defaults.heroEyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', defaults.heroHeading)}
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              {cmsField(content, 'hero_body', defaults.heroBody)}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="compact" className="lg:py-24 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-12">
                {cmsField(content, 'how_to_apply_heading', defaults.howToApplyHeading)}
              </h2>
              <ol className="space-y-8">
                {applySteps.map((item, i) => (
                  <li key={i} className="flex gap-6 text-muted font-body text-lg items-start">
                    <div className="text-brand-gold-500 font-display text-3xl italic shrink-0 leading-none mt-1">
                      0{i + 1}
                    </div>
                    <div className="pt-1">{item}</div>
                  </li>
                ))}
              </ol>
            </AnimatedSection>

            <div className="space-y-16">
              <AnimatedSection delay={0.1}>
                <h3 className="text-h3 text-brand-navy-900 mb-6 pb-4 border-b border-brand-navy-200">
                  {cmsField(content, 'entry_requirements_heading', defaults.entryRequirementsHeading)}
                </h3>
                <p className="text-muted mb-8 text-body">
                  {cmsField(content, 'entry_requirements_body', defaults.entryRequirementsBody)}
                </p>
                <div className="bg-white p-8 rounded-2xl shadow-md border border-navy-100">
                  <h4 className="font-sans font-bold text-h4 text-brand-navy-900 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-gold-500"></div>
                    {cmsField(content, 'assessment_heading', defaults.assessmentHeading)}
                  </h4>
                  <p className="text-muted mb-6 text-body">
                    {cmsField(content, 'assessment_body', defaults.assessmentBody)}
                  </p>
                  <Link
                    href={cmsField(content, 'assessment_link_url', defaults.assessmentLinkUrl)}
                    className="text-brand-gold-700 font-sans font-bold hover:text-brand-gold-800 transition-colors inline-flex items-center gap-1"
                  >
                    {cmsField(content, 'assessment_link_text', defaults.assessmentLinkText)}{' '}
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h3 className="text-h3 text-brand-navy-900 mb-6 pb-4 border-b border-brand-navy-200">
                  {cmsField(content, 'tuition_heading', defaults.tuitionHeading)}
                </h3>
                <p className="text-muted mb-6 text-body">
                  {cmsField(content, 'tuition_body', defaults.tuitionBody)}
                </p>
                <Link
                  href={cmsField(content, 'tuition_link_url', defaults.tuitionLinkUrl)}
                  className="btn-primary inline-flex"
                >
                  {cmsField(content, 'tuition_link_text', defaults.tuitionLinkText)} <ChevronRight size={18} />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="compact" className="lg:py-24 relative z-20">
        <div className="max-w-[800px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-h2 text-brand-navy-900 mb-4">
              {cmsField(content, 'faq_heading', defaults.faqHeading)}
            </h2>
            <div className="w-24 h-1 bg-brand-gold-500 mx-auto" />
          </AnimatedSection>

          <AdmissionsFaq content={content} defaults={defaults} />

          <AnimatedSection delay={0.4} className="mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                href={cmsField(content, 'cta_button_1_link', defaults.ctaButton1Link)}
                className="btn-primary"
              >
                {cmsField(content, 'cta_button_1_text', defaults.ctaButton1Text)}
              </Link>
              <Link
                href={cmsField(content, 'cta_button_2_link', defaults.ctaButton2Link)}
                className="btn-secondary-light"
              >
                {cmsField(content, 'cta_button_2_text', defaults.ctaButton2Text)}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </div>
  );
}
