"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// ── Head-follow config ────────────────────────
const MAX_ROTATE = 5; // max degrees of rotation
const MAX_TRANSLATE = 3; // max px translate in SVG coordinate space
const SMOOTHING = 0.1; // lerp factor per frame (higher = snappier)
// ─────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Pure CSS/SVG pixel-art developer avatar.
 * A cool, minimal engineer sitting at a terminal — rendered with SVG rects
 * so no external images are needed, scales cleanly, and stays on-brand.
 */
interface PixelDevAvatarProps {
  className?: string;
  heroRef?: React.RefObject<HTMLElement>;
}

export default function PixelDevAvatar({
  className = "",
  heroRef,
}: PixelDevAvatarProps) {
  const headGroupRef = useRef<SVGGElement>(null);

  // ── Head follow — desktop only, respects prefers-reduced-motion ──
  useEffect(() => {
    const container = heroRef?.current;
    if (!container) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    const noMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || noMotion) return;

    // Smoothed state
    let tR = 0,
      tX = 0,
      tY = 0; // targets
    let cR = 0,
      cX = 0,
      cY = 0; // current (lerped)
    let rafId = 0;
    let alive = true;

    function onMove(e: MouseEvent) {
      const b = container!.getBoundingClientRect();
      const nx = Math.max(
        -1,
        Math.min(1, ((e.clientX - b.left) / b.width - 0.5) * 2),
      );
      const ny = Math.max(
        -1,
        Math.min(1, ((e.clientY - b.top) / b.height - 0.5) * 2),
      );
      tR = nx * MAX_ROTATE;
      tX = nx * MAX_TRANSLATE;
      tY = ny * (MAX_TRANSLATE * 0.5);
    }

    function onLeave() {
      tR = 0;
      tX = 0;
      tY = 0;
    }

    function tick() {
      if (!alive) return;
      cR = lerp(cR, tR, SMOOTHING);
      cX = lerp(cX, tX, SMOOTHING);
      cY = lerp(cY, tY, SMOOTHING);
      const h = headGroupRef.current;
      if (h) {
        h.style.transform = `rotate(${cR.toFixed(3)}deg) translate(${cX.toFixed(3)}px,${cY.toFixed(3)}px)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    container.addEventListener("mousemove", onMove, { passive: true });
    container.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      if (headGroupRef.current) headGroupRef.current.style.transform = "";
    };
  }, [heroRef]);

  return (
    <motion.div
      className={`pixel-avatar-wrap ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Floating glow behind avatar */}
      <div className="pixel-avatar-glow" aria-hidden="true" />

      {/* The avatar SVG — pixel-art engineer at terminal */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <svg
          viewBox="0 0 64 80"
          width="192"
          height="240"
          style={{ imageRendering: "pixelated" }}
          aria-label="Pixel developer avatar"
        >
          {/* ── Monitor ── */}
          <rect x="8" y="44" width="48" height="28" fill="#111116" />
          <rect x="10" y="46" width="44" height="24" fill="#0c1f2e" />
          {/* Screen scanlines */}
          <rect
            x="10"
            y="47"
            width="44"
            height="1"
            fill="#38bdf8"
            opacity="0.06"
          />
          <rect
            x="10"
            y="50"
            width="44"
            height="1"
            fill="#38bdf8"
            opacity="0.06"
          />
          <rect
            x="10"
            y="53"
            width="44"
            height="1"
            fill="#38bdf8"
            opacity="0.06"
          />
          <rect
            x="10"
            y="56"
            width="44"
            height="1"
            fill="#38bdf8"
            opacity="0.06"
          />
          <rect
            x="10"
            y="59"
            width="44"
            height="1"
            fill="#38bdf8"
            opacity="0.06"
          />
          <rect
            x="10"
            y="62"
            width="44"
            height="1"
            fill="#38bdf8"
            opacity="0.06"
          />
          <rect
            x="10"
            y="65"
            width="44"
            height="1"
            fill="#38bdf8"
            opacity="0.06"
          />
          {/* Monitor border glow */}
          <rect
            x="8"
            y="44"
            width="48"
            height="1"
            fill="#38bdf8"
            opacity="0.3"
          />
          <rect
            x="8"
            y="44"
            width="1"
            height="28"
            fill="#38bdf8"
            opacity="0.15"
          />
          <rect
            x="55"
            y="44"
            width="1"
            height="28"
            fill="#38bdf8"
            opacity="0.15"
          />
          {/* Monitor stand */}
          <rect x="28" y="72" width="8" height="3" fill="#1e1e24" />
          <rect x="22" y="75" width="20" height="2" fill="#1e1e24" />

          {/* ── Screen content — terminal output ── */}
          {/* Prompt line */}
          <rect x="13" y="49" width="3" height="2" fill="#4ade80" />
          <rect
            x="17"
            y="49"
            width="8"
            height="2"
            fill="#38bdf8"
            opacity="0.7"
          />
          <rect
            x="26"
            y="49"
            width="1"
            height="2"
            fill="#e8e8e8"
            opacity="0.9"
          />
          {/* Code lines */}
          <rect
            x="13"
            y="53"
            width="6"
            height="2"
            fill="#a78bfa"
            opacity="0.8"
          />
          <rect
            x="20"
            y="53"
            width="14"
            height="2"
            fill="#38bdf8"
            opacity="0.6"
          />
          <rect
            x="13"
            y="57"
            width="4"
            height="2"
            fill="#4ade80"
            opacity="0.7"
          />
          <rect
            x="18"
            y="57"
            width="10"
            height="2"
            fill="#e8e8e8"
            opacity="0.4"
          />
          <rect
            x="29"
            y="57"
            width="6"
            height="2"
            fill="#fbbf24"
            opacity="0.6"
          />
          <rect
            x="13"
            y="61"
            width="16"
            height="2"
            fill="#38bdf8"
            opacity="0.5"
          />
          {/* Blinking cursor rendered as animated rect via CSS */}
          <rect
            x="30"
            y="61"
            width="2"
            height="2"
            fill="#38bdf8"
            className="pixel-cursor"
          />

          {/* ── Body / Chair ── */}
          {/* Chair back */}
          <rect x="22" y="28" width="2" height="16" fill="#1e1e24" />
          <rect x="40" y="28" width="2" height="16" fill="#1e1e24" />
          <rect x="22" y="28" width="20" height="3" fill="#252528" />
          {/* Torso */}
          <rect x="24" y="30" width="16" height="12" fill="#1a1a2e" />
          {/* Hoodie pocket */}
          <rect x="28" y="37" width="8" height="4" fill="#14142a" />
          {/* Arms */}
          <rect x="18" y="31" width="6" height="8" fill="#252550" />
          <rect x="40" y="31" width="6" height="8" fill="#252550" />
          {/* Hands on desk */}
          <rect x="18" y="39" width="4" height="3" fill="#c8a882" />
          <rect x="42" y="39" width="4" height="3" fill="#c8a882" />
          {/* Keyboard under hands */}
          <rect x="16" y="42" width="32" height="3" fill="#1e1e24" />
          <rect x="17" y="43" width="30" height="1" fill="#252528" />
          {/* Key rows */}
          <rect x="18" y="43" width="3" height="1" fill="#3a3a40" />
          <rect x="22" y="43" width="3" height="1" fill="#3a3a40" />
          <rect x="26" y="43" width="3" height="1" fill="#3a3a40" />
          <rect x="30" y="43" width="3" height="1" fill="#3a3a40" />
          <rect x="34" y="43" width="3" height="1" fill="#3a3a40" />
          <rect x="38" y="43" width="3" height="1" fill="#3a3a40" />
          <rect x="42" y="43" width="3" height="1" fill="#3a3a40" />

          {/* ── Head — mouse-follow group ── */}
          <g
            ref={headGroupRef}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            {/* Face */}
            <rect x="24" y="12" width="16" height="16" fill="#c8a882" />
            {/* Hair */}
            <rect x="24" y="12" width="16" height="4" fill="#2d1f0f" />
            <rect x="22" y="13" width="4" height="3" fill="#2d1f0f" />
            <rect x="38" y="13" width="4" height="3" fill="#2d1f0f" />
            {/* Eyes */}
            <rect x="27" y="19" width="3" height="3" fill="#1a1a2a" />
            <rect x="34" y="19" width="3" height="3" fill="#1a1a2a" />
            {/* Pupils */}
            <rect x="28" y="20" width="1" height="1" fill="#38bdf8" />
            <rect x="35" y="20" width="1" height="1" fill="#38bdf8" />
            {/* Nose */}
            <rect x="31" y="22" width="2" height="1" fill="#b8926a" />
            {/* Glasses */}
            <rect
              x="26"
              y="18"
              width="6"
              height="5"
              fill="none"
              stroke="#3a3a50"
              strokeWidth="1"
            />
            <rect
              x="32"
              y="18"
              width="6"
              height="5"
              fill="none"
              stroke="#3a3a50"
              strokeWidth="1"
            />
            <rect x="32" y="20" width="1" height="1" fill="#3a3a50" />
            {/* Glasses arms */}
            <rect x="22" y="19" width="4" height="1" fill="#3a3a50" />
            <rect x="38" y="19" width="4" height="1" fill="#3a3a50" />
            {/* Headphones */}
            <rect x="22" y="14" width="2" height="6" fill="#252528" />
            <rect x="40" y="14" width="2" height="6" fill="#252528" />
            <rect x="22" y="13" width="20" height="2" fill="#252528" />
            <rect
              x="22"
              y="14"
              width="2"
              height="2"
              fill="#38bdf8"
              opacity="0.6"
            />
            <rect
              x="40"
              y="14"
              width="2"
              height="2"
              fill="#38bdf8"
              opacity="0.6"
            />
          </g>

          {/* ── Floating pixel particles ── */}
          <rect
            x="4"
            y="8"
            width="2"
            height="2"
            fill="#38bdf8"
            opacity="0.4"
            className="pixel-float-1"
          />
          <rect
            x="58"
            y="16"
            width="2"
            height="2"
            fill="#a78bfa"
            opacity="0.3"
            className="pixel-float-2"
          />
          <rect
            x="2"
            y="36"
            width="2"
            height="2"
            fill="#4ade80"
            opacity="0.25"
            className="pixel-float-3"
          />
          <rect
            x="60"
            y="52"
            width="2"
            height="2"
            fill="#38bdf8"
            opacity="0.2"
            className="pixel-float-2"
          />
          <rect
            x="6"
            y="60"
            width="2"
            height="2"
            fill="#a78bfa"
            opacity="0.2"
            className="pixel-float-1"
          />
          <rect
            x="56"
            y="6"
            width="2"
            height="2"
            fill="#4ade80"
            opacity="0.3"
            className="pixel-float-3"
          />
        </svg>
      </motion.div>

      {/* Ground shadow */}
      <div
        style={{
          width: 80,
          height: 6,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(56,189,248,0.2) 0%, transparent 70%)",
          margin: "0 auto",
          marginTop: -4,
        }}
      />
    </motion.div>
  );
}
