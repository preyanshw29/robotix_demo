"use client"

import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Target, Radio, Compass, Activity, Shield } from 'lucide-react'

export interface ContestProtocol {
  id: string
  code: string
  tag: string
  title: string
  role: string
  summary: string
  telemetry: { label: string; val: string }[]
  radarLabel: string
  scanPoints: { x: number; y: number; label: string; status: string }[]
}

export const CONTESTS: ContestProtocol[] = [
  {
    id: 'aerovision',
    code: '01 // PROTOCOL',
    tag: 'AERIAL EDGE AI',
    title: 'AeroVision',
    role: 'Autonomous AI Drone Grand Prix',
    summary: 'Zero human pilots. Micro-drones with on-board edge AI navigate high-speed optical neon gate circuits autonomously.',
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
    summary: 'Inspired by Boston Dynamics. Legged robots conquer stairs, balance beams, gravel pits, and dynamic side-impact recovery.',
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
    summary: 'Control precision robotic arms and rovers using EEG brainwave headsets and camera hand gestures. Zero physical gamepads permitted.',
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
    summary: 'Search-and-rescue rover deployed in a dark, zero-visibility labyrinth guided solely by 2D/3D LiDAR and thermal telemetry feeds.',
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

// Lusion-Style Text Decrypt / Scramble Hook
function useScrambleText(targetText: string, triggerKey: any) {
  const [displayText, setDisplayText] = useState(targetText)
  const chars = '_01X#/[ ]*+=%&<>'

  useEffect(() => {
    let iteration = 0
    let interval: any = null
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
        clearInterval(interval)
        setDisplayText(targetText)
      }
      iteration += 1
    }, 20)

    return () => clearInterval(interval)
  }, [targetText, triggerKey])

  return displayText
}

