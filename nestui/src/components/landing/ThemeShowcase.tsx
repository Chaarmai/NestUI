import { THEMES } from '../../lib/themes'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function ThemeCard({ theme, index }: { theme: typeof THEMES[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 80}ms`,
        perspective: '1000px',
      }}
    >
      {/* Animated glow border */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.accent}40, transparent 50%, ${theme.colors.accent}20)`,
          boxShadow: `0 0 50px ${theme.colors.accent}15, inset 0 0 50px ${theme.colors.accent}05`,
        }}
      />

      {/* Card body with 3D tilt effect */}
      <div className="relative rounded-2xl bg-nestui-bg1/80 backdrop-blur-sm border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl tilt-card">
        {/* Swatch */}
        <div
          className="h-40 w-full transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ background: theme.swatch }}
        >
          {/* Overlay shimmer on hover */}
          <div className="absolute inset-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-nestui-text tracking-tight">{theme.name}</h3>
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: `${theme.colors.accent}15`,
                color: theme.colors.accent,
              }}
            >
              {theme.mode}
            </span>
          </div>
          <p className="text-sm text-nestui-text2 leading-relaxed">{theme.desc}</p>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-nestui-text3 font-mono">{theme.nav}</p>
            <div className="flex -space-x-1">
              {[theme.colors.accent, theme.colors.bg, theme.colors.surface].map((color, j) => (
                <div
                  key={j}
                  className="w-3.5 h-3.5 rounded-full border border-nestui-bg1 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThemeShowcase() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal()

  return (
    <section id="themes" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Section glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-8 blur-[150px]"
        style={{ background: 'radial-gradient(ellipse, #5b8fff, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`text-center mb-20 transition-all duration-700 ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-nestui-blue text-xs font-semibold uppercase tracking-[0.2em] mb-4">Theme Engine</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-nestui-text mb-5 tracking-tight">
            9 Premium Skins. Built to Impress.
          </h2>
          <p className="text-nestui-text2 text-lg max-w-2xl mx-auto leading-relaxed">
            Every theme rewires navigation, typography, colors, and layout — so your dashboard
            feels custom-built from scratch.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {THEMES.map((theme, i) => (
            <ThemeCard key={theme.id} theme={theme} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
