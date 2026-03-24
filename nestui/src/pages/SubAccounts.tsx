import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSubAccounts } from '../hooks/useSubAccounts'
import { useAppStore } from '../store/useAppStore'
import Topbar from '../components/layout/Topbar'
import SubAccountList from '../components/sub-accounts/SubAccountList'
import AddSubAccountModal from '../components/sub-accounts/AddSubAccountModal'
import Spinner from '../components/ui/Spinner'

export default function SubAccounts() {
  const workspace = useAppStore((s) => s.workspace)
  const { subAccounts, loading, error, canAddMore, maxAllowed, addSubAccount, removeSubAccount, updateTheme } = useSubAccounts()
  const [modalOpen, setModalOpen] = useState(false)

  const plan = workspace?.plan ?? 'free'
  const nextPlan = plan === 'free' ? 'Pro' : plan === 'pro' ? 'Agency' : null

  return (
    <div className="min-h-screen bg-nestui-bg">
      <Topbar />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-nestui-text tracking-tight">Sub-Accounts</h1>
          <p className="mt-1 text-sm text-nestui-text2">
            Manage GHL sub-accounts and assign themes to each.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 animate-fade-in">
            {error}
          </div>
        )}

        {/* Plan limit banner */}
        {!canAddMore && nextPlan && (
          <div className="mb-6 rounded-xl p-px bg-gradient-to-r from-nestui-blue/30 via-nestui-blue/10 to-nestui-blue/30 animate-fade-in">
            <div className="flex items-center justify-between rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm px-5 py-4">
              <div>
                <p className="text-sm font-medium text-nestui-text">
                  Sub-account limit reached
                </p>
                <p className="mt-0.5 text-xs text-nestui-text2">
                  Upgrade to {nextPlan} for {nextPlan === 'Pro' ? '5' : 'unlimited'} sub-accounts.
                </p>
              </div>
              <Link
                to="/billing"
                className="shrink-0 rounded-lg bg-gradient-to-r from-nestui-blue to-blue-500 px-4 py-2 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(91,143,255,0.25)] transition-all cursor-pointer"
              >
                Upgrade
              </Link>
            </div>
          </div>
        )}

        {/* Add button */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3">
            Your Sub-Accounts
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            disabled={!canAddMore}
            className="inline-flex items-center gap-1.5 rounded-lg bg-nestui-blue px-3.5 py-2 text-sm font-medium text-white hover:bg-nestui-blue/90 hover:shadow-[0_0_15px_rgba(91,143,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Sub-Account
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size={24} />
          </div>
        ) : (
          <SubAccountList
            subAccounts={subAccounts}
            maxAllowed={maxAllowed}
            onUpdateTheme={updateTheme}
            onRemove={removeSubAccount}
          />
        )}

        {/* Modal */}
        <AddSubAccountModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={addSubAccount}
        />
      </div>
    </div>
  )
}
