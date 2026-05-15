"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function RitualBottle() {
  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1a1512"),
        metalness: 0.05,
        roughness: 0.18,
        transmission: 0.92,
        thickness: 0.65,
        ior: 1.45,
        attenuationColor: new THREE.Color("#2a1f18"),
        attenuationDistance: 0.85,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const capMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d4c4a8"),
        metalness: 0.85,
        roughness: 0.28,
        envMapIntensity: 0.8,
      }),
    [],
  );

  const labelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ebe3d6"),
        metalness: 0.02,
        roughness: 0.85,
        emissive: new THREE.Color("#2a2218"),
        emissiveIntensity: 0.15,
      }),
    [],
  );

  return (
    <group position={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.55, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.42, 0.48, 1.35, 64, 1, true]} />
      </mesh>
      <mesh castShadow position={[0, 1.22, 0]} material={capMat}>
        <cylinderGeometry args={[0.22, 0.24, 0.22, 48]} />
      </mesh>
      <mesh castShadow position={[0, 1.05, 0]} material={capMat}>
        <cylinderGeometry args={[0.18, 0.2, 0.35, 48]} />
      </mesh>
      <mesh position={[0, 0.55, 0.47]} material={labelMat}>
        <planeGeometry args={[0.55, 0.85]} />
      </mesh>
    </group>
  );
}
