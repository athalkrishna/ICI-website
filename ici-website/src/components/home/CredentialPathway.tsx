'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

interface CredentialPathwayProps {
  content?: Record<string, string>;
}

export default function CredentialPathway({ content = {} }: CredentialPathwayProps) {
  const credentials = [
    {
      code:    'L1',
      name:    content.cred_catalyst_title || 'Catalyst (Level 1)',
      level:   'Foundation',
      hours:   '36 Hours',
      desc:    content.cred_catalyst_body || 'Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.',
      badge:   'bg-white/10 text-white',
      href:    '/credentials/catalyst',
      popular: false,
    },
    {
      code:    'L2',
      name:    content.cred_architect_title || 'Architect (Level 2)',
      level:   'Professional',
      hours:   '60 Hours',
      desc:    content.cred_architect_body || 'Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.',
      badge:   'bg-gold-500/20 text-gold-400',
      href:    '/credentials/architect',
      popular: true,
    },
    {
      code:    'L3',
      name:    content.cred_sage_title || 'Sage (Level 3)',
      level:   'Senior',
      hours:   '90 Hours',
      desc:    content.cred_sage_body || 'Senior. You coach with depth, range and presence, and work with the most complex clients. 90 hours, one-to-one.',
      badge:   'bg-white/10 text-white',
      href:    '/credentials/sage',
      popular: false,
    },
    {
      code:    'L4',
      name:    content.cred_luminary_title || 'Luminary (Level 4)',
      level:   'Master',
      hours:   '120 Hours',
      desc:    content.cred_luminary_body || 'The institute\'s highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.',
      badge:   'bg-purple-500/20 text-purple-300',
      href:    '/credentials/luminary',
      popular: false,
    },
  ];
  return (
    <section className="bg-navy-900 py-32 relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="section-label mb-4 text-gold-400">{content.credential_eyebrow || 'The ICI Mastery Pathway'}</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {content.credential_heading || 'Your path to mastery'}
          </h2>
          <p className="font-body text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {content.credential_subtext || 'Four progressive levels, each a credential you carry for life, taught one-to-one and online.'}
          </p>
        </AnimatedSection>

        {/* Credential cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((cred, i) => (
            <AnimatedSection key={cred.code} delay={i * 0.1}>
              <div 
                className={`relative rounded-3xl p-6 md:p-10 h-full flex flex-col transition-all duration-500 group
                  ${cred.popular 
                    ? 'bg-navy-800/80 border border-gold-500/40 shadow-[0_0_40px_rgba(201,168,76,0.15)] transform md:-translate-y-4' 
                    : 'bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10'}
                  backdrop-blur-md`}
              >
                {/* Most popular badge */}
                {cred.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 text-[10px] font-sans font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-gold-500/30">
                    Most Popular
                  </div>
                )}

                {/* Icon + Code */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`inline-flex items-center gap-2 ${cred.badge} text-xs font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase`}>
                    <Award size={14} />
                    {cred.code}
                  </div>
                  <div className={`font-display text-6xl font-bold leading-none ${cred.popular ? 'text-gold-500/20' : 'text-white/10'} group-hover:scale-110 transition-transform duration-500`}>
                    0{i + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-3xl font-bold text-white mb-2">{cred.name}</h3>
                <div className="font-sans text-xs text-gold-400 font-semibold tracking-widest uppercase mb-2">
                  {cred.level}
                </div>
                <div className="font-mono text-sm text-blue-300 mb-6">{cred.hours}</div>
                <p className="font-body text-base text-blue-100/70 leading-relaxed flex-1 mb-8">
                  {cred.desc}
                </p>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8 mt-auto">
                  <ul className="space-y-4 text-sm text-blue-100/90 font-sans mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-gold-400 shrink-0 mt-0.5" /> 
                      <span>Core competency training</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-gold-400 shrink-0 mt-0.5" /> 
                      <span>10 hours mentor coaching</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-gold-400 shrink-0 mt-0.5" /> 
                      <span>Final assessment & credential</span>
                    </li>
                  </ul>
                  <Link
                    href={cred.href}
                    className={`flex items-center gap-2 text-sm font-sans font-bold transition-colors group/link w-fit
                      ${cred.popular ? 'text-gold-400 hover:text-gold-300' : 'text-white hover:text-gold-400'}`}
                  >
                    Explore Pathway
                    <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA bar */}
        <AnimatedSection className="text-center">
          <p className="font-body text-blue-100/80 mb-6 text-lg">Not sure which level is right for you?</p>
          <Link href="/admissions" className="btn-primary inline-flex text-base px-8 py-4">
            Take the Free Assessment
            <ChevronRight size={18} />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  )
}
