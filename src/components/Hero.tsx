import React, { useState } from 'react'
import { OrbitGalleryCanvas } from '@/components/ui/3d-orbit-gallery'
import ThreeScene from './ThreeScene'

interface HeroProps {
  onRegisterClick: (eventTitle?: string) => void
  playBeep?: (freq?: number, duration?: number) => void
}

export default function Hero({ onRegisterClick, playBeep }: HeroProps) {
  const [activeVisual, setActiveVisual] = useState<'orbit' | 'core'>('orbit')

  const handleSelectFromOrbit = (title: string) => {
    playBeep?.(1100, 0.08)
    onRegisterClick(title)
  }

  return (
    <section className="relative w-full pt-16 md:pt-24 pb-12 px-4 max-w-[940px] mx-auto flex flex-col items-center">
      
      {/* Editorial Monumental Headline (Office Times Round / Cormorant Garamond 100px, -3px tracking) */}
      <h1 className="font-display text-center text-[#e0e0e0] text-6xl sm:text-8xl md:text-[100px] leading-[1.0] select-none uppercase">
        Robofest
      </h1>

      {/* Narrow Centered Supporting Paragraph in Muted Steel */}
      <p className="mt-4 text-center text-[#828b8d] text-base sm:text-lg max-w-[540px] leading-[1.4] font-normal">
        Autonomous systems observatory, kinetic trials, and robotics exhibition presented by ROBOTiX Club at NIT Raipur.
      </p>

      {/* Action Controls: Charcoal Navigation Pill & Underlined Text Control */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <a
          href="#contests"
          onClick={() => playBeep?.(850, 0.05)}
          className="h-[38px] px-6 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282e] text-[#e0e0e0] text-[13px] font-mono-nav tracking-[1.04px] flex items-center justify-center cursor-pointer transition-colors"
        >
          VIEW CONTESTS
        </a>

        <button
          onClick={() => {
            playBeep?.(950, 0.05)
            onRegisterClick()
          }}
          className="h-[38px] px-2 text-[#e0e0e0] hover:text-white text-[13px] font-mono-nav tracking-[1.04px] border-b border-[#e0e0e0] transition-colors cursor-pointer bg-transparent"
        >
          DELEGATE PASS →
        </button>
      </div>

      {/* Contained Media Well (16px radius, 1px #252525 hairline border, #16191b background) */}
      <div className="mt-12 w-full">
        <div className="relative w-full h-[460px] md:h-[520px] rounded-2xl border border-[#252525] bg-[#16191b] overflow-hidden select-none">
          
          {/* Active 3D Visualizer */}
          {activeVisual === 'orbit' ? (
            <OrbitGalleryCanvas 
              className="w-full h-full cursor-grab active:cursor-grabbing" 
              onSelectEvent={handleSelectFromOrbit}
            />
          ) : (
            <ThreeScene />
          )}

          {/* Top Left Instrument Label */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0]" />
              <span className="text-[11px] font-mono-nav text-[#e0e0e0]">
                {activeVisual === 'orbit' ? 'REVOLVING ORBIT // CLICK EVENT CARD' : 'AUTONOMOUS CORE // SYS_REV.04'}
              </span>
            </div>
            <span className="text-[10px] font-mono-nav text-[#646e71]">
              CLICK ANY REVOLVING CARD TO OPEN EVENT & REGISTRATION
            </span>
          </div>

          {/* Bottom Center Switcher Pills */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-[#010101]/90 px-2 py-1.5 rounded-[100px] border border-[#252525]">
            <button
              onClick={() => {
                playBeep?.(800, 0.04)
                setActiveVisual('orbit')
              }}
              className={`px-3 py-1 rounded-[100px] text-[11px] font-mono-nav tracking-[1.04px] transition-colors cursor-pointer ${
                activeVisual === 'orbit'
                  ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#252525]'
                  : 'text-[#646e71] hover:text-[#e0e0e0]'
              }`}
            >
              ORBIT GALLERY
            </button>
            <button
              onClick={() => {
                playBeep?.(800, 0.04)
                setActiveVisual('core')
              }}
              className={`px-3 py-1 rounded-[100px] text-[11px] font-mono-nav tracking-[1.04px] transition-colors cursor-pointer ${
                activeVisual === 'core'
                  ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#252525]'
                  : 'text-[#646e71] hover:text-[#e0e0e0]'
              }`}
            >
              GYROSCOPE
            </button>
          </div>
        </div>
      </div>

      {/* Utility Instrument Telemetry Row */}
      <div className="mt-4 flex items-center justify-between w-full px-1 text-[11px] font-mono-nav text-[#646e71]">
        <span>COORDINATES: 21.2497° N, 81.6050° E</span>
        <span>STATUS: ACTIVE OBSERVATORY</span>
        <span>EDITION: 2026</span>
      </div>
    </section>
  )
}
