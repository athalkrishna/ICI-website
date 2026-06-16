'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { cmsField, stripHtml } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import type { AdmissionsOverviewData } from '@/lib/admissions-overview-defaults';

type Props = {
  content?: ContentMap | null;
  defaults: AdmissionsOverviewData;
};

export default function AdmissionsFaq({ content, defaults }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = defaults.faqs.map((faq, i) => {
    const n = i + 1;
    const answerKey = `faq_${n}_answer` as keyof ContentMap;
    const cmsAnswer = content?.[answerKey];
    return {
      q: cmsField(content, `faq_${n}_question`, faq.q),
      a: cmsAnswer?.trim() ? stripHtml(cmsAnswer) : faq.a,
    };
  });

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div className="bg-white overflow-hidden rounded-2xl shadow-md border border-navy-100">
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
  );
}
