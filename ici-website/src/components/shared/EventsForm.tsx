'use client'

import { useState } from 'react'

export default function EventsForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const honeypot = formData.get('bot_field')

    try {
      const response = await fetch('/api/events-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot }),
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
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-navy-800/50 border border-gold-500/30 p-8 rounded-2xl text-center">
        <p className="font-body text-xl text-gold-400">Thank you — we will be in touch.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mt-8" id="events-form">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Honeypot field */}
        <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />
        
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="flex-1 bg-navy-800 border border-white/10 rounded-full px-6 py-4 text-white placeholder-blue-100/50 focus:outline-none focus:border-gold-500 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap"
        >
          {status === 'loading' ? 'Sending...' : 'Notify me'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 mt-4 text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
