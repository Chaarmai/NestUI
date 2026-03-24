import type { SubAccount } from '../../lib/database.types'
import SubAccountCard from './SubAccountCard'

interface SubAccountListProps {
  subAccounts: SubAccount[]
  maxAllowed: number
  onUpdateTheme: (subAccountId: string, themeId: string) => void
  onRemove: (id: string) => void
}

export default function SubAccountList({ subAccounts, maxAllowed, onUpdateTheme, onRemove }: SubAccountListProps) {
  if (subAccounts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-nestui-border/50 bg-nestui-bg1/30 px-6 py-16 text-center">
        <div className="w-12 h-12 rounded-xl bg-nestui-surface/50 flex items-center justify-center mx-auto mb-4">
          <svg className="h-6 w-6 text-nestui-text3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-nestui-text">No sub-accounts yet</p>
        <p className="mt-1 text-xs text-nestui-text2">
          Add a GHL sub-account to assign individual themes.
        </p>
      </div>
    )
  }

  const limitLabel = maxAllowed === Infinity ? 'unlimited' : maxAllowed

  return (
    <div>
      <p className="mb-4 text-xs text-nestui-text3">
        {subAccounts.length} of {limitLabel} sub-account{maxAllowed === 1 ? '' : 's'} used
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {subAccounts.map((sa, i) => (
          <div key={sa.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <SubAccountCard
              subAccount={sa}
              onUpdateTheme={onUpdateTheme}
              onRemove={onRemove}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
