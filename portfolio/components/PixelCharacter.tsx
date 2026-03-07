"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface Building {
  label: string;
  sublabel: string;
  description: string;
  href: string;
  color: string;
  building: "lab" | "library" | "gallery" | "house" | "tower";
}

interface PixelCharacterProps {
  size?: number;
  buildings?: Building[];
}

const SPRITE_COLORS = {
  hair: "#1a1a2e",
  skin: "#f4c89a",
  shirt: "#2563eb",
  pants: "#1e293b",
  shoes: "#0f172a",
  screen: "#00f5ff",
  glass: "#93c5fd",
  empty: "transparent",
};

const IDLE_FRAME: string[][] = [
  ["0", "0", "0", "H", "H", "H", "0", "0"],
  ["0", "0", "H", "S", "S", "S", "H", "0"],
  ["0", "0", "S", "G", "S", "G", "S", "0"],
  ["0", "0", "S", "S", "S", "S", "S", "0"],
  ["0", "T", "T", "T", "T", "T", "T", "0"],
  ["T", "T", "T", "T", "T", "T", "T", "T"],
  ["0", "T", "T", "T", "T", "T", "T", "0"],
  ["0", "P", "P", "0", "0", "P", "P", "0"],
  ["0", "P", "P", "0", "0", "P", "P", "0"],
  ["0", "F", "F", "0", "0", "F", "F", "0"],
];

const COLOR_MAP: Record<string, string> = {
  "0": SPRITE_COLORS.empty,
  H: SPRITE_COLORS.hair,
  S: SPRITE_COLORS.skin,
  G: SPRITE_COLORS.glass,
  T: SPRITE_COLORS.shirt,
  P: SPRITE_COLORS.pants,
  F: SPRITE_COLORS.shoes,
};

const BUILDING_ZONES = [
  {
    range: [-120, -70] as [number, number],
    idx: 0,
    messages: [
      "🔬 LAB\nExplore backend projects",
      "This is where I experiment\nwith system design.",
      "Building scalable APIs here.",
    ],
  },
  {
    range: [-70, -20] as [number, number],
    idx: 1,
    messages: [
      "📚 LIBRARY\nBrowse technical writing",
      "My engineering notes live here.",
      "Deep dives into backend patterns.",
    ],
  },
  {
    range: [-20, 20] as [number, number],
    idx: 2,
    messages: [
      "🎨 GALLERY\nView my dev journey",
      "The developer log timeline.",
      "Tracking my learning path.",
    ],
  },
  {
    range: [20, 70] as [number, number],
    idx: 3,
    messages: [
      "🏠 HOME BASE\nAbout the engineer",
      "Learn more about me here.",
      "Who I am and what I build.",
    ],
  },
  {
    range: [70, 120] as [number, number],
    idx: 4,
    messages: [
      "📞 TOWER\nGet in touch",
      "Let's connect!",
      "Reach out anytime.",
    ],
  },
];

