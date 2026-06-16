'use client'

import Section from '@/components/layout/Section'
import { cmsField } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

const ACCREDITATION_DEFAULTS = [
  { name: 'ICF', subtitle: 'Accredited' },
  { name: 'EMCC', subtitle: 'Global Standard' },
  { name: 'AC', subtitle: 'Association' },
  { name: 'CCE', subtitle: 'Approved Provider' },
  { name: 'ISO', subtitle: '9001:2015' },
];

interface AccreditationLogosProps {
  content?: ContentMap;
}

export default function AccreditationLogos({ content = {} }: AccreditationLogosProps) {
  return (
    <Section spacing="standard" className="bg-white border-y border-navy-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-sans font-semibold text-navy-400 uppercase tracking-widest mb-8">
          The standard we hold ourselves to
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 text-navy-400 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {ACCREDITATION_DEFAULTS.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 16H22M16 10V22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-xl text-brand-navy-700 leading-none tracking-tight">
                  {cmsField(content, `accreditation_${i + 1}_name`, item.name)}
                </span>
                <span className="font-sans text-xs text-muted uppercase tracking-widest leading-none mt-1.5">
                  {cmsField(content, `accreditation_${i + 1}_subtitle`, item.subtitle)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
