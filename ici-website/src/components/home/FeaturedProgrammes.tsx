import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { cmsField, cmsPlainBody } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

const PROGRAMME_DEFAULTS = [
  {
    title: 'Certified Life Coach',
    image: '/certified-life-coach.webp',
    altText: 'A professional life coach in an attentive coaching session',
    desc: 'Master the foundational competencies of transformational life coaching.',
    type: 'Levels 1–2',
    href: '/programmes/certified-life-coach',
  },
  {
    title: 'Executive Coaching',
    image: '/executive-coaching.webp',
    altText: 'Senior executives engaged in a professional leadership coaching meeting',
    desc: 'Drive organisational success through advanced leadership methodologies.',
    type: 'Levels 3–4',
    href: '/programmes/executive-coaching',
  },
  {
    title: 'Health & Wellness',
    image: '/health-wellness-coaching.webp',
    altText: 'A health and wellness coach guiding a client in a calm bright studio',
    desc: 'Empower clients to achieve sustainable physical and mental well-being.',
    type: 'Open entry',
    href: '/programmes/health-wellness',
  },
];

interface FeaturedProgrammesProps {
  content?: ContentMap;
}

export default function FeaturedProgrammes({ content = {} }: FeaturedProgrammesProps) {
  const programmes = PROGRAMME_DEFAULTS.map((def, i) => {
    const n = i + 1;
    return {
      title: cmsField(content, `programme_${n}_title`, def.title),
      image: cmsField(content, `programme_${n}_image`, def.image) || def.image,
      altText: def.altText,
      desc: cmsPlainBody(content, `programme_${n}_description`, def.desc),
      type: cmsField(content, `programme_${n}_tag`, def.type),
      href: cmsField(content, `programme_${n}_link`, def.href),
    };
  });

  return (
    <Section spacing="standard" className="bg-cream-50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-eyebrow flex items-center gap-3 justify-center !justify-start mb-4">
              {cmsField(content, 'programmes_section_label', 'Academics')}
            </p>
            <h2 className="text-h2 text-brand-navy-700">
              {cmsField(content, 'programmes_section_heading', 'Featured Programmes')}
            </h2>
          </div>
          <Link href="/programmes" className="text-brand-gold-600 hover:text-brand-gold-700 font-sans font-semibold text-sm underline underline-offset-4 min-h-[44px] inline-flex items-center">
            View All Programmes
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programmes.map((prog) => (
            <div key={prog.href} className="ici-card flex flex-col h-full bg-white group">
              <div className="h-56 relative overflow-hidden border-b border-navy-100">
                <Image 
                  src={prog.image}
                  alt={prog.altText}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-brand-navy-900/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-brand-navy-700 shadow-sm">
                  {prog.type}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-h3 text-brand-navy-700 mb-3 group-hover:text-brand-gold-600 transition-colors">{prog.title}</h3>
                <p className="text-brand-navy-600 mb-8 flex-1 text-body">{prog.desc}</p>
                <Link href={prog.href} className="btn-secondary-light w-full justify-center min-h-[44px]">
                  Explore {prog.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
