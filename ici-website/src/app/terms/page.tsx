import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | International Coaching Institute',
  description: 'The terms that govern your use of the ICI website and our programmes, including enrolment, payment, intellectual property and liability.'
}

export default function TermsPage() {
  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10 pointer-events-none" aria-hidden />

      <div className="max-w-[1024px] mx-auto px-4 lg:px-8 pt-32 pb-24 relative z-20">
        <AnimatedSection>
          <div className="section-label mb-8 justify-start text-gold-400">Terms</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
            Terms of Service
          </h1>
          <p className="font-body text-sm text-gold-400 uppercase tracking-wider font-bold mb-16">
            Last updated: [date]
          </p>

          <div className="prose prose-invert prose-lg max-w-none prose-p:text-blue-100/80 prose-li:text-blue-100/80 prose-headings:text-white prose-headings:font-display prose-headings:font-bold prose-a:text-gold-400 hover:prose-a:text-gold-300">
            
            <p className="lead text-xl text-white">
              These terms govern your use of the International Coaching Institute website and your enrolment in our programmes. By using this site or enrolling, you agree to them.
            </p>

            {/* Note to Developers/Admins */}
            <div className="bg-navy-800/50 border border-gold-500/30 rounded-xl p-6 my-8 text-sm text-blue-100/60 font-body">
              <strong className="text-gold-400">Note:</strong> Plain-language starting draft, not legal advice. Have a qualified lawyer review and adapt for ICI&apos;s jurisdictions and actual commercial terms, especially payment, refunds and cancellation.
            </div>

            <h2 className="text-3xl mt-12 mb-6">Who we are</h2>
            <p>
              This website is operated by [legal entity name], registered at [address] (we, us, our).
            </p>

            <h2 className="text-3xl mt-12 mb-6">Using our website</h2>
            <p>
              You agree to use the site lawfully and not to misuse it, disrupt it, or attempt to access areas you are not authorised to access.
            </p>

            <h2 className="text-3xl mt-12 mb-6">Enrolment and programmes</h2>
            <p>
              When you enrol, you agree to the level details, schedule and requirements provided to you. Places may be limited and are confirmed on payment or an agreed payment plan.
            </p>

            <h2 className="text-3xl mt-12 mb-6">Fees, payment and refunds</h2>
            <p>
              Fees, payment terms, instalment options and our refund and cancellation policy are set out at the point of enrolment. [State your actual policy here in full, including any cooling-off period and the conditions for refunds.]
            </p>

            <h2 className="text-3xl mt-12 mb-6">Credentials</h2>
            <p>
              Credentials are awarded only on successful completion of the relevant requirements and assessment. The ICI credentials are Catalyst, Architect, Sage and Luminary, awarded by the International Coaching Institute.
            </p>

            <h2 className="text-3xl mt-12 mb-6">Code of conduct</h2>
            <p>
              Students and members agree to engage respectfully and ethically. We may suspend or remove access for serious or repeated breaches.
            </p>

            <h2 className="text-3xl mt-12 mb-6">Intellectual property</h2>
            <p>
              All course materials, content and branding remain the property of [legal entity name] or its licensors. You may use materials for your own learning but may not copy, share or resell them without written permission.
            </p>

            <h2 className="text-3xl mt-12 mb-6">Disclaimers</h2>
            <p>
              Our programmes provide coaching education. Coaching is not therapy, counselling or medical advice, and we make no guarantee of any specific income, career or personal outcome.
            </p>

            <h2 className="text-3xl mt-12 mb-6">Limitation of liability and governing law</h2>
            <p>
              To the extent permitted by law, our liability is limited as set out here. These terms are governed by the laws of [jurisdiction], and disputes are subject to the courts of [jurisdiction]. [Confirm with counsel.]
            </p>

            <h2 className="text-3xl mt-12 mb-6">Changes and contact</h2>
            <p>
              We may update these terms from time to time; the current version will always be on this page. Questions: [email].
            </p>

          </div>
        </AnimatedSection>
      </div>

    </div>
  )
}
