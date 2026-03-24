import { Link } from 'react-router-dom'
import Particles from './Particles'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-nestui-bg" />
      <div className="absolute inset-0 mesh-gradient opacity-70" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Particles */}
      <Particles />

      {/* Radial glow — primary */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] rounded-full opacity-25 blur-[150px] animate-glow-pulse"
        style={{ background: 'radial-gradient(ellipse, #5b8fff 0%, transparent 70%)' }}
      />

      {/* Radial glow — secondary */}
      <div
        className="absolute top-3/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px] animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', animationDelay: '1.5s' }}
      />

      {/* Radial glow — tertiary */}
      <div
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', animationDelay: '3s' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nestui-blue/20 bg-nestui-blue/5 backdrop-blur-md mb-10 animate-fade-in">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nestui-blue opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nestui-blue" />
          </span>
          <span className="text-nestui-blue text-sm font-medium">Built for GoHighLevel Agencies</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] mb-7 tracking-tight animate-slide-up">
          <span className="text-nestui-text">The CRM </span>
          <span className="hero-gradient-text">Glow-Up.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-nestui-text2 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Premium skins and AI-powered themes that transform your dashboard
          into something clients actually remember.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link
            to="/login"
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(91,143,255,0.35)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-nestui-blue via-blue-500 to-purple-500 animate-gradient-shift" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-nestui-blue to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift" />
            <span className="relative z-10 flex items-center gap-2">
              Start Free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
          <a
            href="#themes"
            className="group px-8 py-3.5 rounded-xl border border-nestui-border/50 text-nestui-text2 font-medium text-lg transition-all duration-300 hover:text-nestui-text hover:border-nestui-blue/30 hover:bg-nestui-blue/[0.03] backdrop-blur-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              View Themes
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-nestui-bg to-transparent z-10" />
    </section>
  )
}
