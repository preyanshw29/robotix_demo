import React, { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Mouse coordinates
    let mouse = { x: width / 2, y: height / 2, radius: 150 }
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Particles setup
    const particleCount = 55
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5, // gentle upward drift
        size: Math.random() * 2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(0, 212, 255,' : 'rgba(59, 130, 246,',
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    let animationFrameId
    let time = 0

    const render = () => {
      time += 0.03
      ctx.clearRect(0, 0, width, height)

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap around screen
        if (p.y < 0) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        // Mouse proximity repulsion
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5
          p.x -= (dx / dist) * force
          p.y -= (dy / dist) * force
        }

        // Draw particle with glow
        const currentAlpha = p.alpha + Math.sin(time * 2 + p.pulseOffset) * 0.2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${Math.max(0.1, currentAlpha)})`
        ctx.shadowBlur = 8
        ctx.shadowColor = '#00d4ff'
        ctx.fill()
        ctx.shadowBlur = 0

        // Subtle connecting lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist2 < 95) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - dist2 / 95) * 0.15})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  )
}
