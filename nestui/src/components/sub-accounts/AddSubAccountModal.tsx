import { useState } from 'react'
import Modal from '../ui/Modal'

interface AddSubAccountModalProps {
  open: boolean
  onClose: () => void
  onAdd: (name: string, ghlAccountId: string) => Promise<void>
}

export default function AddSubAccountModal({ open, onClose, onAdd }: AddSubAccountModalProps) {
  const [name, setName] = useState('')
  const [ghlAccountId, setGhlAccountId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !ghlAccountId.trim()) return

    setSubmitting(true)
    try {
      await onAdd(name.trim(), ghlAccountId.trim())
      setName('')
      setGhlAccountId('')
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="text-lg font-semibold text-nestui-text tracking-tight">Add Sub-Account</h2>
        <p className="mt-1 text-sm text-nestui-text2">
          Connect a GHL sub-account to assign a custom theme.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="sa-name" className="block text-xs font-medium text-nestui-text2 mb-1.5">
              Account Name
            </label>
            <input
              id="sa-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Growth"
              className="w-full rounded-lg border border-nestui-border/50 bg-nestui-bg/60 px-3.5 py-2.5 text-sm text-nestui-text placeholder:text-nestui-text3 focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="sa-ghl-id" className="block text-xs font-medium text-nestui-text2 mb-1.5">
              GHL Account ID
            </label>
            <input
              id="sa-ghl-id"
              type="text"
              value={ghlAccountId}
              onChange={(e) => setGhlAccountId(e.target.value)}
              placeholder="e.g. loc_abc123xyz"
              className="w-full rounded-lg border border-nestui-border/50 bg-nestui-bg/60 px-3.5 py-2.5 text-sm text-nestui-text placeholder:text-nestui-text3 focus:border-nestui-blue/40 focus:shadow-[0_0_0_3px_rgba(91,143,255,0.08)] focus:outline-none transition-all font-mono"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-nestui-border/50 bg-white/[0.02] px-4 py-2 text-sm font-medium text-nestui-text2 hover:text-nestui-text hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !name.trim() || !ghlAccountId.trim()}
            className="rounded-lg bg-nestui-blue px-4 py-2 text-sm font-semibold text-white hover:bg-nestui-blue/90 hover:shadow-[0_0_15px_rgba(91,143,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {submitting ? 'Adding...' : 'Add Sub-Account'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
