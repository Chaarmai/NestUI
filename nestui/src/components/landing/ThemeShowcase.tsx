import { THEMES } from '../../lib/themes'

export default function ThemeShowcase() {
  return (
    <section id="themes" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-nestui-blue text-sm font-semibold uppercase tracking-widest mb-4">Theme Library</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-nestui-text mb-5 tracking-tight">
            9 Premium Themes
          </h2>
          <p className="text-nestui-text2 text-lg max-w-xl mx-auto leading-relaxed">
            From sci-fi mission control to luxury minimalism — each theme completely
            transforms the GHL experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {THEMES.map((theme, i) => (
            <div
              key={theme.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Border gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.07] to-transparent p-px">
                <div className="h-full w-full rounded-[11px] bg-nestui-bg1" />
              </div>

              {/* Hover glow */}
              <div
                className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.accent}25, transparent 60%)`,
                  boxShadow: `0 0 40px ${theme.colors.accent}10`,
                }}
              />

              <div className="relative">
                {/* Swatch */}
                <div
                  className="h-36 w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ background: theme.swatch }}
                />

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-nestui-text tracking-tight">{theme.name}</h3>
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${theme.colors.accent}12`,
                        color: theme.colors.accent,
                      }}
                    >
                      {theme.mode}
                    </span>
                  </div>
                  <p className="text-sm text-nestui-text2 leading-relaxed">{theme.desc}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-nestui-text3 font-mono">{theme.nav}</p>
                    {/* Color dots */}
                    <div className="flex -space-x-1">
                      {[theme.colors.accent, theme.colors.bg, theme.colors.surface].map((color, j) => (
                        <div
                          key={j}
                          className="w-3 h-3 rounded-full border border-nestui-bg1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
