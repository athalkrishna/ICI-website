'use client'
import { useState } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { ChevronRight, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Metadata } from 'next'
import { useLocalCurrency } from '@/hooks/useLocalCurrency'

const pricingData = [
  {
    level: 'Level 1: Catalyst',
    credential: '(ICI-C)',
    format: 'Online, one-to-one',
    hours: '36 hours: 12 coaching + 24 self-work.',
    duration: 'Up to 3 months',
    basePriceINR: 215000
  },
  {
    level: 'Level 2: Architect',
    credential: '(ICI-A)',
    format: 'Online, one-to-one',
    hours: '60 hours: 20 coaching + 40 self-work.',
    duration: 'Up to 4 months',
    basePriceINR: 345000
  },
  {
    level: 'Level 3: Sage',
    credential: '(ICI-S)',
    format: 'Online, one-to-one',
    hours: '90 hours: 30 coaching + 60 self-work.',
    duration: 'Up to 6 months',
    basePriceINR: 495000
  },
  {
    level: 'Level 4: Luminary',
    credential: '(ICI-L)',
    format: 'Online, one-to-one',
    hours: '120 hours: 40 live + 80 self-work and capstone.',
    duration: 'Up to 12 months',
    basePriceINR: 695000
  }
]

const faqs = [
  {
    q: 'Do I have to complete all four levels?',
    a: 'No. Each level is a complete certification in its own right. Many coaches stop at Catalyst or Architect. The higher levels are there when, and if, you want them.'
  },
  {
    q: 'Is it really one-to-one?',
    a: 'Yes. You are coached and developed individually. That is the heart of the ICI model and the reason our coaches are ready for real clients.'
  },
  {
    q: 'What is your refund policy?',
    a: 'Your place is confirmed on payment. If you change your mind before your first scheduled session, tell us in writing and we will refund your fee in full, less any payment-processing charges. Once sessions have begun, fees are not refundable, but you may pause and resume your level within its suggested duration.'
  }
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { currencyCode, loading, formatPrice } = useLocalCurrency()

  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="section-label mb-8 justify-start text-gold-400">Pricing</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Honest pricing for serious training
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12">
              Coaching education is an investment in a career, so we will not hide what it costs. Every level of the Mastery Pathway is delivered one-to-one and online, with real coaching hours from a professional coach and substantial guided self-work. You enrol one level at a time, and each price is complete. What you see is what you pay, plus applicable GST.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <Link href="/credentials" className="btn-primary w-full md:w-auto justify-center">
                Choose your level <ChevronRight size={18} />
              </Link>
              <Link href="/admissions/contact" className="btn-secondary w-full md:w-auto justify-center">
                Not sure where to start? Speak to an advisor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Pricing Table ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="font-display text-4xl font-bold text-white mb-4">The Mastery Pathway</h2>
            <div className="w-24 h-1 bg-gold-500" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-gold-500/50">
                    <th className="py-6 px-6 font-sans font-bold text-gold-400 uppercase tracking-widest text-sm w-1/4">Level & Credential</th>
                    <th className="py-6 px-6 font-sans font-bold text-gold-400 uppercase tracking-widest text-sm w-1/3">Format & Hours</th>
                    <th className="py-6 px-6 font-sans font-bold text-gold-400 uppercase tracking-widest text-sm">Duration</th>
                    <th className="py-6 px-6 font-sans font-bold text-gold-400 uppercase tracking-widest text-sm text-right">
                      Price (INR, excl. GST)
                    </th>
                    <th className="py-6 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pricingData.map((row, i) => {
                    const slug = row.level.toLowerCase().includes('catalyst') ? 'catalyst' : 
                                 row.level.toLowerCase().includes('architect') ? 'architect' : 
                                 row.level.toLowerCase().includes('sage') ? 'sage' : 'luminary';
                    return (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="py-8 px-6">
                        <div className="font-display font-bold text-xl text-white group-hover:text-gold-400 transition-colors">
                          {row.level}
                        </div>
                        <div className="font-mono text-sm text-gray-400 mt-1">{row.credential}</div>
                      </td>
                      <td className="py-8 px-6">
                        <div className="font-body text-blue-100/90">{row.format}.</div>
                        <div className="font-body text-blue-100/70 text-sm mt-1">{row.hours}</div>
                      </td>
                      <td className="py-8 px-6 font-body text-blue-100/80">
                        {row.duration}
                      </td>
                      <td className="py-8 px-6 text-right font-mono text-xl text-white">
                        <motion.span
                          key={currencyCode}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {formatPrice(row.basePriceINR)}
                        </motion.span>
                      </td>
                      <td className="py-8 px-6 text-right">
                        <Link 
                          href={`/apply`} 
                          className="btn-primary py-2 px-6 text-sm"
                          onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).fbq) {
                              (window as any).fbq('track', 'InitiateCheckout', {
                                content_name: slug
                              })
                            }
                          }}
                        >
                          Enrol
                        </Link>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-blue-100/50 mt-4 md:hidden">
              Scroll horizontally to see full table →
            </p>
            
            <div className="mt-6 text-right">
              <p className="font-body text-sm text-blue-100/50">
                {currencyCode !== 'INR' && !loading ? (
                  <>Prices shown are converted to {currencyCode} using live exchange rates. Final billing is processed in INR.</>
                ) : (
                  <>Fixed USD equivalents (review periodically): Catalyst ~ USD 2,600 | Architect ~ USD 4,150 | Sage ~ USD 5,950 | Luminary ~ USD 8,350</>
                )}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Content Grid ── */}
      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            
            <AnimatedSection>
              <h3 className="font-display text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10">
                What every price includes
              </h3>
              <ul className="space-y-4">
                {[
                  'One-to-one online coaching with a coach matched to the level',
                  'All guided self-work, research materials and assignments',
                  'Assessment and the credential on successful completion',
                  'The right to use the credential and post-nominal letters',
                  'Membership of the ICI coaching community'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-blue-100/80 font-body">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="font-display text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10">
                How enrolment works
              </h3>
              <ol className="space-y-6">
                {[
                  'Choose your level, or speak to an advisor if you are unsure where to start.',
                  'Speak briefly with an advisor to confirm the right fit.',
                  'Pay securely online, in full or by an agreed instalment plan.',
                  'Get matched with your coach and begin, usually within 7 working days.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-blue-100/80 font-body">
                    <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 font-sans font-bold text-xs mt-0.5">
                      {i + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ol>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="space-y-16">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10">
                  Payment options
                </h3>
                <p className="text-blue-100/80 font-body leading-relaxed">
                  Pay in full at checkout, or choose an instalment option where available. Card EMI is offered by most major banks at checkout; if you would prefer an institute instalment plan, speak to an advisor and we will agree a schedule before you enrol.
                </p>
              </div>
              
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10">
                  GST and international clients
                </h3>
                <p className="text-blue-100/80 font-body leading-relaxed">
                  All prices are exclusive of GST. Applicable GST is added at checkout for clients billed in India. International clients see the price they will be charged in their own currency at checkout.
                </p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[800px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Frequently asked questions</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto" />
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-sans font-bold text-lg text-white pr-8">{faq.q}</span>
                    <ChevronDown 
                      className={`text-gold-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 font-body text-blue-100/80 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="mt-16 text-center">
            <p className="font-body text-blue-100/80 mb-8">Ready to begin your journey?</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/credentials" className="btn-primary">
                Choose your level <ChevronRight size={18} />
              </Link>
              <Link href="/admissions/contact" className="btn-secondary">
                Not sure where to start? Speak to an advisor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
