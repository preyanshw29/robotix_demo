"use client"

import React, { useRef, useMemo, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

export interface ContestItem {
  id: string
  title: string
  tag: string
  code: string
  role: string
  meta: string
}

export const CONTEST_LIST: ContestItem[] = [
  {
    id: 'aerovision',
    title: 'AeroVision',
    tag: 'AERIAL EDGE AI',
    code: 'PROTOCOL_01',
    role: 'Autonomous AI Drone Grand Prix',
    meta: 'PURSE: ₹30,000  •  COMPUTE: JETSON / RPI  •  AUTONOMOUS',
  },
  {
    id: 'mechagauntlet',
    title: 'Mecha Gauntlet',
    tag: 'LEGGED KINEMATICS',
    code: 'PROTOCOL_02',
    role: 'Quadruped & Bipedal Agility Trial',
    meta: 'PURSE: ₹35,000  •  STAIRS & BALANCE  •  DYNAMICS',
  },
  {
    id: 'neurobotix',
    title: 'NeuroBotix',
    tag: 'NEURAL TELE-OP',
    code: 'PROTOCOL_03',
    role: 'Mind-Controlled & Gesture Tele-Op',
    meta: 'PURSE: ₹25,000  •  OPENBCI EEG  •  PRECISION HRI',
  },
  {
    id: 'cyberneticsalvage',
    title: 'Cyber Salvage',
    tag: 'SUBTERRANEAN SLAM',
    code: 'PROTOCOL_04',
    role: 'Disaster Search-and-Rescue SLAM',
    meta: 'PURSE: ₹30,000  •  LIDAR & THERMAL  •  EXTRACTION',
  },
]

function createContestCanvasTexture(contest: ContestItem) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 660
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // Card background - High-Contrast Obsidian Violet Well
  ctx.fillStyle = '#0f071a'
  ctx.fillRect(0, 0, 1024, 660)

  // Outer Hairline Ghost Fuchsia/Violet border (#c026d3)
  ctx.strokeStyle = '#c026d3'
  ctx.lineWidth = 6
  ctx.strokeRect(10, 10, 1004, 640)

  // Inner framing hairline
  ctx.strokeStyle = '#e879f9'
  ctx.lineWidth = 2.5
  ctx.strokeRect(28, 28, 968, 604)

  // Glowing white-hot corner accents
  ctx.fillStyle = '#fae8ff'
  ctx.fillRect(28, 28, 22, 4)
  ctx.fillRect(28, 28, 4, 22)
  ctx.fillRect(974, 28, 22, 4)
  ctx.fillRect(992, 28, 4, 22)
  ctx.fillRect(28, 628, 22, 4)
  ctx.fillRect(28, 610, 4, 22)
  ctx.fillRect(974, 628, 22, 4)
  ctx.fillRect(992, 610, 4, 22)

  // Header: Protocol Code (Top Left)
  ctx.fillStyle = '#e879f9'
  ctx.font = '600 24px monospace'
  ctx.textAlign = 'left'
  ctx.fillText(contest.code, 52, 86)

  // Header: Category Tag (Top Right)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#fae8ff'
  ctx.font = '500 22px monospace'
  ctx.fillText(contest.tag, 972, 86)

  // Structural hairline rule
  ctx.strokeStyle = '#701a75'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(52, 116)
  ctx.lineTo(972, 116)
  ctx.stroke()

  // Main Event Title (Cormorant Garamond display serif, #fae8ff White-hot Ghost Lilac)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffffff'
  ctx.font = '600 70px "Cormorant Garamond", Georgia, serif'
  ctx.fillText(contest.title, 512, 225)

  // Role / Subhead in Electric Violet
  ctx.fillStyle = '#e879f9'
  ctx.font = '500 28px sans-serif'
  ctx.fillText(contest.role, 512, 280)

  // Telemetry Row Box (#07030d Void inset with Electric Violet border)
  ctx.fillStyle = '#06020a'
  ctx.fillRect(140, 330, 744, 76)
  ctx.strokeStyle = '#c026d3'
  ctx.lineWidth = 2
  ctx.strokeRect(140, 330, 744, 76)

  ctx.fillStyle = '#fae8ff'
  ctx.font = '400 22px monospace'
  ctx.fillText(contest.meta, 512, 378)

  // Bottom CTA Pill (High-Contrast Neon Gradient)
  ctx.fillStyle = '#4a044e'
  if ('roundRect' in ctx) {
    ctx.beginPath()
    ctx.roundRect(240, 460, 544, 86, 43)
    ctx.fill()
    ctx.strokeStyle = '#e879f9'
    ctx.lineWidth = 3
    ctx.stroke()
  } else {
    ctx.fillRect(240, 460, 544, 86)
  }

  ctx.fillStyle = '#ffffff'
  ctx.font = '600 25px monospace'
  ctx.fillText('[ CLICK TO INSPECT & REGISTER ]', 512, 514)

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.flipY = true
  texture.needsUpdate = true
  return texture
}

