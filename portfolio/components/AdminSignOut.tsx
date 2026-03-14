"use client";
import { signOut } from "next-auth/react";

export default function AdminSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/devFaiq/login" })}
      className="w-full font-mono text-xs px-3 py-2 border transition-colors text-left"
      style={{
        borderColor: "var(--border)",
        color: "var(--muted)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#f87171";
        (e.currentTarget as HTMLElement).style.color = "#f87171";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--muted)";
      }}
    >
      sign out
    </button>
  );
}
