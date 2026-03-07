"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from "react";

interface BuildingCardProps {
  label: string;
  sublabel: string;
  description: string;
  href: string;
  color: string;
  building: "lab" | "library" | "gallery" | "house" | "tower";
  index?: number;
}

function LabBuilding({ color }: { color: string }) {
  return (
    <div
      className="flex flex-col items-center gap-px"
      style={{ imageRendering: "pixelated" }}
    >
      <div className="flex gap-5">
        <div style={{ width: 6, height: 8, background: color, opacity: 0.6 }} />
        <div style={{ width: 6, height: 12, background: color }} />
      </div>
      <div style={{ width: 40, height: 6, background: color }} />
      {[0, 1, 2].map((r) => (
        <div
          key={r}
          style={{
            width: 40,
            height: 9,
            background: r === 0 ? color + "33" : "var(--card)",
            border: `1.5px solid ${color}`,
            borderTop: "none",
          }}
        />
      ))}
      <div className="flex gap-1">
        <div
          style={{ width: 11, height: 9, background: color, opacity: 0.3 }}
        />
        <div
          style={{ width: 11, height: 9, background: color, opacity: 0.9 }}
        />
        <div
          style={{
            width: 12,
            height: 16,
            background: "var(--background)",
            border: `1px solid ${color}`,
          }}
        />
      </div>
    </div>
  );
}

function LibraryBuilding({ color }: { color: string }) {
  return (
    <div
      className="flex flex-col items-center gap-px"
      style={{ imageRendering: "pixelated" }}
    >
      <div
        style={{ width: 12, height: 6, background: color, alignSelf: "center" }}
      />
      <div style={{ width: 40, height: 6, background: color }} />
      <div className="flex gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{ width: 4, height: 28, background: color, opacity: 0.75 }}
          />
        ))}
      </div>
      <div style={{ width: 48, height: 5, background: color }} />
    </div>
  );
}

function GalleryBuilding({ color }: { color: string }) {
  return (
    <div
      className="flex flex-col items-center gap-px"
      style={{ imageRendering: "pixelated" }}
    >
      <div
        style={{ width: 24, height: 4, background: color, alignSelf: "center" }}
      />
      <div
        style={{ width: 36, height: 4, background: color, alignSelf: "center" }}
      />
      {[0, 1].map((r) => (
        <div
          key={r}
          style={{
            width: 44,
            height: 9,
            background: r === 0 ? color + "22" : "var(--card)",
            border: `1.5px solid ${color}`,
            borderTop: r === 0 ? `1.5px solid ${color}` : "none",
          }}
        />
      ))}
      <div className="flex gap-1.5">
        {[0.25, 0.9, 0.45].map((o, i) => (
          <div
            key={i}
            style={{ width: 11, height: 11, background: color, opacity: o }}
          />
        ))}
      </div>
    </div>
  );
}

function HouseBuilding({ color }: { color: string }) {
  return (
    <div
      className="flex flex-col items-center gap-px"
      style={{ imageRendering: "pixelated" }}
    >
      <div
        style={{ width: 10, height: 5, background: color, alignSelf: "center" }}
      />
      <div
        style={{ width: 22, height: 5, background: color, alignSelf: "center" }}
      />
      <div style={{ width: 38, height: 5, background: color }} />
      {[0, 1].map((r) => (
        <div
          key={r}
          style={{
            width: 38,
            height: 9,
            background: "var(--card)",
            border: `1.5px solid ${color}`,
            borderTop: r === 0 ? `1.5px solid ${color}` : "none",
          }}
        />
      ))}
      <div className="flex gap-2 justify-center">
        <div
          style={{ width: 10, height: 9, background: color, opacity: 0.45 }}
        />
        <div
          style={{
            width: 10,
            height: 13,
            background: "var(--background)",
            border: `1.5px solid ${color}`,
          }}
        />
        <div
          style={{ width: 10, height: 9, background: color, opacity: 0.45 }}
        />
      </div>
    </div>
  );
}

function TowerBuilding({ color }: { color: string }) {
  return (
    <div
      className="flex flex-col items-center gap-px"
      style={{ imageRendering: "pixelated" }}
    >
      <motion.div
        style={{ width: 2, height: 12, background: color }}
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
      <div
        style={{
          width: 18,
          height: 5,
          background: color,
          opacity: 0.65,
          alignSelf: "center",
        }}
      />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex gap-2 justify-center">
          <div style={{ width: 4, height: 5, background: color }} />
          <div style={{ width: 8, height: 5 }} />
          <div style={{ width: 4, height: 5, background: color }} />
        </div>
      ))}
      <div style={{ width: 30, height: 7, background: color }} />
    </div>
  );
}

const BUILDINGS: Record<string, React.ComponentType<{ color: string }>> = {
  lab: LabBuilding,
  library: LibraryBuilding,
  gallery: GalleryBuilding,
  house: HouseBuilding,
  tower: TowerBuilding,
};

export default function BuildingCard({
  label,
  sublabel,
  description,
  href,
  color,
  building,
  index = 0,
}: BuildingCardProps) {
  const [hovered, setHovered] = useState(false);
  const BuildingArt = BUILDINGS[building];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <Link href={href} className="block">
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="flex flex-col items-center gap-3 px-4 py-5 border-2 relative overflow-visible cursor-pointer"
          style={{
            background: "var(--card)",
            borderColor: hovered ? color : "var(--border)",
            transition: "border-color 0.2s",
            boxShadow: hovered
              ? `0 0 24px ${color}40, 0 0 48px ${color}15, 3px 3px 0px ${color}`
              : "3px 3px 0px var(--pixel-border)",
          }}
          animate={{ y: hovered ? -7 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Building art */}
          <div className="h-20 flex items-end justify-center">
            <BuildingArt color={color} />
          </div>

          {/* Labels */}
          <div className="text-center">
            <p
              className="font-pixel text-[9px] mb-1 transition-colors duration-200"
              style={{ color: hovered ? color : "var(--foreground)" }}
            >
              {label}
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {sublabel}
            </p>
          </div>

          {/* Bottom glow line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: color }}
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </Link>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 px-3 py-2 border pointer-events-none whitespace-nowrap"
            style={{
              background: "var(--card)",
              borderColor: color,
              boxShadow: `0 0 12px ${color}40`,
            }}
          >
            <p className="font-pixel text-[7px]" style={{ color }}>
              {description}
            </p>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: `5px solid ${color}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
