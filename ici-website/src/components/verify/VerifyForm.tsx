'use client'

import { useState, useTransition } from 'react'
import { verifyCredential, type VerifyResult } from '@/app/verify/actions'
import {
  defaultVerifyFormCopy,
  formatNotFoundMessage,
  type VerifyFormCopy,
} from '@/lib/verify-defaults'
import {
  CheckCircle2,
  XCircle,
  Search,
  Loader2,
  Calendar,
  Award,
  User,
  BookOpen,
  Hash,
} from 'lucide-react'

type VerifyFormProps = {
  copy?: VerifyFormCopy
}

export default function VerifyForm({ copy = defaultVerifyFormCopy() }: VerifyFormProps) {
  const [referenceNumber, setReferenceNumber] = useState('')
  const [result, setResult] = useState<VerifyResult | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!referenceNumber.trim()) return

    setHasSearched(true)
    startTransition(async () => {
      const res = await verifyCredential(referenceNumber)
      setResult(res)
    })
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available'
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-h3 text-brand-navy-900 mb-2">{copy.formHeading}</h2>
        <p className="text-muted text-body mb-6">{copy.formLabel}</p>

        <form onSubmit={handleVerify}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 pointer-events-none" />
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                placeholder={copy.placeholder}
                className="w-full pl-12 pr-4 py-4 bg-cream-50 border border-navy-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500 text-brand-navy-900 placeholder:text-navy-400 font-mono text-base sm:text-lg shadow-sm"
                required
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              disabled={isPending || !referenceNumber.trim()}
              className="btn-primary justify-center px-8 py-4 sm:py-0 min-h-[56px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{copy.submittingText}</span>
                </>
              ) : (
                <>
                  <span>{copy.submitText}</span>
                  <Search className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {hasSearched && isPending && (
        <div className="rounded-3xl border border-navy-100 bg-cream-50 p-10 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold-600 mx-auto mb-4" />
          <p className="text-muted font-body">{copy.submittingText}</p>
        </div>
      )}

      {hasSearched && !isPending && result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {result.found ? (
            <div className="relative overflow-hidden rounded-3xl border border-brand-gold-500/30 bg-white shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-brand-gold-600" />

              <div className="p-8 md:p-10">
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold-500/10 border border-brand-gold-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-brand-gold-600" />
                  </div>
                  <div>
                    <h3 className="text-h3 text-brand-navy-900 mb-2">{copy.successHeading}</h3>
                    <p className="text-muted font-body">{copy.successSubheading}</p>
                  </div>
                </div>

                <div className="mb-6 rounded-2xl bg-brand-navy-900 px-6 py-5 text-center">
                  <p className="text-xs font-sans font-bold uppercase tracking-widest text-brand-gold-400 mb-2">
                    {copy.labels.referenceNumber}
                  </p>
                  <p className="font-mono text-xl sm:text-2xl text-white tracking-wide">
                    {result.credentialNumber}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <ResultField icon={User} label={copy.labels.coachName} value={result.coachName} />
                  <ResultField icon={Award} label={copy.labels.level} value={result.level} accent />
                  <ResultField icon={BookOpen} label={copy.labels.specialisation} value={result.specialisation} />
                  <ResultField icon={Calendar} label={copy.labels.issueDate} value={formatDate(result.issueDate)} />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-red-200 bg-white p-8 md:p-10 shadow-lg text-center">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-red-400" />

              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
                <XCircle className="w-9 h-9 text-red-500" />
              </div>

              <h3 className="text-h3 text-brand-navy-900 mb-3">{copy.notFoundHeading}</h3>
              <p className="text-muted font-body max-w-lg mx-auto leading-relaxed">
                {formatNotFoundMessage(copy.notFoundBody, referenceNumber.trim())}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ResultField({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: typeof User
  label: string
  value?: string
  accent?: boolean
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-cream-50 p-5">
      <div className="flex items-center gap-2 text-navy-500 text-xs font-sans font-bold uppercase tracking-wider mb-2">
        <Icon className="w-4 h-4 text-brand-gold-600" />
        {label}
      </div>
      <p className={`text-lg font-semibold ${accent ? 'text-brand-gold-700' : 'text-brand-navy-900'}`}>
        {value || '—'}
      </p>
    </div>
  )
}
