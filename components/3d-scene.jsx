"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

function RotatingBox() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00d4ff" wireframe />
    </mesh>
  )
}

function FloatingGeometry({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5
      meshRef.current.rotation.z += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />

      <RotatingBox />
      <FloatingGeometry position={[-3, 2, -2]} color="#ff6b35" />
      <FloatingGeometry position={[3, -1, -1]} color="#00d4ff" />
      <FloatingGeometry position={[0, 3, -3]} color="#8a2be2" />

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} enablePan={false} />
    </Canvas>
  )
}
