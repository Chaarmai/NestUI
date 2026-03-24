import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HeroSection from '../components/landing/HeroSection'
import CrmPreview from '../components/landing/CrmPreview'
import ThemeShowcase from '../components/landing/ThemeShowcase'
import PricingSection from '../components/landing/PricingSection'
import Footer from '../components/landing/Footer'

function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-nestui-bg/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_0_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative flex h-7 w-7 items-center justify-center">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-nestui-blue/20 to-purple-500/20" />
            <div className="absolute inset-[2px] rounded-[4px] bg-nestui-bg" />
            <svg className="relative z-10 w-3.5 h-3.5 text-nestui-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight text-nestui-text">
            Nest<span className="text-nestui-blue">UI</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <a href="#themes" className="text-sm text-nestui-text2 hover:text-nestui-text transition-colors duration-300 cursor-pointer">
            Themes
          </a>
          <a href="#pricing" className="text-sm text-nestui-text2 hover:text-nestui-text transition-colors duration-300 cursor-pointer">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-nestui-text2 hover:text-nestui-text transition-colors duration-300 cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="rounded-lg bg-nestui-blue/10 border border-nestui-blue/20 px-3.5 py-1.5 text-sm font-medium text-nestui-blue hover:bg-nestui-blue/15 hover:border-nestui-blue/30 hover:shadow-[0_0_20px_rgba(91,143,255,0.15)] transition-all duration-300 cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-nestui-bg">
      <LandingNav />
      <HeroSection />
      <CrmPreview />
      <ThemeShowcase />
      <PricingSection />
      <Footer />
    </div>
  )
}
