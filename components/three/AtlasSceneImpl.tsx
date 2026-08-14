"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  APEX,
  COORDINATORS,
  EDGE_NODES,
  COMMAND_LINKS,
  MESH_LINKS,
  SECTORS,
  type Vec3,
} from "@/lib/three/topology";

/**
 * The real-time ATLAS diagram. Procedural geometry only — no downloaded
 * models. Colours are read from the design tokens at mount so the scene and
 * the page can never disagree. Every animated element carries meaning:
 * gold pulses = intent descending; white pulses = reports ascending;
 * dim pulses on lateral links = peer exchange.
 */

function tokenColor(name: string): string {
  if (typeof window === "undefined") return "#ffffff";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#ffffff";
}

function useTokens() {
  return useMemo(
    () => ({
      white: tokenColor("--atlas-white"),
      gold: tokenColor("--atlas-gold"),
      mesh: tokenColor("--text-secondary"),
      sectors: SECTORS.map((s) => tokenColor(s.colorVar)),
    }),
    [],
  );
}

function useHaloTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,0.85)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.25)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function useHaloSprite(halo: THREE.Texture, color: string, scale: number) {
  return useMemo(() => {
    const mat = new THREE.SpriteMaterial({
      map: halo,
      color,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      // Additive glow over a transparent canvas: add colour only. Stock
      // AdditiveBlending also accumulates ALPHA, which composites the sprite
      // square as a semi-opaque dark plate over the page behind the canvas.
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneFactor,
      blendSrcAlpha: THREE.ZeroFactor,
      blendDstAlpha: THREE.OneFactor,
    });
    const s = new THREE.Sprite(mat);
    s.scale.set(scale, scale, 1);
    return s;
  }, [halo, color, scale]);
}

function Node({
  pos,
  r,
  color,
  halo,
  haloScale,
}: {
  pos: Vec3;
  r: number;
  color: string;
  halo: THREE.Texture;
  haloScale: number;
}) {
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[r, 20, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
      </mesh>
      <primitive object={useHaloSprite(halo, color, haloScale)} />
    </group>
  );
}

type PulseSpec = { path: Vec3[]; color: string; speed: number; offset: number; size: number };

function Pulses({ specs }: { specs: PulseSpec[] }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    specs.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      const p = (t * s.speed + s.offset) % 1;
      const segs = s.path.length - 1;
      const f = Math.min(p * segs, segs - 1e-6);
      const si = Math.floor(f);
      a.set(...s.path[si]!);
      b.set(...s.path[si + 1]!);
      m.position.lerpVectors(a, b, f - si);
      const fade = Math.sin(Math.PI * p);
      (m.material as THREE.MeshBasicMaterial).opacity = 0.15 + 0.85 * fade;
    });
  });
  return (
    <>
      {specs.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <sphereGeometry args={[s.size, 10, 10]} />
          <meshBasicMaterial color={s.color} transparent />
        </mesh>
      ))}
    </>
  );
}

function Diagram() {
  const tk = useTokens();
  const halo = useHaloTexture();

  const pulses = useMemo<PulseSpec[]>(() => {
    const specs: PulseSpec[] = [];
    // intent descending: apex → coordinator → edge
    for (let i = 0; i < 8; i++) {
      const e = EDGE_NODES[(i * 3) % EDGE_NODES.length]!;
      specs.push({
        path: [APEX, COORDINATORS[e.sector]!.pos, e.pos],
        color: tk.gold,
        speed: 0.22,
        offset: i / 8,
        size: 0.03,
      });
    }
    // reports ascending: edge → coordinator → apex
    for (let i = 0; i < 5; i++) {
      const e = EDGE_NODES[(i * 5 + 2) % EDGE_NODES.length]!;
      specs.push({
        path: [e.pos, COORDINATORS[e.sector]!.pos, APEX],
        color: tk.white,
        speed: 0.16,
        offset: i / 5,
        size: 0.022,
      });
    }
    // peer exchange on the mesh
    for (let i = 0; i < 8; i++) {
      const [p, q] = MESH_LINKS[(i * 4) % MESH_LINKS.length]!;
      specs.push({
        path: i % 2 ? [p, q] : [q, p],
        color: tk.mesh,
        speed: 0.3,
        offset: i / 8,
        size: 0.018,
      });
    }
    return specs;
  }, [tk]);

  const labelCls = "type-label whitespace-nowrap";
  const labelStyle = (c: string) => ({ color: c, pointerEvents: "none" as const });

  return (
    <group position={[0, -0.92, 0]}>
      {/* lights: one cold key, weak ambient fill, hard warm rim */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 2]} intensity={1.1} color="#cfe0ff" />
      <directionalLight position={[-5, 1.5, -4]} intensity={0.5} color="#ffd24a" />

      {COMMAND_LINKS.map(([p, q], i) => (
        <Line
          key={`c${i}`}
          points={[p, q]}
          color={tk.gold}
          lineWidth={1.2}
          transparent
          opacity={0.5}
        />
      ))}
      {MESH_LINKS.map(([p, q], i) => (
        <Line
          key={`m${i}`}
          points={[p, q]}
          color={tk.mesh}
          lineWidth={1}
          transparent
          opacity={0.16}
        />
      ))}

      <Node pos={APEX} r={0.09} color={tk.white} halo={halo} haloScale={0.85} />
      {COORDINATORS.map((c, i) => (
        <Node key={`co${i}`} pos={c.pos} r={0.065} color={tk.gold} halo={halo} haloScale={0.55} />
      ))}
      {EDGE_NODES.map((e, i) => (
        <Node
          key={`e${i}`}
          pos={e.pos}
          r={0.05}
          color={tk.sectors[e.sector]!}
          halo={halo}
          haloScale={0.4}
        />
      ))}

      <Pulses specs={pulses} />

      <Html position={[0.28, 2.42, 0]} className={labelCls} style={labelStyle(tk.mesh)}>
        APEX — INTENT IN
      </Html>
      <Html position={[-2.1, 1.5, 0.4]} className={labelCls} style={labelStyle(tk.mesh)}>
        COORDINATION TIER
      </Html>
      {SECTORS.map((s, i) => {
        const rad = (s.angleDeg * Math.PI) / 180;
        return (
          <Html
            key={s.domain}
            position={[3.1 * Math.cos(rad), -0.18, 3.1 * Math.sin(rad)]}
            className={labelCls}
            style={labelStyle(tk.sectors[i]!)}
            center
          >
            {s.domain.toUpperCase()}
          </Html>
        );
      })}
      <Html position={[0, -0.62, 0]} center className={labelCls} style={labelStyle(tk.mesh)}>
        DATA MESH
      </Html>
    </group>
  );
}

export default function AtlasSceneImpl({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [4.5, 2.55, 4.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={onReady}
    >
      <Diagram />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.55}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={0.85}
        maxPolarAngle={1.65}
      />
    </Canvas>
  );
}
