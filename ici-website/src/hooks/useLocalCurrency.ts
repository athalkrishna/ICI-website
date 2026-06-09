'use client'

import { useState, useEffect } from 'react'

interface CurrencyState {
  currencyCode: string
  exchangeRate: number
  loading: boolean
  error: string | null
}

export function useLocalCurrency() {
  const [state, setState] = useState<CurrencyState>({
    currencyCode: 'INR',
    exchangeRate: 1,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let mounted = true

    async function fetchCurrency() {
      try {
        // 1. Get user's location and currency code
        const geoResponse = await fetch('https://ipapi.co/json/')
        if (!geoResponse.ok) throw new Error('Failed to fetch geolocation')
        const geoData = await geoResponse.json()
        const userCurrency = geoData.currency

        if (!userCurrency || userCurrency === 'INR') {
          if (mounted) setState({ currencyCode: 'INR', exchangeRate: 1, loading: false, error: null })
          return
        }

        // 2. Get exchange rate from INR to userCurrency
        const rateResponse = await fetch('https://open.er-api.com/v6/latest/INR')
        if (!rateResponse.ok) throw new Error('Failed to fetch exchange rates')
        const rateData = await rateResponse.json()
        const rate = rateData.rates[userCurrency]

        if (!rate) {
          throw new Error('Exchange rate not found for ' + userCurrency)
        }

        if (mounted) {
          setState({
            currencyCode: userCurrency,
            exchangeRate: rate,
            loading: false,
            error: null,
          })
        }
      } catch (err) {
        console.error('Currency conversion error:', err)
        if (mounted) {
          setState(prev => ({ ...prev, loading: false, error: err instanceof Error ? err.message : 'Unknown error' }))
        }
      }
    }

    fetchCurrency()

    return () => {
      mounted = false
    }
  }, [])

  // Helper function to format prices cleanly
  const formatPrice = (amountInINR: number) => {
    if (state.loading || state.error || state.currencyCode === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amountInINR)
    }

    const convertedAmount = amountInINR * state.exchangeRate

    // Determine locale for formatting (best guess based on currency)
    let locale = 'en-US'
    if (state.currencyCode === 'EUR') locale = 'de-DE'
    else if (state.currencyCode === 'GBP') locale = 'en-GB'
    else if (state.currencyCode === 'AUD') locale = 'en-AU'
    else if (state.currencyCode === 'CAD') locale = 'en-CA'

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: state.currencyCode,
      maximumFractionDigits: 0,
    }).format(convertedAmount)
  }

  return { ...state, formatPrice }
}
