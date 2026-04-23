import { useAuth } from '../hooks/useAuth'
import { useWorkspace } from '../hooks/useWorkspace'
import Topbar from '../components/layout/Topbar'

export default function Settings() {
  const { signOut } = useAuth()
  const { workspace } = useWorkspace()

  return (
    <div className="min-h-screen bg-nestui-bg">
      <Topbar />

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-nestui-text tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-nestui-text2">
            Manage your workspace settings and account preferences.
          </p>
        </div>

        <div className="space-y-5">
          {/* Workspace section */}
          <div className="rounded-xl p-px bg-gradient-to-b from-white/[0.06] to-transparent">
            <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-4">Workspace</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-nestui-text2 mb-1.5">Workspace Name</label>
                  <input
                    type="text"
                    value={workspace?.name ?? ''}
                    readOnly
                    className="w-full rounded-lg border border-nestui-border/50 bg-nestui-bg/60 px-3.5 py-2.5 text-sm text-nestui-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-nestui-text2 mb-1.5">GHL Subdomain</label>
                  <input
                    type="text"
                    value={workspace?.ghl_subdomain ?? 'Not connected'}
                    readOnly
                    className="w-full rounded-lg border border-nestui-border/50 bg-nestui-bg/60 px-3.5 py-2.5 text-sm text-nestui-text2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-nestui-text2 mb-1.5">Plan</label>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-nestui-blue/10 border border-nestui-blue/20 px-3 py-1 text-xs font-semibold text-nestui-blue">
                      {(workspace?.plan ?? 'free').charAt(0).toUpperCase() + (workspace?.plan ?? 'free').slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Install Script */}
          <div className="rounded-xl p-px bg-gradient-to-b from-white/[0.06] to-transparent">
            <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-4">Install Script</h2>
              <p className="text-xs text-nestui-text2 mb-3">
                Paste this into your GHL account's custom code settings (Settings → Custom Code → Header).
              </p>
              <div className="relative">
                <pre className="rounded-lg border border-nestui-border/50 bg-nestui-bg/60 px-3.5 py-3 text-xs text-nestui-text font-mono overflow-x-auto whitespace-pre-wrap break-all">
{`<script src="https://nest-ui-eight.vercel.app/inject.js" data-key="${workspace?.api_key ?? '...'}"></script>`}
                </pre>
                <button
                  onClick={() => {
                    const snippet = `<script src="https://nest-ui-eight.vercel.app/inject.js" data-key="${workspace?.api_key ?? ''}"></script>`
                    navigator.clipboard.writeText(snippet)
                  }}
                  className="absolute top-2 right-2 rounded-md bg-white/[0.05] border border-nestui-border/50 px-2 py-1 text-[10px] font-medium text-nestui-text2 hover:text-nestui-text hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                  Copy
                </button>
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-nestui-text2 mb-1.5">API Key</label>
                <code className="block rounded-lg border border-nestui-border/50 bg-nestui-bg/60 px-3.5 py-2.5 text-xs text-nestui-text2 font-mono">
                  {workspace?.api_key ?? 'No API key found'}
                </code>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-xl p-px bg-gradient-to-b from-red-500/10 to-transparent">
            <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-red-400/60 mb-4">Danger Zone</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-nestui-text">Sign out</p>
                  <p className="text-xs text-nestui-text2 mt-0.5">Sign out of your Nest UI account</p>
                </div>
                <button
                  onClick={signOut}
                  className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
