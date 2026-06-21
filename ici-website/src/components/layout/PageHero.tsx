import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import HeroDecor from '@/components/layout/HeroDecor';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  body?: string;
}

export default function PageHero({ eyebrow, title, body }: PageHeroProps) {
  return (
    <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden">
      <HeroDecor />
      <Container className="relative z-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="w-12 sm:w-16 h-px gradient-accent-gold shrink-0" aria-hidden />
            <p className="text-eyebrow text-brand-gold-400">{eyebrow}</p>
          </div>
          <h1 className="text-h1 text-white mb-4 sm:mb-6">{title}</h1>
          {body ? <p className="text-body-lg text-navy-100 max-w-3xl">{body}</p> : null}
        </div>
      </Container>
    </Section>
  );
}
