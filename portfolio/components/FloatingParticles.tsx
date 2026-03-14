"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

// Fixed seeds for SSR-safe deterministic positions
const STAR_SEEDS = [
  { x: 5, y: 8, size: 1, d: 1.2, delay: 0 },
  { x: 15, y: 15, size: 2, d: 1.8, delay: 0.3 },
  { x: 22, y: 5, size: 1, d: 2.1, delay: 0.7 },
  { x: 35, y: 20, size: 1, d: 1.5, delay: 0.2 },
  { x: 48, y: 10, size: 2, d: 2.4, delay: 1.1 },
  { x: 58, y: 3, size: 1, d: 1.7, delay: 0.5 },
  { x: 67, y: 18, size: 1, d: 2.0, delay: 0.9 },
  { x: 75, y: 7, size: 2, d: 1.3, delay: 0.4 },
  { x: 83, y: 22, size: 1, d: 2.2, delay: 1.3 },
  { x: 91, y: 12, size: 1, d: 1.6, delay: 0.6 },
  { x: 10, y: 40, size: 1, d: 2.3, delay: 0.8 },
  { x: 28, y: 55, size: 2, d: 1.9, delay: 1.5 },
  { x: 44, y: 35, size: 1, d: 1.4, delay: 0.1 },
  { x: 62, y: 48, size: 1, d: 2.0, delay: 1.0 },
  { x: 79, y: 38, size: 2, d: 1.8, delay: 0.3 },
  { x: 88, y: 52, size: 1, d: 2.5, delay: 1.2 },
];

const PARTICLE_SEEDS = [
  { x: 8, y: 30, size: 3, dy: -10, d: 3.5, delay: 0 },
  { x: 18, y: 70, size: 2, dy: -8, d: 4.2, delay: 0.8 },
  { x: 32, y: 45, size: 4, dy: -12, d: 3.0, delay: 1.4 },
  { x: 50, y: 60, size: 2, dy: -9, d: 4.8, delay: 0.5 },
  { x: 65, y: 25, size: 3, dy: -11, d: 3.7, delay: 1.1 },
  { x: 72, y: 80, size: 2, dy: -8, d: 4.5, delay: 0.3 },
  { x: 85, y: 35, size: 4, dy: -13, d: 3.2, delay: 1.7 },
  { x: 93, y: 65, size: 2, dy: -10, d: 4.0, delay: 0.6 },
];

const CLOUD_SEEDS = [
  { y: 12, w: 80, duration: 28, delay: 0 },
  { y: 20, w: 60, duration: 35, delay: -12 },
  { y: 8, w: 100, duration: 45, delay: -22 },
];

export default function FloatingParticles() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const accentColor = isDark ? "#00f5ff" : "#2563eb";
  const starColor = isDark ? "#e2e8f0" : "#1e3a5f";
  const cloudColor = isDark ? "rgba(30,58,95,0.35)" : "rgba(200,200,200,0.5)";

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Stars (dark mode) / Dots (light mode) */}
      {STAR_SEEDS.map((s, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size + 1,
            height: s.size + 1,
            background: starColor,
            opacity: isDark ? 0.7 : 0.25,
          }}
          animate={{ opacity: isDark ? [0.3, 0.9, 0.3] : [0.1, 0.3, 0.1] }}
          transition={{
            duration: s.d,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating accent particles */}
      {PARTICLE_SEEDS.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: accentColor,
          }}
          animate={{
            y: [0, p.dy, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moving clouds */}
      {CLOUD_SEEDS.map((c, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute flex gap-1"
          style={{ top: `${c.y}%`, opacity: isDark ? 0.4 : 0.6 }}
          animate={{ x: ["-20%", "120%"] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: "linear",
          }}
        >
          {/* Pixel cloud shape */}
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <div style={{ width: 0, height: 8, background: cloudColor }} />
              <div style={{ width: 8, height: 8, background: cloudColor }} />
              <div style={{ width: 8, height: 8, background: cloudColor }} />
              <div style={{ width: 0, height: 8, background: cloudColor }} />
            </div>
            <div className="flex gap-0.5">
              <div style={{ width: 8, height: 8, background: cloudColor }} />
              <div style={{ width: 8, height: 8, background: cloudColor }} />
              <div style={{ width: 8, height: 8, background: cloudColor }} />
              <div style={{ width: 8, height: 8, background: cloudColor }} />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Subtle scan-line grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(0,245,255,0.06)" : "rgba(37,99,235,0.04)"} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
