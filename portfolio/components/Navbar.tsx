"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/writing", label: "writing" },
  { href: "/activity", label: "activity" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200"
      style={{
        borderBottom: scrolled
          ? `1px solid var(--border)`
          : "1px solid transparent",
        background: scrolled
          ? "color-mix(in srgb, var(--background) 92%, transparent)"
          : "var(--background)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1.5">
          <span
            className="font-mono text-sm transition-colors duration-150"
            style={{ color: "var(--accent)" }}
          >
            &gt;
          </span>
          <span
            className="font-mono text-sm font-medium transition-colors duration-150 group-hover:opacity-70"
            style={{ color: "var(--foreground)" }}
          >
            faiq.dev
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-module group relative px-3 py-1.5 font-mono text-xs transition-colors duration-150 ${active ? "active" : ""}`}
                style={{ color: active ? "var(--foreground)" : "var(--muted)" }}
              >
                {/* Active/hover prefix */}
                <motion.span
                  className="font-mono text-xs"
                  style={{ color: "var(--accent)" }}
                  animate={{
                    opacity: active ? 1 : 0,
                    width: active ? "auto" : 0,
                    marginRight: active ? 4 : 0,
                  }}
                  initial={false}
                  transition={{ duration: 0.15 }}
                >
                  &gt;{" "}
                </motion.span>
                <span
                  className="transition-opacity duration-150 group-hover:opacity-100"
                  style={{ opacity: active ? 1 : undefined }}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}

          <div
            className="ml-3 pl-3"
            style={{ borderLeft: "1px solid var(--border)" }}
          >
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-1.5 transition-colors"
            style={{ color: "var(--muted)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="md:hidden pb-2"
            style={{
              borderTop: `1px solid var(--border)`,
              background: "var(--background)",
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-5 py-2.5 font-mono text-xs transition-colors"
                  style={{
                    color: active ? "var(--foreground)" : "var(--muted)",
                    background: active ? "var(--surface)" : "transparent",
                    borderLeft: active
                      ? `2px solid var(--accent)`
                      : "2px solid transparent",
                  }}
                >
                  {active && (
                    <span style={{ color: "var(--accent)" }}>&gt;</span>
                  )}
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
