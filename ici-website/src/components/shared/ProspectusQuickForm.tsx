'use client'

import { useState } from 'react'
import {
  defaultProspectusQuickFormCopy,
  type ProspectusQuickFormCopy,
} from '@/lib/prospectus-defaults'

type ProspectusQuickFormProps = {
  copy?: ProspectusQuickFormCopy
}

export default function ProspectusQuickForm({
  copy = defaultProspectusQuickFormCopy(),
}: ProspectusQuickFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')

    try {
      const response = await fetch('/api/prospectus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
        {copy.successMessage}
      </p>
    )
  }

  return (
    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        required
        placeholder={copy.placeholderEmail}
        className="flex-1 bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70"
      />
      <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center">
        {status === 'loading' ? copy.submittingText : copy.submitText}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-sm sm:col-span-2 text-center">{copy.errorMessage}</p>
      )}
    </form>
  )
}
