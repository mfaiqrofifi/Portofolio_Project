"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PixelButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function PixelButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
}: PixelButtonProps) {
  const sizeClasses = {
    sm: "text-[9px] px-3 py-2",
    md: "text-[10px] px-5 py-3",
    lg: "text-xs px-7 py-4",
  };

  const variantStyles = {
    primary: {
      background: "var(--accent)",
      color: "var(--background)",
      borderColor: "var(--pixel-border)",
    },
    secondary: {
      background: "var(--card)",
      color: "var(--foreground)",
      borderColor: "var(--pixel-border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "var(--accent)",
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "font-pixel border-2 cursor-pointer select-none transition-opacity",
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      style={{
        ...variantStyles[variant],
        boxShadow: `3px 3px 0px var(--pixel-border)`,
      }}
      whileHover={
        !disabled
          ? { y: -2, boxShadow: "4px 4px 0px var(--pixel-border)" }
          : undefined
      }
      whileTap={
        !disabled
          ? { y: 1, x: 1, boxShadow: "1px 1px 0px var(--pixel-border)" }
          : undefined
      }
    >
      {children}
    </motion.button>
  );
}
