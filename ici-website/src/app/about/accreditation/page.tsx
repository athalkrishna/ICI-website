import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Award, Scale, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Recognition & Accreditation | International Coaching Institute',
}

export default function AccreditationPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <section className="bg-brand-navy-700 text-white pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        {/* Diagonal grid texture overlay */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden />
        {/* Gold gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-80" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">Recognition & Accreditation</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Standards you can stand behind
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <AnimatedSection className="space-y-8">
              <div className="w-20 h-20 bg-brand-gold-50 rounded-2xl flex items-center justify-center mb-8 border border-brand-gold-100">
                <ShieldCheck className="w-10 h-10 text-brand-gold-500" />
              </div>
              <h2 className="text-h2 text-brand-navy-800">A credential is only worth what it can be trusted to mean.</h2>
              <p className="font-body text-xl text-gray-700 leading-relaxed font-light">
                This page sets out how ICI holds its standard, the bodies it works with, and the recognition behind its credentials, stated plainly and only where it is genuinely earned.
              </p>
              <p className="font-body text-lg text-gray-700 leading-relaxed">
                We would rather say less and be believed than claim more and be doubted.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link href="/credentials" className="btn-primary text-base px-8 py-4 text-center">
                  See the Mastery Pathway
                </Link>
                <Link href="/admissions/contact" className="btn-secondary text-base px-8 py-4 text-center">
                  Contact Us
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white p-10 lg:p-14 rounded-3xl shadow-xl shadow-brand-navy-900/5 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cream-100 rounded-bl-full -z-10"></div>
                <h3 className="font-display text-2xl font-bold text-brand-navy-800 mb-10">How we hold our standard</h3>
                
                <div className="space-y-8">
                  {[
                    { icon: <Award />, text: "Every level is assessed on real coaching, not attendance" },
                    { icon: <Scale />, text: "Faculty are practising coaches held to a professional code" },
                    { icon: <BookOpen />, text: "Curriculum aligned to international coaching competency standards" },
                    { icon: <ShieldCheck />, text: "Independent review of our assessment process" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center shrink-0 text-brand-gold-500 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div className="pt-2.5">
                        <span className="font-body text-lg text-gray-700 group-hover:text-brand-navy-900 transition-colors">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
          


        </div>
      </section>
    </div>
  )
}
