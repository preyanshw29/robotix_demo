import React, { useState, useEffect } from 'react'
import ThreeScene from './ThreeScene'
import { ArrowDown, Radio, Shield, Zap, Sparkles } from 'lucide-react'

export default function Hero({ onRegisterClick, playBeep }) {
  // Live Countdown to Robofest 2026 (Tentative flagship date: March 20, 2026 / dynamically calculated)
  const targetDate = new Date('2026-11-20T09:00:00')
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
    <section className="relative w-full pt-12 md:pt-20 pb-16 px-4 sm:px-6 max-w-[1200px] mx-auto flex flex-col items-center">
      
      {/* Top Telemetry Coordinates Pill */}
      <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-[100px] bg-[#1f1f23] border border-[#252525] text-[12px] font-mono-tech text-[#828b8d]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
        <span className="text-[#e0e0e0]">NIT RAIPUR</span>
        <span className="text-[#646e71]">//</span>
        <span>FLAGSHIP ROBOTICS FESTIVAL</span>
        <span className="text-[#646e71]">//</span>
        <span className="text-[#00e5ff]">EDITION '26</span>
      </div>

      {/* Monumental Editorial Headline */}
      <h1 className="font-display font-normal text-center text-[#e0e0e0] text-5xl sm:text-7xl md:text-8xl lg:text-[104px] leading-[0.95] tracking-[-3px] max-w-[1000px] uppercase select-none">
        ROBOFEST 2026
      </h1>

      {/* Editorial Sub-statement */}
      <p className="mt-6 text-center text-[#828b8d] text-base md:text-lg max-w-[640px] leading-[1.5] font-light">
        The premier autonomous robotics exhibition and high-voltage combat arena presented by{' '}
        <span className="text-[#e0e0e0] font-normal">ROBOTiX Club</span> at the{' '}
        <span className="text-[#e0e0e0] font-normal">National Institute of Technology, Raipur</span> under{' '}
        <span className="text-[#00e5ff]">Anantya</span>.
      </p>

      {/* Interactive Action Control Row */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {/* Primary Action Button */}
        <a
          href="#arena"
          onClick={() => playBeep?.(850, 0.05)}
          className="h-[46px] px-8 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282f] border border-[#252525] hover:border-[#828b8d] text-[#e0e0e0] text-[13px] font-mono-tech tracking-[1.04px] flex items-center gap-2 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>ENTER THE ARENA</span>
        </a>

        {/* Minimal Underlined Text Action */}
        <button
          onClick={() => {
            playBeep?.(950, 0.05)
            onRegisterClick()
          }}
          className="h-[46px] px-4 text-[#e0e0e0] hover:text-white text-[13px] font-mono-tech tracking-[1.04px] border-b border-[#e0e0e0] hover:border-[#00e5ff] transition-all flex items-center gap-1.5 cursor-pointer bg-transparent"
        >
          <span>ACQUIRE DELEGATE PASS</span>
          <span className="text-[#00e5ff]">→</span>
        </button>
      </div>

      {/* Live Countdown Telemetry Strip */}
      <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-4 max-w-[480px] w-full">
        {[
          { label: 'DAYS', val: timeLeft.days },
          { label: 'HOURS', val: timeLeft.hours },
          { label: 'MINUTES', val: timeLeft.minutes },
          { label: 'SECONDS', val: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="p-3 sm:p-4 rounded-xl bg-[#16191b] border border-[#252525] flex flex-col items-center justify-center"
          >
            <span className="font-mono-tech text-xl sm:text-2xl md:text-3xl font-medium text-[#e0e0e0] tracking-tight">
              {item.val}
            </span>
            <span className="text-[10px] font-mono-tech text-[#646e71] mt-1 tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 3D Interactive Three.js Robotic Core Viewport */}
      <div className="mt-12 w-full max-w-[940px]">
        <ThreeScene />
      </div>

      {/* Instrument Footnote Indicator */}
      <div className="mt-6 flex items-center justify-between w-full max-w-[940px] px-2 text-[11px] font-mono-tech text-[#646e71]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
          <span>SIMULATION ENGINE: ACTIVE</span>
        </div>
        <div>
          <span>NIT RAIPUR CAMPUS ARENA</span>
        </div>
        <div className="hidden sm:block">
          <span>PRIZE PURSE: ₹1,50,000+</span>
        </div>
      </div>
    </section>
  )
}
