/**
 * ============================================================================
 * ROBOFEST '26 — CONTESTS & GAUNTLETS SECTION
 * File: src/components/EventsSection.tsx
 * Description: Engineering gauntlets showcase featuring:
 *              - Lusion-inspired procedural text decryption / decrypt scrambler
 *              - Interactive 3D perspective magnetic tilt card with cursor radial spotlight
 *              - Perimeter licking ghost flame canvas border with scattering dust embers
 *              - 4 personalized 60 FPS motion graphics canvas simulators:
 *                (1) AeroVision (Neon Gate Aerial Navigation)
 *                (2) Mecha Gauntlet (Trotting Quadruped IK & Multi-Surface Terrain)
 *                (3) NeuroBotix (Dual Alpha/Beta EEG & 6-DOF Robotic Arm)
 *                (4) Cyber Salvage (360° LiDAR Ray-Casting & FLIR Thermal Beacon)
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import GhostFlameBorder from './GhostFlameBorder'
import { DynamicContestVisualizer } from './simulators'
import type { ContestProtocol } from '../types'

export type { ContestProtocol }

/**
 * 4 Core Engineering Gauntlet Protocols Specification
 */
export const CONTESTS: ContestProtocol[] = [
  {
    id: 'aerovision',
    code: '01 // PROTOCOL',
    tag: 'AERIAL EDGE AI',
    title: 'AeroVision',
    role: 'Autonomous AI Drone Grand Prix',
    summary:
      'Zero human pilots. Micro-drones with on-board edge AI navigate high-speed optical neon gate circuits autonomously.',
    telemetry: [
      { label: 'COMPUTE', val: 'Jetson Nano / RPi 5' },
      { label: 'PAYLOAD', val: 'Max 800g mass' },
      { label: 'CONTROL', val: '100% Computer Vision' },
      { label: 'PURSE', val: '₹30,000' },
    ],
    radarLabel: 'OPTICAL RING SEQUENCING',
    scanPoints: [
      { x: 0.28, y: 0.32, label: 'GATE_01', status: 'LOCKED' },
      { x: 0.72, y: 0.28, label: 'GATE_02', status: 'PENDING' },
      { x: 0.65, y: 0.74, label: 'GATE_03', status: 'OPTIMAL' },
      { x: 0.32, y: 0.68, label: 'LANDING_PAD', status: 'STANDBY' },
    ],
  },
  {
    id: 'mechagauntlet',
    code: '02 // PROTOCOL',
    tag: 'KINEMATICS & LEGGED BOTS',
    title: 'Mecha Gauntlet',
    role: 'Quadruped & Bipedal Agility Trial',
    summary:
      'Inspired by Boston Dynamics. Legged robots conquer stairs, balance beams, gravel pits, and dynamic side-impact recovery.',
    telemetry: [
      { label: 'KINEMATICS', val: 'Compliant Quadruped' },
      { label: 'TERRAIN', val: 'Multi-Surface Track' },
      { label: 'BONUS', val: '1.5x Autonomous Gait' },
      { label: 'PURSE', val: '₹35,000' },
    ],
    radarLabel: 'BALANCE & STABILITY GAUNTLET',
    scanPoints: [
      { x: 0.22, y: 0.42, label: 'INCLINE_RAMP', status: 'ACTIVE' },
      { x: 0.50, y: 0.28, label: 'GRAVEL_BED', status: 'TRAVERSED' },
      { x: 0.78, y: 0.58, label: 'STAIR_RISERS', status: 'STABLE' },
      { x: 0.42, y: 0.78, label: 'BALANCE_BEAM', status: 'NOMINAL' },
    ],
  },
  {
    id: 'neurobotix',
    code: '03 // PROTOCOL',
    tag: 'HUMAN-ROBOT INTERACTION',
    title: 'NeuroBotix',
    role: 'Mind-Controlled & Gesture Tele-Op',
    summary:
      'Control precision robotic arms and rovers using EEG brainwave headsets and camera hand gestures. Zero physical gamepads permitted.',
    telemetry: [
      { label: 'INTERFACE', val: 'OpenBCI EEG / CV' },
      { label: 'MECHANISM', val: '6-DOF Tabletop Arm' },
      { label: 'CRITERIA', val: 'Latency & Precision' },
      { label: 'PURSE', val: '₹25,000' },
    ],
    radarLabel: 'NEURAL CONCENTRATION THRESHOLD',
    scanPoints: [
      { x: 0.36, y: 0.26, label: 'ALPHA_BAND', status: 'LOCKED' },
      { x: 0.68, y: 0.34, label: 'BETA_STABILITY', status: 'SYNCED' },
      { x: 0.52, y: 0.64, label: 'PEG_ASSEMBLY', status: 'TARGET' },
      { x: 0.24, y: 0.72, label: 'SORTING_TRAY', status: 'READY' },
    ],
  },
  {
    id: 'cyberneticsalvage',
    code: '04 // PROTOCOL',
    tag: 'DISASTER RESCUE SLAM',
    title: 'Cyber Salvage',
    role: 'Subterranean SLAM Rescue',
    summary:
      'Search-and-rescue rover deployed in a dark, zero-visibility labyrinth guided solely by 2D/3D LiDAR and thermal telemetry feeds.',
    telemetry: [
      { label: 'SENSORS', val: 'LiDAR + FLIR Thermal' },
      { label: 'MAZE', val: 'Zero-Visibility Smoked' },
      { label: 'OBJECTIVE', val: 'Occupancy Grid + Map' },
      { label: 'PURSE', val: '₹30,000' },
    ],
    radarLabel: 'LIDAR OCCUPANCY GRID MAPPING',
    scanPoints: [
      { x: 0.28, y: 0.22, label: 'SECTOR_A_HAZARD', status: 'WARNING' },
      { x: 0.76, y: 0.38, label: 'THERMAL_BEACON', status: 'DETECTED' },
      { x: 0.44, y: 0.68, label: 'COLLAPSED_ARCH', status: 'MAPPED' },
      { x: 0.22, y: 0.62, label: 'EXTRACTION_ZONE', status: 'SAFE' },
    ],
  },
]

