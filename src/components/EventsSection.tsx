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

// ============================================================================
// 1. AEROVISION VISUALIZER: 3D High-Speed Optical Drone Corridor & Flight Sim
// ============================================================================
function AeroVisionVisualizer({
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
    let time = 0

    // Stars / Speed dust particles
    const particles: { x: number; y: number; z: number }[] = []
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 220,
        z: Math.random() * 400 + 20,
      })
    }

    const render = () => {
      time += 0.03
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700)
      const height = (canvas.height = 250)
      const cx = width / 2
      const cy = height / 2

      ctx.clearRect(0, 0, width, height)

      // 1. Perspective Tunnel Wireframe
      ctx.strokeStyle = '#18181b'
      ctx.lineWidth = 1
      const vanishingX = cx + Math.sin(time * 0.8) * 40
      const vanishingY = cy + Math.cos(time * 0.6) * 15

      // Longitudinal corridor lines
      const corners = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
        [0, cy],
        [width, cy],
      ]
      corners.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(vanishingX, vanishingY)
        ctx.stroke()
      })

      // Forward rushing perspective floor grid lines
      const gridOffset = (time * 120) % 60
      for (let z = gridOffset; z < 400; z += 60) {
        const factor = 120 / (z + 120)
        const py = cy + (height - cy) * factor
        ctx.beginPath()
        ctx.moveTo(cx - (cx * factor), py)
        ctx.lineTo(cx + (cx * factor), py)
        ctx.strokeStyle = `rgba(37, 37, 37, ${Math.max(0, 0.6 * (1 - z / 400))})`
        ctx.stroke()
      }

      // 2. Speed Dust / Streamline Particles
      particles.forEach((p) => {
        p.z -= 4.5
        if (p.z <= 10) {
          p.z = 400
          p.x = (Math.random() - 0.5) * 500
          p.y = (Math.random() - 0.5) * 220
        }
        const scale = 140 / p.z
        const px = vanishingX + p.x * scale
        const py = vanishingY + p.y * scale
        const alpha = Math.min(1, Math.max(0, (400 - p.z) / 300))

        ctx.fillStyle = `rgba(224, 224, 224, ${alpha * 0.6})`
        ctx.fillRect(px, py, Math.max(1, 2.5 * scale), Math.max(1, 2.5 * scale))
      })

      // 3. Receding 3D Optical Neon Ring Gates
      const gateCount = 4
      for (let g = 0; g < gateCount; g++) {
        const gateProgress = ((time * 0.35 + g * 0.25) % 1)
        const depth = (1 - gateProgress) * 350 + 40
        const scale = 120 / depth
        const gx = vanishingX + Math.sin(time + g) * 30 * scale
        const gy = vanishingY + Math.cos(time * 0.7 + g) * 20 * scale
        const gw = 110 * scale
        const gh = 70 * scale
        const alpha = Math.min(1, gateProgress * 1.8)

        ctx.save()
        ctx.translate(gx, gy)

        // Gate ring rounded rectangle
        ctx.strokeStyle = g === 0 ? 'rgba(255, 255, 255, 0.85)' : `rgba(200, 200, 200, ${alpha * 0.45})`
        ctx.lineWidth = g === 0 ? 2 : 1.2
        ctx.strokeRect(-gw / 2, -gh / 2, gw, gh)

        // Optical LED corner markers on gate
        const cornerSize = 8 * scale
        ctx.fillStyle = '#e0e0e0'
        ctx.fillRect(-gw / 2, -gh / 2, cornerSize, 2)
        ctx.fillRect(-gw / 2, -gh / 2, 2, cornerSize)
        ctx.fillRect(gw / 2 - cornerSize, -gh / 2, cornerSize, 2)
        ctx.fillRect(gw / 2 - 2, -gh / 2, 2, cornerSize)
        ctx.fillRect(-gw / 2, gh / 2 - 2, cornerSize, 2)
        ctx.fillRect(-gw / 2, gh / 2 - cornerSize, 2, cornerSize)
        ctx.fillRect(gw / 2 - cornerSize, gh / 2 - 2, cornerSize, 2)
        ctx.fillRect(gw / 2 - 2, gh / 2 - cornerSize, 2, cornerSize)

        // Gate ID Tag in perspective
        if (scale > 0.4) {
          ctx.fillStyle = 'rgba(130, 139, 141, 0.7)'
          ctx.font = '9px monospace'
          ctx.fillText(`GATE // 0${g + 1}`, -gw / 2 + 4, -gh / 2 - 5)
        }
        ctx.restore()
      }

      // 4. Drone Cockpit HUD Crosshair & Attitude Horizon
      const droneX = cx + Math.sin(time * 1.4) * 55
      const droneY = cy + Math.cos(time * 1.1) * 28
      const bankAngle = Math.sin(time * 1.4) * 0.2

      ctx.save()
      ctx.translate(droneX, droneY)
      ctx.rotate(bankAngle)

      // Drone Artificial Horizon Ladder
      ctx.strokeStyle = 'rgba(224, 224, 224, 0.75)'
      ctx.lineWidth = 1.2

      // Central Reticle
      ctx.beginPath()
      ctx.arc(0, 0, 16, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0, 0, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // Horizontal roll bars
      ctx.beginPath()
      ctx.moveTo(-32, 0)
      ctx.lineTo(-18, 0)
      ctx.moveTo(18, 0)
      ctx.lineTo(32, 0)
      ctx.moveTo(0, -22)
      ctx.lineTo(0, -14)
      ctx.stroke()

      // 4 Spinning Rotors Indicator
      const rotorRadius = 14
      const rotorAngle = time * 25
      const quadOffsets = [
        [-38, -24],
        [38, -24],
        [-38, 24],
        [38, 24],
      ]
      quadOffsets.forEach(([qx, qy]) => {
        // Arm
        ctx.strokeStyle = 'rgba(100, 110, 113, 0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(qx, qy)
        ctx.stroke()

        // Spinning rotor disc
        ctx.save()
        ctx.translate(qx, qy)
        ctx.rotate(rotorAngle)
        ctx.strokeStyle = 'rgba(224, 224, 224, 0.35)'
        ctx.beginPath()
        ctx.ellipse(0, 0, rotorRadius, rotorRadius / 3, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      })

      ctx.restore()

      // Spline flight path connecting gates
      ctx.strokeStyle = 'rgba(224, 224, 224, 0.25)'
      ctx.setLineDash([3, 4])
      ctx.beginPath()
      current.scanPoints.forEach((pt, i) => {
        const px = pt.x * width
        const py = pt.y * height
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      })
      ctx.stroke()
      ctx.setLineDash([])

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
    <div className="relative w-full h-[250px] rounded-xl bg-[#010101] border border-[#252525] overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive Waypoints */}
      {current.scanPoints.map((pt, i) => (
        <div
          key={i}
          style={{ left: `${pt.x * 100}%`, top: `${pt.y * 100}%` }}
          onClick={() => {
            playBeep?.(1350, 0.05)
            setActivePt(pt.label)
            onPointClick(pt)
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group cursor-pointer p-1"
        >
          <div className="w-2.5 h-2.5 rounded-full border border-[#444444] bg-[#010101] group-hover:border-[#e0e0e0] group-hover:scale-150 transition-all flex items-center justify-center">
            <div className="w-1 h-1 bg-[#e0e0e0] rounded-full" />
          </div>
          <span className="text-[10px] font-mono-nav text-[#646e71] group-hover:text-[#e0e0e0] transition-colors whitespace-nowrap bg-[#010101]/85 px-1.5 py-0.5 rounded border border-[#252525]/80">
            {pt.label} <span className="text-[#828b8d]">[{pt.status}]</span>
          </span>
        </div>
      ))}

      {/* Bespoke Telemetry Badges */}
      <div className="absolute bottom-3 left-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0] animate-ping" />
        <span>FLIGHT TELEMETRY // VEL: 21.4 M/S // LATENCY: 3.8 MS</span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-3">
        <span>OPTICAL FLOW: <span className="text-[#e0e0e0]">LOCKED</span></span>
        <span>CIRCUIT: <span className="text-[#e0e0e0]">03/05</span></span>
      </div>
    </div>
  )
}

// ============================================================================
// 2. MECHA GAUNTLET VISUALIZER: Dynamic Quadruped Kinematics & Terrain Trial
// ============================================================================
function MechaGauntletVisualizer({
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
    let time = 0

    const render = () => {
      time += 0.025
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700)
      const height = (canvas.height = 250)

      ctx.clearRect(0, 0, width, height)

      // Terrain profile height function
      const getGroundY = (x: number) => {
        const norm = x / width
        // 0 to 0.28: Incline Ramp
        if (norm < 0.28) {
          return height * 0.8 - (norm / 0.28) * 45
        }
        // 0.28 to 0.55: Gravel Bed (jagged)
        if (norm < 0.55) {
          const gravelBase = height * 0.8 - 45
          const noise = Math.sin(norm * 140) * 4 + Math.cos(norm * 220) * 2.5
          return gravelBase + noise
        }
        // 0.55 to 0.78: Stair Risers
        if (norm < 0.78) {
          const stairStep = Math.floor((norm - 0.55) / 0.076)
          return height * 0.8 - 45 - stairStep * 14
        }
        // 0.78 to 1.0: Narrow Balance Beam
        return height * 0.8 - 90
      }

      // 1. Draw Multi-Surface Terrain Cross-Section
      ctx.beginPath()
      ctx.moveTo(0, height)
      for (let x = 0; x <= width; x += 3) {
        ctx.lineTo(x, getGroundY(x))
      }
      ctx.lineTo(width, height)
      ctx.closePath()

      // Terrain Fill Gradient
      const terrainGrad = ctx.createLinearGradient(0, height * 0.4, 0, height)
      terrainGrad.addColorStop(0, 'rgba(28, 30, 34, 0.8)')
      terrainGrad.addColorStop(1, '#050505')
      ctx.fillStyle = terrainGrad
      ctx.fill()

      // Terrain Surface Stroke
      ctx.strokeStyle = '#38383e'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (let x = 0; x <= width; x += 3) {
        if (x === 0) ctx.moveTo(x, getGroundY(x))
        else ctx.lineTo(x, getGroundY(x))
      }
      ctx.stroke()

      // Sub-surface hatching lines
      ctx.strokeStyle = 'rgba(37, 37, 37, 0.4)'
      ctx.lineWidth = 1
      for (let x = 15; x < width; x += 22) {
        const gy = getGroundY(x)
        ctx.beginPath()
        ctx.moveTo(x, gy)
        ctx.lineTo(x - 12, height)
        ctx.stroke()
      }

      // 2. Animated Quadruped Chassis Trotting across the Terrain
      const botProgress = (time * 0.09) % 1
      const botX = botProgress * (width - 120) + 60
      const botGroundY = getGroundY(botX)

      // Quadruped chassis dimensions
      const chassisW = 60
      const chassisH = 18
      const bodyY = botGroundY - 42 + Math.sin(time * 8) * 3

      // Chassis Pitch Tilt matching terrain slope
      const slopeDx = 25
      const slope = (getGroundY(botX + slopeDx) - getGroundY(botX - slopeDx)) / (slopeDx * 2)
      const pitchAngle = Math.atan(slope)

      ctx.save()
      ctx.translate(botX, bodyY)
      ctx.rotate(pitchAngle)

      // Chassis Body
      ctx.fillStyle = '#16191b'
      ctx.fillRect(-chassisW / 2, -chassisH / 2, chassisW, chassisH)
      ctx.strokeStyle = '#e0e0e0'
      ctx.lineWidth = 1.5
      ctx.strokeRect(-chassisW / 2, -chassisH / 2, chassisW, chassisH)

      // Battery / Sensor Head
      ctx.fillStyle = '#252525'
      ctx.fillRect(chassisW / 2 - 8, -chassisH / 2 + 2, 7, 7)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(chassisW / 2 - 4, -chassisH / 2 + 4, 3, 3)

      // Center of Mass (CoM) marker inside body
      ctx.beginPath()
      ctx.arc(0, 0, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#e0e0e0'
      ctx.fill()

      ctx.restore()

      // 3. Four Articulated Legs with Kinematic Trotting Gait
      const legPairs = [
        { offset: -22, phase: 0 },
        { offset: -14, phase: Math.PI },
        { offset: 14, phase: Math.PI },
        { offset: 22, phase: 0 },
      ]

      legPairs.forEach(({ offset, phase }, idx) => {
        const hipX = botX + offset
        const hipY = bodyY

        // Trotting foot motion
        const cycle = time * 7 + phase
        const footStepX = hipX + Math.sin(cycle) * 16
        const footLift = Math.max(0, Math.cos(cycle)) * 14
        const targetFootY = getGroundY(footStepX) - footLift

        // Two-segment Inverse Kinematics Knee calculation
        const dx = footStepX - hipX
        const dy = targetFootY - hipY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const l1 = 24
        const l2 = 24
        const clampedDist = Math.min(dist, l1 + l2 - 2)

        const angleBase = Math.atan2(dy, dx)
        const cosKnee = (clampedDist * clampedDist - l1 * l1 - l2 * l2) / (2 * l1 * l2)
        const kneeBend = Math.acos(Math.max(-1, Math.min(1, cosKnee)))
        const kneeSign = idx % 2 === 0 ? 1 : -1

        const kneeX = hipX + Math.cos(angleBase + kneeSign * (kneeBend / 2)) * l1
        const kneeY = hipY + Math.sin(angleBase + kneeSign * (kneeBend / 2)) * l1

        // Draw Upper Leg
        ctx.strokeStyle = idx < 2 ? '#646e71' : '#e0e0e0'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(hipX, hipY)
        ctx.lineTo(kneeX, kneeY)
        ctx.stroke()

        // Draw Lower Leg / Piston
        ctx.strokeStyle = '#e0e0e0'
        ctx.beginPath()
        ctx.moveTo(kneeX, kneeY)
        ctx.lineTo(footStepX, targetFootY)
        ctx.stroke()

        // Foot Contact Paw
        ctx.beginPath()
        ctx.arc(footStepX, targetFootY, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = footLift < 2 ? '#ffffff' : '#828b8d'
        ctx.fill()

        // Ground Reaction Force (GRF) Vector Spike when foot is planted
        if (footLift < 2) {
          ctx.strokeStyle = 'rgba(224, 224, 224, 0.45)'
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(footStepX, targetFootY)
          ctx.lineTo(footStepX, targetFootY + 12)
          ctx.stroke()
        }
      })

      // 4. IMU Balance Gyro & Center of Mass Stability Vector
      ctx.strokeStyle = 'rgba(224, 224, 224, 0.25)'
      ctx.lineWidth = 1
      ctx.setLineDash([2, 3])
      ctx.beginPath()
      ctx.moveTo(botX, bodyY)
      ctx.lineTo(botX, botGroundY)
      ctx.stroke()
      ctx.setLineDash([])

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
    <div className="relative w-full h-[250px] rounded-xl bg-[#010101] border border-[#252525] overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive Waypoints */}
      {current.scanPoints.map((pt, i) => (
        <div
          key={i}
          style={{ left: `${pt.x * 100}%`, top: `${pt.y * 100}%` }}
          onClick={() => {
            playBeep?.(1100, 0.05)
            setActivePt(pt.label)
            onPointClick(pt)
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group cursor-pointer p-1"
        >
          <div className="w-2.5 h-2.5 rounded-full border border-[#444444] bg-[#010101] group-hover:border-[#e0e0e0] group-hover:scale-150 transition-all flex items-center justify-center">
            <div className="w-1 h-1 bg-[#e0e0e0] rounded-full" />
          </div>
          <span className="text-[10px] font-mono-nav text-[#646e71] group-hover:text-[#e0e0e0] transition-colors whitespace-nowrap bg-[#010101]/85 px-1.5 py-0.5 rounded border border-[#252525]/80">
            {pt.label} <span className="text-[#828b8d]">[{pt.status}]</span>
          </span>
        </div>
      ))}

      {/* Bespoke Telemetry Badges */}
      <div className="absolute bottom-3 left-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0] animate-ping" />
        <span>IMU BALANCE // PITCH: +3.2° // ROLL: -0.4° // STABILITY: 98.6%</span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-3">
        <span>GAIT: <span className="text-[#e0e0e0]">COMPLIANT TROT</span></span>
        <span>TORQUE: <span className="text-[#e0e0e0]">24.8 Nm</span></span>
      </div>
    </div>
  )
}

// ============================================================================
// 3. NEUROBOTIX VISUALIZER: EEG Brainwave Oscilloscope & 6-DOF Robotic Reticle
// ============================================================================
function NeuroBotixVisualizer({
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
    let time = 0

    const render = () => {
      time += 0.03
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700)
      const height = (canvas.height = 250)

      ctx.clearRect(0, 0, width, height)

      // Split Screen Layout: Left = EEG Oscilloscope, Right = 6-DOF Robotic Reticle
      const splitX = width * 0.48

      // Divider vertical guideline
      ctx.strokeStyle = '#222226'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(splitX, 10)
      ctx.lineTo(splitX, height - 10)
      ctx.stroke()

      // ----------------------------------------------------
      // LEFT PANE: Real-time Oscillating EEG Brainwave Bands
      // ----------------------------------------------------
      const eegWidth = splitX - 30
      const alphaBaseY = height * 0.32
      const betaBaseY = height * 0.65

      // Channel 1: Alpha Waves (8-12 Hz) - Smooth focus rhythms
      ctx.strokeStyle = '#e0e0e0'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      for (let x = 20; x < eegWidth; x += 2) {
        const tOffset = (x - 20) * 0.08 - time * 4
        // Complex EEG packet synthesis
        const yVal =
          Math.sin(tOffset) * 14 * Math.sin(tOffset * 0.2) +
          Math.sin(tOffset * 1.8) * 4
        if (x === 20) ctx.moveTo(x, alphaBaseY + yVal)
        else ctx.lineTo(x, alphaBaseY + yVal)
      }
      ctx.stroke()

      // Alpha Channel Label
      ctx.fillStyle = '#828b8d'
      ctx.font = '9px monospace'
      ctx.fillText('CH 01 // ALPHA BAND [10.2 Hz]', 20, alphaBaseY - 20)

      // Channel 2: Beta Waves (13-30 Hz) - Dynamic high frequency bursts
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.7)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      for (let x = 20; x < eegWidth; x += 2) {
        const tOffset = (x - 20) * 0.16 - time * 6
        const burstMod = Math.sin(time * 2 + x * 0.02)
        const yVal =
          Math.sin(tOffset * 2.5) * 8 * (burstMod > 0.3 ? 1.8 : 0.6) +
          Math.cos(tOffset * 4) * 3
        if (x === 20) ctx.moveTo(x, betaBaseY + yVal)
        else ctx.lineTo(x, betaBaseY + yVal)
      }
      ctx.stroke()

      // Beta Channel Label
      ctx.fillStyle = '#828b8d'
      ctx.fillText('CH 02 // BETA BAND [22.4 Hz FOCUS]', 20, betaBaseY - 18)

      // Oscilloscope background horizontal calibration lines
      ctx.strokeStyle = 'rgba(37, 37, 37, 0.4)'
      ctx.lineWidth = 0.8
      ;[alphaBaseY - 12, alphaBaseY + 12, betaBaseY - 12, betaBaseY + 12].forEach((ly) => {
        ctx.beginPath()
        ctx.moveTo(20, ly)
        ctx.lineTo(eegWidth, ly)
        ctx.stroke()
      })

      // FFT Frequency Spectrum Bars at bottom of left pane
      const barCount = 14
      for (let b = 0; b < barCount; b++) {
        const barH = 5 + Math.abs(Math.sin(time * 3 + b * 0.7)) * 20
        const bx = 20 + b * 8
        const by = height - 25
        ctx.fillStyle = b === 4 || b === 5 ? '#e0e0e0' : 'rgba(100, 110, 113, 0.5)'
        ctx.fillRect(bx, by - barH, 5, barH)
      }

      // ----------------------------------------------------
      // RIGHT PANE: 6-DOF Robotic Arm Inverse Kinematics HUD
      // ----------------------------------------------------
      const armBaseX = splitX + 45
      const armBaseY = height * 0.82

      // Gripper target position (driven by simulated neural focus)
      const targetX = splitX + (width - splitX) * 0.65 + Math.sin(time * 1.5) * 25
      const targetY = height * 0.45 + Math.cos(time * 1.2) * 20

      // Arm Link 1 & Link 2 calculations
      const armL1 = 65
      const armL2 = 60
      const armDx = targetX - armBaseX
      const armDy = targetY - armBaseY
      const armDist = Math.sqrt(armDx * armDx + armDy * armDy)
      const clampedArmDist = Math.min(armDist, armL1 + armL2 - 4)

      const armBaseAngle = Math.atan2(armDy, armDx)
      const cosElbow = (clampedArmDist * clampedArmDist - armL1 * armL1 - armL2 * armL2) / (2 * armL1 * armL2)
      const elbowAngle = Math.acos(Math.max(-1, Math.min(1, cosElbow)))

      const elbowX = armBaseX + Math.cos(armBaseAngle - elbowAngle / 2) * armL1
      const elbowY = armBaseY + Math.sin(armBaseAngle - elbowAngle / 2) * armL1

      // Draw Robotic Arm Segments
      // Base Mount
      ctx.fillStyle = '#222226'
      ctx.beginPath()
      ctx.arc(armBaseX, armBaseY, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#e0e0e0'
      ctx.stroke()

      // Link 1
      ctx.strokeStyle = '#e0e0e0'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(armBaseX, armBaseY)
      ctx.lineTo(elbowX, elbowY)
      ctx.stroke()

      // Elbow Joint
      ctx.beginPath()
      ctx.arc(elbowX, elbowY, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // Link 2
      ctx.strokeStyle = '#c0c0c0'
      ctx.lineWidth = 2.2
      ctx.beginPath()
      ctx.moveTo(elbowX, elbowY)
      ctx.lineTo(targetX, targetY)
      ctx.stroke()

      // 6-DOF End-Effector Gripper Reticle
      ctx.save()
      ctx.translate(targetX, targetY)

      // Laser Targeting Reticle
      ctx.strokeStyle = 'rgba(224, 224, 224, 0.85)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(0, 0, 16, 0, Math.PI * 2)
      ctx.stroke()

      // Precision Crosshairs
      ctx.beginPath()
      ctx.moveTo(-22, 0)
      ctx.lineTo(-12, 0)
      ctx.moveTo(12, 0)
      ctx.lineTo(22, 0)
      ctx.moveTo(0, -22)
      ctx.lineTo(0, -12)
      ctx.moveTo(0, 12)
      ctx.lineTo(0, 22)
      ctx.stroke()

      // Gripper Pincers
      const gripAngle = 0.2 + Math.abs(Math.sin(time * 3)) * 0.2
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(gripAngle) * 12, Math.sin(gripAngle) * 12)
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.cos(-gripAngle) * 12, Math.sin(-gripAngle) * 12)
      ctx.stroke()

      ctx.restore()

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
    <div className="relative w-full h-[250px] rounded-xl bg-[#010101] border border-[#252525] overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive Waypoints */}
      {current.scanPoints.map((pt, i) => (
        <div
          key={i}
          style={{ left: `${pt.x * 100}%`, top: `${pt.y * 100}%` }}
          onClick={() => {
            playBeep?.(1250, 0.05)
            setActivePt(pt.label)
            onPointClick(pt)
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group cursor-pointer p-1"
        >
          <div className="w-2.5 h-2.5 rounded-full border border-[#444444] bg-[#010101] group-hover:border-[#e0e0e0] group-hover:scale-150 transition-all flex items-center justify-center">
            <div className="w-1 h-1 bg-[#e0e0e0] rounded-full" />
          </div>
          <span className="text-[10px] font-mono-nav text-[#646e71] group-hover:text-[#e0e0e0] transition-colors whitespace-nowrap bg-[#010101]/85 px-1.5 py-0.5 rounded border border-[#252525]/80">
            {pt.label} <span className="text-[#828b8d]">[{pt.status}]</span>
          </span>
        </div>
      ))}

      {/* Bespoke Telemetry Badges */}
      <div className="absolute bottom-3 left-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0] animate-ping" />
        <span>NEURAL COHERENCE: 95.4% // OPENBCI 8-CH // LATENCY: 11 MS</span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-3">
        <span>ARM DOF: <span className="text-[#e0e0e0]">6 AXIS</span></span>
        <span>SERVO SYNC: <span className="text-[#e0e0e0]">OPTIMAL</span></span>
      </div>
    </div>
  )
}

// ============================================================================
// 4. CYBER SALVAGE VISUALIZER: Subterranean LiDAR SLAM & Thermal Heatmap
// ============================================================================
function CyberSalvageVisualizer({
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
    let sweepAngle = 0
    let time = 0

    // Maze obstacle line segments [x1, y1, x2, y2] relative to canvas
    const getMazeWalls = (w: number, h: number) => [
      [w * 0.15, h * 0.2, w * 0.4, h * 0.2],
      [w * 0.4, h * 0.2, w * 0.4, h * 0.5],
      [w * 0.25, h * 0.5, w * 0.55, h * 0.5],
      [w * 0.55, h * 0.3, w * 0.85, h * 0.3],
      [w * 0.65, h * 0.5, w * 0.65, h * 0.82],
      [w * 0.35, h * 0.7, w * 0.8, h * 0.7],
      [w * 0.18, h * 0.65, w * 0.18, h * 0.85],
    ]

    const render = () => {
      time += 0.02
      sweepAngle += 0.035

      const width = (canvas.width = canvas.parentElement?.clientWidth || 700)
      const height = (canvas.height = 250)
      const walls = getMazeWalls(width, height)

      ctx.clearRect(0, 0, width, height)

      // SLAM Rover Position moving slowly along corridor
      const roverX = width * 0.38 + Math.sin(time * 0.4) * (width * 0.18)
      const roverY = height * 0.42 + Math.cos(time * 0.3) * (height * 0.12)

      // 1. Draw Occupancy Grid Laser Dot Field (LiDAR Point Cloud)
      ctx.strokeStyle = '#222226'
      ctx.lineWidth = 1.2
      walls.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      })

      // 2. 360° LiDAR Ray-Cast Beam Sweep
      const rayCount = 80
      for (let r = 0; r < rayCount; r++) {
        const offset = (r / rayCount) * (Math.PI / 3)
        const angle = sweepAngle - offset
        const maxDist = 180
        const rayEndX = roverX + Math.cos(angle) * maxDist
        const rayEndY = roverY + Math.sin(angle) * maxDist

        const alpha = Math.max(0, 0.4 * (1 - r / rayCount))
        ctx.strokeStyle = `rgba(224, 224, 224, ${alpha})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(roverX, roverY)
        ctx.lineTo(rayEndX, rayEndY)
        ctx.stroke()

        // Point cloud contact reflection dots
        if (r % 3 === 0) {
          const hitDist = maxDist * (0.6 + Math.sin(angle * 5) * 0.3)
          const hx = roverX + Math.cos(angle) * hitDist
          const hy = roverY + Math.sin(angle) * hitDist
          ctx.beginPath()
          ctx.arc(hx, hy, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.5})`
          ctx.fill()
        }
      }

      // 3. FLIR Thermal Casualty Heat Beacon (Pulsing IR signature)
      const thermalX = width * 0.72
      const thermalY = height * 0.35
      const pulseSize = 25 + Math.sin(time * 4) * 8

      const thermalGrad = ctx.createRadialGradient(
        thermalX,
        thermalY,
        2,
        thermalX,
        thermalY,
        pulseSize
      )
      thermalGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
      thermalGrad.addColorStop(0.3, 'rgba(180, 180, 180, 0.35)')
      thermalGrad.addColorStop(1, 'transparent')

      ctx.fillStyle = thermalGrad
      ctx.beginPath()
      ctx.arc(thermalX, thermalY, pulseSize, 0, Math.PI * 2)
      ctx.fill()

      // Thermal contour circle
      ctx.strokeStyle = 'rgba(224, 224, 224, 0.5)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(thermalX, thermalY, pulseSize, 0, Math.PI * 2)
      ctx.stroke()

      // Thermal readout tag
      ctx.fillStyle = '#e0e0e0'
      ctx.font = '9px monospace'
      ctx.fillText('37.2°C // LIFE DETECTED', thermalX + 16, thermalY - 5)

      // 4. Rover Chassis Icon & Breadcrumb Path
      ctx.save()
      ctx.translate(roverX, roverY)

      // Rover Body
      ctx.fillStyle = '#16191b'
      ctx.fillRect(-12, -8, 24, 16)
      ctx.strokeStyle = '#e0e0e0'
      ctx.lineWidth = 1.2
      ctx.strokeRect(-12, -8, 24, 16)

      // Rotating LiDAR sensor dome
      ctx.beginPath()
      ctx.arc(0, 0, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      // Heading direction pointer
      ctx.rotate(sweepAngle * 0.2)
      ctx.strokeStyle = '#e0e0e0'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(16, 0)
      ctx.stroke()

      ctx.restore()

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
    <div className="relative w-full h-[250px] rounded-xl bg-[#010101] border border-[#252525] overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive Waypoints */}
      {current.scanPoints.map((pt, i) => (
        <div
          key={i}
          style={{ left: `${pt.x * 100}%`, top: `${pt.y * 100}%` }}
          onClick={() => {
            playBeep?.(1050, 0.05)
            setActivePt(pt.label)
            onPointClick(pt)
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group cursor-pointer p-1"
        >
          <div className="w-2.5 h-2.5 rounded-full border border-[#444444] bg-[#010101] group-hover:border-[#e0e0e0] group-hover:scale-150 transition-all flex items-center justify-center">
            <div className="w-1 h-1 bg-[#e0e0e0] rounded-full" />
          </div>
          <span className="text-[10px] font-mono-nav text-[#646e71] group-hover:text-[#e0e0e0] transition-colors whitespace-nowrap bg-[#010101]/85 px-1.5 py-0.5 rounded border border-[#252525]/80">
            {pt.label} <span className="text-[#828b8d]">[{pt.status}]</span>
          </span>
        </div>
      ))}

      {/* Bespoke Telemetry Badges */}
      <div className="absolute bottom-3 left-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0] animate-ping" />
        <span>LIDAR OCCUPANCY GRID // MAP CONFIDENCE: 92.4% // 2D SLAM</span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#646e71] pointer-events-none flex items-center gap-3">
        <span>THERMAL: <span className="text-[#e0e0e0]">37.2°C DETECTED</span></span>
        <span>VISIBILITY: <span className="text-[#e0e0e0]">ZERO (SMOKE)</span></span>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN DYNAMIC CONTEST VISUALIZER SELECTOR
// ============================================================================
function DynamicContestVisualizer({
  current,
  onPointClick,
  playBeep,
}: {
  current: ContestProtocol
  onPointClick: (pt: { label: string; status: string }) => void
  playBeep?: (freq?: number, duration?: number) => void
}) {
  switch (current.id) {
    case 'aerovision':
      return <AeroVisionVisualizer current={current} onPointClick={onPointClick} playBeep={playBeep} />
    case 'mechagauntlet':
      return <MechaGauntletVisualizer current={current} onPointClick={onPointClick} playBeep={playBeep} />
    case 'neurobotix':
      return <NeuroBotixVisualizer current={current} onPointClick={onPointClick} playBeep={playBeep} />
    case 'cyberneticsalvage':
      return <CyberSalvageVisualizer current={current} onPointClick={onPointClick} playBeep={playBeep} />
    default:
      return <AeroVisionVisualizer current={current} onPointClick={onPointClick} playBeep={playBeep} />
  }
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

        {/* Dynamic Personalized Motion Visualizer (Tailored to each contest) */}
        <div className="mt-6">
          <DynamicContestVisualizer
            current={current}
            onPointClick={(pt) => {}}
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
