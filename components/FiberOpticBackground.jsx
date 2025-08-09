import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FiberOpticCable = ({ position, rotation, scrollProgress }) => {
  const cableRef = useRef()
  const glowRef = useRef()
  
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, -5, 0),
      new THREE.Vector3(-5, 2, -2),
      new THREE.Vector3(0, -1, 1),
      new THREE.Vector3(5, 3, -1),
      new THREE.Vector3(10, -2, 0),
    ])
    return curve.getPoints(100)
  }, [])

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points)
    const colors = new Float32Array(points.length * 3)
    
    points.forEach((_, i) => {
      const pulse = Math.sin(i * 0.1 + scrollProgress * 10) * 0.5 + 0.5
      colors[i * 3] = 0.2 + pulse * 0.8     // R
      colors[i * 3 + 1] = 0.5 + pulse * 0.5 // G  
      colors[i * 3 + 2] = 1.0                // B
    })
    
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geom
  }, [points, scrollProgress])

  useFrame((state) => {
    if (cableRef.current) {
      cableRef.current.rotation.z += 0.01
      cableRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <line ref={cableRef} geometry={geometry}>
        <lineBasicMaterial 
          vertexColors 
          transparent 
          opacity={0.6}
          linewidth={2}
        />
      </line>
    </group>
  )
}

const ParticleField = ({ scrollProgress }) => {
  const particlesRef = useRef()
  const particleCount = 200
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      colors[i * 3] = Math.random() * 0.5 + 0.5
      colors[i * 3 + 1] = Math.random() * 0.3 + 0.7
      colors[i * 3 + 2] = 1.0
    }
    
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.rotation.x += 0.0005
      
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

const FiberOpticBackground = ({ scrollProgress = 0 }) => {
  const groupRef = useRef()
  
  const cables = useMemo(() => {
    const cableCount = Math.min(5 + Math.floor(scrollProgress * 10), 15)
    return Array.from({ length: cableCount }, (_, i) => ({
      key: i,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ]
    }))
  }, [scrollProgress])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4F46E5" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06B6D4" />
      
      {/* Fiber Optic Cables */}
      <group ref={groupRef}>
        {cables.map((cable) => (
          <FiberOpticCable
            key={cable.key}
            position={cable.position}
            rotation={cable.rotation}
            scrollProgress={scrollProgress}
          />
        ))}
      </group>
      
      {/* Particle Field */}
      <ParticleField scrollProgress={scrollProgress} />
      
      {/* Background Fog */}
      <fog attach="fog" args={['#0a0a0a', 5, 25]} />
    </>
  )
}

export default FiberOpticBackground