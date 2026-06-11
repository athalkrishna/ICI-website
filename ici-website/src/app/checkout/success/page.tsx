import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SuccessTracker from '@/components/checkout/SuccessTracker';
import { Suspense } from 'react';
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: {
    absolute: 'Enrolment Successful | International Coaching Institute',
  },
  description: 'Your payment was successful and your place is confirmed.',
};

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 font-sans selection:bg-brand-gold-500/30">
      <Suspense fallback={null}>
        <SuccessTracker />
      </Suspense>
      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <Container className="relative z-20">
          <AnimatedSection className="max-w-3xl text-center mx-auto">
            <div className="w-20 h-20 bg-brand-gold-500/20 text-brand-gold-400 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-h1 text-white mb-6">
              Enrolment Confirmed
            </h1>
            <p className="font-body text-xl text-muted-dark mb-12 leading-relaxed">
              Your payment was successful and your place is secure. Welcome to the International Coaching Institute.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="-mt-12 relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[32px] shadow-xl">
              <h2 className="font-display text-2xl font-bold text-brand-navy-900 mb-6">What happens next?</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-navy-50 text-brand-navy-900 flex items-center justify-center font-bold font-sans text-sm shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-brand-navy-900 font-sans mb-1">Look out for our email</h3>
                    <p className="text-muted font-body leading-relaxed">We will send a receipt and a welcome pack to the email address you provided.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-navy-50 text-brand-navy-900 flex items-center justify-center font-bold font-sans text-sm shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-brand-navy-900 font-sans mb-1">Advisor contact</h3>
                    <p className="text-muted font-body leading-relaxed">An advisor will contact you within 24 hours to arrange an introduction and schedule your first session.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-navy-50 text-brand-navy-900 flex items-center justify-center font-bold font-sans text-sm shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-brand-navy-900 font-sans mb-1">Meet your coach</h3>
                    <p className="text-muted font-body leading-relaxed">You will be matched with a faculty member and gain access to your pre-reading materials.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <Link href="/programmes" className="inline-flex items-center gap-2 text-brand-navy-900 font-sans font-bold hover:text-brand-gold-500 transition-colors">
                  Explore our programmes <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
