"use client";

import { motion } from "framer-motion";
import BuildingCard from "./BuildingCard";
import FloatingParticles from "./FloatingParticles";
import PixelCharacter from "./PixelCharacter";

const buildings = [
  {
    label: "The Lab",
    sublabel: "Projects",
    description: "Enter the experiment lab →",
    href: "/projects",
    color: "#00f5ff",
    building: "lab" as const,
  },
  {
    label: "Library",
    sublabel: "Writing",
    description: "Browse the knowledge base →",
    href: "/writing",
    color: "#a78bfa",
    building: "library" as const,
  },
  {
    label: "Gallery",
    sublabel: "Activity",
    description: "View the developer log →",
    href: "/activity",
    color: "#34d399",
    building: "gallery" as const,
  },
  {
    label: "Home Base",
    sublabel: "About",
    description: "Learn about the engineer →",
    href: "/about",
    color: "#fbbf24",
    building: "house" as const,
  },
  {
    label: "Tower",
    sublabel: "Contact",
    description: "Establish contact →",
    href: "/contact",
    color: "#f472b6",
    building: "tower" as const,
  },
];

export default function HeroPixelWorld() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated environment layer */}
      <FloatingParticles />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--background) 100%)",
        }}
      />

      {/* ─── Hero text ─── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-1 mb-8"
        >
          {["#00f5ff", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"].map(
            (c, i) => (
              <motion.div
                key={i}
                style={{ width: 24, height: 4, background: c }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ),
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-pixel text-[9px] mb-5"
          style={{ color: "var(--accent)" }}
        >
          &gt; PLAYER ONE READY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-5 tracking-tight leading-none"
          style={{ color: "var(--foreground)" }}
        >
          Faiq{" "}
          <span
            className="relative inline-block"
            style={{ color: "var(--accent)" }}
          >
            Rofifi
            {/* Underline glow */}
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5"
              style={{ background: "var(--accent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-lg sm:text-xl mb-10 max-w-md mx-auto"
          style={{ color: "var(--muted)" }}
        >
          Backend Engineer building reliable systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="/projects"
            className="font-pixel text-[10px] px-6 py-3 border-2"
            style={{
              background: "var(--accent)",
              color: "var(--background)",
              borderColor: "var(--pixel-border)",
              boxShadow: "3px 3px 0px var(--pixel-border)",
            }}
            whileHover={{ y: -3, boxShadow: "5px 5px 0px var(--pixel-border)" }}
            whileTap={{
              y: 1,
              x: 1,
              boxShadow: "1px 1px 0px var(--pixel-border)",
            }}
          >
            Explore Projects
          </motion.a>
          <motion.a
            href="/writing"
            className="font-pixel text-[10px] px-6 py-3 border-2"
            style={{
              background: "transparent",
              color: "var(--foreground)",
              borderColor: "var(--pixel-border)",
              boxShadow: "3px 3px 0px var(--pixel-border)",
            }}
            whileHover={{ y: -3, boxShadow: "5px 5px 0px var(--pixel-border)" }}
            whileTap={{
              y: 1,
              x: 1,
              boxShadow: "1px 1px 0px var(--pixel-border)",
            }}
          >
            Read Articles
          </motion.a>
        </motion.div>
      </div>

      {/* ─── Pixel World Environment ─── */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Sky / horizon label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-10"
        >
          <p
            className="font-pixel text-[9px]"
            style={{ color: "var(--muted)" }}
          >
            ▼ EXPLORE THE WORLD ▼
          </p>
        </motion.div>

        {/* Buildings row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-0">
          {buildings.map((b, i) => (
            <BuildingCard key={b.href} {...b} index={i} />
          ))}
        </div>

        {/* Ground platform */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-full mt-0"
        >
          {/* Ground layers */}
          <div
            style={{ height: 4, background: "var(--accent)", opacity: 0.5 }}
          />
          <div style={{ height: 3, background: "var(--border)" }} />
          <div style={{ height: 2, background: "var(--card)" }} />
        </motion.div>

        {/* Character on ground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="flex justify-center pt-4"
        >
          <PixelCharacter size={5} buildings={buildings} />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="font-pixel text-[7px]" style={{ color: "var(--muted)" }}>
          SCROLL
        </p>
        <motion.div
          style={{
            width: 2,
            height: 16,
            background: "var(--accent)",
            opacity: 0.5,
          }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
