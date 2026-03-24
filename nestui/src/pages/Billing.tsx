import { useBilling } from '../hooks/useBilling'
import Topbar from '../components/layout/Topbar'
import PricingTable from '../components/billing/PricingTable'

export default function Billing() {
  const { currentPlan, loading, error, createCheckoutSession, createPortalSession } = useBilling()

  const planLabel = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)
  const isPaid = currentPlan !== 'free'

  return (
    <div className="min-h-screen bg-nestui-bg">
      <Topbar />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 animate-fade-in">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-nestui-text tracking-tight">Billing & Plans</h1>
          <p className="mt-1 text-sm text-nestui-text2">
            Manage your subscription and choose the right plan for your agency.
          </p>
        </div>

        {/* Current Plan Summary */}
        <div className="mb-10 rounded-xl p-px bg-gradient-to-r from-nestui-border/50 via-nestui-blue/10 to-nestui-border/50">
          <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3">
                  Current Plan
                </p>
                <div className="mt-1 flex items-center gap-2.5">
                  <p className="text-xl font-bold text-nestui-text tracking-tight">
                    {planLabel}
                  </p>
                  {isPaid && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-400 border border-green-500/20">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      Active
                    </span>
                  )}
                </div>
              </div>
              {isPaid && (
                <button
                  onClick={createPortalSession}
                  disabled={loading}
                  className="rounded-lg border border-nestui-border/50 bg-white/[0.02] px-4 py-2 text-sm font-medium text-nestui-text2 transition-all duration-200 hover:border-nestui-blue/20 hover:text-nestui-text hover:bg-white/[0.04] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Opening...' : 'Manage Subscription'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 animate-fade-in">
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
        <p className="mt-10 text-center text-xs text-nestui-text3">
          All plans billed monthly. Cancel anytime from the billing portal.
        </p>
      </div>
    </div>
  )
}
