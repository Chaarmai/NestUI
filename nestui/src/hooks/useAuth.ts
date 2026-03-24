import { useEffect } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useAppStore } from '../store/useAppStore'

export function useAuth() {
  const { user, session, loading, setUser, setSession, setLoading } = useAppStore()

  useEffect(() => {
    // DEV ONLY: bypass auth when no Supabase credentials are configured
    if (import.meta.env.VITE_DEV_BYPASS_AUTH === 'true') {
      setSession({ user: { id: 'dev-user', email: 'dev@nestui.local' } } as Session)
      setUser({ id: 'dev-user', email: 'dev@nestui.local' } as User)
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [setUser, setSession, setLoading])

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return { user, session, loading, signUp, signIn, signInWithMagicLink, signOut }
}