/**
 * Lusion-Style Text Decrypt / Scramble Hook
 * Progressively reveals clear text by cycling random glyphs at 20ms intervals.
 */
function useScrambleText(targetText: string, triggerKey: any): string {
  const [displayText, setDisplayText] = useState(targetText)
  const chars = '_01X#/[ ]*+=%&<>'

  useEffect(() => {
    let iteration = 0
    let interval: ReturnType<typeof setInterval> | null = null
    const maxIterations = targetText.length * 2.5

    interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration / 2.5) return targetText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= maxIterations) {
        if (interval) clearInterval(interval)
        setDisplayText(targetText)
      }
      iteration += 1
    }, 20)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [targetText, triggerKey])

  return displayText
}

/**
 * EventsSection Component
 */
export default function EventsSection({
  onRegisterClick,
  playBeep,
}: {
  onRegisterClick: (eventTitle?: string) => void
  playBeep?: (freq?: number, duration?: number) => void
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = CONTESTS[activeIdx]

  // Lusion Text Decrypt Animation for Title and Operational Role
  const scrambledTitle = useScrambleText(current.title, activeIdx)
  const scrambledRole = useScrambleText(current.role, activeIdx)

  // Lusion 3D Interactive Magnetic Tilt & Spotlight State
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rx: 0, ry: 0, isHover: false })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Gentle 3D perspective rotation (-4deg to +4deg)
    const rx = -((y - centerY) / centerY) * 4
    const ry = ((x - centerX) / centerX) * 4

    setMousePos({ x, y, rx, ry, isHover: true })
  }

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, rx: 0, ry: 0, isHover: false }))
  }

  return (
    <section id="contests" className="relative w-full pt-16 pb-32 px-4 max-w-[940px] mx-auto scroll-mt-20">
      {/* Process Step Header with Ghost Purple Accents */}
      <div className="flex items-center justify-between pb-3 border-b border-[#3b0764]/60 text-[13px] font-mono-nav">
        <span className="text-[#fae8ff] drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]">02 // CONTESTS</span>
        <span className="text-[#c084fc]">04 ACTIVE PROTOCOLS</span>
      </div>

      {/* Feature Module Heading & Tab Matrix */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#fae8ff] font-display leading-[1.1] tracking-[-0.02em] drop-shadow-[0_0_20px_rgba(192,38,211,0.25)]">
            Engineered gauntlets.
          </h2>
          <p className="mt-2 text-[#a89cb8] text-sm sm:text-base leading-[1.4] max-w-[480px]">
            Autonomous vision drones, legged kinematics, BCI neuro-controls, and subterranean LiDAR rescue.
          </p>
        </div>

        {/* Lusion Magnetic Pill Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {CONTESTS.map((item, idx) => {
            const isActive = activeIdx === idx
            return (
              <button
                key={item.id}
                onClick={() => {
                  playBeep?.(850, 0.04)
                  setActiveIdx(idx)
                }}
                className={`group relative h-[36px] px-4 rounded-[100px] text-[12px] font-mono-nav tracking-[1.04px] transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2a1340] text-[#fae8ff] border border-[#e879f9] shadow-[0_0_20px_rgba(232,121,249,0.4)]'
                    : 'bg-transparent text-[#a89cb8] hover:text-[#fae8ff] hover:bg-[#180e28] border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#e879f9]' : 'text-[#701a75] group-hover:text-[#c084fc]'}>
                  0{idx + 1}
                </span>
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Lusion-Style Interactive 3D Tilt Card Wrapped in Animated Licking Flames & Scattering Dust Embers */}
      <GhostFlameBorder radius={16} intensity="high" showEmbers={true} className="mt-8">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: mousePos.isHover
              ? `perspective(1000px) rotateX(${mousePos.rx}deg) rotateY(${mousePos.ry}deg) scale3d(1.01, 1.01, 1.01)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: mousePos.isHover
              ? 'transform 0.1s ease-out'
              : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="group relative rounded-2xl bg-gradient-to-b from-[#180e28] via-[#10081c] to-[#07040d] border border-[#a855f7]/40 p-6 sm:p-8 shadow-[0_25px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(217,70,239,0.22),inset_0_0_25px_rgba(112,26,117,0.18)] select-none overflow-hidden"
        >
          {/* Ghost Purple Degrading Flame Rim Aura behind card */}
          <div className="absolute -inset-1 bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.22)_0%,rgba(112,26,117,0.06)_50%,transparent_75%)] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Cursor Spotlight Radial Glow with Vivid Ghost Purple Tone */}
          {mousePos.isHover && (
            <div
              style={{
                background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 121, 249, 0.16), transparent 70%)`,
              }}
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200"
            />
          )}

          {/* Top Tag & Title with Scrambled Kinetic Text Reveal */}
          <div className="flex items-center justify-between pb-4 border-b border-[#3b0764]/60 relative z-20">
            <div>
              <span className="text-[10px] font-mono-nav text-[#e879f9] uppercase tracking-[2.4px] drop-shadow-[0_0_8px_rgba(232,121,249,0.5)]">
                {current.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal font-display text-[#fae8ff] mt-0.5 flex items-baseline gap-2">
                <span className="text-white font-medium drop-shadow-[0_0_16px_rgba(232,121,249,0.5)]">
                  {scrambledTitle}
                </span>
                <span className="text-sm font-sans text-[#a89cb8]">— {scrambledRole}</span>
              </h3>
            </div>

            <button
              onClick={() => {
                playBeep?.(1000, 0.06)
                onRegisterClick(current.title)
              }}
              className="h-[38px] px-5 rounded-[100px] bg-gradient-to-r from-[#701a75] via-[#4a044e] to-[#2e1065] hover:from-[#a21caf] hover:to-[#581c87] border border-[#e879f9]/50 hover:border-[#fae8ff] text-[#fae8ff] hover:shadow-[0_0_25px_rgba(232,121,249,0.5)] text-[12px] font-mono-nav tracking-[1.04px] flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md"
            >
              <span>REGISTER</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#fae8ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Short Summary */}
          <p className="mt-5 text-[#a89cb8] text-sm sm:text-base leading-[1.4] max-w-[700px] relative z-20">
            {current.summary}
          </p>

          {/* Dynamic Personalized Motion Visualizer (Tailored to each contest) */}
          <div className="mt-6 relative z-20">
            <DynamicContestVisualizer
              current={current}
              onPointClick={() => {}}
              playBeep={playBeep}
            />
          </div>

          {/* Telemetry Matrix Grid with Clear Spacing & Ghost Purple Borders */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#3b0764]/60 relative z-20">
            {current.telemetry.map((t) => (
              <div
                key={t.label}
                className="p-3 rounded-xl bg-[#090510] border border-[#3b0764]/60 hover:border-[#c026d3] transition-colors"
              >
                <div className="text-[10px] font-mono-nav text-[#c084fc] uppercase tracking-wider">
                  {t.label}
                </div>
                <div className="text-xs sm:text-sm font-mono-nav text-[#fae8ff] mt-1 font-medium drop-shadow-[0_0_6px_rgba(232,121,249,0.4)]">
                  {t.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </GhostFlameBorder>
    </section>
  )
}
