import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'
import type { Workspace } from '../lib/database.types'

interface AppState {
  user: User | null
  session: Session | null
  loading: boolean
  workspace: Workspace | null
  workspaceLoading: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  setWorkspace: (workspace: Workspace | null) => void
  setWorkspaceLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  session: null,
  loading: true,
  workspace: null,
  workspaceLoading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setWorkspace: (workspace) => set({ workspace }),
  setWorkspaceLoading: (loading) => set({ workspaceLoading: loading }),
}))
