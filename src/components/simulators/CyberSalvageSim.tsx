"use client"

import React, { useState, useEffect, useRef } from 'react'
import { SimulatorProps } from './types'

/**
 * CyberSalvageSim: Subterranean 2D LiDAR Ray-Cast SLAM & FLIR Thermal Beacon Simulation
 * Controls: Maze wall ray-casting, 360-degree LiDAR sweep beam, point-cloud sparkles, infrared life detection beacon
 */
export default function CyberSalvageSim({ current, onPointClick, playBeep }: SimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [, setActivePt] = useState<string | null>(null)

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
      ctx.strokeStyle = '#3b0764'
      ctx.lineWidth = 1.4
      walls.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      })

      // 2. 360° LiDAR Ray-Cast Beam Sweep in Saturated Electric Fuchsia
      const rayCount = 80
      for (let r = 0; r < rayCount; r++) {
        const offset = (r / rayCount) * (Math.PI / 3)
        const angle = sweepAngle - offset
        const maxDist = 180
        const rayEndX = roverX + Math.cos(angle) * maxDist
        const rayEndY = roverY + Math.sin(angle) * maxDist

        const alpha = Math.max(0, 0.5 * (1 - r / rayCount))
        ctx.strokeStyle = `rgba(232, 121, 249, ${alpha})`
        ctx.lineWidth = 1.0
        ctx.beginPath()
        ctx.moveTo(roverX, roverY)
        ctx.lineTo(rayEndX, rayEndY)
        ctx.stroke()

        // Point cloud contact reflection dots (White-hot lilac embers)
        if (r % 3 === 0) {
          const hitDist = maxDist * (0.6 + Math.sin(angle * 5) * 0.3)
          const hx = roverX + Math.cos(angle) * hitDist
          const hy = roverY + Math.sin(angle) * hitDist
          ctx.beginPath()
          ctx.arc(hx, hy, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(250, 232, 255, ${alpha * 2})`
          ctx.shadowColor = '#e879f9'
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // 3. FLIR Thermal Casualty Heat Beacon (Pulsing Infrared Ghost Flame)
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
      thermalGrad.addColorStop(0, '#ffffff')
      thermalGrad.addColorStop(0.25, '#fae8ff')
      thermalGrad.addColorStop(0.55, 'rgba(232, 121, 249, 0.5)')
      thermalGrad.addColorStop(0.85, 'rgba(112, 26, 117, 0.25)')
      thermalGrad.addColorStop(1, 'transparent')

      ctx.fillStyle = thermalGrad
      ctx.beginPath()
      ctx.arc(thermalX, thermalY, pulseSize, 0, Math.PI * 2)
      ctx.fill()

      // Thermal contour circle
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.7)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(thermalX, thermalY, pulseSize, 0, Math.PI * 2)
      ctx.stroke()

      // Thermal readout tag with white-hot lilac text
      ctx.fillStyle = '#fae8ff'
      ctx.font = '600 9px monospace'
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 6
      ctx.fillText('37.2°C // LIFE DETECTED', thermalX + 16, thermalY - 5)
      ctx.shadowBlur = 0

      // 4. Rover Chassis Icon & Breadcrumb Path
      ctx.save()
      ctx.translate(roverX, roverY)

      // Rover Body
      ctx.fillStyle = '#24133b'
      ctx.fillRect(-12, -8, 24, 16)
      ctx.strokeStyle = '#e879f9'
      ctx.lineWidth = 1.4
      ctx.strokeRect(-12, -8, 24, 16)

      // Rotating LiDAR sensor dome
      ctx.beginPath()
      ctx.arc(0, 0, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#fae8ff'
      ctx.fill()

      // Heading direction pointer
      ctx.rotate(sweepAngle * 0.2)
      ctx.strokeStyle = '#fae8ff'
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
    <div className="relative w-full h-[250px] rounded-xl bg-gradient-to-b from-[#0e0717] to-[#040108] border border-[#3b0764]/70 overflow-hidden select-none">
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
          LIDAR OCCUPANCY GRID // MAP CONFIDENCE: <span className="text-[#fae8ff]">94.2%</span> // 2D
          SLAM
        </span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#c4b5d6] pointer-events-none flex items-center gap-3">
        <span>
          THERMAL: <span className="text-[#fae8ff]">37.2°C DETECTED</span>
        </span>
        <span>
          VISIBILITY: <span className="text-[#e879f9]">ZERO (SMOKE)</span>
        </span>
      </div>
    </div>
  )
}
