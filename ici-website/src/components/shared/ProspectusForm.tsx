'use client'

import { useState } from 'react'

export default function ProspectusForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const country = formData.get('country')
    const interest = formData.get('interest')
    const honeypot = formData.get('bot_field')

    try {
      const response = await fetch('/api/prospectus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country, interest, honeypot }),
      })

      if (response.ok) {
        setStatus('success')
        if (typeof window !== 'undefined') {
          if ((window as any).gtag) (window as any).gtag('event', 'form_submit', { form_name: 'prospectus_form' })
          if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'prospectus_form' })
        }
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-cream-50 border border-brand-gold-500/30 p-8 rounded-2xl text-center relative z-10">
        <p className="text-brand-gold-700 text-body">Thank you. We will email you the prospectus shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10" id="prospectus-form">
      {status === 'error' && (
        <div className="bg-red-600/30 border border-red-600/50 p-4 rounded-xl text-center mb-6">
          <p className="text-red-600 font-body">Something went wrong. Please email info@internationalcoachinginstitute.org</p>
        </div>
      )}

      {/* Honeypot field */}
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="space-y-2">
        <label htmlFor="name" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          Name <span className="text-brand-gold-500">*</span>
        </label>
        <input 
          type="text" 
          id="name" 
          name="name"
          required 
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
          placeholder="Your name"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          Email <span className="text-brand-gold-500">*</span>
        </label>
        <input 
          type="email" 
          id="email" 
          name="email"
          required 
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="country" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          Country <span className="text-brand-gold-500">*</span>
        </label>
        <select 
          id="country" 
          name="country"
          required
          defaultValue=""
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body appearance-none"
        >
          <option value="" disabled>Select your country</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="AU">Australia</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="interest" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          Level or specialism of interest <span className="text-muted text-xs font-normal lowercase tracking-normal">(Optional)</span>
        </label>
        <select 
          id="interest" 
          name="interest"
          defaultValue=""
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body appearance-none"
        >
          <option value="" disabled>Select a specialism</option>
          <option value="Catalyst">Catalyst</option>
          <option value="Executive Coaching">Executive Coaching</option>
          <option value="Team Coaching">Team Coaching</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="pt-4 text-center">
        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-4 text-base mb-4">
          {status === 'loading' ? 'Sending...' : 'Send me the prospectus'}
        </button>
        <p className="text-muted text-body">
          We will email you the prospectus as soon as it is released, within the next few weeks.
        </p>
      </div>
    </form>
  )
}
