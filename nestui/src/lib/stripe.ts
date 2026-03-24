import { loadStripe, type Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null = null

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.warn('[Nest UI] Missing VITE_STRIPE_PUBLISHABLE_KEY')
      return Promise.resolve(null)
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

// Stripe Price IDs — replace with real IDs from your Stripe dashboard
export const STRIPE_PRICES = {
  pro_monthly: 'price_pro_monthly',
  pro_annual: 'price_pro_annual',
  agency_monthly: 'price_agency_monthly',
  agency_annual: 'price_agency_annual',
} as const

export type PlanId = 'free' | 'pro' | 'agency'
export type BillingInterval = 'monthly' | 'annual'

export interface PlanDefinition {
  id: PlanId
  name: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  stripeMonthlyPriceId: string | null
  stripeAnnualPriceId: string | null
  popular?: boolean
}

export const PLANS: PlanDefinition[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    stripeMonthlyPriceId: null,
    stripeAnnualPriceId: null,
    features: [
      '3 themes',
      '1 sub-account',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 97,
    annualPrice: 79,
    stripeMonthlyPriceId: STRIPE_PRICES.pro_monthly,
    stripeAnnualPriceId: STRIPE_PRICES.pro_annual,
    popular: true,
    features: [
      'All 9 themes',
      '5 sub-accounts',
      'AI theme generator',
      'Priority support',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    monthlyPrice: 399,
    annualPrice: 329,
    stripeMonthlyPriceId: STRIPE_PRICES.agency_monthly,
    stripeAnnualPriceId: STRIPE_PRICES.agency_annual,
    features: [
      'All themes + custom',
      'Unlimited sub-accounts',
      'AI theme generator',
      'White-glove onboarding',
      'Dedicated support',
    ],
  },
]
