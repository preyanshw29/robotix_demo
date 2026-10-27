import React, { useState } from 'react'
import { Volume2, VolumeX, Menu, X, ArrowUpRight, ShieldAlert, Cpu } from 'lucide-react'

export default function Header({ onRegisterClick, soundEnabled, setSoundEnabled, playBeep }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'ABOUT', href: '#about', counter: '01' },
    { label: 'ARENA', href: '#arena', counter: '09' },
    { label: 'SCHEDULE', href: '#schedule', counter: '03' },
    { label: 'FAQS', href: '#faq', counter: '05' },
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
    <header className="sticky top-0 z-50 w-full h-[76px] bg-[#010101]/95 backdrop-blur-md border-b border-[#252525] transition-all">
      <div className="max-w-[1200px] h-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Mark & Coordinate */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); playBeep?.(700, 0.05); }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          {/* Custom Geometric Robotix Club Symbol */}
          <div className="w-8 h-8 rounded-full border border-[#252525] bg-[#16191b] flex items-center justify-center group-hover:border-[#00e5ff] transition-colors">
            <div className="w-3.5 h-3.5 border border-[#e0e0e0] rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#00e5ff]" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-mono-tech text-[13px] font-medium tracking-[1.04px] text-[#e0e0e0] flex items-center gap-1.5">
              ROBOFEST <span className="text-[#646e71]">'26</span>
            </span>
            <span className="font-mono-tech text-[10px] text-[#646e71] tracking-[0.06em]">
              ROBOTiX CLUB // NIT RAIPUR
            </span>
          </div>
        </a>

        {/* Desktop Navigation Pill Cluster */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="h-[38px] px-4 rounded-[100px] bg-[#1f1f23] border border-transparent hover:border-[#252525] hover:bg-[#25252a] text-[#e0e0e0] text-[13px] font-mono-tech font-light tracking-[1.04px] flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="text-[#646e71] text-[11px]">({link.counter})</span>
            </button>
          ))}
        </nav>

        {/* Utility Controls: Sound Toggle + Register Pill CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Audio Feedback Switch */}
          <button
            onClick={() => {
              const next = !soundEnabled
              setSoundEnabled(next)
              if (next) playBeep?.(900, 0.05)
            }}
            className="w-[38px] h-[38px] rounded-[100px] bg-[#1f1f23] border border-[#252525] hover:border-[#828b8d] flex items-center justify-center text-[#828b8d] hover:text-[#e0e0e0] transition-colors"
            title={soundEnabled ? 'Disable UI Audio Telemetry' : 'Enable UI Audio Telemetry'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00e5ff]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Registration Pill */}
          <button
            onClick={() => {
              playBeep?.(1000, 0.08)
              onRegisterClick()
            }}
            className="h-[38px] px-5 rounded-[100px] bg-[#e0e0e0] hover:bg-white text-[#010101] text-[13px] font-mono-tech font-medium tracking-[1.04px] flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(224,224,224,0.15)] active:scale-95"
          >
            <span>GET PASS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              const next = !soundEnabled
              setSoundEnabled(next)
            }}
            className="w-9 h-9 rounded-full bg-[#1f1f23] flex items-center justify-center text-[#828b8d]"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00e5ff]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-[#1f1f23] border border-[#252525] flex items-center justify-center text-[#e0e0e0]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#010101] border-b border-[#252525] px-6 py-6 flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="text-[10px] font-mono-tech text-[#646e71] uppercase pb-1 border-b border-[#252525]">
            NAVIGATION MATRIX
          </div>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="w-full text-left py-2.5 px-4 rounded-[100px] bg-[#1f1f23] text-[#e0e0e0] text-[13px] font-mono-tech flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#646e71]">({link.counter})</span>
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onRegisterClick()
            }}
            className="w-full mt-2 py-3 rounded-[100px] bg-[#e0e0e0] text-[#010101] text-[13px] font-mono-tech font-medium flex items-center justify-center gap-2"
          >
            <span>REGISTER PASS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  )
}
