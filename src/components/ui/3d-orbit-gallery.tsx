"use client"

import React, { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTexture, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

export function ParticleSphere() {
  const PARTICLE_COUNT = 1500 
  const PARTICLE_SIZE_MIN = 0.005
  const PARTICLE_SIZE_MAX = 0.010
  const SPHERE_RADIUS = 9
  const POSITION_RANDOMNESS = 4
  const ROTATION_SPEED_X = 0.0
  const ROTATION_SPEED_Y = 0.0005
  const PARTICLE_OPACITY = 1

  const IMAGE_COUNT = 24
  const IMAGE_SIZE = 1.5 

  const groupRef = useRef<THREE.Group>(null)

  const textures = useTexture([
    "https://cdn.21st.dev/assets/mirror/c4/c4d03c8351f6c7f0adde9b29eae8361f49ba53eda5376382d8e92ac949b8aecc.jpg",
    "https://cdn.21st.dev/assets/mirror/eb/eb0cc3595865b5714a6f6c5fd9ced67ad8a4ced07ae696cf9a8bd393936598aa.jpg",
    "https://cdn.21st.dev/assets/mirror/f5/f5dabf18de226932e8615d73aca1b0270972299c339c21f755539f8c9cb2a10e.jpg",
    "https://cdn.21st.dev/assets/mirror/48/489e8547ad468b65bb0e819a08b5b1c285bf853ee5593db8da0d4aa7ebdc01eb.jpg",
    "https://cdn.21st.dev/assets/mirror/5f/5f1b7e28d00c5c8547a16f5f6f0b73bddc38b1bfd143eb5bfc7fc2de213f4f33.jpg",
    "https://cdn.21st.dev/assets/mirror/16/169191489e00db3e1553d1ce9290e7b777382f35205cb752b06acb7e95286fe6.jpg",
    "https://cdn.21st.dev/assets/mirror/98/9888ee2653456ca8071d7e8e8fe5fb20be2ca918fc8b782553d74530b433ba4e.jpg",
    "https://cdn.21st.dev/assets/mirror/a7/a784ae79e3248df52ba28d1bab49f274a7a093ddf14980a7c22b356c991473fb.jpg",
    "https://cdn.21st.dev/assets/mirror/4b/4b2ba408f9ff243652e5bee556d0e8c61ff6b4269ff944bcbfccdb51d55273ed.jpg",
    "https://cdn.21st.dev/assets/mirror/ee/ee9664245a623a9d9a8056339215c1cb84619f444014ecf6707f6b6c31ac3a77.jpg",
    "https://cdn.21st.dev/assets/mirror/b8/b805b6b3d35e0c709f354fc9caf81cc714ed01f14d1fd90c6f689bbd1a6b50ba.jpg",
    "https://cdn.21st.dev/assets/mirror/6b/6b68c16cf68c661ff368503e568ebff1a9135d192b80cad75f29d71321ae6a48.jpg",
    "https://cdn.21st.dev/assets/mirror/c3/c31c11cc537736cbe17daa3b69d3b7896e2d956a7afee5d9b385deeb32ebcd3c.jpg",
    "https://cdn.21st.dev/assets/mirror/b1/b1dba7b8870eb3cb6027c3650ced51331e902e43232320bc9c5bef3bcab3fa97.jpg",
    "https://cdn.21st.dev/assets/mirror/79/7976977f207ab9e0ee29e5acc4f2d5a3753324e7d4f0f2fc8746e52830645a42.jpg",
    "https://cdn.21st.dev/assets/mirror/db/db55caf63c3555b4f4c4b86341e9f482a680604d0dee217d29ccb107e3f1bf75.jpg",
    "https://cdn.21st.dev/assets/mirror/9f/9fada838a85a1d85816fa57c6c6b04177ece6b213d129cfb148ad7660417d421.jpg",
    "https://cdn.21st.dev/assets/mirror/0d/0d898e7a6866655cef819f3c4410c16a34364373f5d6df9bc78d39c4c1b19402.jpg",
    "https://cdn.21st.dev/assets/mirror/20/20338ace8f6700a3947eab268e23404ebb5ec76bd7ba6c53efe3b5f47bdd49c0.jpg",
    "https://cdn.21st.dev/assets/mirror/01/018ac89ee7cce95250491af74665c30f1548799be4b10c00928560873cd8cbaf.jpg",
    "https://cdn.21st.dev/assets/mirror/5e/5e1f785eececf8b6c46fe63247be5be265cbef80366a7ca896b1bece99686542.jpg",
    "https://cdn.21st.dev/assets/mirror/3e/3e5f3d1adbfe6840cd711dbbca2c2f1a90ec5987893f5b82e2a0f52b2bba80a9.jpg",
    "https://cdn.21st.dev/assets/mirror/89/895071162528f28f964b3104335997a69df2a15fafe605dca2a18f25ce02066f.jpg",
  ])

  useMemo(() => {
    textures.forEach((texture) => {
      if (texture) {
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        texture.flipY = false
      }
    })
  }, [textures])

  const particles = useMemo(() => {
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi

      const radiusVariation = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi)
      const y = radiusVariation * Math.cos(phi)
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi)

      particles.push({
        position: [x, y, z],
        scale: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
        color: new THREE.Color().setHSL(
          Math.random() * 0.1 + 0.05, 
          0.8,
          0.6 + Math.random() * 0.3,
        ),
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    return particles
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS, PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX])

  const orbitingImages = useMemo(() => {
    const images = []

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = 0 
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const center = new THREE.Vector3(0, 0, 0)
      const outwardDirection = position.clone().sub(center).normalize()

      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, position.clone().add(outwardDirection), new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)

      euler.z += Math.PI

      images.push({
        position: [x, y, z],
        rotation: [euler.x, euler.y, euler.z],
        textureIndex: i % textures.length,
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6), 
      })
    }

    return images
  }, [IMAGE_COUNT, SPHERE_RADIUS, textures.length])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
      groupRef.current.rotation.x += ROTATION_SPEED_X
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position as [number, number, number]} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={particle.color} transparent opacity={PARTICLE_OPACITY} />
        </mesh>
      ))}

      {orbitingImages.map((image, index) => (
        <mesh key={`image-${index}`} position={image.position as [number, number, number]} rotation={image.rotation as [number, number, number]}>
          <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE]} />
          <meshBasicMaterial map={textures[image.textureIndex]} opacity={1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export function OrbitGalleryCanvas({ className = "w-full h-full" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <ParticleSphere />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}
