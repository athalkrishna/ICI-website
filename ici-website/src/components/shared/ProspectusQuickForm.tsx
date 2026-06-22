'use client'

import { useState } from 'react'

export default function ProspectusQuickForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const honeypot = formData.get('bot_field')

    try {
      const response = await fetch('/api/prospectus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-brand-gold-700 text-body text-center py-4">
        Thank you. We will email you the prospectus shortly.
      </p>
    )
  }

  return (
    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input
        type="email"
        name="email"
        required
        placeholder="Your email address"
        className="flex-1 bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70"
      />
      <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center">
        {status === 'loading' ? 'Sending...' : 'Download PDF'}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm sm:col-span-2 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
