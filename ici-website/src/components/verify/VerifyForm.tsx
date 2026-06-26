'use client'

import { useState, useTransition } from 'react'
import { verifyCredential, type VerifyResult } from '@/app/verify/actions'
import { CheckCircle2, XCircle, Search, Loader2, Calendar, Award, User, BookOpen } from 'lucide-react'

export default function VerifyForm() {
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

  // Formatting date nicely
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <form onSubmit={handleVerify} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="Enter Coach Reference Number (e.g. ICI-12345)"
            className="w-full pl-5 pr-32 py-4 bg-white border border-navy-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-transparent text-brand-navy-900 placeholder:text-navy-400 font-body text-lg shadow-sm"
            required
          />
          <button
            type="submit"
            disabled={isPending || !referenceNumber.trim()}
            className="absolute right-2 px-6 py-2.5 bg-brand-navy-900 text-white rounded-xl hover:bg-brand-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Verify</span>
                <Search className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {hasSearched && !isPending && result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {result.found ? (
            <div className="bg-white border border-green-200 rounded-3xl p-8 shadow-lg overflow-hidden relative">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500"></div>
              
              <div className="flex items-start gap-5 mb-8">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-brand-navy-900 mb-1">Authentic Credential</h3>
                  <p className="text-navy-600 font-body">This reference number is valid and currently active.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 bg-cream-50 rounded-2xl p-6 border border-navy-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-navy-500 text-sm font-medium mb-1 uppercase tracking-wider">
                    <User className="w-4 h-4" />
                    Coach Name
                  </div>
                  <div className="text-lg font-bold text-brand-navy-900">{result.coachName}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-navy-500 text-sm font-medium mb-1 uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    Credential Level
                  </div>
                  <div className="text-lg font-bold text-brand-gold-600">{result.level}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-navy-500 text-sm font-medium mb-1 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    Specialisation
                  </div>
                  <div className="text-lg font-bold text-brand-navy-900">{result.specialisation}</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-navy-500 text-sm font-medium mb-1 uppercase tracking-wider">
                    <Calendar className="w-4 h-4" />
                    Issue Date
                  </div>
                  <div className="text-lg font-bold text-brand-navy-900">{formatDate(result.issueDate)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-red-200 rounded-3xl p-8 shadow-lg relative overflow-hidden text-center">
               {/* Decorative top border */}
               <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>
               
               <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                 <XCircle className="w-8 h-8 text-red-500" />
               </div>
               
               <h3 className="text-2xl font-display text-brand-navy-900 mb-2">Credential Not Found</h3>
               <p className="text-navy-600 font-body max-w-md mx-auto">
                 We could not find any active coach credential matching the reference number <span className="font-semibold text-brand-navy-900">"{referenceNumber}"</span>. Please check the number and try again.
               </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
