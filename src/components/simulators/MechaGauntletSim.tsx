"use client"

import React, { useState, useEffect, useRef } from 'react'
import { SimulatorProps } from './types'

/**
 * MechaGauntletSim: Dynamic Quadruped Kinematics & Multi-Surface Terrain Simulation
 * Controls: Terrain elevation cross-section, compliant trotting gait inverse kinematics, IMU balance gyro, footfall shockwaves
 */
export default function MechaGauntletSim({ current, onPointClick, playBeep }: SimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [, setActivePt] = useState<string | null>(null)

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

      // Terrain Fill Gradient (Deep Amethyst to Void Black)
      const terrainGrad = ctx.createLinearGradient(0, height * 0.4, 0, height)
      terrainGrad.addColorStop(0, 'rgba(74, 4, 78, 0.45)')
      terrainGrad.addColorStop(0.5, 'rgba(46, 16, 101, 0.25)')
      terrainGrad.addColorStop(1, '#05020a')
      ctx.fillStyle = terrainGrad
      ctx.fill()

      // Terrain Surface Stroke with Electric Fuchsia Glow
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 6
      ctx.strokeStyle = '#e879f9'
      ctx.lineWidth = 1.8
      ctx.beginPath()
      for (let x = 0; x <= width; x += 3) {
        if (x === 0) ctx.moveTo(x, getGroundY(x))
        else ctx.lineTo(x, getGroundY(x))
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Sub-surface hatching lines in rich plum
      ctx.strokeStyle = 'rgba(112, 26, 117, 0.35)'
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

      // Chassis Body in Obsidian Amethyst
      ctx.fillStyle = '#1c0f2e'
      ctx.fillRect(-chassisW / 2, -chassisH / 2, chassisW, chassisH)
      ctx.strokeStyle = '#e879f9'
      ctx.lineWidth = 1.5
      ctx.strokeRect(-chassisW / 2, -chassisH / 2, chassisW, chassisH)

      // Sensor Head with Glowing White-Lilac Eye
      ctx.fillStyle = '#3b0764'
      ctx.fillRect(chassisW / 2 - 8, -chassisH / 2 + 2, 7, 7)
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#fae8ff'
      ctx.shadowBlur = 8
      ctx.fillRect(chassisW / 2 - 4, -chassisH / 2 + 4, 3, 3)
      ctx.shadowBlur = 0

      // Center of Mass (CoM) marker inside body
      ctx.beginPath()
      ctx.arc(0, 0, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#fae8ff'
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
        ctx.strokeStyle = idx < 2 ? '#701a75' : '#c026d3'
        ctx.lineWidth = 2.2
        ctx.beginPath()
        ctx.moveTo(hipX, hipY)
        ctx.lineTo(kneeX, kneeY)
        ctx.stroke()

        // Draw Lower Leg / Piston
        ctx.strokeStyle = '#e879f9'
        ctx.beginPath()
        ctx.moveTo(kneeX, kneeY)
        ctx.lineTo(footStepX, targetFootY)
        ctx.stroke()

        // Foot Contact Paw
        ctx.beginPath()
        ctx.arc(footStepX, targetFootY, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = footLift < 2 ? '#fae8ff' : '#c026d3'
        ctx.fill()

        // Ground Reaction Force (GRF) Vector Spike & Impact Dust Spark when foot is planted
        if (footLift < 2) {
          ctx.strokeStyle = 'rgba(232, 121, 249, 0.75)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(footStepX, targetFootY)
          ctx.lineTo(footStepX, targetFootY + 14)
          ctx.stroke()

          // Impact contact shockwave ring
          ctx.beginPath()
          ctx.ellipse(footStepX, targetFootY, 6, 2, 0, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(250, 232, 255, 0.6)'
          ctx.stroke()
        }
      })

      // 4. IMU Balance Gyro & Center of Mass Stability Vector
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.35)'
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
    <div className="relative w-full h-[250px] rounded-xl bg-gradient-to-b from-[#0e0717] to-[#040108] border border-[#3b0764]/70 overflow-hidden select-none">
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
          IMU BALANCE // PITCH: <span className="text-[#fae8ff]">+3.2°</span> // STABILITY:{' '}
          <span className="text-[#fae8ff]">98.6%</span>
        </span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#c4b5d6] pointer-events-none flex items-center gap-3">
        <span>
          GAIT: <span className="text-[#fae8ff]">COMPLIANT TROT</span>
        </span>
        <span>
          TORQUE: <span className="text-[#fae8ff]">24.8 Nm</span>
        </span>
      </div>
    </div>
  )
}
