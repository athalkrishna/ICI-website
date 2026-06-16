import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { cmsField } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import type { CredentialsOverviewData } from '@/lib/credentials-overview-defaults';

const pathwayKeys = ['catalyst', 'architect', 'sage', 'luminary'] as const;

type Props = {
  content: ContentMap;
  defaults: CredentialsOverviewData;
};

export default function CredentialsOverviewView({ content, defaults }: Props) {
  const reasons = defaults.differences.map((reason, i) => ({
    title: cmsField(content, `difference_${i + 1}_heading`, reason.title),
    text: cmsField(content, `difference_${i + 1}_body`, reason.text),
  }));

  const pathways = defaults.pathways.map((path, i) => {
    const key = pathwayKeys[i];
    return {
      title: cmsField(content, `${key}_heading`, path.title),
      subline: cmsField(content, `${key}_subline`, path.subline),
      href: cmsField(content, `${key}_link`, path.href),
      desc: cmsField(content, `${key}_body`, path.desc),
      badge: path.badge,
      cta: cmsField(content, `${key}_cta_text`, path.cta),
    };
  });

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
          <AnimatedSection className="mb-12 lg:mb-16">
            <h2 className="text-h3 text-brand-navy-900 mb-4">
              {cmsField(content, 'differences_section_heading', defaults.differencesSectionHeading)}
            </h2>
            <div className="w-24 h-1 bg-brand-gold-500" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white p-8 hover:border-brand-gold-300 hover:shadow-2xl transition-all h-full rounded-2xl shadow-md border border-navy-100">
                  <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center border border-brand-gold-100 mb-6 text-brand-gold-700">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-sans font-bold text-brand-navy-900 text-h4 mb-3">{reason.title}.</h4>
                  <p className="text-muted text-body">{reason.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-14">
              <Link href="#levels" className="btn-primary px-8 py-4 text-base justify-center">
                {cmsField(content, 'find_level_cta_text', defaults.findLevelCtaText)} <ChevronRight size={18} />
              </Link>
              <Link href="/pricing" className="btn-secondary-light px-8 py-4 text-base justify-center">
                {cmsField(content, 'see_pricing_cta_text', defaults.seePricingCtaText)}
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <Section id="levels" spacing="compact" className="relative z-20">
        <Container>
          <AnimatedSection className="mb-12 lg:mb-16">
            <h2 className="text-h3 text-brand-navy-900 mb-4">
              {cmsField(content, 'levels_section_heading', defaults.levelsSectionHeading)}
            </h2>
            <div className="w-24 h-1 bg-brand-gold-500" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {pathways.map((path, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link
                  href={path.href}
                  className="group block bg-white hover:border-brand-gold-300 p-8 lg:p-12 transition-all duration-300 h-full relative overflow-hidden hover:shadow-2xl rounded-3xl shadow-xl border border-navy-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/0 to-brand-gold-500/0 group-hover:from-brand-gold-500/5 group-hover:to-transparent transition-colors duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className={`inline-flex items-center gap-2 ${path.badge} text-xs font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase mb-8 self-start`}
                    >
                      <Award size={14} /> Level {i + 1}
                    </div>
                    <h3 className="text-h3 text-brand-navy-900 mb-6 group-hover:text-brand-gold-700 transition-colors">
                      {path.title}
                      <span className="block text-lg font-sans font-normal text-muted mt-2">{path.subline}</span>
                    </h3>
                    <p className="text-muted mb-12 flex-1 text-body">{path.desc}</p>

                    <div className="flex items-center gap-3 group-hover:translate-x-2 transition-transform text-eyebrow">
                      {path.cta} <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
