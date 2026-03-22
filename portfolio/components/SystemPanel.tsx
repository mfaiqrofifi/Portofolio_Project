"use client";

import { motion } from "framer-motion";

interface SystemPanelProps {
  stack?: string[];
  infra?: string[];
  focus?: string[];
  mode?: string;
}

const defaults: SystemPanelProps = {
  stack: ["Go", "Node.js", "PostgreSQL", "Redis"],
  infra: ["Docker", "Kubernetes", "AWS/GCP"],
  focus: ["distributed systems", "APIs", "AI"],
  mode: "building",
};

export default function SystemPanel({
  stack = defaults.stack,
  infra = defaults.infra,
  focus = defaults.focus,
  mode = defaults.mode,
}: SystemPanelProps) {
  const rows = [
    { key: "stack", value: stack?.join(", ") },
    { key: "infra", value: infra?.join(", ") },
    { key: "focus", value: focus?.join(", ") },
    { key: "mode", value: mode },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="system-panel"
    >
      {/* Panel header — matches os-section-header style */}
      <div className="system-panel-header">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--muted-dim)" }}
          >
            sys.config
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)", opacity: 0.7 }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--muted-dim)", opacity: 0.3 }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--muted-dim)", opacity: 0.3 }}
          />
        </div>
      </div>

      {/* Panel body — 2-column grid on wider screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 px-3 py-2.5 gap-y-1.5 gap-x-8">
        {rows.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.25 + i * 0.05 }}
            className="flex items-center gap-2 font-mono text-xs"
          >
            <span
              className="shrink-0 w-10"
              style={{ color: "var(--accent)", opacity: 0.75 }}
            >
              {row.key}
            </span>
            <span style={{ color: "var(--muted-dim)" }}>:</span>
            <span style={{ color: "var(--muted)" }} className="truncate">
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
