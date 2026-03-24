import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAppStore } from '../store/useAppStore'
import type { PlanId } from '../lib/stripe'

interface UseBillingReturn {
  currentPlan: PlanId
  loading: boolean
  error: string | null
  createCheckoutSession: (priceId: string) => Promise<void>
  createPortalSession: () => Promise<void>
}

export function useBilling(): UseBillingReturn {
  const workspace = useAppStore((s) => s.workspace)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentPlan: PlanId = workspace?.plan ?? 'free'

  const createCheckoutSession = useCallback(async (priceId: string) => {
    if (!workspace) {
      setError('No workspace found')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-checkout', {
        body: { workspaceId: workspace.id, priceId },
      })

      if (fnError) throw fnError
      if (!data?.url) throw new Error('No checkout URL returned')

      window.location.href = data.url
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create checkout session'
      setError(message)
      setLoading(false)
    }
  }, [workspace])

  const createPortalSession = useCallback(async () => {
    if (!workspace) {
      setError('No workspace found')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-portal-session', {
        body: { workspaceId: workspace.id },
      })

      if (fnError) throw fnError
      if (!data?.url) throw new Error('No portal URL returned')

      window.location.href = data.url
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to open billing portal'
      setError(message)
      setLoading(false)
    }
  }, [workspace])

  return {
    currentPlan,
    loading,
    error,
    createCheckoutSession,
    createPortalSession,
  }
}
