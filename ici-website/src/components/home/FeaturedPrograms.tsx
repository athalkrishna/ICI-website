'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import Image from 'next/image'

const programs = [
  {
    title: 'Certified Life Coach',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    desc: 'Master the foundational competencies of transformational life coaching.',
    type: 'Foundation'
  },
  {
    title: 'Executive Coaching',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    desc: 'Drive organizational success through advanced leadership methodologies.',
    type: 'Professional'
  },
  {
    title: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    desc: 'Empower clients to achieve sustainable physical and mental wellbeing.',
    type: 'Specialization'
  }
]

export default function FeaturedPrograms() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="section-label !justify-start mb-4">Academics</div>
            <h2 className="font-display text-4xl font-bold text-navy-700">Featured Programs</h2>
          </div>
          <Link href="/programs" className="text-gold-600 hover:text-gold-700 font-sans font-semibold text-sm underline underline-offset-4">
            View All Programs
          </Link>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="ici-card flex flex-col h-full bg-white group">
                <div className="h-56 relative overflow-hidden border-b border-gray-100">
                  <Image 
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-navy-700 shadow-sm">
                    {prog.type}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-bold text-navy-700 mb-3 group-hover:text-gold-600 transition-colors">{prog.title}</h3>
                  <p className="font-body text-gray-600 mb-8 flex-1 leading-relaxed">{prog.desc}</p>
                  <Link href={`/programs/${prog.title.toLowerCase().replace(/ /g, '-')}`} className="btn-outline w-full justify-center">
                    Learn More
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
