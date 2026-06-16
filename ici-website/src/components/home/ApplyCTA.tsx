'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import { cmsField, cmsPlainBody } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

interface ApplyCTAProps {
  content?: ContentMap;
}

export default function ApplyCTA({ content = {} }: ApplyCTAProps) {
  return (
    <Section spacing="standard" className="bg-brand-gold-gradient text-brand-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-10 mix-blend-overlay" />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{cmsField(content, 'cta_heading', 'Ready to Transform Lives?')}</h2>
          <p className="text-brand-navy-800 mb-8 max-w-2xl mx-auto text-body">
            {cmsPlainBody(content, 'cta_body', 'Take the first step towards a rewarding career. Applications are now open for the upcoming cohort.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={cmsField(content, 'cta_primary_button_link', '/apply')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-navy-700 hover:bg-brand-navy-800 text-white font-sans font-semibold rounded-lg transition-colors">
              {cmsField(content, 'cta_primary_button_text', 'Start Your Application')}
              <ArrowRight size={18} />
            </Link>
            <Link href={cmsField(content, 'cta_secondary_button_link', '/admissions/contact')} className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-navy-700 text-brand-navy-700 hover:bg-brand-navy-700 hover:text-white font-sans font-semibold rounded-lg transition-colors">
              {cmsField(content, 'cta_secondary_button_text', 'Speak to an Advisor')}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  )
}
