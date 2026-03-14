"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import type { Project } from "@/lib/types";

type Domain = "systems" | "products" | "ai" | "infrastructure";

const domainColors: Record<Domain, string> = {
  systems: "var(--accent)",
  products: "var(--warning, #f59e0b)",
  ai: "var(--accent-secondary)",
  infrastructure: "var(--success, #22c55e)",
};

const domainLabels: Record<Domain, string> = {
  systems: "systems",
  products: "products",
  ai: "ai",
  infrastructure: "infra",
};

const ALL_DOMAINS: Domain[] = ["systems", "products", "ai", "infrastructure"];

export default function ProjectsView({ projects }: { projects: Project[] }) {
  const [activeDomain, setActiveDomain] = useState<Domain | "all">("all");
  const filteredProjects =
    activeDomain === "all"
      ? projects
      : projects.filter((p) => p.domain === activeDomain);
  const [selected, setSelected] = useState<Project>(projects[0]);

  if (!projects.length) {
    return (
      <p className="font-mono text-sm" style={{ color: "var(--muted)" }}>
        No projects found.
      </p>
    );
  }

  const safeSelected = filteredProjects.some((p) => p.id === selected.id)
    ? selected
    : filteredProjects[0];

  return (
    <>
      {/* Domain filter tabs */}
      <div
        className="flex flex-wrap gap-0 mb-5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          onClick={() => setActiveDomain("all")}
          className="font-mono text-xs px-3 py-2 transition-colors"
          style={{
            color:
              activeDomain === "all" ? "var(--foreground)" : "var(--muted)",
            borderBottom:
              activeDomain === "all"
                ? "2px solid var(--accent)"
                : "2px solid transparent",
          }}
        >
          all
        </button>
        {ALL_DOMAINS.map((d) => (
          <button
            key={d}
            onClick={() => {
              setActiveDomain(d);
              const list = projects.filter((p) => p.domain === d);
              if (list.length > 0) setSelected(list[0]);
            }}
            className="font-mono text-xs px-3 py-2 transition-colors"
            style={{
              color: activeDomain === d ? "var(--foreground)" : "var(--muted)",
              borderBottom:
                activeDomain === d
                  ? `2px solid ${domainColors[d]}`
                  : "2px solid transparent",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* ── MOBILE ── */}
      <div
        className="md:hidden flex flex-col border"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="flex flex-col"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="px-3 py-2 border-b font-mono text-xs"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
              background: "var(--surface)",
            }}
          >
            EXPLORER
          </div>
          {filteredProjects.map((p, i) => {
            const isActive = p.id === safeSelected.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="w-full text-left flex items-center gap-2 px-4 py-3 transition-colors border-b"
                style={{
                  borderColor: "var(--border)",
                  background: isActive ? "var(--surface-hover)" : "transparent",
                  borderLeft: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  color: isActive ? "var(--foreground)" : "var(--muted)",
                }}
              >
                <span
                  className="font-mono text-xs shrink-0"
                  style={{ color: "var(--muted-dim)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs truncate flex-1">
                  {p.title}
                </span>
                {p.domain && (
                  <span
                    className="font-mono text-[10px] shrink-0 hidden xs:block"
                    style={{ color: domainColors[p.domain as Domain] }}
                  >
                    {domainLabels[p.domain as Domain]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={safeSelected.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="p-4"
          >
            {/* Thumbnail */}
            {safeSelected.thumbnail && (
              <div
                className="relative w-full h-40 overflow-hidden border mb-4"
                style={{ borderColor: "var(--border)" }}
              >
                <SafeImage
                  src={safeSelected.thumbnail}
                  alt={safeSelected.title}
                />
              </div>
            )}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {safeSelected.status && (
                <span className={`status-badge ${safeSelected.status}`}>
                  {safeSelected.status}
                </span>
              )}
              {safeSelected.domain && (
                <span
                  className="font-mono text-xs px-2 py-0.5 border"
                  style={{
                    borderColor: domainColors[safeSelected.domain as Domain],
                    color: domainColors[safeSelected.domain as Domain],
                  }}
                >
                  {domainLabels[safeSelected.domain as Domain]}
                </span>
              )}
            </div>
            <h2
              className="font-mono text-base font-semibold mb-2 break-words"
              style={{ color: "var(--foreground)" }}
            >
              {safeSelected.title}
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              {safeSelected.short_description}
            </p>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--muted)" }}
            >
              {safeSelected.summary}
            </p>
            <div className="flex flex-col gap-3 mb-5">
              <div
                className="p-3 border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <p
                  className="font-mono text-xs mb-1.5"
                  style={{ color: "var(--muted)" }}
                >
                  / problem
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                >
                  {safeSelected.problem}
                </p>
              </div>
              <div
                className="p-3 border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <p
                  className="font-mono text-xs mb-1.5"
                  style={{ color: "var(--accent)" }}
                >
                  / solution
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                >
                  {safeSelected.solution}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {safeSelected.tech_stack.map((t) => (
                <span key={t} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {safeSelected.github_url && (
                <a
                  href={safeSelected.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-link flex items-center gap-1.5 font-mono text-xs"
                >
                  <Github size={12} /> github
                </a>
              )}
              {safeSelected.live_url && (
                <a
                  href={safeSelected.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-link flex items-center gap-1.5 font-mono text-xs"
                >
                  <ExternalLink size={12} /> live demo
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── DESKTOP ── */}
      <div
        className="hidden md:flex gap-0 border"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Left – file list */}
        <div
          className="w-64 shrink-0 flex flex-col border-r"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="px-3 py-2 border-b font-mono text-xs"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
              background: "var(--surface)",
            }}
          >
            EXPLORER
          </div>
          {filteredProjects.map((p, i) => {
            const isActive = p.id === safeSelected.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="w-full text-left flex items-center gap-2 px-3 py-2.5 transition-colors"
                style={{
                  background: isActive ? "var(--surface-hover)" : "transparent",
                  borderLeft: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  color: isActive ? "var(--foreground)" : "var(--muted)",
                }}
              >
                <span
                  className="font-mono text-xs shrink-0"
                  style={{ color: "var(--muted-dim)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs truncate flex-1">
                  {p.title}
                </span>
                {p.domain && (
                  <span
                    className="font-mono text-[10px] shrink-0"
                    style={{ color: domainColors[p.domain as Domain] }}
                  >
                    {domainLabels[p.domain as Domain]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right – detail panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeSelected.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="p-6 md:p-8"
            >
              {/* Thumbnail */}
              {safeSelected.thumbnail && (
                <div
                  className="relative w-full h-52 overflow-hidden border mb-5"
                  style={{ borderColor: "var(--border)" }}
                >
                  <SafeImage
                    src={safeSelected.thumbnail}
                    alt={safeSelected.title}
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-4">
                {safeSelected.status && (
                  <span className={`status-badge ${safeSelected.status}`}>
                    {safeSelected.status}
                  </span>
                )}
                {safeSelected.domain && (
                  <span
                    className="font-mono text-xs px-2 py-0.5 border"
                    style={{
                      borderColor: domainColors[safeSelected.domain as Domain],
                      color: domainColors[safeSelected.domain as Domain],
                    }}
                  >
                    {domainLabels[safeSelected.domain as Domain]}
                  </span>
                )}
              </div>
              <h2
                className="font-mono text-xl font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {safeSelected.title}
              </h2>
              <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                {safeSelected.short_description}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  summary
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--border)" }}
                />
              </div>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--muted)" }}
              >
                {safeSelected.summary}
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div
                  className="p-4 border"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <p
                    className="font-mono text-xs mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    / problem
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--foreground)" }}
                  >
                    {safeSelected.problem}
                  </p>
                </div>
                <div
                  className="p-4 border"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  <p
                    className="font-mono text-xs mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    / solution
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--foreground)" }}
                  >
                    {safeSelected.solution}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  stack
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--border)" }}
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {safeSelected.tech_stack.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {safeSelected.github_url && (
                  <a
                    href={safeSelected.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dev-link flex items-center gap-1.5 font-mono text-xs"
                  >
                    <Github size={12} /> github
                  </a>
                )}
                {safeSelected.live_url && (
                  <a
                    href={safeSelected.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dev-link flex items-center gap-1.5 font-mono text-xs"
                  >
                    <ExternalLink size={12} /> live demo
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
