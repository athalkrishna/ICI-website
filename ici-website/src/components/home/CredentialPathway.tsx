import Link from 'next/link'
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react'
import Section from '@/components/layout/Section'
import { cmsField, cmsPlainBody, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

interface CredentialPathwayProps {
  content?: ContentMap;
}

const LEVEL_DEFAULTS = [
  {
    code: 'L1',
    name: 'Catalyst',
    level: 'Foundation',
    hours: '36 Hours',
    desc: 'Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.',
    href: '/credentials/catalyst',
    bullets: ['12 hours one-to-one coaching', '24 hours guided self-work', 'Final assessment & credential'],
  },
  {
    code: 'L2',
    name: 'Architect',
    level: 'Professional',
    hours: '60 Hours',
    desc: 'Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.',
    href: '/credentials/architect',
    bullets: ['20 hours one-to-one with a senior coach', '40 hours guided self-work', 'Final assessment & credential'],
  },
  {
    code: 'L3',
    name: 'Sage',
    level: 'Senior',
    hours: '90 Hours',
    desc: 'Senior. You coach with depth, range and presence, and work with the most complex clients. 90 hours, one-to-one.',
    href: '/credentials/sage',
    bullets: ['30 hours with a master coach', '60 hours self-work & specialism portfolio', 'Final assessment & credential'],
  },
  {
    code: 'L4',
    name: 'Luminary',
    level: 'Master',
    hours: '120 Hours',
    desc: "The institute's highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.",
    href: '/credentials/luminary',
    bullets: ['40 hours with senior faculty', '80 hours self-work & capstone', 'Conferral of the Luminary distinction'],
  },
];

export default function CredentialPathway({ content = {} }: CredentialPathwayProps) {
  const credentials = LEVEL_DEFAULTS.map((def, i) => {
    const n = i + 1;
    const prefix = `level_${n}_`;
    return {
      code: cmsField(content, `${prefix}code`, def.code),
      name: cmsField(content, `${prefix}name`, def.name),
      level: cmsField(content, `${prefix}tag`, def.level),
      hours: cmsField(content, `${prefix}hours`, def.hours),
      desc: cmsPlainBody(content, `${prefix}body`, def.desc),
      badge: i === 3 ? 'bg-navy-500/20 text-brand-gold-300' : 'bg-white/10 text-white',
      href: cmsField(content, `${prefix}button_link`, def.href),
      bullets: cmsIndexedWithFallbacks(content, `${prefix}bullet_`, def.bullets),
    };
  });

  return (
    <Section spacing="large" className="bg-brand-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-navy-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <p className="text-eyebrow text-brand-gold-400 flex items-center gap-3 justify-center mb-4">
            {cmsField(content, 'pathway_section_label', 'The ICI Mastery Pathway')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {cmsField(content, 'pathway_section_heading', 'Your path to mastery')}
          </h2>
          <p className="text-muted-dark max-w-2xl mx-auto text-body">
            {cmsPlainBody(
              content,
              'pathway_section_subheading',
              'Four progressive levels, each a credential you carry for life, taught one-to-one and online.',
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((cred, i) => (
            <div key={cred.code} className="relative rounded-3xl p-6 md:p-10 h-full flex flex-col transition-all duration-500 group bg-white/5 border border-subtle hover:border-white/30 hover:bg-white/10 backdrop-blur-md">
              <div className="flex items-start justify-between mb-8">
                <div className={`inline-flex items-center gap-2 ${cred.badge} text-xs font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase`}>
                  <Award size={14} aria-hidden />
                  {cred.code}
                </div>
                <div
                  inert
                  className="font-display text-6xl font-bold leading-none text-white/10 group-hover:scale-110 transition-transform duration-500 select-none"
                >
                  0{i + 1}
                </div>
              </div>

              <h3 className="text-h3 text-white mb-2">{cred.name}</h3>
              <div className="text-brand-gold-400 mb-2 text-eyebrow">{cred.level}</div>
              <div className="font-mono text-sm text-navy-100 mb-6">{cred.hours}</div>
              <p className="text-navy-100/70 flex-1 mb-8 text-body">{cred.desc}</p>

              <div className="border-t border-subtle pt-8 mt-auto">
                <ul className="space-y-4 text-sm text-navy-100/90 font-sans mb-8">
                  {cred.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-brand-gold-400 shrink-0 mt-0.5" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={cred.href}
                  className="flex items-center gap-2 text-sm font-sans font-bold transition-colors group/link w-fit min-h-[44px] text-white hover:text-brand-gold-400"
                >
                  Explore {cred.name} pathway
                  <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/admissions/contact" className="btn-primary inline-flex text-base px-8 py-4 min-h-[44px]">
            Not sure where to start? Speak to an advisor
            <ChevronRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}
