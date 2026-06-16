import { ReactNode } from 'react';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';

type PortalLoginShellProps = {
  portalName: string;
  portalDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  children: ReactNode;
  footerLink?: { href: string; label: string };
};

export default function PortalLoginShell({
  portalName,
  portalDescription,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  children,
  footerLink,
}: PortalLoginShellProps) {
  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold" />
              <div className="text-eyebrow text-brand-gold-400">{heroEyebrow}</div>
            </div>
            <h1 className="text-h1 text-white mb-6">{heroTitle}</h1>
            <p className="text-muted-dark text-body leading-relaxed">{heroSubtitle}</p>
          </div>
        </Container>
      </Section>

      <Section spacing="compact" className="lg:py-24 relative z-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-navy-100">
            <div className="text-center mb-8 pb-6 border-b border-navy-100">
              <Link href="/" className="inline-block group">
                <p className="font-display text-brand-navy-900 text-lg mb-1 group-hover:text-brand-gold-700 transition-colors">
                  International Coaching Institute
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-600">
                  {portalName}
                </p>
              </Link>
              <p className="text-sm text-muted mt-3">{portalDescription}</p>
            </div>
            {children}
            {footerLink && (
              <div className="text-center pt-6 mt-6 border-t border-navy-100">
                <Link
                  href={footerLink.href}
                  className="text-sm text-brand-gold-700 hover:text-brand-gold-800 font-medium"
                >
                  {footerLink.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
