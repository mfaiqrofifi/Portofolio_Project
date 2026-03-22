"use client";

import { useEffect, useRef, useState } from "react";

// ── Configurable constants ─────────────────────────────────
const ROLES = [
  "Software Engineer",
  "AI Engineer",
  "Cloud Engineer",
  "DevOps Engineer",
] as const;

const TYPING_SPEED = 80; // ms per character typed
const DELETING_SPEED = 50; // ms per character deleted
const PAUSE_AFTER = 1400; // ms pause after full word appears
const PAUSE_BEFORE = 380; // ms pause before starting next word
// ──────────────────────────────────────────────────────────

type Phase = "typing" | "deleting";

interface TypewriterRoleProps {
  roles?: readonly string[];
}

export default function TypewriterRole({ roles = ROLES }: TypewriterRoleProps) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const role = roles[idx];
    const clear = () => {
      if (timer.current) clearTimeout(timer.current);
    };
    const after = (fn: () => void, delay: number) => {
      clear();
      timer.current = setTimeout(fn, delay);
    };

    if (phase === "typing") {
      if (text.length < role.length) {
        after(() => setText(role.slice(0, text.length + 1)), TYPING_SPEED);
      } else {
        // Full word typed — pause, then start deleting
        after(() => setPhase("deleting"), PAUSE_AFTER);
      }
    } else {
      if (text.length > 0) {
        after(() => setText((t) => t.slice(0, -1)), DELETING_SPEED);
      } else {
        // Fully cleared — short pause, advance to next role
        after(() => {
          setIdx((i) => (i + 1) % roles.length);
          setPhase("typing");
        }, PAUSE_BEFORE);
      }
    }

    return clear;
  }, [text, phase, idx, roles]);

  return (
    <span
      className="inline-flex items-center font-mono text-sm"
      style={{
        color: "var(--accent)",
        height: "1.4em",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      <span>{text}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
