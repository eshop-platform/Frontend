import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Environment } from '@react-three/drei';

const FloatingSphere = ({ position, color, speed = 1, distort = 0.4, scale = 1 }) => {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={mesh} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.1} metalness={0.8} />
      </Sphere>
    </Float>
  );
};

const FloatingBox = ({ position, color, scale = 1 }) => {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={mesh} args={[1.5, 1.5, 1.5]} position={position} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.05} metalness={0.9} />
      </Box>
    </Float>
  );
};

const FloatingTorus = ({ position, color, scale = 1 }) => {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
      <Torus ref={mesh} args={[1, 0.35, 32, 64]} position={position} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.7} />
      </Torus>
    </Float>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[10, 10, 5]} intensity={1.5} />
    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
    <pointLight position={[10, -5, 5]} intensity={0.8} color="#ec4899" />
    <Environment preset="city" />
    <FloatingSphere position={[-3.5, 1, -2]} color="#6366f1" speed={0.8} distort={0.5} scale={1.2} />
    <FloatingSphere position={[3.5, -1, -3]} color="#ec4899" speed={1.2} distort={0.3} scale={0.9} />
    <FloatingSphere position={[0, 2.5, -4]} color="#f59e0b" speed={0.6} distort={0.6} scale={0.7} />
    <FloatingBox position={[2.5, 1.5, -2]} color="#10b981" scale={0.6} />
    <FloatingBox position={[-2, -1.5, -3]} color="#3b82f6" scale={0.5} />
    <FloatingTorus position={[0, -1.5, -2]} color="#8b5cf6" scale={0.8} />
    <FloatingTorus position={[-4, 0, -4]} color="#f43f5e" scale={0.5} />
  </>
);

const Hero3D = () => (
  <div className="absolute inset-0 z-0 opacity-60">
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  </div>
);

export default Hero3D;
