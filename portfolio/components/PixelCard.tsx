"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
}

export default function PixelCard({
  children,
  className,
  hover = true,
  glowOnHover = false,
  onClick,
}: PixelCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn("border-2", onClick && "cursor-pointer", className)}
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        boxShadow: "3px 3px 0px var(--pixel-border)",
      }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: glowOnHover
                ? "0 0 15px var(--accent), 0 0 30px color-mix(in srgb, var(--accent) 30%, transparent), 4px 4px 0px var(--pixel-border)"
                : "4px 4px 0px var(--pixel-border)",
            }
          : undefined
      }
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
