import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative border-t border-nestui-border/30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-nestui-blue/20 to-purple-500/20" />
              <div className="absolute inset-[2px] rounded-[4px] bg-nestui-bg" />
              <svg className="relative z-10 w-3.5 h-3.5 text-nestui-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
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
          <p className="text-nestui-text3/60 text-xs">
            &copy; {new Date().getFullYear()} Nest UI
          </p>
        </div>
      </div>
    </footer>
  )
}
