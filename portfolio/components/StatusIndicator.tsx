"use client";

export default function StatusIndicator({
  label = "online",
}: {
  label?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-xs"
      style={{ color: "var(--success)" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ backgroundColor: "var(--success)" }}
        />
        <span
          className="relative inline-flex rounded-full h-1.5 w-1.5"
          style={{ backgroundColor: "var(--success)" }}
        />
      </span>
      {label}
    </span>
  );
}
