'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessTracker() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') || '0'
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: parseFloat(amount),
        currency: 'INR'
      })
    }
  }, [amount])
  
  return null
}
