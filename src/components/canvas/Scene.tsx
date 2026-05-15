"use client";

import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useScrollRefs } from "@/components/scroll/ScrollProvider";
import { RitualBottle } from "./RitualBottle";

function scrollProgress(scroll: number, limit: number) {
  if (limit <= 0) return 0;
  return THREE.MathUtils.clamp(scroll / limit, 0, 1);
}

export function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollRef, limitRef } = useScrollRefs();

  const fogColor = useMemo(() => new THREE.Color("#070504"), []);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const p = scrollProgress(scrollRef.current, limitRef.current);

    const orbit = t * 0.22;
    const radius = 4.1 - p * 0.35;
    const height = 0.25 + Math.sin(t * 0.15) * 0.06 + p * 0.15;
    camera.position.x = Math.sin(orbit) * radius;
    camera.position.z = Math.cos(orbit) * radius;
    camera.position.y = height;
    camera.lookAt(0, 0.15 + p * 0.05, 0);

    if (groupRef.current) {
      const heroLift = THREE.MathUtils.lerp(1, 0, Math.min(p / 0.12, 1));
      const macro = THREE.MathUtils.smoothstep(p, 0.42, 0.58);
      const close = THREE.MathUtils.smoothstep(p, 0.72, 0.92);

      const baseY = -0.55 * heroLift;
      const macroY = baseY + macro * 0.35;
      const closeZ = close * 0.9;

      groupRef.current.position.y = THREE.MathUtils.lerp(baseY, macroY, 0.65);
      groupRef.current.position.z = closeZ;
      const s = THREE.MathUtils.lerp(1, 1.55, close);
      groupRef.current.scale.setScalar(s);
      groupRef.current.rotation.y = t * 0.08 + p * 0.6;
    }
  });

  return (
    <>
      <fog attach="fog" args={[fogColor, 4.5, 17]} />

      <ambientLight intensity={0.28} color="#c8b8a4" />
      <hemisphereLight args={["#efe6d8", "#0b0907", 0.55]} />
      <spotLight
        position={[3.5, 5.5, 2.5]}
        angle={0.45}
        penumbra={0.85}
        intensity={2.2}
        color="#f3e7d0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-4, 2.5, -1]}
        angle={0.55}
        penumbra={1}
        intensity={0.9}
        color="#6a8cff"
      />
      <pointLight position={[0, 1.8, 1]} intensity={0.35} color="#ffd7b0" />

      <group ref={groupRef}>
        <RitualBottle />
      </group>

      <Sparkles
        count={420}
        scale={8}
        size={2}
        speed={0.25}
        opacity={0.35}
        color="#f0e6d8"
      />
    </>
  );
}
