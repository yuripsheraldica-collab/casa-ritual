"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./Scene";

export function FixedExperience() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.2, 4.2], fov: 42, near: 0.1, far: 60 }}
      >
        <color attach="background" args={["#050403"]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
