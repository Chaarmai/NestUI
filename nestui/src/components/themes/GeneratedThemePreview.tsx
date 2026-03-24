import type { Theme } from '../../lib/themes'
import ThemePreview from './ThemePreview'

interface GeneratedThemePreviewProps {
  theme: Theme
  onApply: () => void
  onRegenerate: () => void
  applying: boolean
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-9 h-9 rounded-lg border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] text-nestui-text3 font-mono">{label}</span>
    </div>
  )
}

export default function GeneratedThemePreview({ theme, onApply, onRegenerate, applying }: GeneratedThemePreviewProps) {
  const { colors } = theme

  return (
    <div className="space-y-6">
      {/* Theme info */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <h3 className="text-lg font-semibold text-nestui-text tracking-tight">{theme.name}</h3>
          <span
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md"
            style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
          >
            {theme.mode}
          </span>
        </div>
        <p className="text-sm text-nestui-text2">{theme.desc}</p>
      </div>

      {/* Premium dashboard preview */}
      <div
        className="rounded-xl overflow-hidden h-[220px]"
        style={{ border: `1px solid ${colors.border}`, boxShadow: `0 0 30px ${colors.accent}08` }}
      >
        <ThemePreview theme={theme} />
      </div>

      {/* Color swatches */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-nestui-text3 mb-3">Color Palette</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <ColorSwatch color={colors.bg} label="bg" />
          <ColorSwatch color={colors.bg1} label="bg1" />
          <ColorSwatch color={colors.bg2} label="bg2" />
          <ColorSwatch color={colors.surface} label="surface" />
          <ColorSwatch color={colors.accent} label="accent" />
          <ColorSwatch color={colors.text} label="text" />
          <ColorSwatch color={colors.text2} label="text2" />
          <ColorSwatch color={colors.text3} label="text3" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={onApply}
          disabled={applying}
          className="flex-1 py-3 rounded-lg bg-gradient-to-r from-nestui-blue to-blue-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(91,143,255,0.25)] hover:scale-[1.005] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {applying ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Applying...
            </>
          ) : (
            'Apply This Theme'
          )}
        </button>
        <button
          onClick={onRegenerate}
          disabled={applying}
          className="px-6 py-3 rounded-lg border border-nestui-border/50 text-sm text-nestui-text2 hover:text-nestui-text hover:border-nestui-blue/20 hover:bg-white/[0.02] transition-all disabled:opacity-50 cursor-pointer"
        >
          Generate Another
        </button>
      </div>
    </div>
  )
}
