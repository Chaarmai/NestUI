import { useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAppStore } from '../store/useAppStore'
import type { Workspace } from '../lib/database.types'

export function useWorkspace() {
  const {
    user,
    workspace,
    workspaceLoading,
    setWorkspace,
    setWorkspaceLoading,
  } = useAppStore()

  // Fetch workspace for the current user
  useEffect(() => {
    if (!user) {
      setWorkspace(null)
      setWorkspaceLoading(false)
      return
    }

    // Dev bypass — create a fake workspace
    if (import.meta.env.VITE_DEV_BYPASS_AUTH === 'true') {
      setWorkspace({
        id: 'dev-workspace',
        created_at: new Date().toISOString(),
        owner_id: 'dev-user',
        name: 'Dev Workspace',
        ghl_subdomain: null,
        ghl_connected: false,
        api_key: 'dev-key-demo',
        active_theme_id: 'obsidian',
        theme_applied_at: null,
        plan: 'free',
        stripe_customer_id: null,
      })
      setWorkspaceLoading(false)
      return
    }

    let cancelled = false

    async function fetchWorkspace() {
      setWorkspaceLoading(true)
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('owner_id', user!.id)
        .maybeSingle()

      if (cancelled) return

      if (error) {
        console.error('[useWorkspace] fetch error:', error)
        setWorkspace(null)
      } else {
        setWorkspace(data as Workspace | null)
      }
      setWorkspaceLoading(false)
    }

    fetchWorkspace()
    return () => { cancelled = true }
  }, [user, setWorkspace, setWorkspaceLoading])

  // Create a workspace (called during onboarding)
  const createWorkspace = useCallback(async (name: string, ghlSubdomain?: string) => {
    if (!user) throw new Error('Not authenticated')

    // Generate a random API key for the inject script
    const apiKey = crypto.randomUUID()

    const { data, error } = await supabase
      .from('workspaces')
      .insert({
        owner_id: user.id,
        name,
        ghl_subdomain: ghlSubdomain ?? null,
        api_key: apiKey,
      })
      .select()
      .single()

    if (error) throw error
    setWorkspace(data as Workspace)
    return data as Workspace
  }, [user, setWorkspace])

  // Connect GHL (simulated OAuth — will be replaced with real OAuth in production)
  const connectGHL = useCallback(async (subdomain: string) => {
    if (!workspace) throw new Error('No workspace')

    const { data, error } = await supabase
      .from('workspaces')
      .update({ ghl_subdomain: subdomain, ghl_connected: true })
      .eq('id', workspace.id)
      .select()
      .single()

    if (error) throw error
    setWorkspace(data as Workspace)
    return data as Workspace
  }, [workspace, setWorkspace])

  // Apply a theme via the API
  const applyTheme = useCallback(async (themeId: string) => {
    if (!workspace) throw new Error('No workspace')

    const now = new Date().toISOString()

    const { error: updateError } = await supabase
      .from('workspaces')
      .update({ active_theme_id: themeId, theme_applied_at: now })
      .eq('id', workspace.id)

    if (updateError) throw updateError

    // Log the application
    if (user) {
      await supabase.from('theme_applications').insert({
        workspace_id: workspace.id,
        theme_id: themeId,
        applied_by: user.id,
      })
    }

    setWorkspace({ ...workspace, active_theme_id: themeId, theme_applied_at: now })
  }, [workspace, user, setWorkspace])

  return {
    workspace,
    workspaceLoading,
    createWorkspace,
    connectGHL,
    applyTheme,
  }
}
