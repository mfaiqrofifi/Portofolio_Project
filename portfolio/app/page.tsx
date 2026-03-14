"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Home } from "@/lib/types";

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

export default function HomePage() {
  const [home, setHome] = useState<Home | null>(null);
  const [loading, setLoading] = useState(true);

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
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Loading...
        </p>
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

  // Default values for safety
  const domains = home.domains || [];
  const footerHint = home.footer_hint || "";

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-5 py-14 md:py-24">
      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono text-xs mb-6" style={{ color: "var(--muted)" }}>
          {home.tagline}
        </p>

        <h1
          className="font-mono text-2xl md:text-3xl font-semibold mb-1"
          style={{ color: "var(--foreground)" }}
        >
          {home.name}
        </h1>
        <p
          className="font-mono text-sm mb-6"
          style={{ color: "var(--accent)" }}
        >
          {home.title}
        </p>

        <p
          className="text-sm leading-relaxed mb-10"
          style={{ color: "var(--muted)", maxWidth: "38rem" }}
        >
          {home.intro}
        </p>
      </motion.div>

      {/* Domains */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            domains
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
        </div>
        <div
          className="border divide-y"
          style={{
            borderColor: "var(--border)",
            // @ts-ignore
            "--tw-divide-opacity": 1,
          }}
        >
          {domains.map((d, i) => (
            <motion.div
              key={d.key}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.15 + i * 0.06 }}
              className="flex items-start gap-4 px-3 py-3"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="font-mono text-xs shrink-0 mt-0.5 w-24"
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
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          sections
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* Navigation list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col"
      >
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
                  className="font-mono text-xs shrink-0"
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
                className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                style={{ color: "var(--muted)" }}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer hint */}
      <motion.p
        className="font-mono text-xs mt-12"
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
