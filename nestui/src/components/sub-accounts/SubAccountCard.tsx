import { useState } from 'react'
import { THEMES } from '../../lib/themes'
import type { SubAccount } from '../../lib/database.types'

interface SubAccountCardProps {
  subAccount: SubAccount
  onUpdateTheme: (subAccountId: string, themeId: string) => void
  onRemove: (id: string) => void
}

export default function SubAccountCard({ subAccount, onUpdateTheme, onRemove }: SubAccountCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const activeTheme = THEMES.find((t) => t.id === subAccount.active_theme_id)

  return (
    <div className="group rounded-xl p-px bg-gradient-to-b from-white/[0.06] to-transparent transition-all duration-300 hover:from-nestui-blue/10">
      <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-5 h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-nestui-text">
              {subAccount.name || 'Unnamed Account'}
            </h3>
            <p className="mt-0.5 truncate text-[11px] text-nestui-text3 font-mono">
              {subAccount.ghl_account_id}
            </p>
          </div>

          {confirmDelete ? (
            <div className="flex items-center gap-2 shrink-0 animate-fade-in">
              <button
                onClick={() => onRemove(subAccount.id)}
                className="rounded-md bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-md bg-nestui-surface/50 px-2.5 py-1 text-xs font-medium text-nestui-text2 hover:text-nestui-text transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="shrink-0 rounded-md p-1.5 text-nestui-text3 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
              aria-label="Delete sub-account"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>

        {/* Theme selector */}
        <div className="mt-4">
          <label className="block text-[11px] font-medium text-nestui-text3 mb-1.5">
            Active Theme
          </label>
          <div className="relative">
            <select
              value={subAccount.active_theme_id ?? ''}
              onChange={(e) => onUpdateTheme(subAccount.id, e.target.value)}
              className="w-full appearance-none rounded-lg border border-nestui-border/50 bg-nestui-bg/60 px-3 py-2 pr-8 text-sm text-nestui-text focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] focus:outline-none transition-all cursor-pointer"
            >
              <option value="">No theme</option>
              {THEMES.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name} ({theme.mode})
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-nestui-text3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {activeTheme && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex -space-x-0.5">
                {[activeTheme.colors.accent, activeTheme.colors.bg, activeTheme.colors.surface].map((color, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full border border-nestui-bg1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-[11px] text-nestui-text3 truncate">{activeTheme.desc}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
