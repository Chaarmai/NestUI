import { useState } from 'react'
import { PLANS, type PlanId, type BillingInterval } from '../../lib/stripe'
import PlanCard from './PlanCard'

interface PricingTableProps {
  currentPlan: PlanId
  loading: boolean
  onSelectPlan: (priceId: string) => void
}

export default function PricingTable({ currentPlan, loading, onSelectPlan }: PricingTableProps) {
  const [interval, setInterval] = useState<BillingInterval>('monthly')

  return (
    <div>
      {/* Billing interval toggle */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${interval === 'monthly' ? 'text-nestui-text' : 'text-nestui-text2'}`}>
          Monthly
        </span>
        <button
          onClick={() => setInterval(interval === 'monthly' ? 'annual' : 'monthly')}
          className="relative shrink-0 h-6 w-11 rounded-full bg-nestui-surface border border-nestui-border transition-colors focus:outline-none"
          aria-label="Toggle billing interval"
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-nestui-blue transition-transform ${
              interval === 'annual' ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${interval === 'annual' ? 'text-nestui-text' : 'text-nestui-text2'}`}>
          Annual
        </span>
        {interval === 'annual' && (
          <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
            Save up to 20%
          </span>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlan={currentPlan}
            interval={interval}
            loading={loading}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </div>
  )
}
