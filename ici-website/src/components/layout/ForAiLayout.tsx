import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import type { ReactNode } from 'react';

interface ForAiLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function ForAiLayout({ title, subtitle, lastUpdated, children }: ForAiLayoutProps) {
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative bg-brand-navy-800 border-b border-faint overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div
          className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-gold-400/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none"
          aria-hidden
        />
        <Container className="relative z-10 py-16 md:py-20">
          <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400 mb-4">
            {subtitle}
          </p>
          <h1 className="text-h1 text-white max-w-4xl">{title}</h1>
        </Container>
      </header>

      <Section spacing="standard" className="bg-white font-sans text-brand-navy-800">
        <div className="max-w-[1024px] mx-auto px-4 lg:px-8">
          <p className="font-body text-sm text-brand-gold-600 uppercase tracking-wider font-bold mb-12">
            Last updated: {formattedDate}
          </p>

          <article className="prose prose-lg max-w-none prose-p:text-muted-dark prose-li:text-muted-dark prose-headings:text-brand-navy-900 prose-headings:font-display prose-headings:font-bold prose-a:text-brand-gold-600 hover:prose-a:text-brand-gold-700 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3">
            {children}
          </article>
        </div>
      </Section>
    </div>
  );
}