export function ParticleSphere({ onSelectEvent }: { onSelectEvent?: (title: string) => void }) {
  // Ambient starry coordinate particles spanning the wide breadth
  const PARTICLE_COUNT = 1100
  const PARTICLE_SIZE_MIN = 0.012
  const PARTICLE_SIZE_MAX = 0.026
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.0006
  const PARTICLE_OPACITY = 0.75

  // Wide panoramic orbital spread: extends completely from left to right
  const RADIUS_X = 14.2
  const RADIUS_Z = 7.8
  const ELEVATION_RANGE = 1.3

  // Exactly 8 large elements in the spiral
  const IMAGE_COUNT = 8
  const CARD_WIDTH = 3.8
  const CARD_HEIGHT = 2.45

  const groupRef = useRef<THREE.Group>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Textures for 4 contests
  const textures = useMemo(() => {
    return CONTEST_LIST.map((c) => createContestCanvasTexture(c))
  }, [])

  // Ambient Star Particles spanning the wide elliptical breadth
  const particles = useMemo(() => {
    const list = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi
      
      const varX = RADIUS_X + (Math.random() - 0.5) * 4.5
      const varZ = RADIUS_Z + (Math.random() - 0.5) * 3.5

      const x = varX * Math.cos(theta) * Math.sin(phi)
      const y = (Math.random() - 0.5) * 9
      const z = varZ * Math.sin(theta) * Math.sin(phi)

      // High-Contrast Ghost Purple & Saturated Fuchsia Flame spectrum
      const randColor = Math.random()
      let pColor = 0xfae8ff // White-hot ghost lilac
      if (randColor < 0.28) {
        pColor = 0xe879f9 // Neon fuchsia
      } else if (randColor < 0.55) {
        pColor = 0xc026d3 // Electric violet
      } else if (randColor < 0.78) {
        pColor = 0xa855f7 // Vibrant purple
      } else if (randColor < 0.90) {
        pColor = 0xffffff // Pure white star
      } else {
        pColor = 0x701a75 // Deep amethyst flame
      }

      list.push({
        position: [x, y, z] as [number, number, number],
        scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: new THREE.Color(pColor),
      })
    }
    return list
  }, [PARTICLE_COUNT, RADIUS_X, RADIUS_Z, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  // 8 Orbiting Large Contest Cards spanning wide across the screen
  const orbitingImages = useMemo(() => {
    const list = []
    const dummy = new THREE.Object3D()

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = RADIUS_X * Math.cos(angle)
      const y = Math.sin((i / IMAGE_COUNT) * Math.PI * 2) * ELEVATION_RANGE
      const z = RADIUS_Z * Math.sin(angle)

      dummy.position.set(x, y, z)
      // Normal radial outward vector for the ellipse
      const outX = x / RADIUS_X
      const outZ = z / RADIUS_Z
      dummy.lookAt(x + outX * 5, y, z + outZ * 5)

      const contest = CONTEST_LIST[i % CONTEST_LIST.length]

      list.push({
        position: [x, y, z] as [number, number, number],
        rotation: [dummy.rotation.x, dummy.rotation.y, dummy.rotation.z] as [number, number, number],
        contest,
        textureIndex: i % textures.length,
      })
    }
    return list
  }, [IMAGE_COUNT, RADIUS_X, RADIUS_Z, ELEVATION_RANGE, textures.length])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
      groupRef.current.rotation.x += ROTATION_SPEED_X
    }
  })

  return (
    <group ref={groupRef}>
      {/* Background ambient particle coordinates */}
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {/* 8 Outward-facing Large Contest Cards spanning wide from left to right */}
      {orbitingImages.map((img, idx) => {
        const isHovered = hoveredIdx === idx
        return (
          <mesh
            key={`orbit-card-${idx}`}
            position={img.position}
            rotation={img.rotation}
            scale={isHovered ? [1.18, 1.18, 1.18] : [1, 1, 1]}
            onPointerOver={(e) => {
              e.stopPropagation()
              document.body.style.cursor = "pointer"
              setHoveredIdx(idx)
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto"
              setHoveredIdx(null)
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectEvent?.(img.contest.title)
            }}
          >
            <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
            <meshBasicMaterial
              map={textures[img.textureIndex]}
              side={THREE.DoubleSide}
              transparent
              opacity={isHovered ? 1.0 : 0.95}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function OrbitGalleryCanvas({
  className = "w-full h-full",
  onSelectEvent,
}: {
  className?: string
  onSelectEvent?: (title: string) => void
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Centered camera with wide horizontal view spanning left to right */}
      <Canvas camera={{ position: [0, 2.0, 16], fov: 48 }}>
        <ambientLight intensity={0.85} />
        <pointLight position={[0, 12, 14]} intensity={1.3} />
        <Suspense fallback={null}>
          <ParticleSphere onSelectEvent={onSelectEvent} />
        </Suspense>
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={9}
          maxDistance={26}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.4}
        />
      </Canvas>
    </div>
  )
}
