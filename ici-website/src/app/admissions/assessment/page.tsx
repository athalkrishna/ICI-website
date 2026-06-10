import { Metadata } from 'next';
import AssessmentForm from '@/components/admissions/AssessmentForm';

export const metadata: Metadata = {
  title: {
    absolute: 'Admissions Assessment | International Coaching Institute',
  },
  description: 'Take our free admissions assessment to find the right credential level for your coaching career.',
};

export default function AssessmentPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 font-sans">
      <section className="bg-navy-800 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">Free Admissions Assessment</h1>
          <p className="font-body text-xl text-blue-100/80 max-w-2xl mx-auto">
            Answer a few quick questions to discover which coaching credential level aligns with your experience and goals.
          </p>
        </div>
      </section>

      <section className="-mt-8 relative z-20">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[32px] shadow-xl">
            <AssessmentForm />
          </div>
        </div>
      </section>
    </div>
  );
}
