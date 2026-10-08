'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Network({ color, reduced }: { color: string; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const vertices = new Float32Array(420 * 3);
    for (let i = 0; i < 420; i++) {
      const y = 1 - (i / 419) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * Math.PI * (3 - Math.sqrt(5));
      vertices.set([Math.cos(angle) * radius * 2.25, y * 2.25, Math.sin(angle) * radius * 2.25], i * 3);
    }
    return vertices;
  }, []);
  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.085;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.16, 0.025);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, state.pointer.x * 0.1, 0.025);
  });
  return <group ref={group} rotation={[0.2, 0.3, -0.18]}>
    <mesh><sphereGeometry args={[2.2, 28, 18]} /><meshBasicMaterial color={color} wireframe transparent opacity={0.2} /></mesh>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry><pointsMaterial color={color} size={0.035} transparent opacity={0.85} sizeAttenuation /></points>
    <mesh rotation={[Math.PI / 2.3, 0.3, 0]}><torusGeometry args={[2.55, 0.005, 4, 128]} /><meshBasicMaterial color={color} transparent opacity={0.45} /></mesh>
    <mesh rotation={[Math.PI / 3, 1.1, 0.5]}><torusGeometry args={[2.7, 0.004, 4, 128]} /><meshBasicMaterial color={color} transparent opacity={0.25} /></mesh>
  </group>;
}

export default function TechGlobe() {
  const [color, setColor] = useState<string>();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1; canvas.height = 1;
    const ctx = canvas.getContext('2d');
    const updateColor = () => {
      if (!ctx) return;
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--globe-line').trim();
      ctx.fillRect(0, 0, 1, 1);
      const p = ctx.getImageData(0, 0, 1, 1).data;
      setColor(`rgb(${p[0]}, ${p[1]}, ${p[2]})`);
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  if (!color) return <div className="globe-fallback" />;
  return <Canvas camera={{ position: [0, 0, 7.5], fov: 48 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} frameloop={reduced ? 'demand' : 'always'} aria-label="Rotating interactive technology network globe"><Network color={color} reduced={reduced} /></Canvas>;
}