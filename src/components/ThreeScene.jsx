import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Eye, RotateCw, Sparkles, Activity } from 'lucide-react'

export default function ThreeScene() {
  const mountRef = useRef(null)
  const [wireframe, setWireframe] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [telemetry, setTelemetry] = useState({ fps: 60, vertices: 2480, status: 'NOMINAL' })
  const wireframeRef = useRef(wireframe)
  const speedRef = useRef(speed)

  useEffect(() => {
    wireframeRef.current = wireframe
  }, [wireframe])

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x010101, 0.035)

    const width = container.clientWidth
    const height = container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x252525, 2.5)
    scene.add(ambientLight)

    const cyanLight = new THREE.PointLight(0x00e5ff, 4, 25)
    cyanLight.position.set(4, 5, 4)
    scene.add(cyanLight)

    const violetLight = new THREE.PointLight(0x818cf8, 3, 20)
    violetLight.position.set(-4, -4, 3)
    scene.add(violetLight)

    // Group for robot core
    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    // 1. Inner glowing sphere (Kinetic Reactor)
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 2)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x16191b,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
    })
    const innerCore = new THREE.Mesh(innerGeo, innerMat)
    coreGroup.add(innerCore)

    // Wireframe overlay for inner core
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })
    const innerWire = new THREE.Mesh(innerGeo, innerWireMat)
    coreGroup.add(innerWire)

    // 2. Middle Gimbal Ring 1 (Torus)
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.035, 16, 100)
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.95,
      roughness: 0.1,
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    coreGroup.add(ring1)

    // 3. Middle Gimbal Ring 2 (Torus - Orthogonal)
    const ring2Geo = new THREE.TorusGeometry(2.35, 0.035, 16, 100)
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x828b8d,
      metalness: 0.8,
      roughness: 0.3,
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 2
    coreGroup.add(ring2)

    // 4. Outer Dodecahedron Cage
    const cageGeo = new THREE.DodecahedronGeometry(2.9, 0)
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x252525,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })
    const cage = new THREE.Mesh(cageGeo, cageMat)
    coreGroup.add(cage)

    // 5. Orbiting Swarm Particles
    const particleCount = 280
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const c1 = new THREE.Color(0x00e5ff)
    const c2 = new THREE.Color(0xe0e0e0)

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.2 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const mixed = c1.clone().lerp(c2, Math.random())
      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    })
    const particleCloud = new THREE.Points(particleGeo, particleMat)
    coreGroup.add(particleCloud)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    container.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()
    let frameCount = 0
    let lastTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const currentSpeed = speedRef.current

      targetX += (mouseX * 0.8 - targetX) * 0.05
      targetY += (mouseY * 0.8 - targetY) * 0.05

      // Rotations
      coreGroup.rotation.y += 0.3 * delta * currentSpeed
      coreGroup.rotation.x = targetY * 0.4
      coreGroup.rotation.z = -targetX * 0.3

      ring1.rotation.x += 0.8 * delta * currentSpeed
      ring1.rotation.y += 0.5 * delta * currentSpeed

      ring2.rotation.y -= 0.6 * delta * currentSpeed
      ring2.rotation.z += 0.4 * delta * currentSpeed

      cage.rotation.y += 0.15 * delta * currentSpeed
      cage.rotation.x -= 0.15 * delta * currentSpeed

      particleCloud.rotation.y -= 0.2 * delta * currentSpeed

      // Update wireframe mode
      cageMat.wireframe = wireframeRef.current
      innerWireMat.visible = wireframeRef.current

      renderer.render(scene, camera)

      // FPS Calculation
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        setTelemetry((prev) => ({
          ...prev,
          fps: frameCount,
          status: frameCount > 45 ? 'OPTIMAL' : 'STEADY',
        }))
        frameCount = 0
        lastTime = now
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[440px] md:h-[520px] rounded-2xl border border-[#252525] bg-[#16191b] overflow-hidden select-none">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Grid Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20" />

      {/* Top Left: Instrument Telemetry Label */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
          <span className="text-[11px] font-mono-tech tracking-wider text-[#e0e0e0] uppercase">
            AUTONOMOUS CORE // SYS_REV.04
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-[#646e71]">
          COORDINATES: 21.2497° N, 81.6050° E [NITRR]
        </span>
      </div>

      {/* Top Right: Real-time Diagnostics Pill */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
        <div className="px-3 py-1 rounded-full bg-[#1f1f23]/90 border border-[#252525] flex items-center gap-2 text-[11px] font-mono-tech text-[#e0e0e0]">
          <Activity className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>{telemetry.fps} FPS</span>
          <span className="text-[#646e71]">//</span>
          <span className="text-[#00e5ff]">{telemetry.status}</span>
        </div>
      </div>

      {/* Bottom Center: Interactive HUD Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-[#010101]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#252525]">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-3 py-1 rounded-full text-[11px] font-mono-tech transition-colors flex items-center gap-1.5 ${
            wireframe ? 'bg-[#1f1f23] text-[#e0e0e0] border border-[#252525]' : 'text-[#828b8d] hover:text-[#e0e0e0]'
          }`}
          title="Toggle Wireframe Architecture"
        >
          <Eye className="w-3 h-3 text-[#00e5ff]" />
          <span>{wireframe ? 'WIREFRAME' : 'SURFACE'}</span>
        </button>

        <span className="w-px h-3 bg-[#252525]" />

        <button
          onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.4 : 1))}
          className="px-3 py-1 rounded-full text-[11px] font-mono-tech text-[#828b8d] hover:text-[#e0e0e0] hover:bg-[#1f1f23] transition-colors flex items-center gap-1.5"
          title="Adjust Gyroscopic Velocity"
        >
          <RotateCw className="w-3 h-3 text-[#00e5ff]" />
          <span>VELOCITY: {speed}X</span>
        </button>
      </div>

      {/* Bottom Left: Micro status */}
      <div className="hidden sm:block absolute bottom-4 left-4 z-10 text-[10px] font-mono-tech text-[#646e71] pointer-events-none">
        DRAG TO ORIENT ROBOTIC GYROSCOPE
      </div>

      {/* Bottom Right: Club mark badge */}
      <div className="hidden sm:block absolute bottom-4 right-4 z-10 text-[10px] font-mono-tech text-[#828b8d] pointer-events-none">
        ROBOTiX LABS // NIT RAIPUR
      </div>
    </div>
  )
}
