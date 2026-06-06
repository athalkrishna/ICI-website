'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'

export default function ICIDifference() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
        <AnimatedSection className="flex-1 w-full" direction="left">
          <div className="w-full aspect-square md:aspect-[4/3] bg-navy-50 rounded-2xl relative overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=85" 
              alt="Professional coaching session" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle gradient overlay to make it look premium */}
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/40 to-transparent mix-blend-multiply" />
          </div>
        </AnimatedSection>
        <AnimatedSection className="flex-1" direction="right">
          <div className="section-label !justify-start mb-4">Why ICI</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-700 mb-6">The ICI Difference</h2>
          <p className="font-body text-gray-600 mb-8 leading-relaxed text-lg">
            Our evidence-based curriculum, world-class faculty, and global alumni network provide an unmatched environment for aspiring and established coaches to thrive.
          </p>
          <ul className="space-y-6 font-sans text-navy-600">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">✦</div>
              <div>
                <strong className="block text-navy-700 mb-1">ICF Accredited Curriculum</strong>
                <span className="text-sm text-gray-500">Rigorous academic standards aligned with the International Coaching Federation.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">✦</div>
              <div>
                <strong className="block text-navy-700 mb-1">Expert Scholar-Practitioner Faculty</strong>
                <span className="text-sm text-gray-500">Learn from seasoned industry leaders with decades of global experience.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">✦</div>
              <div>
                <strong className="block text-navy-700 mb-1">Global Alumni Network</strong>
                <span className="text-sm text-gray-500">Join a prestigious community of over 25,000 successful graduates worldwide.</span>
              </div>
            </li>
          </ul>
        </AnimatedSection>
      </div>
    </section>
  )
}
