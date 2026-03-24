import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { Theme } from '../../lib/themes'
import ThemePreview from '../themes/ThemePreview'

interface LeftPanelProps {
  connected: boolean
  activeTheme: Theme | null
  workspaceKey?: string
}

export default function LeftPanel({ connected, activeTheme, workspaceKey }: LeftPanelProps) {
  const hasKey = !!workspaceKey
  const snippetCode = `<script src="https://nestui.io/inject.js" data-key="${workspaceKey ?? 'YOUR_KEY'}"></script>`

  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(snippetCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [snippetCode])

  return (
    <aside className="hidden lg:block w-72 shrink-0 space-y-4">
      {/* Connection status */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-3">Connection</h3>
        {connected ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-xs font-medium text-green-400">Connected to GHL</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <span className="text-xs font-medium text-yellow-400/80">Not connected</span>
          </div>
        )}
      </div>

      {/* Active theme */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-3">Active Theme</h3>
        {activeTheme ? (
          <div className="space-y-3">
            <div className="relative h-28 w-full rounded-lg overflow-hidden border border-nestui-border/50 group">
              <ThemePreview theme={activeTheme} />
              {/* Glow accent bar at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${activeTheme.colors.accent}, transparent)` }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-nestui-text">{activeTheme.name}</p>
                <span
                  className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${activeTheme.colors.accent}15`, color: activeTheme.colors.accent }}
                >
                  {activeTheme.mode}
                </span>
              </div>
              <p className="text-[11px] text-nestui-text2 mt-0.5">{activeTheme.nav}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-nestui-text2">No theme applied</p>
        )}
      </div>

      {/* Quick actions */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-3">Quick Actions</h3>
        <div className="space-y-0.5">
          {[
            { to: '/generate', label: 'AI Generator', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg> },
            { to: '/sub-accounts', label: 'Sub-Accounts', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> },
            { to: '/billing', label: 'Billing', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg> },
            { to: '/settings', label: 'Settings', icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-nestui-text2 hover:text-nestui-text hover:bg-white/[0.03] transition-all duration-200 cursor-pointer group"
            >
              <span className="text-nestui-text3 group-hover:text-nestui-blue transition-colors duration-200">{item.icon}</span>
              {item.label}
              <svg className="w-3 h-3 ml-auto text-nestui-text3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Install snippet */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-3">Install Snippet</h3>
        {hasKey ? (
          <>
            <p className="text-[11px] text-nestui-text2 mb-2.5">
              Paste this into your GHL custom code settings:
            </p>
            <div className="relative group/snippet">
              <pre className="text-[10px] font-mono leading-relaxed text-nestui-text2 bg-nestui-bg/80 rounded-lg p-3 overflow-x-auto border border-nestui-border/50">
                {snippetCode}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-1.5 right-1.5 p-1.5 rounded-md bg-nestui-surface/80 text-nestui-text2 hover:text-nestui-text hover:bg-nestui-surface transition-all cursor-pointer opacity-0 group-hover/snippet:opacity-100"
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
            {copied && (
              <p className="text-[10px] text-green-400 mt-1.5 animate-fade-in">Copied to clipboard!</p>
            )}
          </>
        ) : (
          <p className="text-[11px] text-nestui-text2">
            Create a workspace to get your install snippet.
          </p>
        )}
      </div>
    </aside>
  )
}
