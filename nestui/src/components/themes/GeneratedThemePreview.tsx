import type { Theme } from '../../lib/themes'

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

      {/* Mini dashboard mockup */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: `1px solid ${colors.border}`, boxShadow: `0 0 30px ${colors.accent}08` }}
      >
        {/* Mockup top bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ backgroundColor: colors.bg1, borderBottom: `1px solid ${colors.border}` }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.accent }} />
          <div className="h-2 w-16 rounded" style={{ backgroundColor: colors.text3 }} />
          <div className="ml-auto flex gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.text3 }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.text3 }} />
          </div>
        </div>

        <div className="flex" style={{ backgroundColor: colors.bg }}>
          {/* Mockup sidebar */}
          <div
            className="w-14 min-h-[180px] flex flex-col items-center gap-3 py-4"
            style={{ backgroundColor: colors.bg1, borderRight: `1px solid ${colors.border}` }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded"
                style={{
                  backgroundColor: i === 1 ? colors.accentSoft : 'transparent',
                  border: i === 1 ? 'none' : `1px solid ${colors.border}`,
                }}
              >
                {i === 1 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.accent }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mockup main area */}
          <div className="flex-1 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded" style={{ backgroundColor: colors.text }} />
              <div
                className="h-6 w-16 rounded-md flex items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <div className="h-1.5 w-8 rounded" style={{ backgroundColor: colors.bg }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg p-3 space-y-2"
                  style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}
                >
                  <div className="h-2 w-10 rounded" style={{ backgroundColor: colors.text2 }} />
                  <div className="h-4 w-14 rounded" style={{ backgroundColor: colors.text }} />
                  <div className="h-1.5 w-full rounded" style={{ backgroundColor: colors.bg2 }}>
                    <div
                      className="h-full rounded"
                      style={{ backgroundColor: colors.accent, width: `${30 + i * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${colors.border}` }}
            >
              {[0, 1, 2].map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-3 px-3 py-2"
                  style={{
                    backgroundColor: row === 0 ? colors.bg1 : colors.surface,
                    borderBottom: row < 2 ? `1px solid ${colors.border}` : 'none',
                  }}
                >
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: row === 0 ? colors.text3 : colors.accentSoft }} />
                  <div className="h-2 w-20 rounded" style={{ backgroundColor: row === 0 ? colors.text3 : colors.text2 }} />
                  <div className="h-2 w-12 rounded ml-auto" style={{ backgroundColor: colors.text3 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
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
