import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ParticleField from './components/ParticleField'
import TelemetryHUD from './components/TelemetryHUD'
import RobothonShowcase from './components/RobothonShowcase'
import EventsArena from './components/EventsArena'
import InteractivePass from './components/InteractivePass'
import TimelineSchedule from './components/TimelineSchedule'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import { Sparkles, ArrowUp } from 'lucide-react'

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('ROBOWAR')
  const [showFloatingNav, setShowFloatingNav] = useState(false)

  // Interactive UI Audio Synthesizer (Sci-fi cyber blip)
  const playBeep = (freq = 800, duration = 0.04) => {
    if (!soundEnabled) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch (e) {
      // AudioContext policy suppression fallback
    }
  }

  // Scroll watcher for floating navigation pill cluster
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingNav(true)
      } else {
        setShowFloatingNav(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenRegister = (eventTitle) => {
    if (eventTitle && typeof eventTitle === 'string') {
      setSelectedEvent(eventTitle)
    }
    setIsRegisterModalOpen(true)
  }

  const scrollToSection = (id) => {
    playBeep(850, 0.04)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#070b17] text-[#e0e0e0] flex flex-col relative selection:bg-cyan-500/20 selection:text-cyan-300 cyber-grid">
      
      {/* Living Interactive Particle Field */}
      <ParticleField />

      {/* Primary Sticky Header */}
      <Header
        onRegisterClick={() => handleOpenRegister()}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playBeep={playBeep}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col items-center w-full z-20">
        <Hero
          onRegisterClick={() => handleOpenRegister()}
          playBeep={playBeep}
        />

        <div id="robothon" className="w-full">
          <RobothonShowcase
            onRegisterClick={handleOpenRegister}
            playBeep={playBeep}
          />
        </div>

        <TelemetryHUD
          playBeep={playBeep}
        />

        <EventsArena
          onRegisterClick={handleOpenRegister}
          playBeep={playBeep}
        />

        <TimelineSchedule
          playBeep={playBeep}
        />

        <InteractivePass
          initialEvent={selectedEvent}
          isModalOpen={isRegisterModalOpen}
          setIsModalOpen={setIsRegisterModalOpen}
          playBeep={playBeep}
        />

        <FAQSection
          playBeep={playBeep}
        />
      </main>

      {/* Footer with ROBOTiX Club NIT Raipur Branding */}
      <Footer playBeep={playBeep} />

      {/* Floating Section Navigation */}
      {showFloatingNav && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 p-1.5 rounded-full bg-[#070b17]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_25px_rgba(0,212,255,0.25)] animate-in fade-in slide-in-from-bottom-2 duration-200">
          {[
            { id: 'about', label: 'ABOUT', count: '01' },
            { id: 'robothon', label: 'ROBOTHON', count: '24H' },
            { id: 'arena', label: 'ARENA', count: '09' },
            { id: 'schedule', label: 'SCHEDULE', count: '03' },
            { id: 'register', label: 'PASS', count: '01' },
            { id: 'faq', label: 'FAQS', count: '06' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => scrollToSection(pill.id)}
              className="h-[34px] px-4 rounded-full bg-[#0a0f1e]/80 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-500/30 text-xs font-orbitron tracking-wider text-gray-300 hover:text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{pill.label}</span>
              <span className="text-cyan-400 text-[10px]">({pill.count})</span>
            </button>
          ))}
          <button
            onClick={() => handleOpenRegister()}
            className="h-[34px] px-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#070b17] text-xs font-orbitron font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.4)] ml-1"
          >
            CLAIM PASS
          </button>
        </div>
      )}
    </div>
  )
}
