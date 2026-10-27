"use client"

import React, { useRef, useMemo, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"

export interface ContestItem {
  id: string
  title: string
  tag: string
  code: string
  role: string
}

export const CONTEST_LIST: ContestItem[] = [
  { id: 'aerovision', title: 'AeroVision', tag: 'AERIAL EDGE AI', code: 'PROTOCOL_01', role: 'Autonomous AI Drone Grand Prix' },
  { id: 'mechagauntlet', title: 'Mecha Gauntlet', tag: 'KINEMATICS & LEGGED BOTS', code: 'PROTOCOL_02', role: 'Quadruped & Bipedal Agility' },
  { id: 'neurobotix', title: 'NeuroBotix', tag: 'HUMAN-ROBOT INTERACTION', code: 'PROTOCOL_03', role: 'Mind & Gesture Tele-Op' },
  { id: 'cyberneticsalvage', title: 'Cyber Salvage', tag: 'DISASTER RESCUE SLAM', code: 'PROTOCOL_04', role: 'Subterranean SLAM Rescue' },
]

function createContestCanvasTexture(contest: ContestItem) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()

  // Background
  ctx.fillStyle = '#16191b'
  ctx.fillRect(0, 0, 512, 512)

  // Outer Border
  ctx.strokeStyle = '#252525'
  ctx.lineWidth = 10
  ctx.strokeRect(8, 8, 496, 496)

  // Inner hairline
  ctx.strokeStyle = '#444444'
  ctx.lineWidth = 2
  ctx.strokeRect(24, 24, 464, 464)

  // Protocol Code
  ctx.fillStyle = '#646e71'
  ctx.font = '300 22px monospace'
  ctx.textAlign = 'left'
  ctx.fillText(contest.code, 42, 68)

  // Tag
  ctx.fillStyle = '#828b8d'
  ctx.font = '400 18px monospace'
  ctx.fillText(contest.tag, 42, 102)

  // Geometric Graphic Reticle
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 3
  ctx.strokeRect(216, 160, 80, 80)
  ctx.beginPath()
  ctx.arc(256, 200, 14, 0, Math.PI * 2)
  ctx.fillStyle = '#e0e0e0'
  ctx.fill()
  
  // Crosshair lines
  ctx.strokeStyle = '#444444'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(180, 200)
  ctx.lineTo(332, 200)
  ctx.moveTo(256, 124)
  ctx.lineTo(256, 276)
  ctx.stroke()

  // Title
  ctx.fillStyle = '#e0e0e0'
  ctx.font = '500 40px serif'
  ctx.textAlign = 'center'
  ctx.fillText(contest.title, 256, 340)

  // Role
  ctx.fillStyle = '#828b8d'
  ctx.font = '400 20px sans-serif'
  ctx.fillText(contest.role, 256, 380)

  // CTA
  ctx.fillStyle = '#646e71'
  ctx.font = '300 18px monospace'
  ctx.fillText('[ CLICK TO INSPECT & REGISTER ]', 256, 440)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function ParticleSphere({ onSelectEvent }: { onSelectEvent?: (title: string) => void }) {
  const PARTICLE_COUNT = 1500 
  const PARTICLE_SIZE_MIN = 0.005
  const PARTICLE_SIZE_MAX = 0.010
  const SPHERE_RADIUS = 9
  const POSITION_RANDOMNESS = 4
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.0005
  const PARTICLE_OPACITY = 0.85

  const IMAGE_COUNT = 24
  const IMAGE_SIZE = 1.6 

  const groupRef = useRef<THREE.Group>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Procedural sharp textures representing the 4 contests
  const textures = useMemo(() => {
    return CONTEST_LIST.map((c) => createContestCanvasTexture(c))
  }, [])

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
        color: new THREE.Color(Math.random() > 0.4 ? 0xe0e0e0 : 0x828b8d),
      })
    }
    return list
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  const orbitingImages = useMemo(() => {
    const list = []
    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = Math.sin((i / IMAGE_COUNT) * Math.PI * 4) * 0.8 // subtle wave elevation
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const center = new THREE.Vector3(0, 0, 0)
      const outwardDirection = position.clone().sub(center).normalize()

      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, position.clone().add(outwardDirection), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)
      euler.z += Math.PI

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

      {/* Orbiting Interactive Contest Placards */}
      {orbitingImages.map((img, idx) => {
        const isHovered = hoveredIdx === idx
        return (
          <mesh
            key={`contest-card-${idx}`}
            position={img.position}
            rotation={img.rotation}
            scale={isHovered ? [1.25, 1.25, 1.25] : [1, 1, 1]}
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
            <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE]} />
            <meshBasicMaterial
              map={textures[img.textureIndex]}
              side={THREE.DoubleSide}
              transparent
              opacity={isHovered ? 1.0 : 0.9}
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
      <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <Suspense fallback={null}>
          <ParticleSphere onSelectEvent={onSelectEvent} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}
