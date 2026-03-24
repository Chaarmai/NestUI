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
  const currentPlanPrice = currentPlan === 'agency' ? 397 : currentPlan === 'pro' ? 97 : 0
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
    <div className={`relative rounded-xl p-px transition-all duration-300 ${
      plan.popular ? 'sm:-mt-3 sm:mb-3' : ''
    }`}>
      {/* Gradient border */}
      {(isCurrent || plan.popular) && (
        <div className={`absolute -inset-px rounded-xl ${
          isCurrent
            ? 'bg-gradient-to-b from-nestui-blue/40 via-nestui-blue/15 to-transparent'
            : 'bg-gradient-to-b from-nestui-blue/30 via-nestui-blue/10 to-transparent'
        }`} />
      )}

      <div
        className={`relative flex flex-col rounded-xl p-6 h-full transition-all duration-300 ${
          isCurrent
            ? 'bg-nestui-bg1 shadow-[0_0_40px_rgba(91,143,255,0.08)]'
            : 'glass-card glass-card-hover'
        }`}
      >
        {plan.popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-nestui-blue to-blue-500 px-3.5 py-0.5 text-[11px] font-semibold text-white shadow-[0_0_15px_rgba(91,143,255,0.25)]">
            Most Popular
          </span>
        )}

        <h3 className="text-base font-semibold text-nestui-text">{plan.name}</h3>

        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-nestui-text tracking-tight">
              {price === 0 ? 'Free' : `$${price}`}
            </span>
            {price > 0 && (
              <span className="text-sm text-nestui-text3">/mo</span>
            )}
          </div>
          {showSavings && (
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-xs text-nestui-text3 line-through">${plan.monthlyPrice}/mo</span>
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-400 border border-green-500/20">
                Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr
              </span>
            </div>
          )}
          {interval === 'annual' && price > 0 && (
            <p className="mt-1 text-xs text-nestui-text3">
              Billed ${price * 12}/year
            </p>
          )}
        </div>

        <ul className="mt-6 flex flex-1 flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-nestui-text2">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-nestui-blue/10">
                <svg className="h-2.5 w-2.5 text-nestui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <button
          disabled={isCurrent || loading || (plan.id === 'free' && isDowngrade)}
          onClick={() => priceId && onSelect(priceId)}
          className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
            isCurrent
              ? 'bg-nestui-blue/10 text-nestui-blue border border-nestui-blue/20 cursor-default'
              : plan.popular
                ? 'bg-gradient-to-r from-nestui-blue to-blue-500 text-white hover:shadow-[0_0_25px_rgba(91,143,255,0.25)] hover:scale-[1.01]'
                : plan.id === 'free'
                  ? 'border border-nestui-border/50 text-nestui-text2 hover:text-nestui-text hover:border-nestui-text3/30 hover:bg-white/[0.02]'
                  : 'bg-nestui-blue text-white hover:bg-nestui-blue/90 hover:shadow-[0_0_20px_rgba(91,143,255,0.15)]'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100`}
        >
          {loading ? 'Processing...' : getButtonLabel()}
        </button>
      </div>
    </div>
  )
}
