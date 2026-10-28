"use client"

import React, { useState, useEffect, useRef } from 'react'
import { SimulatorProps } from './types'

/**
 * AeroVisionSim: 3D High-Speed Optical Drone Corridor & Flight Simulation
 * Controls: 3D receding neon ring gates, velocity streamline dust, quadcopter HUD, ion flame thrusters
 */
export default function AeroVisionSim({ current, onPointClick, playBeep }: SimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [, setActivePt] = useState<string | null>(null)

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
        ctx.moveTo(cx - cx * factor, py)
        ctx.lineTo(cx + cx * factor, py)
        ctx.strokeStyle = `rgba(37, 37, 37, ${Math.max(0, 0.6 * (1 - z / 400))})`
        ctx.stroke()
      }

      // 2. Speed Dust / Streamline Particles (Electric Fuchsia Embers)
      particles.forEach((p) => {
        p.z -= 5.0
        if (p.z <= 10) {
          p.z = 400
          p.x = (Math.random() - 0.5) * 500
          p.y = (Math.random() - 0.5) * 220
        }
        const scale = 140 / p.z
        const px = vanishingX + p.x * scale
        const py = vanishingY + p.y * scale
        const alpha = Math.min(1, Math.max(0, (400 - p.z) / 300))

        ctx.fillStyle =
          p.z % 2 === 0
            ? `rgba(232, 121, 249, ${alpha * 0.85})`
            : `rgba(250, 232, 255, ${alpha * 0.9})`
        ctx.fillRect(px, py, Math.max(1, 2.5 * scale), Math.max(1, 2.5 * scale))
      })

      // 3. Receding 3D Optical Neon Ring Gates in Ghost Fuchsia
      const gateCount = 4
      for (let g = 0; g < gateCount; g++) {
        const gateProgress = (time * 0.35 + g * 0.25) % 1
        const depth = (1 - gateProgress) * 350 + 40
        const scale = 120 / depth
        const gx = vanishingX + Math.sin(time + g) * 30 * scale
        const gy = vanishingY + Math.cos(time * 0.7 + g) * 20 * scale
        const gw = 110 * scale
        const gh = 70 * scale
        const alpha = Math.min(1, gateProgress * 1.8)

        ctx.save()
        ctx.translate(gx, gy)

        // Gate ring rounded rectangle with vivid neon glow
        ctx.shadowColor = '#e879f9'
        ctx.shadowBlur = g === 0 ? 16 : 8
        ctx.strokeStyle =
          g === 0 ? 'rgba(250, 232, 255, 0.95)' : `rgba(232, 121, 249, ${alpha * 0.75})`
        ctx.lineWidth = g === 0 ? 2.5 : 1.4
        ctx.strokeRect(-gw / 2, -gh / 2, gw, gh)

        // Optical LED corner markers on gate
        const cornerSize = 8 * scale
        ctx.fillStyle = '#ffffff'
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
          ctx.fillStyle = '#fae8ff'
          ctx.font = '9px monospace'
          ctx.fillText(`GATE // 0${g + 1}`, -gw / 2 + 4, -gh / 2 - 5)
        }
        ctx.restore()
      }

      // 4. Drone Cockpit HUD Crosshair & Attitude Horizon with Ion Flame Thrusters
      const droneX = cx + Math.sin(time * 1.4) * 55
      const droneY = cy + Math.cos(time * 1.1) * 28
      const bankAngle = Math.sin(time * 1.4) * 0.2

      ctx.save()
      ctx.translate(droneX, droneY)
      ctx.rotate(bankAngle)

      // Drone Ion Thruster Flame Trails
      const thrusterOffsets = [
        [-20, 18],
        [20, 18],
      ]
      thrusterOffsets.forEach(([tx, ty]) => {
        const flameLen = 14 + Math.random() * 8
        const flameGrad = ctx.createLinearGradient(tx, ty, tx, ty + flameLen)
        flameGrad.addColorStop(0, '#ffffff')
        flameGrad.addColorStop(0.3, '#fae8ff')
        flameGrad.addColorStop(0.7, '#e879f9')
        flameGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = flameGrad
        ctx.beginPath()
        ctx.moveTo(tx - 3, ty)
        ctx.lineTo(tx + 3, ty)
        ctx.lineTo(tx, ty + flameLen)
        ctx.closePath()
        ctx.fill()
      })

      // Central Reticle
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 10
      ctx.strokeStyle = '#fae8ff'
      ctx.lineWidth = 1.4
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
        ctx.strokeStyle = 'rgba(232, 121, 249, 0.5)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(qx, qy)
        ctx.stroke()

        // Spinning rotor disc
        ctx.save()
        ctx.translate(qx, qy)
        ctx.rotate(rotorAngle)
        ctx.strokeStyle = 'rgba(250, 232, 255, 0.45)'
        ctx.beginPath()
        ctx.ellipse(0, 0, rotorRadius, rotorRadius / 3, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      })

      ctx.restore()

      // Spline flight path connecting gates
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.35)'
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
    <div className="relative w-full h-[250px] rounded-xl bg-gradient-to-b from-[#0e0717] to-[#040108] border border-[#3b0764]/70 overflow-hidden select-none">
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
          <div className="w-2.5 h-2.5 rounded-full border border-[#e879f9]/70 bg-[#160d24] group-hover:border-[#fae8ff] group-hover:scale-150 group-hover:shadow-[0_0_10px_#e879f9] transition-all flex items-center justify-center">
            <div className="w-1 h-1 bg-[#fae8ff] rounded-full" />
          </div>
          <span className="text-[10px] font-mono-nav text-[#c4b5d6] group-hover:text-[#fae8ff] transition-colors whitespace-nowrap bg-[#10081c]/90 px-1.5 py-0.5 rounded border border-[#3b0764]/80">
            {pt.label} <span className="text-[#e879f9]">[{pt.status}]</span>
          </span>
        </div>
      ))}

      {/* Bespoke Telemetry Badges */}
      <div className="absolute bottom-3 left-4 text-[10px] font-mono-nav text-[#c4b5d6] pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e879f9] animate-ping" />
        <span>
          FLIGHT TELEMETRY // VEL: <span className="text-[#fae8ff]">21.4 M/S</span> // LATENCY:{' '}
          <span className="text-[#fae8ff]">3.8 MS</span>
        </span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#c4b5d6] pointer-events-none flex items-center gap-3">
        <span>
          OPTICAL FLOW: <span className="text-[#fae8ff]">LOCKED</span>
        </span>
        <span>
          CIRCUIT: <span className="text-[#fae8ff]">03/05</span>
        </span>
      </div>
    </div>
  )
}
