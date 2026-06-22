'use client'

import { useState } from 'react'

type EmailSignupFormProps = {
  context: string
  placeholder?: string
  buttonText?: string
  className?: string
}

export default function EmailSignupForm({
  context,
  placeholder = 'Enter your email address',
  buttonText = 'Notify me',
  className = 'max-w-md mx-auto flex flex-col sm:flex-row gap-4',
}: EmailSignupFormProps) {
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
        body: JSON.stringify({ email, honeypot, context }),
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
        Thank you — we will be in touch.
      </p>
    )
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        className="flex-1 bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
      />
      <button type="submit" disabled={status === 'loading'} className="btn-primary">
        {status === 'loading' ? 'Sending...' : buttonText}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm sm:col-span-2 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
