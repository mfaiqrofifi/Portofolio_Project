"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import type { Article } from "@/lib/types";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/devFaiq/articles");
    const json = await res.json();
    setArticles(json.data ?? []);
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
          articles
        </h1>
        <Link
          href="/devFaiq/articles/new"
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
      ) : articles.length === 0 ? (
        <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          no articles found
        </p>
      ) : (
        <div className="border" style={{ borderColor: "var(--border)" }}>
          {articles.map((a, i) => (
            <div
              key={a.id}
              className="flex items-center justify-between px-4 py-3 gap-4"
              style={{
                borderBottom:
                  i < articles.length - 1 ? "1px solid var(--border)" : "none",
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
                  {a.category} · {a.read_time ? `${a.read_time} min read` : "—"}
                  {a.featured ? " · featured" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/devFaiq/articles/${a.id}/edit`}
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
                  entity="articles"
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
