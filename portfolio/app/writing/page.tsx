"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articles, Article, ArticleCategory } from "@/lib/dummy-articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

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

export default function WritingPage() {
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 py-8 md:py-16">
      {/* Page header */}
      <div className="mb-5 md:mb-6">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/writing
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-base md:text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Writing
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {filteredArticles.length} notes
          </span>
        </div>
      </div>

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

      {/* ── MOBILE: single-column archive list (visible below md) ── */}
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
              <span
                className="font-mono text-[10px] shrink-0"
                style={{ color: categoryColors[a.category] }}
              >
                {a.category}
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
              <span
                className="font-mono text-[11px]"
                style={{ color: "var(--muted)" }}
              >
                {formatDate(a.publishedAt)}
              </span>
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
                <Clock size={10} />
                {a.readTime} min
              </span>
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

      {/* ── DESKTOP: split panel (visible at md+) ── */}
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
            const isActive = a.id === selected.id;
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
                  <span
                    className="font-mono text-[10px] shrink-0"
                    style={{ color: categoryColors[a.category] }}
                  >
                    {a.category}
                  </span>
                </div>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--muted-dim)" }}
                >
                  {formatDate(a.publishedAt)} &middot; {a.readTime}m read
                </span>
              </button>
            );
          })}
        </div>

        {/* Right - preview panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="p-6 lg:p-8 flex flex-col"
              style={{ minHeight: "360px" }}
            >
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {formatDate(selected.publishedAt)}
                </span>
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
                  <Clock size={11} />
                  {selected.readTime} min read
                </span>
                <span
                  className="font-mono text-xs px-2 py-0.5 border"
                  style={{
                    borderColor: categoryColors[selected.category],
                    color: categoryColors[selected.category],
                  }}
                >
                  {selected.category}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-mono text-lg lg:text-xl font-semibold mb-4 leading-snug"
                style={{ color: "var(--foreground)" }}
              >
                {selected.title}
              </h2>

              <div
                className="h-px mb-5"
                style={{ background: "var(--border)" }}
              />

              {/* Summary / excerpt */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--muted)" }}
              >
                {selected.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {selected.tags.map((t) => (
                  <span key={t} className="tag-chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* Read action */}
              <div className="mt-auto pt-2">
                <Link
                  href={`/writing/${selected.slug}`}
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
                  Read Article
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
