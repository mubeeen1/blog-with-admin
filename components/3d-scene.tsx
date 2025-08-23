"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Float,
  Text3D,
  Center,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
} from "@react-three/drei"
import type * as THREE from "three"

// Animated floating geometric shapes
function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5
    }
  })

  return (
    <group>
      {/* Main central sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere
          ref={meshRef}
          args={[1.2, 64, 64]}
          position={[0, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#8b5cf6" : "#3b82f6"}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbiting elements */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Box args={[0.5, 0.5, 0.5]} position={[3, 1, 0]}>
          <meshStandardMaterial color="#06b6d4" metalness={0.7} roughness={0.2} />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.5}>
        <Torus args={[0.6, 0.2, 16, 32]} position={[-2.5, -1, 1]} rotation={[0.5, 0, 0]}>
          <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.3} />
        </Torus>
      </Float>

      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={0.8}>
        <Box args={[0.3, 1.5, 0.3]} position={[1.5, -2, -1]} rotation={[0.3, 0.8, 0]}>
          <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.1} />
        </Box>
      </Float>

      {/* Smaller accent spheres */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere
            args={[0.1, 16, 16]}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 4,
              Math.sin((i / 8) * Math.PI * 2) * 2,
              Math.sin((i / 8) * Math.PI * 4) * 1.5,
            ]}
          >
            <meshStandardMaterial color={`hsl(${(i * 45) % 360}, 70%, 60%)`} metalness={0.9} roughness={0.1} />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

// Interactive 3D text
function TechText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[0, -3, 0]}
      >
        TECH BLOG
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  )
}

// Camera controller for smooth movements
function CameraController() {
  const { camera } = useThree()

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2
    camera.position.z = 8 + Math.cos(state.clock.elapsedTime * 0.2) * 2
    camera.lookAt(0, 0, 0)
  })

  return null
}

interface TechScene3DProps {
  className?: string
}

export default function TechScene3D({ className }: TechScene3DProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={`bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl border border-border/40 flex items-center justify-center ${className}`}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-white rounded opacity-80" />
          </div>
          <p className="text-muted-foreground">Loading 3D Scene...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />

        <FloatingGeometry />
        <TechText />
        <CameraController />

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
