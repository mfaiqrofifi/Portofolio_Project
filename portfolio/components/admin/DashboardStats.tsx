"use client";

import Link from "next/link";

type Stat = {
  label: string;
  count: number;
  href: string;
  newHref: string;
  color: string;
};

export default function DashboardStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {stats.map(({ label, count, href, newHref, color }) => (
        <div
          key={label}
          className="p-5 border flex flex-col gap-3"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--muted)" }}
            >
              {label}
            </span>
            <span className="font-mono text-2xl font-bold" style={{ color }}>
              {count}
            </span>
          </div>
          <div className="flex gap-2">
            <Link
              href={href}
              className="font-mono text-[10px] px-2 py-1 border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = color;
                (e.currentTarget as HTMLElement).style.color = color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              }}
            >
              view all
            </Link>
            <Link
              href={newHref}
              className="font-mono text-[10px] px-2 py-1 border transition-colors"
              style={{ borderColor: color, color }}
            >
              + new
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
