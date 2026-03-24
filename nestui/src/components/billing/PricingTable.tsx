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
        <span className={`text-sm font-medium transition-colors ${interval === 'monthly' ? 'text-nestui-text' : 'text-nestui-text3'}`}>
          Monthly
        </span>
        <button
          onClick={() => setInterval(interval === 'monthly' ? 'annual' : 'monthly')}
          className="relative shrink-0 h-6 w-11 overflow-hidden rounded-full bg-nestui-surface/50 border border-nestui-border/50 transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle billing interval"
        >
          <span
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-gradient-to-r from-nestui-blue to-blue-500 shadow-[0_0_8px_rgba(91,143,255,0.3)] transition-transform duration-300 ${
              interval === 'annual' ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={`text-sm font-medium transition-colors ${interval === 'annual' ? 'text-nestui-text' : 'text-nestui-text3'}`}>
          Annual
        </span>
        {interval === 'annual' && (
          <span className="rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-green-400 animate-fade-in">
            Save up to 20%
          </span>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-start">
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
