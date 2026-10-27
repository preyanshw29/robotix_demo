import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TelemetryHUD from './components/TelemetryHUD'
import EventsArena from './components/EventsArena'
import InteractivePass from './components/InteractivePass'
import TimelineSchedule from './components/TimelineSchedule'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import { Sparkles, ArrowUp } from 'lucide-react'

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('RoboWar: Titan Clash')
  const [showFloatingNav, setShowFloatingNav] = useState(false)

  // Web Audio UI Sound Synthesizer (Zero external audio assets required)
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
    <div className="min-h-screen bg-[#010101] text-[#e0e0e0] flex flex-col relative selection:bg-[#1f1f23] selection:text-[#00e5ff]">
      
      {/* Primary Sticky Header */}
      <Header
        onRegisterClick={() => handleOpenRegister()}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playBeep={playBeep}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero
          onRegisterClick={() => handleOpenRegister()}
          playBeep={playBeep}
        />

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

      {/* Floating Section Navigation (AWE Component Specification) */}
      {showFloatingNav && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 p-1.5 rounded-[100px] bg-[#010101]/90 backdrop-blur-md border border-[#252525] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {[
            { id: 'about', label: 'ABOUT', count: '01' },
            { id: 'arena', label: 'ARENA', count: '09' },
            { id: 'schedule', label: 'SCHEDULE', count: '03' },
            { id: 'register', label: 'PASS', count: '01' },
            { id: 'faq', label: 'FAQS', count: '06' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => scrollToSection(pill.id)}
              className="h-[32px] px-3.5 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282f] border border-transparent hover:border-[#444444] text-[12px] font-mono-tech tracking-[1.04px] text-[#e0e0e0] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{pill.label}</span>
              <span className="text-[#646e71] text-[10px]">({pill.count})</span>
            </button>
          ))}
          <button
            onClick={() => handleOpenRegister()}
            className="h-[32px] px-4 rounded-[100px] bg-[#e0e0e0] hover:bg-white text-[#010101] text-[12px] font-mono-tech font-semibold tracking-[1px] transition-all cursor-pointer shadow-sm ml-1"
          >
            CLAIM PASS
          </button>
        </div>
      )}
    </div>
  )
}
