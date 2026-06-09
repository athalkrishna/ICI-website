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
      level: 'Catalyst (Level 1, post-nominal ICI-C)',
      href: '/credentials/catalyst',
      desc: 'Foundation. You learn to spark and hold change, and become a competent, confident, ethical coach. 36 hours, one-to-one.',
      badge: 'bg-white/10 text-white',
      cta: 'Explore Catalyst'
    },
    {
      level: 'Architect (Level 2, post-nominal ICI-A)',
      href: '/credentials/architect',
      desc: 'Professional. You learn to design and build change with clients and to build a thriving practice. 60 hours, one-to-one.',
      badge: 'bg-gold-500/20 text-gold-400',
      cta: 'Explore Architect'
    },
    {
      level: 'Sage (Level 3, post-nominal ICI-S)',
      href: '/credentials/sage',
      desc: 'Senior. You coach with depth, range and presence, and hold the most complex clients. 90 hours, one-to-one.',
      badge: 'bg-white/10 text-white',
      cta: 'Explore Sage'
    },
    {
      level: 'Luminary (Level 4, post-nominal ICI-L)',
      href: '/credentials/luminary',
      desc: "The institute's highest distinction. You master the craft, mentor others and contribute to the field. 120 hours, one-to-one.",
      badge: 'bg-purple-500/20 text-purple-300',
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
    <div className="bg-navy-900 min-h-screen font-sans selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="section-label mb-8 justify-start text-gold-400">The Credential System</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              The ICI Mastery Pathway
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12">
              Most coaching certificates are earned by sitting in a group and watching the clock. Ours are earned one-to-one, online, with a coach who works with you directly, hour by hour, until the skill is genuinely yours. The Mastery Pathway has four progressive levels, each a credential you carry for life. Wherever you are now, there is a clear next step and a coach to take it with you.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#levels" className="btn-primary">
                Find your level <ChevronRight size={18} />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Why this pathway is different ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Why this pathway is different</h2>
            <div className="w-24 h-1 bg-gold-500" />
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors h-full">
                  <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center border border-white/10 mb-6 text-gold-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-sans font-bold text-white text-lg mb-3">{reason.title}.</h4>
                  <p className="font-body text-blue-100/70 leading-relaxed">{reason.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 4 Levels ── */}
      <section id="levels" className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">The four levels</h2>
            <div className="w-24 h-1 bg-gold-500" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {pathways.map((path, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link href={path.href} className="group block bg-navy-800 border border-white/10 hover:border-gold-500/30 rounded-3xl p-8 lg:p-12 transition-all duration-300 h-full relative overflow-hidden shadow-2xl">
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-transparent transition-colors duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`inline-flex items-center gap-2 ${path.badge} text-xs font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase mb-8 self-start`}>
                      <Award size={14} /> Level {i + 1}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-gold-400 transition-colors">
                      {path.level.split(' (')[0]}
                      <span className="block text-lg font-sans font-normal text-gray-400 mt-2">
                        ({path.level.split(' (')[1]}
                      </span>
                    </h3>
                    <p className="font-body text-xl text-blue-100/70 mb-12 flex-1 leading-relaxed">
                      {path.desc}
                    </p>
                    
                    <div className="flex items-center gap-3 text-gold-400 font-sans font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
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
