'use client'

import { useState } from 'react'
import { defaultEventsFormCopy, type EventsFormCopy } from '@/lib/events-defaults'

type EventsFormProps = {
  copy?: EventsFormCopy
}

export default function EventsForm({ copy = defaultEventsFormCopy() }: EventsFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')

    try {
      const response = await fetch('/api/events-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, context: 'Events page interest signup' }),
      })

      if (response.ok) {
        setStatus('success')
        if (typeof window !== 'undefined') {
          if ((window as any).gtag) (window as any).gtag('event', 'form_submit', { form_name: 'events_interest_form' })
          if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'events_interest_form' })
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
      <div className="bg-cream-50 border border-brand-gold-500/30 p-8 rounded-2xl text-center">
        <p className="text-brand-gold-700 text-body">{copy.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mt-8" id="events-form">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          name="email"
          required
          placeholder={copy.placeholderEmail}
          className="flex-1 bg-white border border-navy-200 shadow-sm rounded-full px-6 py-4 text-brand-navy-900 placeholder-muted focus:outline-none focus:border-brand-gold-500 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap"
        >
          {status === 'loading' ? copy.submittingText : copy.submitText}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-600 mt-4 text-sm">{copy.errorMessage}</p>
      )}
    </form>
  )
}
