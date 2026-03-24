import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAppStore } from '../store/useAppStore'
import type { Theme, ThemeColors } from '../lib/themes'

interface GenerateResponse {
  name: string
  mode: 'dark' | 'light'
  desc: string
  colors: ThemeColors
}

export function useThemeGenerator() {
  const workspace = useAppStore((s) => s.workspace)
  const [generatedTheme, setGeneratedTheme] = useState<Theme | null>(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateTheme = useCallback(async (prompt: string) => {
    if (!workspace) {
      setError('No workspace found')
      return
    }

    setGenerating(true)
    setError(null)
    setGeneratedTheme(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-theme', {
        body: { prompt, workspaceId: workspace.id },
      })

      if (fnError) {
        throw new Error(fnError.message || 'Generation failed')
      }

      const res = data as GenerateResponse
      const themeId = `custom-${Date.now()}`

      const theme: Theme = {
        id: themeId,
        name: res.name,
        mode: res.mode,
        nav: 'Custom',
        desc: res.desc,
        tags: ['custom', res.mode],
        swatch: `linear-gradient(135deg, ${res.colors.bg} 50%, ${res.colors.accent})`,
        colors: res.colors,
      }

      setGeneratedTheme(theme)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed'
      setError(message)
    } finally {
      setGenerating(false)
    }
  }, [workspace])

  const clearGenerated = useCallback(() => {
    setGeneratedTheme(null)
    setError(null)
  }, [])

  return {
    generatedTheme,
    generating,
    error,
    generateTheme,
    clearGenerated,
  }
}
