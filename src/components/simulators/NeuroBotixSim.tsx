"use client"

import React, { useState, useEffect, useRef } from 'react'
import { SimulatorProps } from './types'

/**
 * NeuroBotixSim: Real-Time EEG Brainwave Oscilloscope & 6-DOF Robotic Reticle Simulation
 * Controls: Alpha & Beta wave synthesizer, FFT frequency spectrum bars, 2-segment arm inverse kinematics, laser targeting crosshair
 */
export default function NeuroBotixSim({ current, onPointClick, playBeep }: SimulatorProps) {
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
      time += 0.03
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700)
      const height = (canvas.height = 250)

      ctx.clearRect(0, 0, width, height)

      // Split Screen Layout: Left = EEG Oscilloscope, Right = 6-DOF Robotic Reticle
      const splitX = width * 0.48

      // Divider vertical guideline
      ctx.strokeStyle = '#3b0764'
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

      // Channel 1: Alpha Waves (8-12 Hz) - Smooth focus rhythms in White-hot Ghost Lilac
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 8
      ctx.strokeStyle = '#fae8ff'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      for (let x = 20; x < eegWidth; x += 2) {
        const tOffset = (x - 20) * 0.08 - time * 4
        const yVal =
          Math.sin(tOffset) * 14 * Math.sin(tOffset * 0.2) + Math.sin(tOffset * 1.8) * 4
        if (x === 20) ctx.moveTo(x, alphaBaseY + yVal)
        else ctx.lineTo(x, alphaBaseY + yVal)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Alpha Channel Label
      ctx.fillStyle = '#e879f9'
      ctx.font = '9px monospace'
      ctx.fillText('CH 01 // ALPHA BAND [10.2 Hz SYNCHRONIZED]', 20, alphaBaseY - 20)

      // Channel 2: Beta Waves (13-30 Hz) - Dynamic high frequency bursts in Electric Fuchsia
      ctx.shadowColor = '#c026d3'
      ctx.shadowBlur = 6
      ctx.strokeStyle = '#e879f9'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      for (let x = 20; x < eegWidth; x += 2) {
        const tOffset = (x - 20) * 0.16 - time * 6
        const burstMod = Math.sin(time * 2 + x * 0.02)
        const yVal =
          Math.sin(tOffset * 2.5) * 8 * (burstMod > 0.3 ? 1.8 : 0.6) + Math.cos(tOffset * 4) * 3
        if (x === 20) ctx.moveTo(x, betaBaseY + yVal)
        else ctx.lineTo(x, betaBaseY + yVal)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Beta Channel Label
      ctx.fillStyle = '#c084fc'
      ctx.fillText('CH 02 // BETA BAND [22.4 Hz COGNITIVE FOCUS]', 20, betaBaseY - 18)

      // Oscilloscope background horizontal calibration lines in plum
      ctx.strokeStyle = 'rgba(112, 26, 117, 0.4)'
      ctx.lineWidth = 0.8
      ;[alphaBaseY - 12, alphaBaseY + 12, betaBaseY - 12, betaBaseY + 12].forEach((ly) => {
        ctx.beginPath()
        ctx.moveTo(20, ly)
        ctx.lineTo(eegWidth, ly)
        ctx.stroke()
      })

      // FFT Frequency Spectrum Bars (Vertical Flame Pillars)
      const barCount = 14
      for (let b = 0; b < barCount; b++) {
        const barH = 5 + Math.abs(Math.sin(time * 3 + b * 0.7)) * 22
        const bx = 20 + b * 8
        const by = height - 25
        const barGrad = ctx.createLinearGradient(bx, by, bx, by - barH)
        barGrad.addColorStop(0, '#4a044e')
        barGrad.addColorStop(0.6, '#c026d3')
        barGrad.addColorStop(1, '#fae8ff')
        ctx.fillStyle = barGrad
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
      const cosElbow =
        (clampedArmDist * clampedArmDist - armL1 * armL1 - armL2 * armL2) / (2 * armL1 * armL2)
      const elbowAngle = Math.acos(Math.max(-1, Math.min(1, cosElbow)))

      const elbowX = armBaseX + Math.cos(armBaseAngle - elbowAngle / 2) * armL1
      const elbowY = armBaseY + Math.sin(armBaseAngle - elbowAngle / 2) * armL1

      // Draw Robotic Arm Segments in Titanium Obsidian & Fuchsia Joints
      ctx.fillStyle = '#24133b'
      ctx.beginPath()
      ctx.arc(armBaseX, armBaseY, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#e879f9'
      ctx.stroke()

      // Link 1
      ctx.strokeStyle = '#c026d3'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(armBaseX, armBaseY)
      ctx.lineTo(elbowX, elbowY)
      ctx.stroke()

      // Elbow Joint with Glowing Core
      ctx.beginPath()
      ctx.arc(elbowX, elbowY, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#fae8ff'
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0

      // Link 2
      ctx.strokeStyle = '#e879f9'
      ctx.lineWidth = 2.2
      ctx.beginPath()
      ctx.moveTo(elbowX, elbowY)
      ctx.lineTo(targetX, targetY)
      ctx.stroke()

      // 6-DOF End-Effector Gripper Reticle
      ctx.save()
      ctx.translate(targetX, targetY)

      // Laser Targeting Reticle with Ghost Flame Glow
      ctx.shadowColor = '#e879f9'
      ctx.shadowBlur = 10
      ctx.strokeStyle = '#fae8ff'
      ctx.lineWidth = 1.4
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
      ctx.shadowBlur = 0

      // Gripper Pincers
      const gripAngle = 0.2 + Math.abs(Math.sin(time * 3)) * 0.2
      ctx.strokeStyle = '#fae8ff'
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
    <div className="relative w-full h-[250px] rounded-xl bg-gradient-to-b from-[#0e0717] to-[#040108] border border-[#3b0764]/70 overflow-hidden select-none">
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
          NEURAL COHERENCE: <span className="text-[#fae8ff]">96.8%</span> // LATENCY:{' '}
          <span className="text-[#fae8ff]">9 MS</span>
        </span>
      </div>
      <div className="absolute top-3 right-4 text-[10px] font-mono-nav text-[#c4b5d6] pointer-events-none flex items-center gap-3">
        <span>
          ARM DOF: <span className="text-[#fae8ff]">6 AXIS</span>
        </span>
        <span>
          SERVO SYNC: <span className="text-[#fae8ff]">OPTIMAL</span>
        </span>
      </div>
    </div>
  )
}
