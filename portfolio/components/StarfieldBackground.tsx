"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  speed: number;
  phase: number;
}

const STAR_COUNT = 110;

// SVG fractal noise — generated once, used as a background texture in light mode
const NOISE_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'>` +
    `<filter id='n'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/>` +
    `<feColorMatrix type='saturate' values='0'/>` +
    `</filter>` +
    `<rect width='256' height='256' filter='url(%23n)'/>` +
    `</svg>`,
);
const NOISE_URL = `url("data:image/svg+xml,${NOISE_SVG}")`;

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars() {
      if (!canvas) return;
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 0.7 + 0.3,
        baseOpacity: Math.random() * 0.22 + 0.04,
        speed: Math.random() * 0.35 + 0.08,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = timestamp * 0.001;
      for (const s of starsRef.current) {
        const opacity =
          s.baseOpacity * (0.45 + 0.55 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    }

    function onResize() {
      resize();
      createStars();
    }

    resize();
    createStars();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const isLight = mounted && resolvedTheme === "light";

  // Shared fixed-layer styles
  const fixed: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  };

  return (
    <>
      {/* ── DARK MODE ── */}

      {/* Star canvas — visible in dark, fades out in light */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        suppressHydrationWarning
        style={{
          ...fixed,
          opacity: isDark ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Dark radial depth glows — cyan bottom-left, purple top-right */}
      {isDark && (
        <div
          aria-hidden="true"
          style={{
            ...fixed,
            background: [
              "radial-gradient(ellipse 55% 40% at 12% 88%, rgba(56,189,248,0.045) 0%, transparent 70%)",
              "radial-gradient(ellipse 50% 38% at 88% 10%, rgba(167,139,250,0.04) 0%, transparent 70%)",
            ].join(", "),
          }}
        />
      )}

      {/* ── LIGHT MODE ── */}

      {/* 1. Radial gradient glows — blue top-right, purple bottom-left */}
      {isLight && (
        <div
          aria-hidden="true"
          style={{
            ...fixed,
            background: [
              // Blue — top-right
              "radial-gradient(ellipse 60% 48% at 78% -6%, rgba(37,99,235,0.055) 0%, transparent 60%)",
              // Purple — bottom-left
              "radial-gradient(ellipse 55% 44% at -6% 108%, rgba(124,58,237,0.042) 0%, transparent 62%)",
              // Very faint blue center bloom for depth
              "radial-gradient(ellipse 80% 60% at 50% 48%, rgba(37,99,235,0.014) 0%, transparent 75%)",
            ].join(", "),
            transition: "opacity 0.6s ease",
          }}
        />
      )}

      {/* 2. Dot grid — reinforces developer workspace aesthetic */}
      {isLight && (
        <div
          aria-hidden="true"
          style={{
            ...fixed,
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "0 0",
            // Vignette: fade out at all edges so grid doesn't feel harsh
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
            opacity: 0.38,
          }}
        />
      )}

      {/* 3. Noise texture — adds subtle grain depth */}
      {isLight && (
        <div
          aria-hidden="true"
          style={{
            ...fixed,
            backgroundImage: NOISE_URL,
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
            opacity: 0.028,
            mixBlendMode: "multiply",
          }}
        />
      )}
    </>
  );
}
