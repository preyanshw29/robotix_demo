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

  // Card background - AWE Machine Well (#16191b)
  ctx.fillStyle = '#16191b'
  ctx.fillRect(0, 0, 1024, 660)

  // Outer Hairline Ash border (#252525)
  ctx.strokeStyle = '#252525'
  ctx.lineWidth = 10
  ctx.strokeRect(10, 10, 1004, 640)

  // Inner framing hairline
  ctx.strokeStyle = '#38383c'
  ctx.lineWidth = 2
  ctx.strokeRect(28, 28, 968, 604)

  // Header: Protocol Code
  ctx.fillStyle = '#646e71'
  ctx.font = '300 24px monospace'
  ctx.textAlign = 'left'
  ctx.fillText(contest.code, 52, 86)

  // Header: Category Tag (Right aligned)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#828b8d'
  ctx.font = '400 22px monospace'
  ctx.fillText(contest.tag, 972, 86)

  // Structural hairline rule
  ctx.strokeStyle = '#252525'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(52, 116)
  ctx.lineTo(972, 116)
  ctx.stroke()

  // Main Event Title (Cormorant Garamond display serif, #e0e0e0)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#e0e0e0'
  ctx.font = '600 70px "Cormorant Garamond", Georgia, serif'
  ctx.fillText(contest.title, 512, 225)

  // Role / Subhead in Muted Steel
  ctx.fillStyle = '#828b8d'
  ctx.font = '400 30px sans-serif'
  ctx.fillText(contest.role, 512, 280)

  // Telemetry Row Box (#010101 Void inset)
  ctx.fillStyle = '#010101'
  ctx.fillRect(140, 330, 744, 76)
  ctx.strokeStyle = '#252525'
  ctx.lineWidth = 2
  ctx.strokeRect(140, 330, 744, 76)

  ctx.fillStyle = '#e0e0e0'
  ctx.font = '300 22px monospace'
  ctx.fillText(contest.meta, 512, 378)

  // Bottom CTA Pill (#1f1f23 Charcoal Control with 100px radius style)
  ctx.fillStyle = '#1f1f23'
  if ('roundRect' in ctx) {
    ctx.beginPath()
    ctx.roundRect(240, 460, 544, 86, 43)
    ctx.fill()
    ctx.strokeStyle = '#444444'
    ctx.lineWidth = 2
    ctx.stroke()
  } else {
    ctx.fillRect(240, 460, 544, 86)
  }

  ctx.fillStyle = '#e0e0e0'
  ctx.font = '500 26px monospace'
  ctx.fillText('[ CLICK TO INSPECT & REGISTER ]', 512, 514)

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.needsUpdate = true
  return texture
}

export function ParticleSphere({ onSelectEvent }: { onSelectEvent?: (title: string) => void }) {
  // Particle sphere background (clean starry ambient coordinates)
  const PARTICLE_COUNT = 900
  const PARTICLE_SIZE_MIN = 0.012
  const PARTICLE_SIZE_MAX = 0.024
  const SPHERE_RADIUS = 9.2
  const POSITION_RANDOMNESS = 3.5
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.0006
  const PARTICLE_OPACITY = 0.75

  // 8 Elements in the spiral as requested
  const IMAGE_COUNT = 8
  const CARD_WIDTH = 3.6
  const CARD_HEIGHT = 2.3

  const groupRef = useRef<THREE.Group>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Textures for 4 contests
  const textures = useMemo(() => {
    return CONTEST_LIST.map((c) => createContestCanvasTexture(c))
  }, [])

  // Ambient Star Particles
  const particles = useMemo(() => {
    const list = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi
      const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
      const y = radiusVariation * Math.cos(phi)
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi)

      list.push({
        position: [x, y, z] as [number, number, number],
        scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: new THREE.Color(Math.random() > 0.35 ? 0xe0e0e0 : 0x646e71),
      })
    }
    return list
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  // Exactly 8 Orbiting Large Contest Cards
  const orbitingImages = useMemo(() => {
    const list = []
    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      // Gentle spiral wave elevation
      const y = Math.sin((i / IMAGE_COUNT) * Math.PI * 2) * 1.2
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const center = new THREE.Vector3(0, 0, 0)
      const outwardDirection = position.clone().sub(center).normalize()

      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, position.clone().add(outwardDirection), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)
      euler.z += Math.PI

      // Cycle across our 4 contests (8 cards = 2 full loops of 4)
      const contest = CONTEST_LIST[i % CONTEST_LIST.length]

      list.push({
        position: [x, y, z] as [number, number, number],
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
        contest,
        textureIndex: i % textures.length,
      })
    }
    return list
  }, [IMAGE_COUNT, SPHERE_RADIUS, textures.length])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
      groupRef.current.rotation.x += ROTATION_SPEED_X
    }
  })

  return (
    <group ref={groupRef}>
      {/* Background ambient particle sphere */}
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {/* Exactly 8 Large Orbiting Contest Placards */}
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
      <Canvas camera={{ position: [-12, 2.2, 12], fov: 46 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <Suspense fallback={null}>
          <ParticleSphere onSelectEvent={onSelectEvent} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}
