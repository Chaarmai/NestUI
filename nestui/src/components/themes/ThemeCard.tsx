import type { Theme } from '../../lib/themes'
import ThemePreview from './ThemePreview'

interface ThemeCardProps {
  theme: Theme
  isActive?: boolean
  onApply?: (theme: Theme) => void
  onPreview?: (theme: Theme) => void
}

export default function ThemeCard({ theme, isActive, onApply, onPreview }: ThemeCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
      style={{
        boxShadow: isActive
          ? `0 0 0 1px ${theme.colors.accent}40, 0 0 20px ${theme.colors.accent}15`
          : undefined,
      }}
    >
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent p-px">
        <div className="h-full w-full rounded-[11px] bg-nestui-bg1" />
      </div>

      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.accent}20, transparent 50%, ${theme.colors.accent}10)`,
        }}
      />

      {/* Content */}
      <div className="relative">
        {/* Mini preview */}
        <div className="h-36 w-full overflow-hidden">
          <ThemePreview theme={theme} />
        </div>

        {/* Divider with accent glow */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-nestui-border to-transparent" />

        {/* Info */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-nestui-text tracking-tight">{theme.name}</h3>
            <div className="flex items-center gap-1.5">
              {isActive && (
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              )}
              <span
                className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                style={{
                  backgroundColor: `${theme.colors.accent}12`,
                  color: theme.colors.accent,
                }}
              >
                {theme.mode}
              </span>
            </div>
          </div>

          <p className="text-xs text-nestui-text2 leading-relaxed line-clamp-2">{theme.desc}</p>

          <div className="flex items-center justify-between pt-0.5">
            <p className="text-[10px] font-mono text-nestui-text3">{theme.nav}</p>
            {/* Color dots */}
            <div className="flex -space-x-1">
              {[theme.colors.accent, theme.colors.bg, theme.colors.surface, theme.colors.text].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-nestui-bg1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 backdrop-blur-[2px]" />

        <button
          onClick={(e) => { e.stopPropagation(); onPreview?.(theme) }}
          className="relative z-10 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/20 cursor-pointer"
          title="Preview theme"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </button>
        {isActive ? (
          <span className="relative z-10 flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-green-400 backdrop-blur-sm border border-green-500/20">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Active
          </span>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onApply?.(theme) }}
            className="relative z-10 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all cursor-pointer hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accent}cc)`,
              boxShadow: `0 0 20px ${theme.colors.accent}40`,
            }}
          >
            Apply Theme
          </button>
        )}
      </div>
    </div>
  )
}
