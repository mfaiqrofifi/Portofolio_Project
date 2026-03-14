"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import type { Activity } from "@/lib/types";

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/devFaiq/activities");
    const json = await res.json();
    setActivities(json.data ?? []);
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
          activities
        </h1>
        <Link
          href="/devFaiq/activities/new"
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
      ) : activities.length === 0 ? (
        <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          no activities found
        </p>
      ) : (
        <div className="border" style={{ borderColor: "var(--border)" }}>
          {activities.map((a, i) => (
            <div
              key={a.id}
              className="flex items-center justify-between px-4 py-3 gap-4"
              style={{
                borderBottom:
                  i < activities.length - 1
                    ? "1px solid var(--border)"
                    : "none",
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="font-mono text-xs truncate"
                  style={{ color: "var(--foreground)" }}
                >
                  {a.title}
                </p>
                <p
                  className="font-mono text-[10px]"
                  style={{ color: "var(--muted)" }}
                >
                  {a.tag} ·{" "}
                  {a.date ? new Date(a.date).toLocaleDateString() : "—"}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/devFaiq/activities/${a.id}/edit`}
                  className="font-mono text-[10px] px-2 py-0.5 border"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  edit
                </Link>
                <AdminDeleteButton
                  id={String(a.id)}
                  entity="activities"
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
