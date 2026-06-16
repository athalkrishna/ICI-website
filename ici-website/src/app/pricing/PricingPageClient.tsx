'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalCurrency } from '@/hooks/useLocalCurrency';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import { cmsField, cmsNumber, stripHtml } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import { PRICING_OVERVIEW } from '@/lib/pricing-overview-defaults';

type PricingPageClientProps = {
  content?: ContentMap | null;
};

export default function PricingPageClient({ content }: PricingPageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { currencyCode, formatPrice } = useLocalCurrency();
  const defaults = PRICING_OVERVIEW;

  const pricingRows = defaults.pricingRows.map((row, i) => {
    const n = i + 1;
    return {
      level: cmsField(content, `price_row_${n}_level`, row.level),
      credential: cmsField(content, `price_row_${n}_credential`, row.credential),
      format: cmsField(content, `price_row_${n}_format`, row.format),
      hours: cmsField(content, `price_row_${n}_hours`, row.hours),
      duration: cmsField(content, `price_row_${n}_duration`, row.duration),
      basePriceINR: cmsNumber(content, `price_row_${n}_price_inr`, row.basePriceINR),
      slug: row.slug,
    };
  });

  const includes = defaults.includes.map((item, i) =>
    cmsField(content, `include_${i + 1}`, item),
  );

  const enrolmentSteps = defaults.enrolmentSteps.map((item, i) =>
    cmsField(content, `enrolment_step_${i + 1}`, item),
  );

  const faqs = defaults.faqs.map((faq, i) => {
    const n = i + 1;
    const answerKey = `faq_${n}_answer` as keyof ContentMap;
    const cmsAnswer = content?.[answerKey];
    return {
      q: cmsField(content, `faq_${n}_question`, faq.q),
      a: cmsAnswer?.trim() ? stripHtml(cmsAnswer) : faq.a,
    };
  });

  const heroBody = content?.hero_body?.trim()
    ? stripHtml(content.hero_body)
    : defaults.heroBody;

  const paymentOptionsBody = content?.payment_options_body?.trim()
    ? stripHtml(content.payment_options_body)
    : defaults.paymentOptionsBody;

  const gstBody = content?.gst_note?.trim()
    ? stripHtml(content.gst_note)
    : defaults.gstBody;

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', defaults.heroEyebrow)}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', defaults.heroHeading)}
            </h1>
            <p className="text-navy-100 text-base max-w-3xl mb-12">{heroBody}</p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection className="mb-12">
            <h2 className="text-h2 text-brand-navy-900 mb-4">
              {cmsField(content, 'table_section_heading', defaults.tableSectionHeading)}
            </h2>
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
                  {pricingRows.map((row, i) => (
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
                      <td className="py-8 px-6 font-body text-muted">{row.duration}</td>
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
                          href={`/checkout/${row.slug}`}
                          className="btn-primary"
                          onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).fbq) {
                              (window as any).fbq('track', 'InitiateCheckout', {
                                content_name: row.slug,
                              });
                            }
                          }}
                        >
                          Enrol
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted mt-4 md:hidden text-body">Scroll horizontally to see full table →</p>
          </AnimatedSection>
        </Container>
      </Section>

      <Section spacing="standard" className="bg-cream-50 border-t border-y border-navy-100 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-16">
            <AnimatedSection>
              <h3 className="text-h3 text-brand-navy-900 mb-8 pb-4 border-b border-navy-100">
                {cmsField(content, 'includes_heading', defaults.includesHeading)}
              </h3>
              <ul className="space-y-4">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted font-body">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="text-h3 text-brand-navy-900 mb-8 pb-4 border-b border-navy-100">
                {cmsField(content, 'enrolment_heading', defaults.enrolmentHeading)}
              </h3>
              <ol className="space-y-6">
                {enrolmentSteps.map((item, i) => (
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
                  {cmsField(content, 'payment_options_heading', defaults.paymentOptionsHeading)}
                </h3>
                <p className="text-muted text-body">{paymentOptionsBody}</p>
              </div>

              <div>
                <h3 className="text-h3 text-brand-navy-900 mb-8 pb-4 border-b border-navy-100">
                  {cmsField(content, 'gst_heading', defaults.gstHeading)}
                </h3>
                <p className="text-muted text-body">{gstBody}</p>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" className="relative z-20">
        <div className="max-w-[800px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-h2 text-brand-navy-900 mb-4">
              {cmsField(content, 'faq_heading', defaults.faqHeading)}
            </h2>
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
            <p className="text-muted mb-8 text-body">
              {cmsField(content, 'cta_heading', defaults.ctaHeading)}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href={cmsField(content, 'cta_button_1_link', defaults.ctaButton1Link)} className="btn-primary">
                {cmsField(content, 'cta_button_1_text', defaults.ctaButton1Text)} <ChevronRight size={18} />
              </Link>
              <Link href={cmsField(content, 'cta_button_2_link', defaults.ctaButton2Link)} className="btn-secondary-light">
                {cmsField(content, 'cta_button_2_text', defaults.ctaButton2Text)}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </div>
  );
}
