"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import type { Home } from "@/lib/types";
import StatusIndicator from "@/components/StatusIndicator";
import SystemPanel from "@/components/SystemPanel";
import PixelDevAvatar from "@/components/PixelDevAvatar";
import TypewriterRole from "@/components/TypewriterRole";

const sections = [
  { href: "/projects", label: "projects", desc: "work across all domains" },
  {
    href: "/writing",
    label: "writing",
    desc: "engineering notes & deep dives",
  },
  { href: "/activity", label: "activity", desc: "recent work & learning log" },
  { href: "/about", label: "about", desc: "background & tech stack" },
  { href: "/contact", label: "contact", desc: "reach out" },
];

/* Scroll-triggered fade-in wrapper */
function FadeInOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [home, setHome] = useState<Home | null>(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        setHome(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-5 py-14 md:py-24">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            initializing
          </span>
          <span
            className="inline-block w-1.5 h-3.5 animate-cursor-blink"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </div>
      </main>
    );
  }

  if (!home) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-5 py-14 md:py-24">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Content not found. Please run the database migration.
        </p>
      </main>
    );
  }

  const domains = home.domains || [];
  const footerHint = home.footer_hint || "";

  return (
    <main className="home-root max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-20 md:pt-16 md:pb-28">
      {/* ═══════════════════════════════════════
          HERO — 2-column OS identity scene
      ═══════════════════════════════════════ */}
      <section ref={heroRef} className="os-hero-frame mb-10">
        {/* Window chrome bar */}
        <div className="os-window-bar">
          <div className="flex items-center gap-1.5">
            <span
              className="os-dot"
              style={{ background: "var(--accent)", opacity: 0.8 }}
            />
            <span
              className="os-dot"
              style={{ background: "var(--border-strong)" }}
            />
            <span
              className="os-dot"
              style={{ background: "var(--border-strong)" }}
            />
          </div>
          <span
            className="font-mono text-[10px] tracking-wider"
            style={{ color: "var(--muted-dim)" }}
          >
            faiq@devos:~
          </span>
          <StatusIndicator />
        </div>

        {/* Hero body — 2 columns */}
        <div className="os-hero-body">
          {/* ── LEFT: Identity ── */}
          <motion.div
            className="os-hero-left"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Path breadcrumb */}
            <p
              className="font-mono text-[11px] mb-5 tracking-wide"
              style={{ color: "var(--muted-dim)" }}
            >
              <span style={{ color: "var(--accent)", opacity: 0.7 }}>~/</span>
              home/faiq
            </p>

            {/* Name — pixel font, gradient colors */}
            <h1
              className="mb-3"
              style={{
                fontFamily: "'Pixelify Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 6vw, 3.4rem)",
                lineHeight: 1.25,
                letterSpacing: "0.04em",
                background:
                  "linear-gradient(135deg, #38bdf8 0%, #a78bfa 55%, #f472b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter:
                  "drop-shadow(0 0 14px rgba(56,189,248,0.45)) drop-shadow(0 0 28px rgba(167,139,250,0.25))",
              }}
            >
              {home.name}
            </h1>

            {/* Role — typewriter animation, fixed height prevents layout jump */}
            <div
              className="mb-1"
              style={{ height: "1.4em", overflow: "hidden" }}
            >
              <TypewriterRole />
            </div>

            {/* Focus */}
            <p
              className="font-mono text-[11px] mb-6"
              style={{ color: "var(--muted-dim)" }}
            >
              focus: backend · AI tooling · infrastructure
            </p>

            {/* Intro */}
            <p
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: "var(--muted)" }}
            >
              {home.intro}
            </p>

            {/* Quick nav pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/projects", label: "projects" },
                { href: "/writing", label: "writing" },
                { href: "/contact", label: "contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="os-pill">
                  <span style={{ color: "var(--accent)" }}>&gt;</span> {l.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Pixel avatar scene ── */}
          <div className="os-hero-right">
            {/* Decorative pixel grid background */}
            <div className="pixel-grid-bg" aria-hidden="true" />
            {/* Glow ring behind avatar */}
            <div className="avatar-ring" aria-hidden="true" />
            {/* Avatar */}
            <PixelDevAvatar heroRef={heroRef} />
            {/* Floating chip labels */}
            <motion.span
              className="os-float-chip"
              style={{ top: "12%", left: "4%" }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Go
            </motion.span>
            <motion.span
              className="os-float-chip"
              style={{ top: "18%", right: "6%" }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              Postgres
            </motion.span>
            <motion.span
              className="os-float-chip"
              style={{ bottom: "20%", left: "2%" }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              Docker
            </motion.span>
            <motion.span
              className="os-float-chip"
              style={{ bottom: "14%", right: "4%" }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              Redis
            </motion.span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SYSTEM PANEL
      ═══════════════════════════════════════ */}
      <SystemPanel />

      {/* ═══════════════════════════════════════
          CAPABILITY MODULES
      ═══════════════════════════════════════ */}
      <FadeInOnScroll className="mb-10">
        <div className="os-section-frame">
          {/* Section header */}
          <div className="os-section-header">
            <span
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: "var(--muted-dim)" }}
            >
              capability_modules
            </span>
            <span
              className="font-mono text-[10px]"
              style={{ color: "var(--muted-dim)" }}
            >
              [{domains.length}]
            </span>
          </div>
          {/* Module rows */}
          <div>
            {domains.map((d, i) => (
              <motion.div
                key={d.key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.15 + i * 0.07 }}
                className="capability-module"
              >
                <span
                  className="font-mono text-xs shrink-0 w-28 capability-module-label"
                  style={{ color: "var(--accent)" }}
                >
                  {d.label}
                </span>
                <span
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {d.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInOnScroll>

      {/* ═══════════════════════════════════════
          SECTIONS — Navigation
      ═══════════════════════════════════════ */}
      <FadeInOnScroll delay={0.05}>
        <div className="os-section-frame">
          <div className="os-section-header">
            <span
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: "var(--muted-dim)" }}
            >
              sections
            </span>
          </div>
          <div className="flex flex-col">
            {sections.map((s, i) => (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
              >
                <Link
                  href={s.href}
                  className="file-item group flex items-center justify-between py-3 px-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="font-mono text-xs shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                      style={{ color: "var(--accent)" }}
                    >
                      &gt;
                    </span>
                    <span
                      className="font-mono text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      /{s.label}
                    </span>
                    <span
                      className="font-mono text-xs truncate hidden sm:block"
                      style={{ color: "var(--muted)" }}
                    >
                      — {s.desc}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={13}
                    className="shrink-0 opacity-0 group-hover:opacity-60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--muted)" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInOnScroll>

      {/* Footer hint */}
      <motion.p
        className="font-mono text-xs mt-10"
        style={{ color: "var(--muted-dim)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        <span style={{ color: "var(--accent)" }}>$</span> {footerHint}
      </motion.p>
    </main>
  );
}
