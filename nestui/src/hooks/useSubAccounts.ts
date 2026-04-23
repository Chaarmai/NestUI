import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAppStore } from '../store/useAppStore'
import type { SubAccount } from '../lib/database.types'

const PLAN_LIMITS: Record<string, number> = {
  free: 1,
  pro: 5,
  agency: Infinity,
}

export function useSubAccounts() {
  const workspace = useAppStore((s) => s.workspace)
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const maxAllowed = PLAN_LIMITS[workspace?.plan ?? 'free'] ?? 1
  const canAddMore = subAccounts.length < maxAllowed

  const fetchSubAccounts = useCallback(async () => {
    if (!workspace) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from('sub_accounts')
        .select('*')
        .eq('workspace_id', workspace.id)
        .order('created_at', { ascending: true })

      if (fetchError) throw fetchError
      setSubAccounts(data ?? [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load sub-accounts'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [workspace])

  useEffect(() => {
    fetchSubAccounts()
  }, [fetchSubAccounts])

  async function addSubAccount(name: string, ghlAccountId: string) {
    if (!workspace) throw new Error('No workspace found')
    if (!canAddMore) {
      const msg = `Plan limit reached (${maxAllowed} sub-account${maxAllowed === 1 ? '' : 's'})`
      setError(msg)
      throw new Error(msg)
    }
    setError(null)
    try {
      const { error: insertError } = await supabase
        .from('sub_accounts')
        .insert({
          workspace_id: workspace.id,
          name,
          ghl_account_id: ghlAccountId,
        })

      if (insertError) throw insertError
      await fetchSubAccounts()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add sub-account'
      setError(message)
      throw err
    }
  }

  async function removeSubAccount(id: string) {
    setError(null)
    try {
      const { error: deleteError } = await supabase
        .from('sub_accounts')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSubAccounts((prev) => prev.filter((sa) => sa.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove sub-account'
      setError(message)
    }
  }

  async function updateTheme(subAccountId: string, themeId: string) {
    setError(null)
    try {
      const { error: updateError } = await supabase
        .from('sub_accounts')
        .update({ active_theme_id: themeId })
        .eq('id', subAccountId)

      if (updateError) throw updateError
      setSubAccounts((prev) =>
        prev.map((sa) =>
          sa.id === subAccountId ? { ...sa, active_theme_id: themeId } : sa
        )
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update theme'
      setError(message)
    }
  }

  return {
    subAccounts,
    loading,
    error,
    canAddMore,
    maxAllowed,
    addSubAccount,
    removeSubAccount,
    updateTheme,
  }
}
