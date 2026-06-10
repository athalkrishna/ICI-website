import { Metadata } from 'next';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import AnimatedSection from '@/components/shared/AnimatedSection';

export const metadata: Metadata = {
  title: {
    absolute: 'Checkout | International Coaching Institute',
  },
  description: 'Complete your enrolment to the International Coaching Institute.',
};

const PRICES: Record<string, { title: string; price: number }> = {
  catalyst: { title: 'Level 1: Catalyst', price: 215000 },
  architect: { title: 'Level 2: Architect', price: 345000 },
  sage: { title: 'Level 3: Sage', price: 495000 },
  luminary: { title: 'Level 4: Luminary', price: 695000 },
};

export default async function CheckoutPage({ params }: { params: { level: string } }) {
  const { level } = await params;
  const levelInfo = PRICES[level];

  if (!levelInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <p className="text-navy-900 font-sans font-bold">Invalid level selected.</p>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen pb-24 font-sans selection:bg-gold-500/30">
      <section className="bg-navy-800 pt-28 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Enrol in {levelInfo.title}
            </h1>
            <p className="font-body text-xl text-blue-100/80">
              Secure your place and begin your coaching journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[32px] shadow-xl">
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">Order Summary</h2>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>{levelInfo.title}</span>
                  <span>₹{levelInfo.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>GST (18%)</span>
                  <span>₹{(levelInfo.price * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-navy-900 font-bold text-lg pt-4 border-t border-gray-100 mt-4">
                  <span>Total Due Today</span>
                  <span>₹{(levelInfo.price * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <CheckoutForm level={level} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
