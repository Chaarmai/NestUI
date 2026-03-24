import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Footer() {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal()

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="relative py-24 px-6">
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-15 blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, #5b8fff, transparent 70%)' }}
        />

        <div
          ref={ctaRef}
          className={`relative max-w-2xl mx-auto text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-nestui-text mb-4 tracking-tight">
            Ready to make GHL disappear?
          </h3>
          <p className="text-nestui-text2 text-lg mb-8">
            Built by agency operators. Designed for client-facing dashboards.
          </p>
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-lg overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(91,143,255,0.35)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-nestui-blue via-blue-500 to-purple-500 animate-gradient-shift" />
            <span className="relative z-10">Get Started Free</span>
            <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-nestui-border/20" />

      {/* Bottom bar */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-6 w-6 items-center justify-center">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-nestui-blue/20 to-purple-500/20" />
              <div className="absolute inset-[2px] rounded-[3px] bg-nestui-bg" />
              <svg className="relative z-10 w-3 h-3 text-nestui-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <span className="text-sm font-bold text-nestui-text tracking-tight">
              Nest<span className="text-nestui-blue">UI</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-8">
            <a href="#themes" className="text-sm text-nestui-text3 hover:text-nestui-text2 transition-colors cursor-pointer">
              Themes
            </a>
            <a href="#pricing" className="text-sm text-nestui-text3 hover:text-nestui-text2 transition-colors cursor-pointer">
              Pricing
            </a>
            <Link to="/login" className="text-sm text-nestui-text3 hover:text-nestui-text2 transition-colors cursor-pointer">
              Sign In
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-nestui-text3/50 text-xs">
            &copy; {new Date().getFullYear()} Nest UI
          </p>
        </div>
      </div>
    </footer>
  )
}
