'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

const programmes = [
  {
    title: 'Certified Life Coach',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    altText: 'People in a classroom setting collaborating on laptops',
    desc: 'Master the foundational competencies of transformational life coaching.',
    type: 'Levels 1–2',
    href: '/programmes/certified-life-coach'
  },
  {
    title: 'Executive Coaching',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    altText: 'Two professionals having an engaging one-to-one conversation',
    desc: 'Drive organisational success through advanced leadership methodologies.',
    type: 'Levels 3–4',
    href: '/programmes/executive-coaching'
  },
  {
    title: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    altText: 'Woman doing yoga near a window',
    desc: 'Empower clients to achieve sustainable physical and mental well-being.',
    type: 'Open entry',
    href: '/programmes/health-wellness'
  }
]

export default function FeaturedProgrammes() {
  return (
    <Section spacing="standard" className="bg-cream-50">
      <Container>
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="text-eyebrow flex items-center gap-3 justify-center !justify-start mb-4">Academics</div>
            <h2 className="text-h2 text-brand-navy-700">Featured Programmes</h2>
          </div>
          <Link href="/programmes" className="text-brand-gold-600 hover:text-brand-gold-700 font-sans font-semibold text-sm underline underline-offset-4">
            View All Programmes
          </Link>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programmes.map((prog, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="ici-card flex flex-col h-full bg-white group">
                <div className="h-56 relative overflow-hidden border-b border-navy-100">
                  <Image 
                    src={prog.image}
                    alt={prog.altText}
                    fill
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
                  <p className="text-muted mb-8 flex-1 text-body">{prog.desc}</p>
                  <Link href={prog.href} className="btn-secondary-light w-full justify-center">
                    Learn More
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  )
}
