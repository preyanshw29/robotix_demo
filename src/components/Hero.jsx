import React, { useState, useEffect } from 'react'
import ThreeScene from './ThreeScene'
import { Zap, Radio, Shield, Sparkles, ChevronDown, Eye, Activity, Terminal } from 'lucide-react'

export default function Hero({ onRegisterClick, playBeep }) {
  const [viewMode, setViewMode] = useState('3d') // '3d' or 'mecha'
  const targetDate = new Date('2026-03-22T10:00:00') // Authentic Robofest 26 date from official site
  const [timeLeft, setTimeLeft] = useState({
    days: '24',
    hours: '12',
    minutes: '48',
    seconds: '30',
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = Math.max(0, targetDate.getTime() - now.getTime())
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / 1000 / 60) % 60)
      const s = Math.floor((diff / 1000) % 60)

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center pt-8 pb-16 px-4 sm:px-6 max-w-[1240px] mx-auto overflow-hidden">
      
      {/* Ambient Neon Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="z-20 mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0f1e]/80 border border-cyan-500/30 backdrop-blur-md text-xs font-exo uppercase tracking-[0.25em] text-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>ANANTYA '26</span>
        <span className="text-gray-500">//</span>
        <span className="text-white font-medium">ROBOTiX CLUB NIT RAIPUR</span>
      </div>

      {/* Monumental Orbitron Headline with Cyberpunk Gradient & Glow */}
      <h1 className="z-20 font-orbitron font-black text-center text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.95] tracking-tight uppercase select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-300 to-cyan-500 text-glow-cyan">
        ROBOFEST'26
      </h1>

      {/* Editorial Subtitle */}
      <p className="z-20 mt-4 text-center text-gray-300 text-sm sm:text-base md:text-lg max-w-[700px] leading-relaxed font-exo">
        Central India’s Premier Autonomous Robotics, Simulation & Combat Spectacle.
        <br className="hidden sm:inline" />
        <span className="text-cyan-400 font-medium"> Build. Combat. Simulate. Innovate.</span>
      </p>

      {/* Action Button Row */}
      <div className="z-20 mt-7 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#arena"
          onClick={() => playBeep?.(850, 0.05)}
          className="h-[48px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#070b17] font-orbitron font-bold text-xs tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-[#070b17]" />
          <span>EXPLORE CONTESTS</span>
        </a>

        <button
          onClick={() => {
            playBeep?.(950, 0.05)
            onRegisterClick()
          }}
          className="h-[48px] px-7 rounded-full bg-[#0a0f1e]/90 hover:bg-[#111a33] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-orbitron text-xs tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,212,255,0.15)] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CLAIM DELEGATE PASS</span>
        </button>
      </div>

      {/* Live Countdown Grid */}
      <div className="z-20 mt-8 grid grid-cols-4 gap-2 sm:gap-4 max-w-[500px] w-full">
        {[
          { label: 'DAYS', val: timeLeft.days },
          { label: 'HOURS', val: timeLeft.hours },
          { label: 'MINUTES', val: timeLeft.minutes },
          { label: 'SECONDS', val: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="p-3 sm:p-4 rounded-xl bg-[#0a0f1e]/85 border border-cyan-500/20 backdrop-blur-md flex flex-col items-center justify-center group hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(0,212,255,0.08)]"
          >
            <span className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {item.val}
            </span>
            <span className="text-[10px] font-exo uppercase tracking-[0.2em] text-cyan-500/80 mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Viewport Switcher (3D WebGL vs Mecha Scanner) */}
      <div className="z-20 mt-8 flex items-center gap-2 p-1 rounded-full bg-[#0a0f1e]/90 border border-cyan-500/30">
        <button
          onClick={() => {
            playBeep?.(800, 0.04)
            setViewMode('3d')
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-orbitron transition-all ${
            viewMode === '3d'
              ? 'bg-cyan-500 text-[#070b17] font-bold shadow-[0_0_15px_rgba(0,212,255,0.5)]'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        >
          3D ROBOT CORE
        </button>
        <button
          onClick={() => {
            playBeep?.(800, 0.04)
            setViewMode('mecha')
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-orbitron transition-all ${
            viewMode === 'mecha'
              ? 'bg-cyan-500 text-[#070b17] font-bold shadow-[0_0_15px_rgba(0,212,255,0.5)]'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        >
          MECHA HUD SCANNER
        </button>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="z-20 mt-6 w-full max-w-[960px] relative">
        {viewMode === '3d' ? (
          <ThreeScene />
        ) : (
          /* Official Mecha Robot Visual with Laser HUD Scanner */
          <div className="relative w-full h-[460px] md:h-[520px] rounded-2xl border border-cyan-500/30 bg-[#0a0f1e] overflow-hidden group shadow-[0_0_35px_rgba(0,212,255,0.15)]">
            <img
              src="/robofest-hero.png"
              alt="Robofest Mecha Robot"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b17] via-transparent to-[#070b17]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b17]/60 via-transparent to-[#070b17]/60 pointer-events-none" />

            {/* Animated Laser Scanning Line */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00d4ff] animate-laser pointer-events-none" />

            {/* Cyber HUD Targeting Reticles */}
            <div className="absolute top-6 left-6 p-3 rounded-lg bg-[#070b17]/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono-tech text-cyan-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>TITAN_MECHA // ONLINE</span>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                NITRR COMBAT DIVISION
              </span>
            </div>

            <div className="absolute top-6 right-6 p-3 rounded-lg bg-[#070b17]/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono-tech text-cyan-300 text-right">
              <span>TARGET LOCK: ENGAGED</span>
              <span className="text-[10px] text-cyan-400/70 mt-1 block">
                FREQ: 2.450 GHz FAILSAFE
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-exo text-gray-300">
              <span className="px-3 py-1 rounded-full bg-[#070b17]/80 border border-cyan-500/20">
                ARMAMENT: HIGH-RPM PNEUMATIC DRUM
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono-tech">
                MASS RATING: 30 KG
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="z-20 mt-6 flex flex-wrap items-center justify-between w-full max-w-[960px] px-2 text-xs font-exo text-gray-400 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-gray-300">CAMPUS VENUE:</span>
          <span className="text-cyan-400">NIT Raipur Indoor Stadium</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300">PRIZE POOL:</span>
          <span className="text-cyan-300 font-bold font-orbitron">₹1,50,000+ CASH & GOODIES</span>
        </div>
      </div>
    </section>
  )
}
