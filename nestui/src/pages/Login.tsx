import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type AuthMode = 'login' | 'signup' | 'magic'

export default function Login() {
  const { signIn, signUp, signInWithMagicLink } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    try {
      if (mode === 'magic') {
        await signInWithMagicLink(email)
        setMessage('Check your email for the login link.')
      } else if (mode === 'signup') {
        await signUp(email, password)
        setMessage('Check your email to confirm your account.')
      } else {
        await signIn(email, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-nestui-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #5b8fff 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-sm animate-fade-in-scale">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-10">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-nestui-blue/25 to-purple-500/25" />
            <div className="absolute inset-[3px] rounded-[9px] bg-nestui-bg" />
            <svg className="relative z-10 w-5 h-5 text-nestui-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-nestui-text">
            Nest<span className="text-nestui-blue">UI</span>
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl p-px bg-gradient-to-b from-white/[0.08] to-transparent">
          <div className="rounded-2xl bg-nestui-bg1/80 backdrop-blur-xl p-7">
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-nestui-text">
                {mode === 'login' && 'Welcome back'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'magic' && 'Magic link sign in'}
              </h1>
              <p className="text-nestui-text2 mt-1 text-sm">
                {mode === 'login' && 'Sign in to your Nest UI dashboard'}
                {mode === 'signup' && 'Get started with Nest UI for free'}
                {mode === 'magic' && 'We\'ll send you a sign in link'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-nestui-text2 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-nestui-bg/60 border border-nestui-border/50 px-3.5 py-2.5 text-sm text-nestui-text placeholder:text-nestui-text3 focus:outline-none focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {mode !== 'magic' && (
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-nestui-text2 mb-1.5">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-nestui-bg/60 border border-nestui-border/50 px-3.5 py-2.5 text-sm text-nestui-text placeholder:text-nestui-text3 focus:outline-none focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400 animate-fade-in">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2 text-xs text-green-400 animate-fade-in">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-nestui-blue to-blue-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(91,143,255,0.25)] hover:scale-[1.01] disabled:opacity-50 disabled:hover:shadow-none disabled:hover:scale-100 cursor-pointer"
              >
                {submitting
                  ? 'Loading...'
                  : mode === 'magic'
                    ? 'Send magic link'
                    : mode === 'signup'
                      ? 'Create account'
                      : 'Sign in'}
              </button>
            </form>

            <div className="mt-5 space-y-2 text-center text-xs text-nestui-text2">
              {mode === 'login' && (
                <>
                  <button onClick={() => setMode('magic')} className="hover:text-nestui-blue transition-colors cursor-pointer">
                    Use magic link instead
                  </button>
                  <p>
                    Don&apos;t have an account?{' '}
                    <button onClick={() => setMode('signup')} className="text-nestui-blue hover:brightness-125 transition-all cursor-pointer">
                      Sign up
                    </button>
                  </p>
                </>
              )}
              {mode === 'signup' && (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="text-nestui-blue hover:brightness-125 transition-all cursor-pointer">
                    Sign in
                  </button>
                </p>
              )}
              {mode === 'magic' && (
                <button onClick={() => setMode('login')} className="hover:text-nestui-blue transition-colors cursor-pointer">
                  Use password instead
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
