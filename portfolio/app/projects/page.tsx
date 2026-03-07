"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project, Domain } from "@/lib/dummy-projects";
import { Github, ExternalLink } from "lucide-react";

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

export default function ProjectsPage() {
  const [activeDomain, setActiveDomain] = useState<Domain | "all">("all");
  const filteredProjects =
    activeDomain === "all"
      ? projects
      : projects.filter((p) => p.domain === activeDomain);
  const [selected, setSelected] = useState<Project>(projects[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 py-8 md:py-16">
      {/* Page header */}
      <div className="mb-6">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/projects
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Projects
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {filteredProjects.length} items
          </span>
        </div>
      </div>

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
            onClick={() => setActiveDomain(d)}
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
      <div
        className="md:hidden flex flex-col border"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Project selector list */}
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
            const isActive = p.id === selected.id;
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
                <span
                  className="font-mono text-[10px] shrink-0 hidden xs:block"
                  style={{ color: domainColors[p.domain] }}
                >
                  {domainLabels[p.domain]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected project detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="p-4"
          >
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`status-badge ${selected.status}`}>
                {selected.status}
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 border"
                style={{
                  borderColor: domainColors[selected.domain],
                  color: domainColors[selected.domain],
                }}
              >
                {domainLabels[selected.domain]}
              </span>
            </div>
            <h2
              className="font-mono text-base font-semibold mb-2 break-words"
              style={{ color: "var(--foreground)" }}
            >
              {selected.title}
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              {selected.shortDescription}
            </p>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--muted)" }}
            >
              {selected.summary}
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
                  {selected.problem}
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
                  {selected.solution}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {selected.techStack.map((t) => (
                <span key={t} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={selected.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dev-link flex items-center gap-1.5 font-mono text-xs"
              >
                <Github size={12} />
                github
              </a>
              {selected.liveUrl && (
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-link flex items-center gap-1.5 font-mono text-xs"
                >
                  <ExternalLink size={12} />
                  live demo
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── DESKTOP: split panel (visible at md+) ── */}
      <div
        className="hidden md:flex gap-0 border"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Left â€” file list */}
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
            const isActive = p.id === selected.id;
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
                <span
                  className="font-mono text-[10px] shrink-0"
                  style={{ color: domainColors[p.domain] }}
                >
                  {domainLabels[p.domain]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right â€” detail panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="p-6 md:p-8"
            >
              {/* Status + category */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`status-badge ${selected.status}`}>
                  {selected.status}
                </span>
                <span
                  className="font-mono text-xs px-2 py-0.5 border"
                  style={{
                    borderColor: domainColors[selected.domain],
                    color: domainColors[selected.domain],
                  }}
                >
                  {domainLabels[selected.domain]}
                </span>
              </div>

              <h2
                className="font-mono text-xl font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                {selected.title}
              </h2>
              <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                {selected.shortDescription}
              </p>

              {/* Divider */}
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
                {selected.summary}
              </p>

              {/* Problem / Solution */}
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
                    {selected.problem}
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
                    {selected.solution}
                  </p>
                </div>
              </div>

              {/* Tech stack */}
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
                {selected.techStack.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3">
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-link flex items-center gap-1.5 font-mono text-xs"
                >
                  <Github size={12} />
                  github
                </a>
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dev-link flex items-center gap-1.5 font-mono text-xs"
                  >
                    <ExternalLink size={12} />
                    live demo
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
