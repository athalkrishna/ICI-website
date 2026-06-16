import { Metadata } from 'next';
import AssessmentForm from '@/components/admissions/AssessmentForm';
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: {
    absolute: 'Admissions Assessment | International Coaching Institute',
  },
  description: 'Take our free admissions assessment to find the right credential level for your coaching career.',
};

export default async function AssessmentPage() {
  const content = await getPublishedPageContent('/admissions/assessment')

  return (
    <div className="bg-cream-50 min-h-screen pb-24 font-sans">
      <Section spacing="standard" className="bg-brand-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <Container className="relative z-20 text-center">
          <h1 className="text-h1 text-white mb-4">
            {cmsField(content, 'hero_heading', 'Free Admissions Assessment')}
          </h1>
          <p className="text-muted-dark max-w-2xl mx-auto text-body">
            {stripHtml(cmsHtml(content, 'hero_body', 'Answer a few quick questions to discover which coaching credential level aligns with your experience and goals.'))}
          </p>
        </Container>
      </Section>

      <Section spacing="none" className="-mt-8 relative z-20">
        <Container size="narrow">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-navy-100">
            <AssessmentForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
