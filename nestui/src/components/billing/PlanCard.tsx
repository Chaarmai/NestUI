import type { PlanDefinition, PlanId, BillingInterval } from '../../lib/stripe'

interface PlanCardProps {
  plan: PlanDefinition
  currentPlan: PlanId
  interval: BillingInterval
  loading: boolean
  onSelect: (priceId: string) => void
}

export default function PlanCard({ plan, currentPlan, interval, loading, onSelect }: PlanCardProps) {
  const isCurrent = plan.id === currentPlan
  const price = interval === 'annual' ? plan.annualPrice : plan.monthlyPrice
  const priceId = interval === 'annual' ? plan.stripeAnnualPriceId : plan.stripeMonthlyPriceId
  const currentPlanPrice = currentPlan === 'agency' ? 399 : currentPlan === 'pro' ? 97 : 0
  const isUpgrade = plan.monthlyPrice > currentPlanPrice
  const isDowngrade = plan.monthlyPrice < currentPlanPrice
  const showSavings = interval === 'annual' && plan.monthlyPrice > 0

  function getButtonLabel() {
    if (isCurrent) return 'Current Plan'
    if (plan.id === 'free') return 'Downgrade'
    if (isUpgrade) return 'Upgrade'
    if (isDowngrade) return 'Downgrade'
    return 'Get Started'
  }

  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 transition-all ${
        isCurrent
          ? 'border-nestui-blue bg-nestui-blue-soft'
          : 'border-nestui-border bg-nestui-surface hover:border-nestui-blue/30'
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-nestui-blue px-3 py-0.5 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-nestui-text">{plan.name}</h3>

      <div className="mt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-nestui-text">
            {price === 0 ? 'Free' : `$${price}`}
          </span>
          {price > 0 && (
            <span className="text-sm text-nestui-text2">/mo</span>
          )}
        </div>
        {showSavings && (
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-nestui-text2 line-through">${plan.monthlyPrice}/mo</span>
            <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
              Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr
            </span>
          </div>
        )}
        {interval === 'annual' && price > 0 && (
          <p className="mt-1 text-xs text-nestui-text2">
            Billed ${price * 12}/year
          </p>
        )}
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-nestui-text2">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-nestui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        disabled={isCurrent || loading || (plan.id === 'free' && isDowngrade)}
        onClick={() => priceId && onSelect(priceId)}
        className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          isCurrent
            ? 'cursor-default bg-nestui-blue/20 text-nestui-blue'
            : plan.id === 'free'
              ? 'bg-nestui-surface border border-nestui-border text-nestui-text2 hover:text-nestui-text hover:border-nestui-text2/30'
              : 'bg-nestui-blue text-white hover:bg-nestui-blue/90'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? 'Processing...' : getButtonLabel()}
      </button>
    </div>
  )
}
