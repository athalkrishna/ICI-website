import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'
import Link from 'next/link'
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The ICI Mastery Pathway: Coaching Certifications',
  description: 'Four progressive coaching certifications, taught one-to-one and online: Catalyst, Architect, Sage and Luminary. A credential that grows with your career.',
}

export default function CredentialsPage() {
  const pathways = [
    {
      title: 'Catalyst',
      subline: 'Level 1',
      href: '/credentials/catalyst',
      desc: 'Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.',
      badge: 'bg-navy-50 text-navy-700',
      cta: 'Explore Catalyst'
    },
    {
      title: 'Architect',
      subline: 'Level 2',
      href: '/credentials/architect',
      desc: 'Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.',
      badge: 'bg-gold-50 text-gold-600',
      cta: 'Explore Architect'
    },
    {
      title: 'Sage',
      subline: 'Level 3',
      href: '/credentials/sage',
      desc: 'Senior. You coach with depth, range and presence, and hold the most complex clients. 90 hours, one-to-one.',
      badge: 'bg-navy-50 text-navy-700',
      cta: 'Explore Sage'
    },
    {
      title: 'Luminary',
      subline: 'Level 4',
      href: '/credentials/luminary',
      desc: "The institute's highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.",
      badge: 'bg-purple-50 text-purple-600',
      cta: 'Explore Luminary'
    }
  ]

  const reasons = [
    {
      title: 'One-to-one, not one-to-many',
      text: 'Nothing is glossed over and no one hides at the back of a room.'
    },
    {
      title: 'Online, wherever you are',
      text: 'Train from any country without pausing your life.'
    },
    {
      title: 'Coaching hours plus real self-work',
      text: 'Live coaching paired with substantial guided study.'
    },
    {
      title: 'A credential that means something',
      text: 'Each level is assessed on real coaching, not attendance.'
    }
  ]

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="text-eyebrow flex items-center gap-3 mb-8 justify-start">The Credential System</div>
            <h1 className="text-h1 text-white mb-8">
              The ICI Mastery Pathway
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Most coaching certificates are earned by sitting in a group and watching the clock. Ours are earned one-to-one, online, with a coach who works with you directly, hour by hour, until the skill is genuinely yours. The Mastery Pathway has four progressive levels, each a credential you carry for life. Wherever you are now, there is a clear next step and a coach to take it with you.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <Link href="#levels" className="btn-primary w-full md:w-auto justify-center">
                Find your level <ChevronRight size={18} />
              </Link>
              <Link href="/pricing" className="btn-secondary w-full md:w-auto justify-center">
                See pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Why this pathway is different ── */}
      <section className="py-16 lg:py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="mb-12 lg:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy-900 mb-4">Why this pathway is different</h2>
            <div className="w-24 h-1 bg-brand-gold-500" />
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-gold-300 shadow-xl hover:shadow-2xl transition-all h-full">
                  <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center border border-brand-gold-100 mb-6 text-brand-gold-700">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-sans font-bold text-brand-navy-900 text-lg mb-3">{reason.title}.</h4>
                  <p className="font-body text-muted leading-relaxed">{reason.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 4 Levels ── */}
      <section id="levels" className="py-16 lg:py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="mb-12 lg:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy-900 mb-4">The four levels</h2>
            <div className="w-24 h-1 bg-brand-gold-500" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {pathways.map((path, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href={path.href} className="group block bg-white border border-gray-100 hover:border-brand-gold-300 rounded-3xl p-8 lg:p-12 transition-all duration-300 h-full relative overflow-hidden shadow-xl hover:shadow-2xl">
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-500/0 to-brand-gold-500/0 group-hover:from-brand-gold-500/5 group-hover:to-transparent transition-colors duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`inline-flex items-center gap-2 ${path.badge} text-xs font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase mb-8 self-start`}>
                      <Award size={14} /> Level {i + 1}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-navy-900 mb-6 group-hover:text-brand-gold-700 transition-colors">
                      {path.title}
                      <span className="block text-lg font-sans font-normal text-muted mt-2">
                        {path.subline}
                      </span>
                    </h3>
                    <p className="font-body text-xl text-muted mb-12 flex-1 leading-relaxed">
                      {path.desc}
                    </p>
                    
                    <div className="flex items-center gap-3 text-brand-gold-700 font-sans font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                      {path.cta} <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
