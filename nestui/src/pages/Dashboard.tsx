import { useState, useCallback, useMemo } from 'react'
import { useWorkspace } from '../hooks/useWorkspace'
import { THEMES } from '../lib/themes'
import type { Theme } from '../lib/themes'
import Topbar from '../components/layout/Topbar'
import ThemeGrid from '../components/themes/ThemeGrid'
import ApplyModal from '../components/themes/ApplyModal'
import PreviewModal from '../components/themes/PreviewModal'
import LeftPanel from '../components/dashboard/LeftPanel'
import FilterBar from '../components/themes/FilterBar'
import type { FilterValue } from '../components/themes/FilterBar'
import OnboardingChecklist from '../components/dashboard/OnboardingChecklist'

export default function Dashboard() {
  const { workspace, applyTheme } = useWorkspace()
  const [applyingTheme, setApplyingTheme] = useState<Theme | null>(null)
  const [previewingTheme, setPreviewingTheme] = useState<Theme | null>(null)
  const [filter, setFilter] = useState<FilterValue>('all')

  const activeThemeId = workspace?.active_theme_id ?? 'obsidian'

  const activeTheme = useMemo(
    () => THEMES.find((t) => t.id === activeThemeId) ?? null,
    [activeThemeId],
  )

  const filteredThemes = useMemo(
    () => filter === 'all' ? THEMES : THEMES.filter((t) => t.mode === filter),
    [filter],
  )

  const handleApply = useCallback(async (theme: Theme) => {
    try {
      await applyTheme(theme.id)
    } catch (err) {
      console.error('[Dashboard] apply theme error:', err)
    }
  }, [applyTheme])

  return (
    <div className="min-h-screen bg-nestui-bg">
      <Topbar />

      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 py-8 gap-8">
        <LeftPanel
          connected={workspace?.ghl_connected ?? false}
          activeTheme={activeTheme}
          workspaceKey={workspace?.api_key ?? undefined}
        />

        <main className="flex-1 min-w-0">
          <OnboardingChecklist />
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-nestui-text tracking-tight">Theme Studio</h2>
              <p className="text-sm text-nestui-text2 mt-0.5">Choose a theme to transform your GHL dashboard</p>
            </div>
            <FilterBar value={filter} onChange={setFilter} />
          </div>
          <ThemeGrid
            themes={filteredThemes}
            activeThemeId={activeThemeId}
            onApply={(theme) => setApplyingTheme(theme)}
            onPreview={(theme) => setPreviewingTheme(theme)}
          />
        </main>
      </div>

      <PreviewModal
        theme={previewingTheme}
        onClose={() => setPreviewingTheme(null)}
      />

      <ApplyModal
        theme={applyingTheme}
        onClose={() => setApplyingTheme(null)}
        onApply={handleApply}
      />
    </div>
  )
}
