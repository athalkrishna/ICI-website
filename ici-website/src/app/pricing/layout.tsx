import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Pricing | ICI Coaching Certifications',
  },
  description: 'Clear, transparent pricing for the ICI Mastery Pathway. Four one-to-one, online certifications, from Catalyst to Luminary. Enrol level by level.',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
