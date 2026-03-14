"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/devFaiq/projects");
    const json = await res.json();
    setProjects(json.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="font-mono text-sm"
          style={{ color: "var(--foreground)" }}
        >
          projects
        </h1>
        <Link
          href="/devFaiq/projects/new"
          className="font-mono text-xs px-4 py-2 border"
          style={{ borderColor: "#a78bfa", color: "#a78bfa" }}
        >
          + new
        </Link>
      </div>

      {loading ? (
        <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          loading...
        </p>
      ) : projects.length === 0 ? (
        <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          no projects found
        </p>
      ) : (
        <div className="border" style={{ borderColor: "var(--border)" }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-4 py-3 gap-4"
              style={{
                borderBottom:
                  i < projects.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="font-mono text-xs truncate"
                  style={{ color: "var(--foreground)" }}
                >
                  {p.title}
                </p>
                <p
                  className="font-mono text-[10px]"
                  style={{ color: "var(--muted)" }}
                >
                  {p.status} · {p.domain}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/devFaiq/projects/${p.id}/edit`}
                  className="font-mono text-[10px] px-2 py-0.5 border"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  edit
                </Link>
                <AdminDeleteButton
                  id={String(p.id)}
                  entity="projects"
                  onDeleted={load}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
