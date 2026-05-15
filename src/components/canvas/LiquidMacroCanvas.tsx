"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform float uTime;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.25;
  float n = noise(uv * 6.0 + t);
  float n2 = noise(uv * 14.0 - t * 1.1);
  float swirl = sin((uv.x * 3.2 + uv.y * 2.4) * 6.2831 + t * 1.4);
  float film = smoothstep(0.15, 0.95, 0.5 + 0.5 * swirl);

  vec3 deep = vec3(0.04, 0.03, 0.03);
  vec3 honey = vec3(0.42, 0.28, 0.14);
  vec3 oil = vec3(0.12, 0.18, 0.22);
  vec3 col = mix(deep, honey, n);
  col = mix(col, oil, n2 * 0.55);
  col += vec3(0.08, 0.06, 0.04) * film;

  float spec = pow(max(0.0, sin((uv.y + t) * 20.0)), 6.0) * 0.35;
  col += vec3(spec);

  gl_FragColor = vec4(col, 1.0);
}
`;

function LiquidPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[2.35, 1.32, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function LiquidMacroCanvas() {
  return (
    <div className="relative h-[min(52vh,520px)] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_80px_rgba(201,169,98,0.08)]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1.35], fov: 38, near: 0.1, far: 10 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#050403"]} />
        <LiquidPlane />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </div>
  );
}
