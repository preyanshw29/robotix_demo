/**
 * ============================================================================
 * ROBOFEST '26 — TOP NAVIGATION & TELEMETRY CONTROLS
 * File: src/components/Header.tsx
 * Description: Persistent 76px sticky header providing brand identity, section 
 *              anchor routing with counters, Web Audio sound feedback toggle, 
 *              and mobile drawer navigation.
 * ============================================================================
 */

import React, { useState } from 'react'
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react'
import type { HeaderProps } from '../types'

/**
 * Header Component
 * Renders the top navigation bar with glassmorphic backdrop blur,
 * high-contrast ghost purple indicators, and audio synthesizer toggle.
 */
export default function Header({
  onRegisterClick,
  soundEnabled,
  setSoundEnabled,
  playBeep,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Primary navigation anchors with section counters
  const navLinks = [
    { label: 'ABOUT', href: '#about', counter: '01' },
    { label: 'CONTESTS', href: '#contests', counter: '04' },
    { label: 'PASS', href: '#register', counter: '01' },
  ]

  /**
   * Smoothly scrolls to target anchor and emits synthesizer audio feedback
   */
  const handleLinkClick = (href: string) => {
    playBeep?.(800, 0.04)
    setMobileMenuOpen(false)
    const elem = document.querySelector(href)
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full h-[76px] bg-[#010101]/95 backdrop-blur-md border-b border-[#262130]">
      <div className="max-w-[940px] h-full mx-auto px-4 flex items-center justify-between">
        
        {/* Brand Wordmark & Coordinate Badge */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            playBeep?.(700, 0.05)
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Pulsing Ghost Core */}
          <div className="w-6 h-6 rounded-full border border-[#7e22ce]/40 bg-[#13111a] flex items-center justify-center group-hover:border-[#c084fc] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all">
            <div className="w-2 h-2 bg-[#c084fc] rounded-sm group-hover:scale-125 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-nav text-[13px] text-[#e0e0e0] font-normal uppercase group-hover:text-white transition-colors">
              ROBOFEST
            </span>
            <span className="font-mono-nav text-[11px] text-[#8e889b]">
              // <span className="text-[#a855f7]">ROBOTiX</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation: Compact pill buttons with section counters */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="h-[36px] px-4 rounded-[100px] bg-[#16141f] text-[#e0e0e0] text-[13px] font-mono-nav hover:bg-[#231e30] hover:text-[#f3e8ff] hover:border-[#a855f7]/30 border border-[#2a2436] transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{link.label}</span>
              <span className="text-[#a855f7] text-[11px]">({link.counter})</span>
            </button>
          ))}
        </nav>

        {/* Right Audio Toggle & Direct Registration CTA */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled
              setSoundEnabled(next)
              if (next) playBeep?.(900, 0.05)
            }}
            className="w-[36px] h-[36px] rounded-[100px] bg-[#16141f] border border-[#2a2436] hover:border-[#a855f7]/40 flex items-center justify-center text-[#8e889b] hover:text-[#f3e8ff] transition-all cursor-pointer"
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#c084fc]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Delegate Registration Trigger */}
          <button
            onClick={() => {
              playBeep?.(1000, 0.08)
              onRegisterClick()
            }}
            className="h-[36px] px-4 rounded-[100px] bg-gradient-to-r from-[#1f1a2c] to-[#16141f] border border-[#7e22ce]/40 hover:border-[#c084fc] text-[#e0e0e0] hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-[13px] font-mono-nav transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3 h-3 text-[#a855f7]" />
          </button>
        </div>

        {/* Mobile Navigation Drawer Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden w-8 h-8 rounded-full bg-[#1f1f23] flex items-center justify-center text-[#e0e0e0]"
          aria-label="Toggle Mobile Navigation"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#010101] border-b border-[#252525] px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="w-full text-left py-2 px-3 rounded-[100px] bg-[#1f1f23] text-[#e0e0e0] text-[13px] font-mono-nav flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#a855f7]">({link.counter})</span>
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onRegisterClick()
            }}
            className="w-full py-2.5 rounded-[100px] bg-[#e0e0e0] text-[#010101] text-[13px] font-mono-nav font-medium"
          >
            REGISTER
          </button>
        </div>
      )}
    </header>
  )
}
