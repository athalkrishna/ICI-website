import { Metadata } from 'next';
import AssessmentForm from '@/components/admissions/AssessmentForm';
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

export const metadata: Metadata = {
  title: {
    absolute: 'Admissions Assessment | International Coaching Institute',
  },
  description: 'Take our free admissions assessment to find the right credential level for your coaching career.',
};

export default function AssessmentPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 font-sans">
      <Section spacing="standard" className="bg-brand-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <Container className="relative z-20 text-center">
          <h1 className="text-h1 text-white mb-4">Free Admissions Assessment</h1>
          <p className="font-body text-xl text-muted-dark max-w-2xl mx-auto">
            Answer a few quick questions to discover which coaching credential level aligns with your experience and goals.
          </p>
        </Container>
      </Section>

      <section className="-mt-8 relative z-20">
        <Container size="narrow">
          <div className="bg-white border border-navy-100 p-8 md:p-12 rounded-[32px] shadow-xl">
            <AssessmentForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
