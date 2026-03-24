import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useWorkspace } from '../hooks/useWorkspace'
import Spinner from '../components/ui/Spinner'

type Step = 'create' | 'connect' | 'done'

export default function Onboarding() {
  const { signOut } = useAuth()
  const { workspace, createWorkspace, connectGHL } = useWorkspace()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>(workspace ? 'connect' : 'create')
  const [workspaceName, setWorkspaceName] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!workspaceName.trim()) return

    setLoading(true)
    setError(null)
    try {
      await createWorkspace(workspaceName.trim())
      setStep('connect')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workspace')
    } finally {
      setLoading(false)
    }
  }

  const handleConnectGHL = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subdomain.trim()) return

    setLoading(true)
    setError(null)
    try {
      await connectGHL(subdomain.trim())
      setStep('done')
      setTimeout(() => navigate('/dashboard', { replace: true }), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect GHL')
    } finally {
      setLoading(false)
    }
  }

  const skipConnect = () => {
    navigate('/dashboard', { replace: true })
  }

  const steps: Step[] = ['create', 'connect', 'done']
  const currentIndex = steps.indexOf(step)

  return (
    <div className="min-h-screen bg-nestui-bg flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #5b8fff 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-md animate-fade-in-scale">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-nestui-blue/25 to-purple-500/25" />
              <div className="absolute inset-[3px] rounded-[9px] bg-nestui-bg" />
              <svg className="relative z-10 w-5 h-5 text-nestui-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-nestui-text mb-2 tracking-tight">Welcome to Nest UI</h1>
          <p className="text-sm text-nestui-text2">
            {step === 'create' && 'Create your workspace to get started.'}
            {step === 'connect' && 'Connect your GoHighLevel account.'}
            {step === 'done' && 'You\'re all set!'}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-nestui-blue w-6 rounded-full shadow-[0_0_8px_rgba(91,143,255,0.4)]' :
                  i < currentIndex ? 'bg-nestui-blue/50' :
                  'bg-nestui-surface'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="rounded-2xl p-px bg-gradient-to-b from-white/[0.08] to-transparent">
          <div className="rounded-2xl bg-nestui-bg1/80 backdrop-blur-xl p-6">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}

            {step === 'create' && (
              <form onSubmit={handleCreateWorkspace} className="space-y-4">
                <div>
                  <label htmlFor="workspace-name" className="block text-sm font-medium text-nestui-text mb-1.5">
                    Workspace Name
                  </label>
                  <input
                    id="workspace-name"
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="My Agency"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-nestui-bg/60 border border-nestui-border/50 text-nestui-text text-sm placeholder:text-nestui-text3 focus:outline-none focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] transition-all"
                    autoFocus
                  />
                  <p className="mt-1.5 text-xs text-nestui-text3">
                    This is your agency's workspace — you can change it later.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading || !workspaceName.trim()}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-nestui-blue to-blue-500 text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(91,143,255,0.25)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? <><Spinner size={16} /> Creating...</> : 'Create Workspace'}
                </button>
              </form>
            )}

            {step === 'connect' && (
              <form onSubmit={handleConnectGHL} className="space-y-4">
                <div>
                  <label htmlFor="ghl-subdomain" className="block text-sm font-medium text-nestui-text mb-1.5">
                    GHL Subdomain
                  </label>
                  <div className="flex items-center gap-0">
                    <input
                      id="ghl-subdomain"
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      placeholder="your-agency"
                      className="flex-1 px-3.5 py-2.5 rounded-l-lg bg-nestui-bg/60 border border-nestui-border/50 text-nestui-text text-sm placeholder:text-nestui-text3 focus:outline-none focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] transition-all"
                      autoFocus
                    />
                    <span className="px-3.5 py-2.5 rounded-r-lg bg-nestui-surface/50 border border-l-0 border-nestui-border/50 text-nestui-text3 text-sm font-mono">
                      .gohighlevel.com
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-nestui-text3">
                    Enter your GHL subdomain. This links your themes to your dashboard.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={loading || !subdomain.trim()}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-nestui-blue to-blue-500 text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(91,143,255,0.25)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? <><Spinner size={16} /> Connecting...</> : 'Connect GHL Account'}
                  </button>
                  <button
                    type="button"
                    onClick={skipConnect}
                    className="w-full py-2 text-xs text-nestui-text3 hover:text-nestui-text2 transition-colors cursor-pointer"
                  >
                    Skip for now — I'll connect later
                  </button>
                </div>
              </form>
            )}

            {step === 'done' && (
              <div className="text-center py-6 space-y-4 animate-fade-in-scale">
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-nestui-text">GHL Connected!</p>
                <p className="text-xs text-nestui-text2">Redirecting to your dashboard...</p>
              </div>
            )}
          </div>
        </div>

        {/* Sign out link */}
        <div className="text-center mt-6">
          <button
            onClick={signOut}
            className="text-xs text-nestui-text3 hover:text-nestui-text2 transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
