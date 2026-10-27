import React, { useState } from 'react'
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Zap } from 'lucide-react'

export default function Header({ onRegisterClick, soundEnabled, setSoundEnabled, playBeep }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'ABOUT', href: '#about', counter: '01' },
    { label: 'ROBOTHON', href: '#robothon', counter: '24H' },
    { label: 'ARENA', href: '#arena', counter: '09' },
    { label: 'SCHEDULE', href: '#schedule', counter: '03' },
    { label: 'FAQS', href: '#faq', counter: '06' },
  ]

  const handleLinkClick = (href) => {
    playBeep?.(800, 0.04)
    setMobileMenuOpen(false)
    const elem = document.querySelector(href)
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full h-[76px] bg-[#070b17]/85 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(0,212,255,0.1)] transition-all">
      <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Mark with Official Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); playBeep?.(700, 0.05); }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <img
            src="/logoWhite.png"
            alt="ROBOTiX Club NIT Raipur"
            className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] group-hover:scale-105 transition-transform"
          />

          <div className="flex flex-col">
            <span className="font-orbitron text-base font-bold tracking-wider text-white flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
              ROBOTiX <span className="text-cyan-400">CLUB</span>
            </span>
            <span className="text-[10px] font-exo text-gray-400 tracking-[0.1em] uppercase">
              NIT RAIPUR // ROBOFEST '26
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="h-[38px] px-4 rounded-full bg-[#0a0f1e]/60 hover:bg-cyan-500/15 border border-transparent hover:border-cyan-500/30 text-gray-300 hover:text-cyan-300 text-xs font-orbitron tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="text-cyan-400/70 text-[10px]">({link.counter})</span>
            </button>
          ))}
        </nav>

        {/* Right Utility: Audio Toggle + Register Pill */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              const next = !soundEnabled
              setSoundEnabled(next)
              if (next) playBeep?.(900, 0.05)
            }}
            className="w-[38px] h-[38px] rounded-full bg-[#0a0f1e] border border-cyan-500/30 hover:border-cyan-400 flex items-center justify-center text-gray-400 hover:text-cyan-300 transition-colors"
            title={soundEnabled ? 'Disable UI SFX' : 'Enable UI SFX'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              playBeep?.(1000, 0.08)
              onRegisterClick()
            }}
            className="h-[38px] px-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#070b17] text-xs font-orbitron font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,212,255,0.35)] active:scale-95 cursor-pointer"
          >
            <span>GET PASS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              const next = !soundEnabled
              setSoundEnabled(next)
            }}
            className="w-9 h-9 rounded-full bg-[#0a0f1e] border border-cyan-500/30 flex items-center justify-center text-gray-400"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-[#0a0f1e] border border-cyan-500/30 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#070b17]/95 border-b border-cyan-500/30 px-6 py-6 flex flex-col gap-3 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="text-[10px] font-orbitron text-cyan-400 uppercase tracking-widest pb-1 border-b border-cyan-500/20">
            NAVIGATION
          </div>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="w-full text-left py-2.5 px-4 rounded-xl bg-[#0a0f1e] text-gray-200 text-xs font-orbitron flex items-center justify-between border border-cyan-500/20"
            >
              <span>{link.label}</span>
              <span className="text-cyan-400 text-[10px]">({link.counter})</span>
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onRegisterClick()
            }}
            className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-[#070b17] text-xs font-orbitron font-bold flex items-center justify-center gap-2"
          >
            <span>REGISTER PASS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  )
}
