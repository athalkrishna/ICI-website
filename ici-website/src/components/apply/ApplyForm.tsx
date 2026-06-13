'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

interface ApplyFormProps {
  heading: string
  body: string
}

export default function ApplyForm({ heading, body }: ApplyFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!turnstileToken) {
      alert('Please complete the captcha verification.')
      return
    }

    setStatus('submitting')
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          country: formData.get('country'),
          programme_interest: formData.get('programme_interest'),
          message: formData.get('message'),
          turnstileToken
        })
      })

      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      if (typeof window !== 'undefined') {
        if ((window as any).gtag) (window as any).gtag('event', 'form_submit', { form_name: 'apply_form' })
        if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'apply_form' })
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="bg-cream-100 min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-24">
        
        {status === 'success' ? (
          <AnimatedSection className="bg-white p-16 rounded-3xl shadow-xl text-center border-t-4 border-brand-gold-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h1 className="text-h1 text-brand-navy-900 mb-4">Application Received</h1>
            <p className="text-muted mb-8 max-w-lg mx-auto text-body">
              Thank you for taking the first step. Our admissions team will review your application and be in touch within 24-48 hours.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-primary inline-flex px-8"
            >
              Return Home
            </button>
          </AnimatedSection>
        ) : (
          <div className="grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-1">
              <AnimatedSection>
                <div className="text-eyebrow flex items-center gap-3 justify-center !justify-start mb-4">Admissions</div>
                <h1 className="text-h1 text-brand-navy-900 mb-6">{heading}</h1>
                <p className="text-muted mb-10 text-body">
                  {body}
                </p>

                <div className="bg-brand-navy-900 text-white p-8 rounded-2xl">
                  <h3 className="mb-4 text-brand-gold-400 text-eyebrow">Next Steps</h3>
                  <ul className="space-y-4 font-body text-sm text-navy-100">
                    <li className="flex gap-3"><span className="text-brand-gold-500">01</span> We review your background</li>
                    <li className="flex gap-3"><span className="text-brand-gold-500">02</span> Brief interview with a faculty member</li>
                    <li className="flex gap-3"><span className="text-brand-gold-500">03</span> Official offer and enrolment</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-navy-100">
                  <div className="space-y-6">
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-brand-navy-700 text-eyebrow">Full Name *</label>
                        <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-navy-700 text-eyebrow">Email Address *</label>
                        <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-brand-navy-700 text-eyebrow">WhatsApp Number *</label>
                        <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-navy-700 text-eyebrow">Country of Residence *</label>
                        <input required name="country" type="text" className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-brand-navy-700 text-eyebrow">Programme Interest *</label>
                      <select required name="programme_interest" className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow">
                        <option value="">Select a pathway</option>
                        <option value="Life Coaching">Life Coaching</option>
                        <option value="Executive & Leadership">Executive & Leadership</option>
                        <option value="Business Coaching">Business Coaching</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Team & Organisational">Team & Organisational</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-brand-navy-700 text-eyebrow">Brief Background / Goal</label>
                      <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-cream-50 border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 transition-shadow placeholder:text-navy-400" placeholder="Tell us briefly why you want to become a coach..." />
                    </div>

                    {status === 'error' && (
                      <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg">
                        There was an error submitting your application. Please try again.
                      </div>
                    )}

                    <div className="pt-2">
                      <Turnstile 
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                        onSuccess={(token) => setTurnstileToken(token)}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'submitting' || !turnstileToken}
                      className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50"
                    >
                      {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                      {!status && <ArrowRight size={18} />}
                    </button>

                  </div>
                </form>
              </AnimatedSection>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
