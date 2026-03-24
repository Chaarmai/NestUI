import type { Theme } from '../../lib/themes'
import ThemeCard from './ThemeCard'

interface ThemeGridProps {
  themes: Theme[]
  activeThemeId?: string
  onApply?: (theme: Theme) => void
  onPreview?: (theme: Theme) => void
}

export default function ThemeGrid({ themes, activeThemeId, onApply, onPreview }: ThemeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {themes.map((theme, i) => (
        <div key={theme.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
          <ThemeCard
            theme={theme}
            isActive={theme.id === activeThemeId}
            onApply={onApply}
            onPreview={onPreview}
          />
        </div>
      ))}
    </div>
  )
}
