"use client"

import React, { useRef, useEffect, useState } from 'react'

interface GhostFlameBorderProps {
  children: React.ReactNode
  className?: string
  radius?: number
  intensity?: 'subtle' | 'medium' | 'high'
  showEmbers?: boolean
}

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  decay: number
  color: string
  wobbleSpeed: number
  wobbleOffset: number
}

const EMBER_COLORS = [
  '#ffffff', // White-hot core
  '#fae8ff', // Ghost lilac
  '#f5d0fe', // Luminous pink-lilac
  '#e879f9', // Neon spectral fuchsia
  '#c026d3', // Electric ghost violet
  '#a855f7', // Saturated purple
  '#7e22ce', // Deep phantom flame
]

export default function GhostFlameBorder({
  children,
  className = '',
  radius = 16,
  intensity = 'high',
  showEmbers = true,
}: GhostFlameBorderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0
    let isVisible = true

    // Responsive Canvas Resizing with Margin for floating dust embers
    const MARGIN = 36 // extra padding for scattering embers to float away
    let width = 0
    let height = 0
    let cardW = 0
    let cardH = 0

    const updateSize = () => {
      if (!container || !canvas) return
      cardW = container.clientWidth
      cardH = container.clientHeight
      width = canvas.width = cardW + MARGIN * 2
      height = canvas.height = cardH + MARGIN * 2
    }
    updateSize()

    const ro = new ResizeObserver(updateSize)
    ro.observe(container)

    // Visibility Observer to pause when scrolled away
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    io.observe(container)

    // Particle Dust Embers Pool
    const emberCount = intensity === 'high' ? 32 : intensity === 'medium' ? 22 : 14
    const embers: Ember[] = []

    const spawnEmber = (): Ember => {
      // Spawn mostly on top border, and upper 30% of left/right sides
      const spawnType = Math.random()
      let x = MARGIN
      let y = MARGIN

      if (spawnType < 0.75) {
        // Top edge
        x = MARGIN + Math.random() * cardW
        y = MARGIN + (Math.random() - 0.5) * 4
      } else if (spawnType < 0.88) {
        // Left upper edge
        x = MARGIN + (Math.random() - 0.5) * 3
        y = MARGIN + Math.random() * (cardH * 0.4)
      } else {
        // Right upper edge
        x = MARGIN + cardW + (Math.random() - 0.5) * 3
        y = MARGIN + Math.random() * (cardH * 0.4)
      }

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 0.8 + 0.4), // Floating gently upward
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.014 + 0.008,
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        wobbleSpeed: Math.random() * 0.08 + 0.03,
        wobbleOffset: Math.random() * Math.PI * 2,
      }
    }

    for (let i = 0; i < emberCount; i++) {
      const e = spawnEmber()
      e.y -= Math.random() * 30 // pre-disperse
      e.alpha = Math.max(0, e.alpha - Math.random() * 0.5)
      embers.push(e)
    }

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render)
        return
      }

      time += 0.035
      ctx.clearRect(0, 0, width, height)

      const cx = MARGIN
      const cy = MARGIN
      const cw = cardW
      const ch = cardH
      const r = radius

      // ======================================================================
      // 1. ANIMATED SPECTRAL FLAME BORDER CONTOUR (Licking Ghost Plasma)
      // ======================================================================
      ctx.save()

      // High-Contrast Multi-Pass Degrading Flame Glow
      // Pass A: Wide Deep Amethyst Plasma aura
      ctx.strokeStyle = isHovered ? 'rgba(217, 70, 239, 0.45)' : 'rgba(168, 85, 247, 0.25)'
      ctx.lineWidth = isHovered ? 8 : 5
      ctx.shadowColor = '#c026d3'
      ctx.shadowBlur = isHovered ? 20 : 12

      ctx.beginPath()
      if ('roundRect' in ctx) {
        ctx.roundRect(cx, cy, cw, ch, r)
      } else {
        ctx.strokeRect(cx, cy, cw, ch)
      }
      ctx.stroke()

      // Pass B: Sharp Electric Neon Violet Core Line
      ctx.shadowBlur = isHovered ? 12 : 6
      ctx.shadowColor = '#e879f9'
      ctx.strokeStyle = isHovered ? 'rgba(245, 208, 254, 0.9)' : 'rgba(232, 121, 249, 0.65)'
      ctx.lineWidth = 1.6

      ctx.beginPath()
      if ('roundRect' in ctx) {
        ctx.roundRect(cx, cy, cw, ch, r)
      } else {
        ctx.strokeRect(cx, cy, cw, ch)
      }
      ctx.stroke()
      ctx.restore()

      // Licking flame pulses along the top edge
      ctx.save()
      const flameGradient = ctx.createLinearGradient(cx, cy - 8, cx, cy + 2)
      flameGradient.addColorStop(0, 'rgba(232, 121, 249, 0.85)')
      flameGradient.addColorStop(0.4, 'rgba(192, 38, 211, 0.4)')
      flameGradient.addColorStop(1, 'transparent')

      ctx.fillStyle = flameGradient
      ctx.beginPath()
      ctx.moveTo(cx + r, cy)

      // Undulating flame wave along the top border
      for (let x = cx + r; x <= cx + cw - r; x += 4) {
        const norm = (x - cx) / cw
        const flameHeight =
          (Math.sin(norm * 16 + time * 3.5) * 3 +
            Math.cos(norm * 28 - time * 4.2) * 2 +
            (isHovered ? 3.5 : 1.5)) *
          Math.sin(norm * Math.PI) // tapered at edges

        ctx.lineTo(x, cy - Math.max(0, flameHeight))
      }
      ctx.lineTo(cx + cw - r, cy)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // ======================================================================
      // 2. TIME-BITS OF DUST SCATTERING (Floating Ember Sparks)
      // ======================================================================
      if (showEmbers) {
        const speedBoost = isHovered ? 1.4 : 1.0

        for (let i = 0; i < embers.length; i++) {
          const e = embers[i]

          // Motion with gentle sinusoidal wind wobble
          e.y += e.vy * speedBoost
          e.x += e.vx + Math.sin(time * 2 + e.wobbleOffset) * 0.4
          e.alpha -= e.decay

          // Respawn ember when dissolved or floated out of bounds
          if (e.alpha <= 0 || e.y < 0 || e.x < 0 || e.x > width) {
            embers[i] = spawnEmber()
            continue
          }

          // Draw Glowing Dust Particle
          ctx.save()
          ctx.beginPath()
          ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)

          // Glowing aura around dust ember
          ctx.shadowColor = e.color
          ctx.shadowBlur = 6
          ctx.fillStyle = e.color
          ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha))
          ctx.fill()

          // Hot inner core dot
          if (e.size > 1.2) {
            ctx.beginPath()
            ctx.arc(e.x, e.y, e.size * 0.45, 0, Math.PI * 2)
            ctx.fillStyle = '#ffffff'
            ctx.globalAlpha = Math.min(1, e.alpha * 1.5)
            ctx.fill()
          }

          ctx.restore()
        }
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
      io.disconnect()
    }
  }, [radius, intensity, showEmbers, isHovered])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className}`}
    >
      {/* Absolute Overlaid Flame & Dust Canvas extending outside the card */}
      <canvas
        ref={canvasRef}
        className="absolute -top-[36px] -left-[36px] pointer-events-none z-20"
        style={{
          width: 'calc(100% + 72px)',
          height: 'calc(100% + 72px)',
        }}
      />

      {/* Child Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