// Living Lusion-Style Canvas Radar Component
function LivingRadar({
  current,
  onPointClick,
  playBeep,
}: {
  current: ContestProtocol
  onPointClick: (pt: { label: string; status: string }) => void
  playBeep?: (freq?: number, duration?: number) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activePt, setActivePt] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let angle = 0
    let rippleRadius = 0

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700)
    const height = (canvas.height = 240)
    const cx = width / 2
    const cy = height / 2

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Background Grid
      ctx.strokeStyle = '#1a1a1d'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, cy)
      ctx.lineTo(width, cy)
      ctx.moveTo(cx, 0)
      ctx.lineTo(cx, height)
      ctx.stroke()

      // Concentric Range Rings
      const rings = [35, 75, 115]
      rings.forEach((r) => {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(37, 37, 37, 0.7)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Expanding Sonar Wave Ripple
      rippleRadius = (rippleRadius + 0.6) % 130
      ctx.beginPath()
      ctx.arc(cx, cy, rippleRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(224, 224, 224, ${Math.max(0, 0.35 * (1 - rippleRadius / 130))})`
      ctx.lineWidth = 1
      ctx.stroke()

      // Rotating Radar Beam with Phosphor Gradient Sweep
      angle += 0.022
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 150)
      gradient.addColorStop(0, 'rgba(224, 224, 224, 0.4)')
      gradient.addColorStop(0.3, 'rgba(224, 224, 224, 0.12)')
      gradient.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, 150, -Math.PI / 4, 0, false)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Beam Leading Edge Line
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(150, 0)
      ctx.strokeStyle = 'rgba(224, 224, 224, 0.65)'
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()

      // Connecting Laser Paths between Waypoints
      ctx.strokeStyle = 'rgba(100, 110, 113, 0.3)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      current.scanPoints.forEach((pt, i) => {
        const px = pt.x * width
        const py = pt.y * height
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      })
      ctx.stroke()
      ctx.setLineDash([])

      // Draw Interactive Waypoints
      current.scanPoints.forEach((pt) => {
        const px = pt.x * width
        const py = pt.y * height
        const dx = px - cx
        const dy = py - cy
        const ptAngle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2)
        const currentAngleNorm = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const angleDiff = Math.abs(currentAngleNorm - ptAngle)
        const isSwept = angleDiff < 0.22 || angleDiff > Math.PI * 2 - 0.22

        // Pulsing node glow when swept by radar
        if (isSwept) {
          ctx.beginPath()
          ctx.arc(px, py, 10, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(224, 224, 224, 0.5)'
          ctx.stroke()
        }

        // Waypoint dot
        ctx.beginPath()
        ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = isSwept ? '#ffffff' : '#e0e0e0'
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.parentElement?.clientWidth || 700
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [current])

  return (
    <div className="relative w-full h-[240px] rounded-xl bg-[#010101] border border-[#252525] overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive HTML Waypoint Overlays */}
      {current.scanPoints.map((pt, i) => (
        <div
          key={i}
          style={{ left: `${pt.x * 100}%`, top: `${pt.y * 100}%` }}
          onClick={() => {
            playBeep?.(1200, 0.05)
            setActivePt(pt.label)
            onPointClick(pt)
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group cursor-pointer p-1"
        >
          <div className="w-2.5 h-2.5 rounded-full border border-[#444444] bg-[#010101] group-hover:border-[#e0e0e0] group-hover:scale-150 transition-all flex items-center justify-center">
            <div className="w-1 h-1 bg-[#e0e0e0] rounded-full" />
          </div>
          <span className="text-[10px] font-mono-nav text-[#646e71] group-hover:text-[#e0e0e0] transition-colors whitespace-nowrap bg-[#010101]/80 px-1.5 py-0.5 rounded border border-[#252525]/60">
            {pt.label} <span className="text-[#828b8d]">[{pt.status}]</span>
          </span>
        </div>
      ))}

      {/* Corner Telemetry Readouts */}
      <div className="absolute bottom-3 left-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0] animate-ping" />
        <span>RADAR MATRIX // {current.radarLabel}</span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none">
        LUSION KINETIC SIMULATOR
      </div>
    </div>
  )
}

export default function EventsSection({
  onRegisterClick,
  playBeep,
}: {
  onRegisterClick: (eventTitle?: string) => void
  playBeep?: (freq?: number, duration?: number) => void
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = CONTESTS[activeIdx]

  // Lusion Text Decrypt Animation
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

    // Gentle 3D perspective rotation (-5deg to +5deg)
    const rx = -((y - centerY) / centerY) * 4
    const ry = ((x - centerX) / centerX) * 4

    setMousePos({ x, y, rx, ry, isHover: true })
  }

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, rx: 0, ry: 0, isHover: false }))
  }

  return (
    <section id="contests" className="relative w-full pt-16 pb-32 px-4 max-w-[940px] mx-auto scroll-mt-20">
      
      {/* Process Step Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#252525] text-[13px] font-mono-nav">
        <span className="text-[#e0e0e0]">02 // CONTESTS</span>
        <span className="text-[#646e71]">04 ACTIVE PROTOCOLS</span>
      </div>

      {/* Feature Module Heading & Tab Matrix */}
      <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#e0e0e0] font-display leading-[1.1] tracking-[-0.02em]">
            Engineered gauntlets.
          </h2>
          <p className="mt-2 text-[#828b8d] text-sm sm:text-base leading-[1.4] max-w-[480px]">
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
                    ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#646e71] shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                    : 'bg-transparent text-[#646e71] hover:text-[#e0e0e0] hover:bg-[#1f1f23]/50 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#e0e0e0]' : 'text-[#444444] group-hover:text-[#828b8d]'}>
                  0{idx + 1}
                </span>
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Lusion-Style Interactive 3D Tilt Card with Reactive Cursor Spotlight */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: mousePos.isHover
            ? `perspective(1000px) rotateX(${mousePos.rx}deg) rotateY(${mousePos.ry}deg) scale3d(1.01, 1.01, 1.01)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: mousePos.isHover ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        className="group mt-8 relative rounded-2xl bg-[#16191b] border border-[#252525] p-6 sm:p-8 shadow-2xl select-none overflow-hidden"
      >
        {/* Cursor Spotlight Radial Glow */}
        {mousePos.isHover && (
          <div
            style={{
              background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.06), transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200"
          />
        )}

        {/* Top Tag & Title with Scrambled Kinetic Text Reveal */}
        <div className="flex items-center justify-between pb-4 border-b border-[#252525]">
          <div>
            <span className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-[2.4px]">
              {current.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal font-display text-[#e0e0e0] mt-0.5 flex items-baseline gap-2">
              <span className="text-white font-medium">{scrambledTitle}</span>
              <span className="text-sm font-sans text-[#828b8d]">
                — {scrambledRole}
              </span>
            </h3>
          </div>

          <button
            onClick={() => {
              playBeep?.(1000, 0.06)
              onRegisterClick(current.title)
            }}
            className="h-[38px] px-5 rounded-[100px] bg-[#1f1f23] hover:bg-[#28282e] border border-[#252525] hover:border-[#828b8d] text-[#e0e0e0] text-[12px] font-mono-nav tracking-[1.04px] flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#646e71] group-hover:text-[#e0e0e0] transition-colors" />
          </button>
        </div>

        {/* Short Summary */}
        <p className="mt-5 text-[#828b8d] text-sm sm:text-base leading-[1.4] max-w-[700px]">
          {current.summary}
        </p>

        {/* Living Sonar Radar Sweep */}
        <div className="mt-6">
          <LivingRadar
            current={current}
            onPointClick={() => {}}
            playBeep={playBeep}
          />
        </div>

        {/* Telemetry Matrix Grid with Clear Spacing */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#252525]">
          {current.telemetry.map((t) => (
            <div key={t.label} className="p-3 rounded-xl bg-[#010101] border border-[#252525]">
              <div className="text-[10px] font-mono-nav text-[#646e71] uppercase tracking-wider">
                {t.label}
              </div>
              <div className="text-xs sm:text-sm font-mono-nav text-[#e0e0e0] mt-1 font-medium">
                {t.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