export default function PixelCharacter({
  size = 4,
  buildings = [],
}: PixelCharacterProps) {
  const [posX, setPosX] = useState(0);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [isMoving, setIsMoving] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [nearBuilding, setNearBuilding] = useState<Building | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isJumping, setIsJumping] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const router = useRouter();

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const shirtColor = isDark ? "#00f5ff" : "#2563eb";

  // Detect proximity to buildings
  useEffect(() => {
    const zone = BUILDING_ZONES.find(
      (z) => posX >= z.range[0] && posX <= z.range[1],
    );
    if (zone && buildings[zone.idx]) {
      setNearBuilding(buildings[zone.idx]);
    } else {
      setNearBuilding(null);
    }
  }, [posX, buildings]);

  // Idle dialog logic
  useEffect(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setShowDialog(false);

    idleTimerRef.current = setTimeout(() => {
      let msg = "";
      if (nearBuilding) {
        const zone = BUILDING_ZONES.find(
          (z) => z.idx === buildings.indexOf(nearBuilding),
        );
        const messages = zone?.messages || [];
        msg =
          messages[Math.floor(Math.random() * messages.length)] ||
          "Exploring...";
      } else {
        const idleMessages = [
          "Hey 👋 Let's explore!",
          "Navigate with arrow keys.",
          "Press E to enter buildings.",
          "Space to jump!",
          "Every building has secrets...",
        ];
        msg = idleMessages[Math.floor(Math.random() * idleMessages.length)];
      }
      setDialogMessage(msg);
      setShowDialog(true);
    }, 5000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [nearBuilding, buildings]);

  const move = useCallback((dir: "left" | "right") => {
    setFacing(dir);
    setIsMoving(true);
    setShowDialog(false);

    setPosX((x) => {
      const delta = dir === "right" ? 20 : -20;
      return Math.max(-120, Math.min(120, x + delta));
    });

    setTimeout(() => setIsMoving(false), 150);
  }, []);

  const jump = useCallback(() => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
  }, []);

  const enterBuilding = useCallback(() => {
    if (nearBuilding) {
      setIsNavigating(true);
      setTimeout(() => {
        router.push(nearBuilding.href);
      }, 300);
    }
  }, [nearBuilding, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavigating) return;

      const key = e.key.toLowerCase();

      if (key === "arrowleft" || key === "a") {
        e.preventDefault();
        move("left");
      }
      if (key === "arrowright" || key === "d") {
        e.preventDefault();
        move("right");
      }
      if (key === " ") {
        e.preventDefault();
        if (!isJumping) jump();
      }
      if (key === "e" && nearBuilding) {
        e.preventDefault();
        enterBuilding();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move, jump, enterBuilding, nearBuilding, isNavigating, isJumping]);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center select-none">
      {/* Keyboard hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mb-3 font-pixel text-[7px] flex items-center gap-2 px-3 py-1.5 border"
            style={{
              color: "var(--muted)",
              borderColor: "var(--border)",
              background: "var(--card)",
            }}
          >
            <kbd
              className="px-1 py-0.5 border"
              style={{ borderColor: "var(--border)", fontSize: "6px" }}
            >
              ◀▶
            </kbd>
            <span>move</span>
            <span style={{ opacity: 0.6 }}>•</span>
            <kbd
              className="px-1 py-0.5 border"
              style={{ borderColor: "var(--border)", fontSize: "6px" }}
            >
              E
            </kbd>
            <span>enter</span>
            <span style={{ opacity: 0.6 }}>•</span>
            <kbd
              className="px-1 py-0.5 border"
              style={{ borderColor: "var(--border)", fontSize: "6px" }}
            >
              SPC
            </kbd>
            <span>jump</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog bubble */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="mb-4 px-4 py-3 border-2 text-center font-pixel text-[8px] leading-tight max-w-32 relative"
            style={{
              color: "var(--foreground)",
              borderColor: nearBuilding?.color || "var(--accent)",
              background: "var(--card)",
              boxShadow: `0 0 12px ${(nearBuilding?.color || "var(--accent)") + "30"}`,
            }}
          >
            <div style={{ whiteSpace: "pre-line", lineHeight: 1.4 }}>
              {dialogMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction tooltip when near building */}
      <AnimatePresence>
        {nearBuilding && !showDialog && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mb-3 px-3 py-1.5 border-2 font-pixel text-[7px]"
            style={{
              color: nearBuilding.color,
              borderColor: nearBuilding.color,
              background: "var(--card)",
              boxShadow: `0 0 8px ${nearBuilding.color}40`,
            }}
          >
            <div>{nearBuilding.sublabel}</div>
            <div style={{ fontSize: "6px", opacity: 0.7, marginTop: 2 }}>
              Press{" "}
              <kbd
                style={{
                  padding: "1px 3px",
                  border: "1px solid",
                  borderColor: nearBuilding.color,
                }}
              >
                E
              </kbd>{" "}
              to enter
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character container */}
      <motion.div
        animate={{ x: posX }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* Shadow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1"
          style={{
            width: size * 6,
            height: size * 1.5,
            background: "rgba(0,0,0,0.2)",
            borderRadius: "50%",
            filter: "blur(4px)",
          }}
          animate={{
            scaleX: isMoving ? 1.2 : 1,
            scaleY: isJumping ? 0.6 : 1,
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Pixel sprite */}
        <motion.div
          style={{
            scaleX: facing === "left" ? -1 : 1,
          }}
          animate={
            isJumping
              ? { y: -40 }
              : isMoving
                ? { y: [0, -size, 0] }
                : { scaleY: [1, 1.02, 1] }
          }
          transition={
            isJumping
              ? { duration: 0.6, ease: "easeOut" }
              : isMoving
                ? { duration: 0.15 }
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {IDLE_FRAME.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: "flex" }}>
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    width: size,
                    height: size,
                    background:
                      cell === "T"
                        ? nearBuilding?.color || shirtColor
                        : cell === "G"
                          ? nearBuilding?.color ||
                            (isDark ? "#00f5ff" : "#93c5fd")
                          : COLOR_MAP[cell],
                    imageRendering: "pixelated",
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>
          ))}
        </motion.div>

        {/* Glow effect when near building */}
        <AnimatePresence>
          {nearBuilding && (
            <motion.div
              className="absolute inset-0 -m-4 rounded pointer-events-none"
              style={{
                boxShadow: `0 0 24px ${nearBuilding.color}50`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation feedback */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="font-pixel text-sm text-center"
              style={{ color: "var(--accent)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
            >
              Entering {nearBuilding?.sublabel}...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow key buttons for mobile */}
      <div className="flex gap-3 mt-5">
        {[
          { dir: "left" as const, label: "◀" },
          { dir: "right" as const, label: "▶" },
        ].map(({ dir, label }) => (
          <motion.button
            key={dir}
            onPointerDown={() => move(dir)}
            className="w-8 h-8 flex items-center justify-center border-2 font-pixel text-xs"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
              boxShadow: "2px 2px 0px var(--pixel-border)",
            }}
            whileTap={{
              y: 1,
              x: 1,
              boxShadow: "1px 1px 0px var(--pixel-border)",
            }}
            aria-label={`Move ${dir}`}
          >
            {label}
          </motion.button>
        ))}

        {/* Jump button for mobile */}
        <motion.button
          onPointerDown={() => !isJumping && jump()}
          className="w-8 h-8 flex items-center justify-center border-2 font-pixel text-xs"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
            boxShadow: "2px 2px 0px var(--pixel-border)",
          }}
          whileTap={{
            y: 1,
            x: 1,
            boxShadow: "1px 1px 0px var(--pixel-border)",
          }}
          aria-label="Jump"
        >
          ↑
        </motion.button>
      </div>
    </div>
  );
}
