'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'

interface ICIDifferenceProps {
  content?: Record<string, string>;
}

export default function ICIDifference({ content = {} }: ICIDifferenceProps) {
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-700 mb-6">{content.diff_heading || 'The ICI Difference'}</h2>
          <p className="font-body text-gray-600 mb-8 leading-relaxed text-lg">
            Our evidence-based curriculum, world-class faculty, and global alumni network provide an unmatched environment for aspiring and established coaches to thrive.
          </p>
          <ul className="space-y-6 font-sans text-navy-600">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">✦</div>
              <div>
                <strong className="block text-navy-700 mb-1">{content.diff_1_title || 'Evidence-based curriculum'}</strong>
                <span className="text-sm text-gray-500">{content.diff_1_body || 'Coaching psychology, neuroscience and behavioural science, taught in plain language and tied to what happens in a real session.'}</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">✦</div>
              <div>
                <strong className="block text-navy-700 mb-1">{content.diff_2_title || 'One-to-one, never one-to-many'}</strong>
                <span className="text-sm text-gray-500">{content.diff_2_body || 'You are coached and developed individually, so nothing is glossed over and no one hides at the back of a room.'}</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">✦</div>
              <div>
                <strong className="block text-navy-700 mb-1">{content.diff_3_title || 'Faculty who still practise'}</strong>
                <span className="text-sm text-gray-500">{content.diff_3_body || 'Learn from working coaches who carry real client experience into every session.'}</span>
              </div>
            </li>
          </ul>
        </AnimatedSection>
      </div>
    </section>
  )
}
