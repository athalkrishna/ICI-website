'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

const faqs = [
  {
    q: 'Is the training live or self-paced?',
    a: 'Live and one-to-one. You are coached individually in real time, with guided self-work between sessions. This is how coaching skill is actually built.'
  },
  {
    q: 'How long does it take?',
    a: 'It depends on the level, from around three months for Catalyst to up to a year for Luminary. You will have a clear schedule before you enrol.'
  },
  {
    q: 'Can my organisation train a team?',
    a: 'Yes. Speak to us about organisational and team training.'
  }
]

export default function AdmissionsFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-cream-50 transition-colors"
            >
              <span className="font-sans font-bold text-lg text-brand-navy-900 pr-8">{faq.q}</span>
              <ChevronDown 
                className={`text-brand-gold-700 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} 
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
  )
}
