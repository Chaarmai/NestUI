import type { Theme } from '../../lib/themes'
import Modal from '../ui/Modal'
import ThemePreview from './ThemePreview'

interface PreviewModalProps {
  theme: Theme | null
  onClose: () => void
}

export default function PreviewModal({ theme, onClose }: PreviewModalProps) {
  return (
    <Modal open={theme !== null} onClose={onClose}>
      {theme && (
        <div className="p-6">
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-nestui-border mb-5">
            <ThemePreview theme={theme} />
          </div>
          <h3 className="text-lg font-semibold text-nestui-text mb-1">{theme.name}</h3>
          <p className="text-sm text-nestui-text2 mb-2">{theme.desc}</p>
          <div className="flex items-center gap-3 text-xs text-nestui-text2">
            <span className="font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-nestui-surface">
              {theme.mode}
            </span>
            <span className="font-mono">{theme.nav}</span>
          </div>
        </div>
      )}
    </Modal>
  )
}
