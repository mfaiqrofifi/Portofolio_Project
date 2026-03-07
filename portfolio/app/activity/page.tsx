"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activities } from "@/lib/dummy-activity";

const tagColors: Record<string, string> = {
  Learning: "var(--accent)",
  "Project Update": "var(--success)",
  Event: "var(--accent-secondary)",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ActivityPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/activity
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Developer Log
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {activities.length} entries
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ background: "var(--border)" }}
        />

        {activities.map((item, i) => {
          const isOpen = expanded === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="relative pl-7"
            >
              {/* Dot */}
              <div
                className="absolute left-0 top-4 w-3.5 h-3.5 border-2"
                style={{
                  background: isOpen ? "var(--accent)" : "var(--background)",
                  borderColor: isOpen
                    ? "var(--accent)"
                    : "var(--border-strong)",
                }}
              />

              {/* Entry */}
              <button
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="w-full text-left py-4 border-b transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="font-mono text-[10px] px-1.5 py-0.5 border"
                        style={{
                          borderColor: tagColors[item.tag] ?? "var(--border)",
                          color: tagColors[item.tag] ?? "var(--muted)",
                        }}
                      >
                        {item.tag}
                      </span>
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: "var(--muted-dim)" }}
                      >
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p
                      className="font-mono text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.caption}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs shrink-0 transition-transform"
                    style={{
                      color: "var(--muted)",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    &gt;
                  </span>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-3 pt-3 border-t"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: "var(--muted)" }}
                        >
                          {item.description}
                        </p>
                        {item.relatedLinks && item.relatedLinks.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {item.relatedLinks.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="dev-link font-mono text-xs"
                              >
                                {link.label} â†—
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
