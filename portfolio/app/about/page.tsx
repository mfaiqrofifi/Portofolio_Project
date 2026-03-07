"use client";

import { motion } from "framer-motion";

const profile = [
  { key: "name", value: "Faiq Rofifi" },
  { key: "role", value: "Software Engineer" },
  { key: "location", value: "Indonesia" },
  { key: "status", value: "open to opportunities" },
  {
    key: "focus",
    value:
      "systems \u00B7 fullstack products \u00B7 AI workflows \u00B7 infrastructure",
  },
];

const techStack = [
  { group: "Languages", items: ["Go", "Rust", "Python", "TypeScript", "SQL"] },
  { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
  {
    group: "Databases",
    items: ["PostgreSQL", "Redis", "MongoDB", "ClickHouse"],
  },
  {
    group: "AI / ML",
    items: ["OpenAI API", "LangChain", "pgvector", "Hugging Face"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Kubernetes", "Terraform", "Nginx"],
  },
  { group: "Cloud", items: ["AWS", "GCP", "Cloudflare"] },
  {
    group: "Observability",
    items: ["Prometheus", "Grafana", "OpenTelemetry"],
  },
];

const strengths = [
  "Designing production REST / gRPC APIs and distributed backends",
  "Fullstack product delivery with Next.js + Go, from schema to UI",
  "LLM integrations: RAG pipelines, function calling, AI-powered tooling",
  "Distributed systems: message queues, event-driven architecture, sagas",
  "CI/CD pipelines, GitOps with ArgoCD, zero-downtime Kubernetes deployments",
  "Performance debugging: profiling, tracing, load testing, query optimization",
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 py-8 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/about
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            System Profile
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
        </div>
      </div>

      {/* Photo + name block */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-5 mb-6 p-4 border"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {/* Profile photo — replace this div with <img src="..." /> when ready */}
        <div
          className="shrink-0 w-14 h-14 flex items-center justify-center font-mono text-base font-semibold select-none"
          style={{
            background: "var(--surface-hover)",
            border: "1px solid var(--border-strong)",
            color: "var(--accent)",
          }}
        >
          FR
        </div>
        <div>
          <p
            className="font-mono text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Faiq Rofifi
          </p>
          <p className="font-mono text-xs" style={{ color: "var(--accent)" }}>
            Software Engineer
          </p>
          <p
            className="font-mono text-[11px] mt-1"
            style={{ color: "var(--muted)" }}
          >
            Indonesia &nbsp;&middot;&nbsp; open to opportunities
          </p>
        </div>
      </motion.div>

      {/* Profile table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="border mb-8"
        style={{ borderColor: "var(--border)" }}
      >
        {profile.map(({ key, value }) => (
          <div
            key={key}
            className="flex items-start border-b last:border-0"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-28 sm:w-32 shrink-0 px-3 py-2.5 font-mono text-xs border-r"
              style={{
                borderColor: "var(--border)",
                color: "var(--muted)",
                background: "var(--surface)",
              }}
            >
              {key}
            </div>
            <div
              className="px-3 py-2.5 font-mono text-xs min-w-0 break-words"
              style={{ color: "var(--foreground)" }}
            >
              {key === "status" ? (
                <span style={{ color: "var(--success)" }}>{value}</span>
              ) : key === "focus" ? (
                <span style={{ color: "var(--muted)" }}>{value}</span>
              ) : (
                value
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Strengths */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          core strengths
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col gap-1.5 mb-8"
      >
        {strengths.map((s) => (
          <li key={s} className="flex items-start gap-2">
            <span
              className="font-mono text-xs mt-px shrink-0"
              style={{ color: "var(--accent)" }}
            >
              &mdash;
            </span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {s}
            </span>
          </li>
        ))}
      </motion.ul>

      {/* Tech stack */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          tech stack
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-3"
      >
        {techStack.map(({ group, items }) => (
          <div key={group} className="flex items-start gap-3 sm:gap-4">
            <span
              className="font-mono text-xs w-24 sm:w-28 shrink-0 mt-0.5"
              style={{ color: "var(--muted)" }}
            >
              {group}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span key={item} className="tag-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
