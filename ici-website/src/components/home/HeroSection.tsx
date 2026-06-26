import Link from 'next/link';
import { HOME_HERO_DEFAULTS } from '@/lib/home-hero-defaults';
import { cmsField, cmsPlainBody } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import DeferredHeroLeadForm from '@/components/home/DeferredHeroLeadForm';

interface HeroSectionProps {
  content?: ContentMap;
}

function IconArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function HeroSection({ content = {} }: HeroSectionProps) {
  const stats = [1, 2, 3, 4].map((n) => ({
    value: `${cmsField(content, `stat_${n}_number`, HOME_HERO_DEFAULTS[`stat_${n}_number`])}${cmsField(content, `stat_${n}_suffix`, HOME_HERO_DEFAULTS[`stat_${n}_suffix`])}`,
    label: cmsField(content, `stat_${n}_label`, HOME_HERO_DEFAULTS[`stat_${n}_label`]),
  }));

  return (
    <section className="relative min-h-[85dvh] lg:min-h-screen flex items-center bg-brand-navy-700 overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern" aria-hidden />
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent opacity-80"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28 w-full">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <p className="text-eyebrow text-brand-gold-400 flex items-center gap-3 justify-center mb-6">
              {cmsField(content, 'hero_eyebrow', HOME_HERO_DEFAULTS.hero_eyebrow)}
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 whitespace-pre-line">
              {cmsField(content, 'hero_heading', HOME_HERO_DEFAULTS.hero_heading)}
            </h1>

            <p className="text-body-lg text-navy-100 mb-8 max-w-xl text-justify">
              {cmsPlainBody(content, 'hero_body', HOME_HERO_DEFAULTS.hero_body)}
            </p>

            <div className="flex flex-wrap md:flex-nowrap items-center gap-y-6 mb-10">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center w-1/2 md:w-auto">
                  <div className={`pr-6 ${i === 0 ? 'md:pr-8' : 'md:px-8'}`}>
                    <div className="font-sans tabular-nums text-3xl font-bold text-brand-gold-400">{stat.value}</div>
                    <div className="font-sans text-xs text-navy-100 tracking-wide mt-0.5">{stat.label}</div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="hidden md:block h-10 w-px bg-brand-gold-600/40" aria-hidden />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={cmsField(content, 'hero_primary_button_link', HOME_HERO_DEFAULTS.hero_primary_button_link)}
                className="btn-primary text-base px-8 py-4 min-h-[44px]"
              >
                {cmsField(content, 'hero_primary_button_text', HOME_HERO_DEFAULTS.hero_primary_button_text)}
                <IconArrowRight />
              </Link>
              <Link
                href={cmsField(content, 'hero_secondary_button_link', HOME_HERO_DEFAULTS.hero_secondary_button_link)}
                className="btn-secondary text-base px-8 py-4 min-h-[44px]"
              >
                <IconDownload />
                {cmsField(content, 'hero_secondary_button_text', HOME_HERO_DEFAULTS.hero_secondary_button_text)}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <DeferredHeroLeadForm content={content} />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1 motion-safe:animate-bounce"
        aria-hidden
      >
        <span className="text-eyebrow">Scroll</span>
        <IconChevronDown />
      </div>
    </section>
  );
}
