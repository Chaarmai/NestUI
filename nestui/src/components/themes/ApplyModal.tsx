import { useState, useCallback } from 'react'
import type { Theme } from '../../lib/themes'
import Modal from '../ui/Modal'
import Spinner from '../ui/Spinner'
import ThemePreview from './ThemePreview'

type ModalStep = 'confirm' | 'loading' | 'success'

interface ApplyModalProps {
  theme: Theme | null
  onClose: () => void
  onApply: (theme: Theme) => Promise<void>
}

export default function ApplyModal({ theme, onClose, onApply }: ApplyModalProps) {
  const [step, setStep] = useState<ModalStep>('confirm')

  const handleApply = useCallback(async () => {
    if (!theme) return
    setStep('loading')
    try {
      await onApply(theme)
      setStep('success')
    } catch {
      setStep('confirm')
    }
  }, [theme, onApply])

  const handleClose = useCallback(() => {
    setStep('confirm')
    onClose()
  }, [onClose])

  return (
    <Modal open={theme !== null} onClose={step === 'loading' ? () => {} : handleClose}>
      {theme && (
        <div className="p-6">
          {step === 'confirm' && (
            <>
              {/* Preview */}
              <div className="relative h-40 w-full rounded-xl overflow-hidden border border-nestui-border/30 mb-5">
                <ThemePreview theme={theme} />
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)` }}
                />
              </div>

              <h3 className="text-lg font-semibold text-nestui-text mb-1 tracking-tight">
                Apply {theme.name}?
              </h3>
              <p className="text-sm text-nestui-text2 mb-6 leading-relaxed">
                This will update the theme across all connected sub-accounts. The change takes effect immediately.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-nestui-border/50 text-sm text-nestui-text2 hover:bg-white/[0.03] hover:text-nestui-text transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accent}cc)`,
                    boxShadow: `0 0 20px ${theme.colors.accent}30`,
                  }}
                >
                  Apply Theme
                </button>
              </div>
            </>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center py-10">
              <Spinner size={32} className="text-nestui-blue mb-4" />
              <h3 className="text-base font-semibold text-nestui-text mb-1 tracking-tight">
                Applying {theme.name}...
              </h3>
              <p className="text-sm text-nestui-text2">
                Updating all connected accounts
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-10 animate-fade-in-scale">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-nestui-text mb-1 tracking-tight">
                Theme Applied!
              </h3>
              <p className="text-sm text-nestui-text2 mb-6">
                {theme.name} is now live across all accounts.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg border border-nestui-border/50 text-sm font-medium text-nestui-text2 hover:text-nestui-text hover:bg-white/[0.03] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
