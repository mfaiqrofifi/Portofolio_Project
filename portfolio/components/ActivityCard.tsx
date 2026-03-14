"use client";

import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import { ActivityWithLinks } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const TAG_STYLES: Record<
  string,
  { bg: string; text: string; glow: string; dot: string }
> = {
  Learning: {
    bg: "rgba(99,102,241,0.15)",
    text: "#818cf8",
    glow: "#818cf8",
    dot: "#6366f1",
  },
  "Project Update": {
    bg: "rgba(52,211,153,0.12)",
    text: "#34d399",
    glow: "#34d399",
    dot: "#10b981",
  },
  Event: {
    bg: "rgba(251,191,36,0.12)",
    text: "#fbbf24",
    glow: "#fbbf24",
    dot: "#f59e0b",
  },
};

const DEFAULT_STYLE = {
  bg: "rgba(255,255,255,0.05)",
  text: "var(--muted)",
  glow: "#888",
  dot: "#888",
};

interface ActivityCardProps {
  activity: ActivityWithLinks;
  index?: number;
  isLast?: boolean;
}

export default function ActivityCard({
  activity,
  index = 0,
  isLast = false,
}: ActivityCardProps) {
  const style = TAG_STYLES[activity.tag ?? "Learning"] ?? DEFAULT_STYLE;

  return (
    <motion.div
      className="flex gap-4 relative"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center w-8 flex-shrink-0 pt-1">
        {/* Node */}
        <motion.div
          className="w-4 h-4 rounded-sm border-2 flex items-center justify-center z-10 relative"
          style={{
            background: "var(--background)",
            borderColor: style.dot,
            boxShadow: `0 0 8px ${style.glow}60`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.07 + 0.15,
            type: "spring",
            stiffness: 300,
          }}
        >
          <div className="w-1.5 h-1.5" style={{ background: style.dot }} />
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="flex-1 w-px mt-1"
            style={{
              background: `linear-gradient(to bottom, ${style.dot}60, var(--border))`,
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.07 + 0.2, duration: 0.4 }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 mb-8 border-2 overflow-hidden"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          boxShadow: "3px 3px 0px var(--pixel-border)",
        }}
        whileHover={{
          y: -3,
          borderColor: style.dot,
          boxShadow: `0 0 16px ${style.glow}25, 4px 4px 0px var(--pixel-border)`,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b-2"
          style={{
            borderColor: "var(--border)",
            background: `linear-gradient(90deg, ${style.bg}, transparent)`,
          }}
        >
          <span
            className="text-xs font-pixel px-2 py-0.5 border"
            style={{
              background: style.bg,
              borderColor: style.dot,
              color: style.text,
            }}
          >
            {activity.tag}
          </span>
          <span
            className="text-xs font-pixel"
            style={{ color: "var(--muted)" }}
          >
            {formatDate(activity.date ?? "")}
          </span>
        </div>

        {/* Image banner — full width, only when image exists */}
        {activity.image && (
          <div
            className="relative h-44 overflow-hidden border-b-2"
            style={{ borderColor: "var(--border)" }}
          >
            <SafeImage src={activity.image} alt={activity.title} />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
              }}
            />
          </div>
        )}

        {/* Body */}
        <div className="p-4 flex flex-col gap-2">
          <h3
            className="font-semibold text-base leading-snug"
            style={{ color: "var(--foreground)" }}
          >
            {activity.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {activity.caption}
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {activity.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
