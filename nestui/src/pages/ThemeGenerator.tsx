import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useWorkspace } from '../hooks/useWorkspace'
import { useThemeGenerator } from '../hooks/useThemeGenerator'
import Topbar from '../components/layout/Topbar'
import GeneratorForm from '../components/themes/GeneratorForm'
import GeneratedThemePreview from '../components/themes/GeneratedThemePreview'

export default function ThemeGenerator() {
  const { workspace, applyTheme } = useWorkspace()
  const { generatedTheme, generating, error, generateTheme, clearGenerated } = useThemeGenerator()
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const plan = workspace?.plan ?? 'free'
  const isLocked = plan === 'free'

  const handleApply = useCallback(async () => {
    if (!generatedTheme) return
    setApplying(true)
    try {
      await applyTheme(generatedTheme.id)
      setApplied(true)
    } catch (err) {
      console.error('[ThemeGenerator] apply error:', err)
    } finally {
      setApplying(false)
    }
  }, [generatedTheme, applyTheme])

  const handleRegenerate = useCallback(() => {
    clearGenerated()
    setApplied(false)
  }, [clearGenerated])

  return (
    <div className="min-h-screen bg-nestui-bg">
      <Topbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl font-bold text-nestui-text tracking-tight">AI Theme Generator</h1>
            <span className="rounded-full bg-gradient-to-r from-nestui-blue/10 to-purple-500/10 border border-nestui-blue/20 px-2 py-0.5 text-[10px] font-semibold text-nestui-blue uppercase tracking-wider">
              AI
            </span>
          </div>
          <p className="text-sm text-nestui-text2">
            Describe your brand and we'll generate a custom color palette.
          </p>
        </div>

        {isLocked ? (
          /* Locked state for Free plan */
          <div className="rounded-xl p-px bg-gradient-to-b from-white/[0.06] to-transparent">
            <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-10 text-center">
              <div className="w-14 h-14 rounded-xl bg-nestui-surface/50 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-nestui-text3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-nestui-text mb-2 tracking-tight">
                AI Theme Generator
              </h3>
              <p className="text-sm text-nestui-text2 mb-8 max-w-sm mx-auto leading-relaxed">
                Generate custom themes from natural language descriptions. Available on Pro and Agency plans.
              </p>
              <Link
                to="/billing"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-nestui-blue to-blue-500 text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(91,143,255,0.25)] hover:scale-[1.01] transition-all cursor-pointer"
              >
                Upgrade to unlock
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        ) : applied ? (
          /* Success state */
          <div className="rounded-xl p-px bg-gradient-to-b from-green-500/20 to-transparent animate-fade-in-scale">
            <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-10 text-center">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-nestui-text mb-2 tracking-tight">Theme Applied!</h3>
              <p className="text-sm text-nestui-text2 mb-8">
                Your custom theme "{generatedTheme?.name}" is now active.
              </p>
              <div className="flex gap-3 justify-center">
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-nestui-blue to-blue-500 text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(91,143,255,0.25)] transition-all cursor-pointer"
                >
                  Back to Dashboard
                </Link>
                <button
                  onClick={handleRegenerate}
                  className="px-6 py-2.5 rounded-lg border border-nestui-border/50 text-sm text-nestui-text2 hover:text-nestui-text hover:border-nestui-blue/20 hover:bg-white/[0.02] transition-all cursor-pointer"
                >
                  Generate Another
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Generator flow */
          <div className="space-y-6">
            {!generatedTheme && (
              <div className="rounded-xl p-px bg-gradient-to-b from-white/[0.06] to-transparent">
                <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-6">
                  <GeneratorForm
                    onGenerate={generateTheme}
                    generating={generating}
                    disabled={false}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 animate-fade-in">
                {error}
              </div>
            )}

            {generatedTheme && (
              <div className="rounded-xl p-px bg-gradient-to-b from-white/[0.06] to-transparent animate-fade-in-scale">
                <div className="rounded-[11px] bg-nestui-bg1/80 backdrop-blur-sm p-6">
                  <GeneratedThemePreview
                    theme={generatedTheme}
                    onApply={handleApply}
                    onRegenerate={handleRegenerate}
                    applying={applying}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
