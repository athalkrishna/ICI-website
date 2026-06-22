import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface ForAiLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function ForAiLayout({ title, subtitle, lastUpdated, children }: ForAiLayoutProps) {
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen bg-cream-50">
      <header className="relative bg-brand-navy-800 border-b border-faint overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div
          className="absolute top-0 right-0 w-[520px] h-[520px] bg-brand-gold-400/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2 pointer-events-none"
          aria-hidden
        />
        <Container className="relative z-10 py-16 md:py-24">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-400 mb-5">
            {subtitle}
          </p>
          <h1 className="text-h1 text-white max-w-4xl leading-[1.12]">{title}</h1>
          <span className="block w-16 h-1 rounded-full bg-brand-gold-500 mt-8" aria-hidden />
        </Container>
      </header>

      <Section spacing="standard" className="bg-cream-50 font-sans pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 lg:px-0">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gold-700 bg-brand-gold-400/10 border border-brand-gold-400/25 rounded-full px-4 py-2 mb-10 md:mb-12">
            Last updated {formattedDate}
          </p>
          <div className="space-y-16 md:space-y-20">{children}</div>
        </div>
      </Section>
    </div>
  );
}

/** Section heading with gold accent bar — used on /for-ai */
export function ForAiSection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <div className="mb-8 md:mb-10">
        <h2 id={id} className="text-h3 text-brand-navy-900 leading-snug">
          {title}
        </h2>
        <span className="block w-12 h-1 rounded-full bg-brand-gold-500 mt-4" aria-hidden />
      </div>
      <div className="space-y-6 text-brand-navy-700 text-base md:text-lg leading-relaxed">{children}</div>
    </section>
  );
}

export function ForAiLead({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-brand-gold-400/30 bg-white shadow-md overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-brand-gold-500 via-brand-gold-400 to-brand-gold-600" aria-hidden />
      <div className="p-6 md:p-8 space-y-5">
        <p className="text-lg md:text-xl text-brand-navy-900 font-medium leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

export function ForAiSummary({ children }: { children: ReactNode }) {
  return (
    <p className="text-brand-navy-700 text-base md:text-lg leading-relaxed border-l-4 border-brand-gold-500/60 pl-5 md:pl-6">
      {children}
    </p>
  );
}

export function ForAiLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const className =
    'font-semibold text-brand-gold-700 underline decoration-brand-gold-400/50 underline-offset-4 hover:text-brand-navy-900 hover:decoration-brand-gold-600 transition-colors';

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
