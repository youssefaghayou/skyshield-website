"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Tier-1 hero apex: the white node and four gold command threads, gently
 * alive — thread sway and a slow node breath, with slight camera parallax on
 * pointer. Deliberately restrained: the hero is atmosphere, not spectacle.
 * DOM fallback (static SVG threads) remains the experience everywhere else.
 */

const NODE_Y = 1.6; // just above the frustum top: threads enter frame already converged behind the DOM dot
const THREAD_FRACTIONS = [0.2, 0.4, 0.6, 0.8];
const SEGMENTS = 40;

function Threads({ gold }: { gold: string }) {
  const { viewport } = useThree();
  const lines = useMemo(() => {
    return THREAD_FRACTIONS.map(() => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SEGMENTS * 3), 3));
      const mat = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.6 });
      return new THREE.Line(geo, mat);
    });
  }, [gold]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const w = viewport.width;
    lines.forEach((line, i) => {
      const f = THREAD_FRACTIONS[i]!;
      const endX = (f - 0.5) * w * 0.92;
      const sway = Math.sin(t * 0.35 + i * 1.7) * 0.1;
      const pos = line.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let s = 0; s < SEGMENTS; s++) {
        const p = s / (SEGMENTS - 1);
        // cubic ease from the node out to the fan position
        const x = endX * p * p * (3 - 2 * p) + sway * Math.sin(Math.PI * p);
        const y = NODE_Y - p * (NODE_Y + 2.6);
        pos.setXYZ(s, x, y, 0);
      }
      pos.needsUpdate = true;
      line.geometry.computeBoundingSphere();
    });
  });

  return (
    <>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </>
  );
}

function Rig() {
  useFrame(({ camera, pointer }) => {
    // Parallax kept small: the node sits near the canvas top edge, and larger
    // sway would swing it out of frame (alignment math assumes lookAt origin).
    camera.position.x += (pointer.x * 0.15 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.08 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ApexSceneImpl({ onReady }: { onReady?: () => void }) {
  const gold = useMemo(
    () =>
      getComputedStyle(document.documentElement).getPropertyValue("--atlas-gold").trim() ||
      "#ffd24a",
    [],
  );

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={onReady}
    >
      <Threads gold={gold} />
      <Rig />
    </Canvas>
  );
}
