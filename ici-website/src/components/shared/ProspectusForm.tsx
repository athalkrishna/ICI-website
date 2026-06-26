'use client'

import { useState } from 'react'
import ObfuscatedEmail from '@/components/shared/ObfuscatedEmail'
import {
  defaultProspectusFormCopy,
  splitBrochureContactEmail,
  type ProspectusFormCopy,
} from '@/lib/prospectus-defaults'

type ProspectusFormProps = {
  copy?: ProspectusFormCopy
}

export default function ProspectusForm({
  copy = defaultProspectusFormCopy(),
}: ProspectusFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { user: emailUser, domain: emailDomain } = splitBrochureContactEmail(copy.contactEmail)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const country = formData.get('country')
    const interest = formData.get('interest')

    try {
      const response = await fetch('/api/prospectus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country, interest }),
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
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-cream-50 border border-brand-gold-500/30 p-8 rounded-2xl text-center relative z-10">
        <p className="text-brand-gold-700 text-body">{copy.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10" id="prospectus-form">
      {status === 'error' && (
        <div className="bg-red-600/30 border border-red-600/50 p-4 rounded-xl text-center mb-6">
          <p className="text-red-600 font-body">
            {copy.errorPrefix}{' '}
            <ObfuscatedEmail user={emailUser} domain={emailDomain} className="underline font-semibold" />
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          {copy.labels.name} <span className="text-brand-gold-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
          placeholder={copy.placeholders.name}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          {copy.labels.email} <span className="text-brand-gold-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
          placeholder={copy.placeholders.email}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="country" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          {copy.labels.country} <span className="text-brand-gold-500">*</span>
        </label>
        <select
          id="country"
          name="country"
          required
          defaultValue=""
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body appearance-none"
        >
          <option value="" disabled>{copy.placeholders.country}</option>
          <option value="UK">{copy.countryOptions.uk}</option>
          <option value="US">{copy.countryOptions.us}</option>
          <option value="IN">{copy.countryOptions.in}</option>
          <option value="AU">{copy.countryOptions.au}</option>
          <option value="Other">{copy.countryOptions.other}</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="interest" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider">
          {copy.labels.interest}{' '}
          <span className="text-muted text-xs font-normal lowercase tracking-normal">{copy.labels.interestOptional}</span>
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue=""
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body appearance-none"
        >
          <option value="" disabled>{copy.placeholders.interest}</option>
          <option value="Catalyst">{copy.interestOptions.catalyst}</option>
          <option value="Executive Coaching">{copy.interestOptions.executive}</option>
          <option value="Team Coaching">{copy.interestOptions.team}</option>
          <option value="Other">{copy.interestOptions.other}</option>
        </select>
      </div>

      <div className="pt-4 text-center">
        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center py-4 text-base mb-4">
          {status === 'loading' ? copy.submittingText : copy.submitText}
        </button>
        <p className="text-muted text-body">{copy.footerNote}</p>
      </div>
    </form>
  )
}
