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
    <section className="relative w-full pt-16 md:pt-24 pb-8 flex flex-col items-center">
      
      {/* Editorial Monumental Headline with High-Contrast Ghost Purple Spectral Glow */}
      <h1 className="font-display text-center text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fae8ff] to-[#e879f9] text-6xl sm:text-8xl md:text-[100px] leading-[1.0] select-none uppercase px-4 drop-shadow-[0_0_50px_rgba(232,121,249,0.5)]">
        Robofest
      </h1>

      {/* Narrow Centered Supporting Paragraph in Muted Lilac-Steel */}
      <p className="mt-4 text-center text-[#c4b5d6] text-base sm:text-lg max-w-[540px] leading-[1.4] font-normal px-4">
        Autonomous systems observatory, kinetic trials, and robotics exhibition presented by ROBOTiX Club at NIT Raipur.
      </p>

      {/* Action Controls: Ghost Purple Charcoal Pill & Glowing Pass Link */}
      <div className="mt-8 flex items-center justify-center gap-4 px-4">
        <a
          href="#contests"
          onClick={() => playBeep?.(850, 0.05)}
          className="h-[38px] px-6 rounded-[100px] bg-gradient-to-r from-[#180e28] via-[#10081c] to-[#07040d] hover:from-[#2e1065] hover:to-[#4a044e] border border-[#e879f9]/50 hover:border-[#fae8ff] hover:shadow-[0_0_25px_rgba(232,121,249,0.4)] text-[#fae8ff] hover:text-white text-[13px] font-mono-nav tracking-[1.04px] flex items-center justify-center cursor-pointer transition-all"
        >
          VIEW CONTESTS
        </a>

        <button
          onClick={() => {
            playBeep?.(950, 0.05)
            onRegisterClick()
          }}
          className="h-[38px] px-2 text-[#e879f9] hover:text-white text-[13px] font-mono-nav tracking-[1.04px] border-b border-[#e879f9] hover:border-white transition-all cursor-pointer bg-transparent drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]"
        >
          DELEGATE PASS →
        </button>
      </div>

      {/* Full-Breadth Panoramic 3D Viewport: Extends completely from left to right covering the entire window */}
      <div className="mt-12 w-full overflow-hidden relative">
        {/* Subtle Ghost Purple Degrading Flame Aura behind the 3D gallery */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[350px] bg-[radial-gradient(ellipse,rgba(168,85,247,0.12)_0%,rgba(88,28,135,0.04)_50%,transparent_75%)] blur-2xl pointer-events-none" />

        <div className="relative w-full h-[520px] sm:h-[600px] md:h-[680px] lg:h-[740px] bg-[#010101] border-y border-[#7e22ce]/25 select-none">
          
          {/* Active 3D Visualizer */}
          {activeVisual === 'orbit' ? (
            <OrbitGalleryCanvas 
              className="w-full h-full cursor-grab active:cursor-grabbing" 
              onSelectEvent={handleSelectFromOrbit}
            />
          ) : (
            <div className="max-w-[940px] h-full mx-auto p-4 flex items-center justify-center">
              <ThreeScene />
            </div>
          )}

          {/* Top Left Instrument Label */}
          <div className="absolute top-6 left-6 sm:left-12 z-10 flex flex-col gap-1 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] shadow-[0_0_8px_#c084fc]" />
              <span className="text-[11px] font-mono-nav text-[#f3e8ff]">
                {activeVisual === 'orbit' ? 'PANORAMIC ORBIT // FULL BREADTH' : 'AUTONOMOUS CORE // SYS_REV.04'}
              </span>
            </div>
            <span className="text-[10px] font-mono-nav text-[#8e889b]">
              CLICK ANY REVOLVING CARD TO OPEN EVENT & REGISTRATION
            </span>
          </div>

          {/* Top Right Coordinate Tag */}
          <div className="hidden sm:block absolute top-6 right-6 sm:right-12 z-10 text-[10px] font-mono-nav text-[#8e889b] pointer-events-none text-right">
            <span>OBSERVATORY BREADTH: 100VW</span>
            <span className="block mt-0.5 text-[#581c87]">COORDINATES: [21.2497° N, 81.6050° E]</span>
          </div>

          {/* Bottom Center Switcher Pills */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-[#0d0c12]/90 backdrop-blur-md px-2 py-1.5 rounded-[100px] border border-[#7e22ce]/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <button
              onClick={() => {
                playBeep?.(800, 0.04)
                setActiveVisual('orbit')
              }}
              className={`px-3 py-1 rounded-[100px] text-[11px] font-mono-nav tracking-[1.04px] transition-colors cursor-pointer ${
                activeVisual === 'orbit'
                  ? 'bg-[#1f1a2c] text-[#f3e8ff] border border-[#a855f7]/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                  : 'text-[#8e889b] hover:text-[#f3e8ff]'
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

          {/* Bottom Indicators */}
          <div className="hidden md:flex absolute bottom-6 left-12 z-10 items-center gap-2 text-[10px] font-mono-nav text-[#646e71] pointer-events-none">
            <span>DRAG TO ROTATE • SCROLL TO ZOOM</span>
          </div>
          <div className="hidden md:flex absolute bottom-6 right-12 z-10 items-center gap-2 text-[10px] font-mono-nav text-[#646e71] pointer-events-none">
            <span>ROBOTiX LABS // NIT RAIPUR</span>
          </div>
        </div>
      </div>

      {/* Utility Instrument Telemetry Row */}
      <div className="mt-4 flex items-center justify-between w-full max-w-[940px] px-4 text-[11px] font-mono-nav text-[#646e71]">
        <span>COORDINATES: 21.2497° N, 81.6050° E</span>
        <span>STATUS: ACTIVE OBSERVATORY</span>
        <span>EDITION: 2026</span>
      </div>
    </section>
  )
}
