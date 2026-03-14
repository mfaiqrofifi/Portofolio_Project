"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import type { ActivityWithLinks } from "@/lib/types";

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

export default function ActivityView({
  activities,
}: {
  activities: ActivityWithLinks[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!activities.length) {
    return (
      <p className="font-mono text-sm" style={{ color: "var(--muted)" }}>
        No activity entries found.
      </p>
    );
  }

  return (
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
                borderColor: isOpen ? "var(--accent)" : "var(--border-strong)",
              }}
            />

            {/* Image banner — shown directly when image exists */}

            {/* Entry */}
            <button
              onClick={() => setExpanded(isOpen ? null : item.id)}
              className="w-full text-left py-4 border-b transition-colors"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {item.tag && (
                      <span
                        className="font-mono text-[10px] px-1.5 py-0.5 border"
                        style={{
                          borderColor: tagColors[item.tag] ?? "var(--border)",
                          color: tagColors[item.tag] ?? "var(--muted)",
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                    {item.date && (
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: "var(--muted-dim)" }}
                      >
                        {formatDate(item.date)}
                      </span>
                    )}
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
                      {item.image && (
                        <div
                          className="relative w-full h-44 overflow-hidden border mb-4"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <SafeImage src={item.image} alt={item.title} />
                        </div>
                      )}
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.description}
                      </p>
                      {item.links && item.links.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {item.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="dev-link font-mono text-xs"
                            >
                              {link.label} ↗
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
  );
}
