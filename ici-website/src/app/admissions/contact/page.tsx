import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import { Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Speak to an Advisor | International Coaching Institute',
}

export default async function ContactAdmissionsPage() {
  const content = await getPageContent('admissions-contact')

  return (
    <div className="bg-cream-50 min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        
        {/* Hero */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <div className="section-label mb-6">Admissions</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            {content.heading || 'Not sure? Talk it through'}
          </h1>
          <p className="font-body text-xl text-gray-700 leading-relaxed">
            {content.body || 'Choosing how to train as a coach is a real decision, and sometimes you simply want to talk it through with someone who knows. That is what our advisors are for. Ask anything: about levels, timing, cost, or whether coaching is right for you at all. No script, no pressure.'}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          
          <AnimatedSection delay={0.1}>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-full bg-cream-100 text-navy-800 flex items-center justify-center mb-6">
                <Calendar size={28} />
              </div>
              <h3 className="font-sans font-bold text-lg text-navy-900 mb-2">Book a call</h3>
              <p className="font-body text-gray-600 mb-6 flex-1">Choose a time that works for you and we will call you.</p>
              <Link href="#" className="btn-primary w-full text-center">Schedule call</Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-full bg-cream-100 text-navy-800 flex items-center justify-center mb-6">
                <Mail size={28} />
              </div>
              <h3 className="font-sans font-bold text-lg text-navy-900 mb-2">Email us</h3>
              <p className="font-body text-gray-600 mb-6 flex-1">Send your questions and an advisor will reply within 24 hours.</p>
              <a href="mailto:admissions@internationalcoachinginstitute.org" className="btn-outline w-full text-center">Send email</a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-full bg-cream-100 text-navy-800 flex items-center justify-center mb-6">
                <Phone size={28} />
              </div>
              <h3 className="font-sans font-bold text-lg text-navy-900 mb-2">Call us directly</h3>
              <p className="font-body text-gray-600 mb-6 flex-1">Available Monday to Friday, 9am to 6pm GMT.</p>
              <a href="tel:+919819984575" className="btn-outline w-full text-center">(+91) 98199 84575</a>
            </div>
          </AnimatedSection>

        </div>

      </div>
    </div>
  )
}
