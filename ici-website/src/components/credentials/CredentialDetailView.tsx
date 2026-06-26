import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { cmsField, cmsIndexedWithFallbacks, cmsHeroEyebrow } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import type { CredentialDetailDefaults } from '@/lib/credential-defaults';

type Props = {
  content: ContentMap;
  defaults: CredentialDetailDefaults;
};

export default function CredentialDetailView({ content, defaults }: Props) {
  const forWho = cmsIndexedWithFallbacks(content, 'for_who_', defaults.forWho);
  const formatItems = cmsIndexedWithFallbacks(content, 'format_item_', defaults.formatItems);
  const learningPoints = cmsIndexedWithFallbacks(content, 'learning_point_', defaults.learningPoints);
  const graduateItems = cmsIndexedWithFallbacks(content, 'graduate_', defaults.graduateItems);

  const modules = defaults.modules.map((mod, i) => ({
    title: cmsField(content, `module_${i + 1}_title`, mod.title),
    body: cmsField(content, `module_${i + 1}_body`, mod.body),
  }));

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
                {cmsHeroEyebrow(content, defaults.heroLabel)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-6">
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
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8 space-y-16 lg:space-y-24">
              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6 lg:mb-8">
                  {cmsField(content, 'overview_heading', defaults.whoHeading)}
                </h2>
                <ul className="space-y-4">
                  {forWho.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted font-body text-lg">
                      <CheckCircle2 className="text-brand-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">
                  {cmsField(content, 'entry_requirements_heading', defaults.entryRequirementsHeading)}
                </h2>
                <p className="text-muted text-body">
                  {cmsField(content, 'entry_requirements_body', defaults.entryRequirementsBody)}
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">
                  {cmsField(content, 'format_heading', defaults.formatHeading)}
                </h2>
                <p className="text-muted mb-6 text-body">
                  {cmsField(content, 'format_intro', defaults.formatIntro)}
                </p>
                <ul className="space-y-4">
                  {formatItems.map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-4 text-muted font-body text-lg ${i === formatItems.length - 1 ? 'font-bold' : ''}`}
                    >
                      <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-8">
                  {cmsField(content, 'learning_heading', defaults.learningHeading)}
                </h2>
                <ul className="space-y-4">
                  {learningPoints.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted font-body text-lg">
                      <CheckCircle2 className="text-brand-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-8">
                  {cmsField(content, 'syllabus_heading', defaults.syllabusHeading)}
                </h2>
                <p className="text-muted mb-8 text-body">
                  {cmsField(content, 'syllabus_intro', defaults.syllabusIntro)}
                </p>
                <div className="space-y-6">
                  {modules.map((mod, i) => (
                    <div
                      key={i}
                      className="bg-white p-8 hover:border-brand-gold-300 transition-colors rounded-2xl shadow-md border border-navy-100"
                    >
                      <h4 className="font-sans font-bold text-brand-navy-900 text-h4 mb-3">{mod.title}</h4>
                      <p className="text-muted text-body">{mod.body}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">
                  {cmsField(content, 'assessment_heading', defaults.assessmentHeading)}
                </h2>
                <p className="text-muted text-body">
                  {cmsField(content, 'assessment_body', defaults.assessmentBody)}
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-8">
                  {cmsField(content, 'graduate_heading', defaults.graduateHeading)}
                </h2>
                <ul className="space-y-4">
                  {graduateItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted font-body text-lg">
                      <CheckCircle2 className="text-brand-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <AnimatedSection delay={0.2}>
                  <div className="bg-brand-navy-800 p-8 lg:p-10 border-subtle rounded-3xl shadow-xl border border-navy-100">
                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-subtle">
                      {cmsField(content, 'sidebar_heading', defaults.sidebarHeading)}
                    </h3>
                    <ul className="space-y-6">
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Level</div>
                        <div className="text-navy-50 font-sans">
                          {cmsField(content, 'sidebar_level', defaults.sidebarLevel)}
                        </div>
                      </li>
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Format</div>
                        <div className="text-navy-50 font-sans">
                          {cmsField(content, 'sidebar_format', defaults.sidebarFormat)}
                        </div>
                      </li>
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Hours</div>
                        <div className="text-navy-50 font-sans">
                          {cmsField(content, 'programme_hours', defaults.sidebarHours)}
                        </div>
                      </li>
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Suggested duration</div>
                        <div className="text-navy-50 font-sans">
                          {cmsField(content, 'sidebar_duration', defaults.sidebarDuration)}
                        </div>
                      </li>
                      {defaults.sidebarInvestment && (
                        <li>
                          <div className="mb-1 text-eyebrow text-brand-gold-400">Investment</div>
                          <div className="text-navy-50 font-sans">
                            {cmsField(content, 'sidebar_investment', defaults.sidebarInvestment)}
                          </div>
                        </li>
                      )}
                    </ul>

                    <div className="mt-10 pt-8 border-t border-subtle flex flex-col gap-4">
                      <Link
                        href={cmsField(content, 'cta_button_link', defaults.ctaPrimaryLink)}
                        className="btn-primary w-full justify-center"
                      >
                        {cmsField(content, 'cta_button_text', defaults.ctaPrimaryText)}{' '}
                        <ChevronRight size={18} />
                      </Link>
                      <Link
                        href={cmsField(content, 'advisor_link_url', defaults.ctaSecondaryLink)}
                        className="btn-secondary w-full justify-center text-center"
                      >
                        {cmsField(content, 'advisor_link_text', defaults.ctaSecondaryText)}
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
