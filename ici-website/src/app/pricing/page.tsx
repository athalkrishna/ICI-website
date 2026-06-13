'use client'
import { useState } from 'react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { ChevronRight, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalCurrency } from '@/hooks/useLocalCurrency'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

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
    a: 'All enrolments and payments are final. Due to the intensive, one-to-one nature of our coaching and the limited availability of our faculty, once a payment has been successfully processed, it is strictly non-refundable under any circumstances.'
  },
  {
    q: 'Can I transfer my enrolment to someone else?',
    a: 'No. Because each pathway is highly individualised and tailored to the specific coach\'s development, enrolments and payments are strictly non-transferable to another individual.'
  },
  {
    q: 'What happens if I face an emergency and cannot continue?',
    a: 'While payments remain non-refundable, we understand that unforeseen emergencies arise. You may submit a formal request to pause your current training level. If approved, you can resume your sessions at a later date within the programme\'s suggested duration, subject to faculty availability.'
  },
  {
    q: 'Are there any exceptions to the non-refundable policy?',
    a: 'No. To maintain the integrity of our scheduling and the deep commitment required for one-to-one professional coaching, the non-refundable policy applies universally without exception. We encourage you to consult with an advisor to ensure the pathway is right for you before enrolling.'
  }
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { currencyCode, loading, formatPrice } = useLocalCurrency()

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">Pricing</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Honest pricing for serious training
            </h1>
            <p className="text-navy-100 text-base max-w-3xl mb-12">
              Coaching education is an investment in a career, so we will not hide what it costs. Every level of the Mastery Pathway is delivered one-to-one and online, with real coaching hours from a professional coach and substantial guided self-work. You enrol one level at a time, and each price is complete. What you see is what you pay, plus applicable GST.
            </p>

          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Pricing Table ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection className="mb-12">
            <h2 className="text-h2 text-brand-navy-900 mb-4">The Mastery Pathway</h2>
            <div className="w-24 h-1 bg-brand-gold-500" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-brand-gold-200">
                    <th className="py-6 px-6 w-1/4 text-brand-navy-700 text-eyebrow">Level & Credential</th>
                    <th className="py-6 px-6 w-1/3 text-brand-navy-700 text-eyebrow">Format & Hours</th>
                    <th className="py-6 px-6 text-brand-navy-700 text-eyebrow">Duration</th>
                    <th className="py-6 px-6 text-right text-brand-navy-700 text-eyebrow">
                      Price ({currencyCode}, excl. GST)
                    </th>
                    <th className="py-6 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {pricingData.map((row, i) => {
                    const slug = row.level.toLowerCase().includes('catalyst') ? 'catalyst' : 
                                 row.level.toLowerCase().includes('architect') ? 'architect' : 
                                 row.level.toLowerCase().includes('sage') ? 'sage' : 'luminary';
                    return (
                    <tr key={i} className="hover:bg-cream-100 transition-colors group">
                      <td className="py-8 px-6">
                        <div className="font-display font-bold text-xl text-brand-navy-900 group-hover:text-brand-gold-700 transition-colors">
                          {row.level}
                        </div>
                        <div className="font-mono text-sm text-muted mt-1">{row.credential}</div>
                      </td>
                      <td className="py-8 px-6">
                        <div className="font-body text-brand-navy-700">{row.format}.</div>
                        <div className="font-body text-muted text-sm mt-1">{row.hours}</div>
                      </td>
                      <td className="py-8 px-6 font-body text-muted">
                        {row.duration}
                      </td>
                      <td className="py-8 px-6 text-right font-mono text-xl text-brand-navy-900">
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
                          href={`/checkout/${slug}`} 
                          className="btn-primary"
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
            <p className="text-muted mt-4 md:hidden text-body">
              Scroll horizontally to see full table →
            </p>
            

          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Content Grid ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-y border-navy-100 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-16">
            
            <AnimatedSection>
              <h3 className="text-h3 text-brand-navy-900 mb-8 pb-4 border-b border-navy-100">
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
                  <li key={i} className="flex items-start gap-3 text-muted font-body">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="text-h3 text-brand-navy-900 mb-8 pb-4 border-b border-navy-100">
                How enrolment works
              </h3>
              <ol className="space-y-6">
                {[
                  'Choose your level, or speak to an advisor if you are unsure where to start.',
                  'Speak briefly with an advisor to confirm the right fit.',
                  'Pay securely online, in full or by an agreed instalment plan.',
                  'Get matched with your coach and begin, usually within 7 working days.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-muted font-body">
                    <div className="w-6 h-6 rounded-full bg-brand-gold-100 text-brand-gold-700 flex items-center justify-center shrink-0 font-sans font-bold text-xs mt-0.5">
                      {i + 1}
                    </div>
                    {item}
                  </li>
                ))}
              </ol>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="space-y-16">
              <div>
                <h3 className="text-h3 text-brand-navy-900 mb-8 pb-4 border-b border-navy-100">
                  Payment options
                </h3>
                <p className="text-muted text-body">
                  Pay in full at checkout, or choose an instalment option where available. Card EMI is offered by most major banks at checkout; if you would prefer an institute instalment plan, speak to an advisor and we will agree a schedule before you enrol.
                </p>
              </div>
              
              <div>
                <h3 className="text-h3 text-brand-navy-900 mb-8 pb-4 border-b border-navy-100">
                  GST and international clients
                </h3>
                <p className="text-muted text-body">
                  All prices are exclusive of GST. Applicable GST is added at checkout for clients billed in India. International clients see the price they will be charged in their own currency at checkout.
                </p>
              </div>
            </AnimatedSection>

          </div>
        </Container>
      </Section>

      {/* ── FAQs ── */}
      <Section spacing="standard" className="relative z-20">
        <div className="max-w-[800px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-h2 text-brand-navy-900 mb-4">Frequently asked questions</h2>
            <div className="w-24 h-1 bg-brand-gold-500 mx-auto" />
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white border border-navy-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-cream-50 transition-colors"
                  >
                    <span className="font-sans font-bold text-lg text-brand-navy-900 pr-8">{faq.q}</span>
                    <ChevronDown 
                      className={`text-brand-gold-600 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} 
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
                        <div className="px-6 pb-6 pt-2 font-body text-muted leading-relaxed border-t border-navy-100">
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
            <p className="text-muted mb-8 text-body">Ready to begin your journey?</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/credentials" className="btn-primary">
                Choose your level <ChevronRight size={18} />
              </Link>
              <Link href="/admissions/contact" className="btn-secondary-light">
                Not sure where to start? Speak to an advisor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Section>

    </div>
  )
}
