import Link from 'next/link';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { HOME_HERO_DEFAULTS } from '@/lib/home-hero-defaults';
import DeferredHeroLeadForm from '@/components/home/DeferredHeroLeadForm';

const stats = [
  {
    value: `${HOME_HERO_DEFAULTS.stat_1_number}${HOME_HERO_DEFAULTS.stat_1_suffix}`,
    label: HOME_HERO_DEFAULTS.stat_1_label,
  },
  {
    value: `${HOME_HERO_DEFAULTS.stat_2_number}${HOME_HERO_DEFAULTS.stat_2_suffix}`,
    label: HOME_HERO_DEFAULTS.stat_2_label,
  },
  {
    value: `${HOME_HERO_DEFAULTS.stat_3_number}${HOME_HERO_DEFAULTS.stat_3_suffix}`,
    label: HOME_HERO_DEFAULTS.stat_3_label,
  },
  {
    value: `${HOME_HERO_DEFAULTS.stat_4_number}${HOME_HERO_DEFAULTS.stat_4_suffix}`,
    label: HOME_HERO_DEFAULTS.stat_4_label,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-navy-700 overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern" aria-hidden />
      <div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent opacity-80"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-28 w-full">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <p className="text-eyebrow text-brand-gold-400 flex items-center gap-3 justify-center mb-6">
              {HOME_HERO_DEFAULTS.hero_eyebrow}
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 whitespace-pre-line">
              {HOME_HERO_DEFAULTS.hero_heading}
            </h1>

            <p className="text-body-lg text-navy-100 mb-8 max-w-xl text-justify">
              {HOME_HERO_DEFAULTS.hero_body}
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
              <Link href={HOME_HERO_DEFAULTS.hero_primary_button_link} className="btn-primary text-base px-8 py-4 min-h-[44px]">
                {HOME_HERO_DEFAULTS.hero_primary_button_text}
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href={HOME_HERO_DEFAULTS.hero_secondary_button_link}
                className="btn-secondary text-base px-8 py-4 min-h-[44px]"
              >
                <Download size={18} aria-hidden />
                {HOME_HERO_DEFAULTS.hero_secondary_button_text}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <DeferredHeroLeadForm />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1 motion-safe:animate-bounce"
        aria-hidden
      >
        <span className="text-eyebrow">Scroll</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
