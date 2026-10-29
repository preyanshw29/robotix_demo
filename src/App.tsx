/**
 * ============================================================================
 * ROBOFEST '26 — MAIN APPLICATION ROOT
 * File: src/App.tsx
 * Description: Core Single Page Application (SPA) orchestrator:
 *              - Web Audio API real-time UI synthesizer audio synthesis
 *              - Scroll-triggered dynamic floating navigation dock
 *              - Ambient degrading ghost-purple plasma flame background wisps
 *              - Synchronized state between Header, Hero, About, Events, and Registration
 * ============================================================================
 */

import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import EventsSection from './components/EventsSection'
import RegistrationSection from './components/RegistrationSection'
import Footer from './components/Footer'

/**
 * Root Application Component
 */
export default function App() {
  // Global Audio Feedback State
  const [soundEnabled, setSoundEnabled] = useState(false)

  // Delegate Pass Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('AeroVision')

  // Bottom Floating Navigation Visibility State
  const [showFloatingNav, setShowFloatingNav] = useState(false)

  /**
   * Procedural Web Audio API Synthesizer
   * Produces an ultra-clean sine-wave click/chirp without requiring external audio assets.
   * 
   * @param freq Pitch frequency in Hertz (default 800 Hz)
   * @param duration Tone decay duration in seconds (default 0.04s)
   */
  const playBeep = (freq = 800, duration = 0.04) => {
    if (!soundEnabled) return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {
      // AudioContext policy suppression fallback (silent ignore)
    }
  }

  // Scroll position listener for floating pill dock
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 350)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Opens the pass registration modal, optionally pre-selecting a gauntlet track
   */
  const handleOpenRegister = (eventTitle?: string) => {
    if (eventTitle && typeof eventTitle === 'string') {
      setSelectedEvent(eventTitle)
    }
    setIsRegisterModalOpen(true)
  }

  /**
   * Smooth scrolls to target section ID with audio feedback
   */
  const scrollToSection = (id: string) => {
    playBeep(850, 0.04)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#010101] text-[#e0e0e0] flex flex-col relative selection:bg-[#7e22ce]/30 selection:text-[#f3e8ff] overflow-x-hidden">
      
      {/* Ghost Purple Degrading Ambient Plasma Flames (Subtle Background Luminescence) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-center ethereal flame aura */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12)_0%,rgba(88,28,135,0.06)_45%,transparent_75%)] ghost-flame-aura" />
        
        {/* Middle-left phantom flame wisp */}
        <div className="absolute top-[40%] -left-[15%] w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(147,51,234,0.08)_0%,rgba(59,7,100,0.03)_50%,transparent_75%)] blur-3xl pointer-events-none" />

        {/* Middle-right degrading purple flame wisp */}
        <div className="absolute top-[65%] -right-[15%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(126,34,206,0.08)_0%,rgba(30,10,50,0.03)_50%,transparent_75%)] blur-3xl pointer-events-none" />
      </div>

      {/* 76px Persistent Public Header */}
      <Header
        onRegisterClick={() => handleOpenRegister()}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playBeep={playBeep}
      />

      {/* Main Single Column Narrative */}
      <main className="flex-1 flex flex-col items-center w-full relative z-10">
        <Hero
          onRegisterClick={() => handleOpenRegister()}
          playBeep={playBeep}
        />

        <AboutSection />

        <EventsSection
          onRegisterClick={handleOpenRegister}
          playBeep={playBeep}
        />

        <RegistrationSection
          initialEvent={selectedEvent}
          isModalOpen={isRegisterModalOpen}
          setIsModalOpen={setIsRegisterModalOpen}
          playBeep={playBeep}
        />
      </main>

      {/* Closing Utility Footer */}
      <Footer playBeep={playBeep} />

      {/* Floating Section Navigation (Centered row of #1f1f23 pills with ghost-purple rim) */}
      {showFloatingNav && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 p-1 rounded-[100px] bg-[#0d0c12]/90 backdrop-blur-md border border-[#7e22ce]/30 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(168,85,247,0.15)]">
          {[
            { id: 'about', label: 'ABOUT', count: '01' },
            { id: 'contests', label: 'CONTESTS', count: '04' },
            { id: 'register', label: 'PASS', count: '01' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => scrollToSection(pill.id)}
              className="h-[32px] px-3.5 rounded-[100px] bg-[#16141f] hover:bg-[#231e30] text-[12px] font-mono-nav tracking-[1.04px] text-[#e0e0e0] hover:text-[#f3e8ff] flex items-center gap-1.5 transition-all cursor-pointer border border-[#2a2438] hover:border-[#a855f7]/40"
            >
              <span>{pill.label}</span>
              <span className="text-[#a855f7] text-[10px]">({pill.count})</span>
            </button>
          ))}
          <button
            onClick={() => handleOpenRegister()}
            className="h-[32px] px-4 rounded-[100px] bg-gradient-to-r from-[#c084fc] to-[#a855f7] hover:from-[#d8b4fe] hover:to-[#c084fc] text-[#010101] text-[12px] font-mono-nav font-medium tracking-[1.04px] transition-all cursor-pointer ml-1 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            CLAIM PASS
          </button>
        </div>
      )}
    </div>
  )
}
