import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { AtariConsole } from './AtariConsole'
import { Cassette } from './Cassette'
import { projects } from '@/data/site'

/* Konsolun ekranda kapladığı kutu — kamera buna göre uzaklaşır */
const FIT_W = 11.2
const FIT_H = 7.4

const DIR = new THREE.Vector3(0.48, 0.7, 1).normalize()

/* Kasetin oturma konumu.
   Gövdenin tabanı ≈ -0.78, kasetin yarı yüksekliği 2.0 → merkez 1.62 iken
   taban -0.38'de kalır, yani konsolun altından taşmaz. */
const CART_Y = 1.62
const CART_Z = 0.45 // yuvanın merkeziyle aynı hiza

/** Kamerayı sahne oranına göre konsolu kadraja oturtur. */
function CameraFit() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const size = useThree((s) => s.size)

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height)
    const vFov = (camera.fov * Math.PI) / 180
    const half = Math.tan(vFov / 2)

    const distH = FIT_H / 2 / half
    const distW = FIT_W / 2 / half / aspect
    const d = Math.max(distH, distW) * 1.04

    // Geniş-kısa canvas'ta üstte/altta boşluk kalır; bir kısmını kullanarak
    // modeli yukarı kaydır ki alttaki başlıkla çakışmasın.
    const visibleH = 2 * d * half
    const slack = Math.max(0, visibleH - FIT_H) / 2
    const lift = Math.min(0.45, slack * 0.3)

    camera.position.copy(DIR).multiplyScalar(d)
    camera.lookAt(0, 0.35 - lift, 0)
    camera.near = d / 12
    camera.far = d * 4
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])

  return null
}

/** Ana sayfa sahnesi: 3B oyun konsolu ve takılı kaset. */
function Scene() {
  const cart = useRef<THREE.Group>(null)

  useFrame((s) => {
    const g = cart.current
    if (!g) return
    const t = s.clock.elapsedTime
    g.position.y = CART_Y + Math.sin(t * 0.8) * 0.03
    g.rotation.z = 0.04 + Math.sin(t * 0.55) * 0.012
  })

  return (
    <>
      <ambientLight intensity={0.24} />
      <directionalLight
        position={[6, 11, 8]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0008}
      />
      <directionalLight position={[-8, 4, 5]} intensity={0.45} color="#b9c4dd" />
      <directionalLight position={[0, -5, -8]} intensity={0.4} color="#cfd2da" />

      <Environment frames={1} resolution={256}>
        <Lightformer form="rect" intensity={1.3} position={[0, 7, 5]} scale={[14, 6, 1]} />
        <Lightformer
          form="rect"
          intensity={0.55}
          position={[-7, 3, 4]}
          scale={[8, 8, 1]}
          color="#b9c4dd"
        />
        <Lightformer form="rect" intensity={0.45} position={[7, -2, -4]} scale={[10, 8, 1]} />
      </Environment>

      <AtariConsole>
        <group ref={cart} position={[0, CART_Y, CART_Z]}>
          <Cassette project={projects[0]} />
        </group>
      </AtariConsole>
    </>
  )
}

export function AtariScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 30 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CameraFit />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}