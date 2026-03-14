"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import type { Article } from "@/lib/types";

type ArticleCategory = "systems" | "ai" | "devops" | "products";

const categoryColors: Record<ArticleCategory, string> = {
  systems: "var(--accent)",
  ai: "var(--accent-secondary)",
  devops: "var(--success, #22c55e)",
  products: "var(--warning, #f59e0b)",
};

const ALL_CATEGORIES: ArticleCategory[] = [
  "systems",
  "ai",
  "devops",
  "products",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WritingView({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "all">(
    "all",
  );
  const [selected, setSelected] = useState<Article>(articles[0]);

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  function handleCategoryChange(cat: ArticleCategory | "all") {
    setActiveCategory(cat);
    const list =
      cat === "all" ? articles : articles.filter((a) => a.category === cat);
    if (list.length > 0) setSelected(list[0]);
  }

  if (!articles.length) {
    return (
      <p className="font-mono text-sm" style={{ color: "var(--muted)" }}>
        No articles found.
      </p>
    );
  }

  const safeSelected = filteredArticles.some((a) => a.id === selected.id)
    ? selected
    : (filteredArticles[0] ?? selected);

  return (
    <>
      {/* Category filter tabs */}
      <div
        className="flex items-center gap-0 mb-5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          onClick={() => handleCategoryChange("all")}
          className="font-mono text-xs px-3 py-2 transition-colors"
          style={{
            color:
              activeCategory === "all" ? "var(--foreground)" : "var(--muted)",
            borderBottom:
              activeCategory === "all"
                ? "2px solid var(--accent)"
                : "2px solid transparent",
          }}
        >
          all
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className="font-mono text-xs px-3 py-2 transition-colors"
            style={{
              color:
                activeCategory === cat ? "var(--foreground)" : "var(--muted)",
              borderBottom:
                activeCategory === cat
                  ? `2px solid ${categoryColors[cat]}`
                  : "2px solid transparent",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── MOBILE ── */}
      <div
        className="md:hidden flex flex-col border"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="px-3 py-2 border-b font-mono text-xs"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted)",
            background: "var(--surface)",
          }}
        >
          INDEX
        </div>
        {filteredArticles.map((a) => (
          <Link
            key={a.id}
            href={`/writing/${a.slug}`}
            className="flex flex-col gap-1.5 px-4 py-4 border-b transition-colors"
            style={{
              borderColor: "var(--border)",
              borderLeft: "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderLeftColor =
                "var(--accent)";
              (e.currentTarget as HTMLElement).style.background =
                "var(--surface)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderLeftColor =
                "transparent";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="font-mono text-sm leading-snug"
                style={{ color: "var(--foreground)" }}
              >
                {a.title}
              </span>
              {a.category && (
                <span
                  className="font-mono text-[10px] shrink-0"
                  style={{
                    color: categoryColors[a.category as ArticleCategory],
                  }}
                >
                  {a.category}
                </span>
              )}
            </div>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
              {a.published_at && (
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "var(--muted)" }}
                >
                  {formatDate(a.published_at)}
                </span>
              )}
              {a.read_time && (
                <>
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: "var(--muted-dim)" }}
                  >
                    &middot;
                  </span>
                  <span
                    className="flex items-center gap-1 font-mono text-[11px]"
                    style={{ color: "var(--muted)" }}
                  >
                    <Clock size={10} /> {a.read_time} min
                  </span>
                </>
              )}
            </div>
            {a.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-0.5">
                {a.tags.slice(0, 3).map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* ── DESKTOP ── */}
      <div
        className="hidden md:flex gap-0 border"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Left - index */}
        <div
          className="w-64 shrink-0 flex flex-col border-r"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="px-3 py-2 border-b font-mono text-xs"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
              background: "var(--surface)",
            }}
          >
            INDEX
          </div>
          {filteredArticles.map((a) => {
            const isActive = a.id === safeSelected.id;
            return (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className="w-full text-left flex flex-col gap-0.5 px-3 py-3 transition-colors border-b"
                style={{
                  borderColor: "var(--border)",
                  background: isActive ? "var(--surface-hover)" : "transparent",
                  borderLeft: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                }}
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className="font-mono text-xs truncate flex-1"
                    style={{
                      color: isActive ? "var(--foreground)" : "var(--muted)",
                    }}
                  >
                    {a.title}
                  </span>
                  {a.category && (
                    <span
                      className="font-mono text-[10px] shrink-0"
                      style={{
                        color: categoryColors[a.category as ArticleCategory],
                      }}
                    >
                      {a.category}
                    </span>
                  )}
                </div>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--muted-dim)" }}
                >
                  {a.published_at ? formatDate(a.published_at) : "—"} &middot;{" "}
                  {a.read_time ?? "?"}m read
                </span>
              </button>
            );
          })}
        </div>

        {/* Right - preview panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeSelected.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="p-6 lg:p-8 flex flex-col"
              style={{ minHeight: "360px" }}
            >
              {/* Cover image */}
              {safeSelected.cover_image && (
                <div
                  className="relative w-full h-44 overflow-hidden border mb-5"
                  style={{ borderColor: "var(--border)" }}
                >
                  <SafeImage
                    src={safeSelected.cover_image}
                    alt={safeSelected.title}
                  />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {safeSelected.published_at && (
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {formatDate(safeSelected.published_at)}
                  </span>
                )}
                {safeSelected.read_time && (
                  <>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--muted-dim)" }}
                    >
                      &middot;
                    </span>
                    <span
                      className="flex items-center gap-1.5 font-mono text-xs"
                      style={{ color: "var(--muted)" }}
                    >
                      <Clock size={11} /> {safeSelected.read_time} min read
                    </span>
                  </>
                )}
                {safeSelected.category && (
                  <span
                    className="font-mono text-xs px-2 py-0.5 border"
                    style={{
                      borderColor:
                        categoryColors[
                          safeSelected.category as ArticleCategory
                        ],
                      color:
                        categoryColors[
                          safeSelected.category as ArticleCategory
                        ],
                    }}
                  >
                    {safeSelected.category}
                  </span>
                )}
              </div>
              <h2
                className="font-mono text-lg lg:text-xl font-semibold mb-4 leading-snug"
                style={{ color: "var(--foreground)" }}
              >
                {safeSelected.title}
              </h2>
              <div
                className="h-px mb-5"
                style={{ background: "var(--border)" }}
              />
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--muted)" }}
              >
                {safeSelected.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {safeSelected.tags.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-2">
                <Link
                  href={`/writing/${safeSelected.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs transition-all duration-150"
                  style={{
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--accent-fg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--accent)";
                  }}
                >
                  Read Article <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
