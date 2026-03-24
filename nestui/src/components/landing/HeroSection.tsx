import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-nestui-bg" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow — primary */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-30 blur-[130px] animate-glow-pulse"
        style={{ background: 'radial-gradient(ellipse, #5b8fff 0%, transparent 70%)' }}
      />

      {/* Radial glow — secondary */}
      <div
        className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
      />

      {/* Floating orbs */}
      <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-nestui-blue/40 animate-float" />
      <div className="absolute top-40 left-1/5 w-1.5 h-1.5 rounded-full bg-purple-400/30 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 right-1/3 w-1 h-1 rounded-full bg-nestui-blue/30 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nestui-blue/20 bg-nestui-blue/5 backdrop-blur-sm mb-10 animate-fade-in">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nestui-blue opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nestui-blue" />
          </span>
          <span className="text-nestui-blue text-sm font-medium">Built for GoHighLevel Agencies</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight animate-slide-up">
          <span className="text-nestui-text">Make GHL Look Like a</span>
          <br />
          <span className="bg-gradient-to-r from-nestui-blue via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
            $500K Custom CRM
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-nestui-text2 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          One script tag. Nine premium themes. Instantly rebrand your GoHighLevel dashboard —
          new navigation, typography, icons, and colors — so clients never know it's GHL.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link
            to="/login"
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(91,143,255,0.3)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-nestui-blue to-blue-500 animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-r from-nestui-blue via-purple-500 to-nestui-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift" />
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
          <a
            href="#themes"
            className="group px-8 py-3.5 rounded-xl border border-nestui-border/50 text-nestui-text2 font-medium text-lg transition-all duration-300 hover:text-nestui-text hover:border-nestui-text3/30 hover:bg-white/[0.02] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              See Themes
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex items-center justify-center gap-6 text-nestui-text3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-nestui-bg bg-gradient-to-br from-nestui-surface to-nestui-bg2"
              />
            ))}
          </div>
          <p className="text-sm">
            Trusted by <span className="text-nestui-text2 font-medium">500+</span> GHL agencies
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nestui-bg to-transparent" />
    </section>
  )
}
