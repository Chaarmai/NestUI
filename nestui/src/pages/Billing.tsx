import { Link } from 'react-router-dom'
import { useBilling } from '../hooks/useBilling'
import PricingTable from '../components/billing/PricingTable'

export default function Billing() {
  const { currentPlan, loading, error, createCheckoutSession, createPortalSession } = useBilling()

  const planLabel = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)
  const isPaid = currentPlan !== 'free'

  return (
    <div className="min-h-screen bg-nestui-bg">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-nestui-text">Billing & Plans</h1>
            <p className="mt-1 text-sm text-nestui-text2">
              Manage your subscription and choose the right plan for your agency.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-sm text-nestui-text2 hover:text-nestui-blue transition-colors"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Current Plan Summary */}
        <div className="mb-10 rounded-xl border border-nestui-border bg-nestui-surface p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-nestui-text2">
                Current Plan
              </p>
              <p className="mt-1 text-lg font-semibold text-nestui-text">
                {planLabel}
                {isPaid && (
                  <span className="ml-2 inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                    Active
                  </span>
                )}
              </p>
            </div>
            {isPaid && (
              <button
                onClick={createPortalSession}
                disabled={loading}
                className="rounded-lg border border-nestui-border bg-nestui-bg1 px-4 py-2 text-sm font-medium text-nestui-text transition-colors hover:border-nestui-blue/30 hover:text-nestui-blue disabled:opacity-50"
              >
                {loading ? 'Opening...' : 'Manage Subscription'}
              </button>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Pricing Table */}
        <PricingTable
          currentPlan={currentPlan}
          loading={loading}
          onSelectPlan={createCheckoutSession}
        />

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-nestui-text2">
          All plans billed monthly. Cancel anytime from the billing portal.
        </p>
      </div>
    </div>
  )
}
