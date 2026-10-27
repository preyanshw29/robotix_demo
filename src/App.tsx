import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import EventsSection from './components/EventsSection'
import RegistrationSection from './components/RegistrationSection'
import Footer from './components/Footer'

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('AeroVision')
  const [showFloatingNav, setShowFloatingNav] = useState(false)

  // Web Audio UI Synthesizer
  const playBeep = (freq = 800, duration = 0.04) => {
    if (!soundEnabled) return
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
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
    } catch (e) {
      // AudioContext policy suppression fallback
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 350)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenRegister = (eventTitle?: string) => {
    if (eventTitle && typeof eventTitle === 'string') {
      setSelectedEvent(eventTitle)
    }
    setIsRegisterModalOpen(true)
  }

  const scrollToSection = (id: string) => {
    playBeep(850, 0.04)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#010101] text-[#e0e0e0] flex flex-col relative selection:bg-[#1f1f23] selection:text-[#e0e0e0]">
      
      {/* 76px Persistent Public Header */}
      <Header
        onRegisterClick={() => handleOpenRegister()}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playBeep={playBeep}
      />

      {/* Main Single Column Narrative */}
      <main className="flex-1 flex flex-col items-center w-full">
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

      {/* Floating Section Navigation (AWE Component: centered row of #1f1f23 pills) */}
      {showFloatingNav && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 p-1 rounded-[100px] bg-[#010101]/90 backdrop-blur-md border border-[#252525] shadow-2xl">
          {[
            { id: 'about', label: 'ABOUT', count: '01' },
            { id: 'contests', label: 'CONTESTS', count: '04' },
            { id: 'register', label: 'PASS', count: '01' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => scrollToSection(pill.id)}
              className="h-[32px] px-3.5 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282e] text-[12px] font-mono-nav tracking-[1.04px] text-[#e0e0e0] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{pill.label}</span>
              <span className="text-[#646e71] text-[10px]">({pill.count})</span>
            </button>
          ))}
          <button
            onClick={() => handleOpenRegister()}
            className="h-[32px] px-4 rounded-[100px] bg-[#e0e0e0] hover:bg-white text-[#010101] text-[12px] font-mono-nav font-medium tracking-[1.04px] transition-colors cursor-pointer ml-1"
          >
            CLAIM PASS
          </button>
        </div>
      )}
    </div>
  )
}
