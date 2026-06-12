import AnimatedSection from '@/components/shared/AnimatedSection'
import ContactForm from '@/components/contact/ContactForm'
import { Metadata } from 'next'
import { Phone, Mail, Clock } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: {
    absolute: 'Contact ICI | Speak to a Coaching Advisor',
  },
  description: 'Get in touch with the International Coaching Institute. Ask about programmes, credentials or organisational training, and speak to a human who can help.'
}

export default function ContactPage() {
  return (
    <div className="bg-brand-navy-900 min-h-screen font-sans text-navy-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h1 className="text-h1 text-white mb-8">
              Talk to a human
            </h1>
            <p className="text-muted-dark mb-12 text-body">
              Whatever brought you here, there is a person at ICI happy to help. Ask about programmes, credentials, timing, cost, or training a team. No script and no pressure, just a straight conversation.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="standard" className="relative z-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
            
            {/* Form */}
            <AnimatedSection>
              <div className="bg-brand-navy-800/50 backdrop-blur-sm border-subtle p-8 md:p-10 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
                
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Info Block */}
            <AnimatedSection delay={0.1}>
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-h3 text-white mb-6">Other ways to reach us</h3>
                  {/* Confirm phone, email, hours and time zone, and registered entity name for footer/legal */}
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-faint flex items-center justify-center shrink-0 text-brand-gold-400">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-100/50 uppercase tracking-wider mb-1">Phone</div>
                        <div className="font-body text-white">+91 98199 84575</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-faint flex items-center justify-center shrink-0 text-brand-gold-400">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-100/50 uppercase tracking-wider mb-1">Email</div>
                        <div className="font-body text-white">info@internationalcoachinginstitute.org</div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-navy-800 border border-faint flex items-center justify-center shrink-0 text-brand-gold-400">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy-100/50 uppercase tracking-wider mb-1">Hours</div>
                        <div className="font-body text-white text-sm leading-relaxed">
                          Mon-Fri, 9:00 AM - 6:00 PM (IST)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>

        </div>
      </Section>

    </div>
  )
}
