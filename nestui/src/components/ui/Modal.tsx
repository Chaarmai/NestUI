import { useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      style={{ animationDuration: '0.15s' }}
    >
      <div className="w-full max-w-md mx-4 rounded-2xl p-px bg-gradient-to-b from-white/[0.08] to-transparent animate-fade-in-scale">
        <div className="rounded-2xl bg-nestui-bg1/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          {children}
        </div>
      </div>
    </div>
  )
}
