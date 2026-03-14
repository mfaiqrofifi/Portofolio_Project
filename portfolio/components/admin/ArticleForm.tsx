"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Article } from "@/lib/types";

type FormData = {
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  read_time: string;
  tags: string;
  category: string;
  published_at: string;
  featured: boolean;
};

export default function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<FormData>({
    title: article?.title ?? "",
    excerpt: article?.excerpt ?? "",
    content: article?.content ?? "",
    cover_image: article?.cover_image ?? "",
    read_time: article?.read_time?.toString() ?? "",
    tags: article?.tags?.join(", ") ?? "",
    category: article?.category ?? "",
    published_at: article?.published_at
      ? new Date(article.published_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    featured: article?.featured ?? false,
  });

  function set(field: keyof FormData, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt || undefined,
        content: form.content || undefined,
        cover_image: form.cover_image || undefined,
        read_time: form.read_time ? parseInt(form.read_time) : undefined,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        category: form.category || undefined,
        published_at: form.published_at || undefined,
        featured: form.featured,
      };

      const url = article
        ? `/api/devFaiq/articles/${article.id}`
        : `/api/devFaiq/articles`;
      const res = await fetch(url, {
        method: article ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed");

      setSuccess(true);
      setTimeout(() => router.push("/devFaiq/articles"), 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full font-mono text-xs px-3 py-2 border bg-transparent focus:outline-none";
  const inputStyle = {
    borderColor: "var(--border)",
    color: "var(--foreground)",
    background: "var(--background)",
  };
  const labelCls = "font-mono text-[10px] mb-1 block";
  const labelStyle = { color: "var(--muted)" };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div>
        <label className={labelCls} style={labelStyle}>
          title *
        </label>
        <input
          required
          className={inputCls}
          style={inputStyle}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          excerpt
        </label>
        <textarea
          rows={2}
          className={inputCls}
          style={inputStyle}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          content (markdown)
        </label>
        <textarea
          rows={14}
          className={`${inputCls} font-mono`}
          style={{ ...inputStyle, resize: "vertical" }}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={labelStyle}>
            cover image url
          </label>
          <input
            className={inputCls}
            style={inputStyle}
            type="url"
            value={form.cover_image}
            onChange={(e) => set("cover_image", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>
            read time (minutes)
          </label>
          <input
            className={inputCls}
            style={inputStyle}
            type="number"
            min="1"
            value={form.read_time}
            onChange={(e) => set("read_time", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          tags (comma-separated)
        </label>
        <input
          className={inputCls}
          style={inputStyle}
          placeholder="go, backend, performance"
          value={form.tags}
          onChange={(e) => set("tags", e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={labelStyle}>
            category
          </label>
          <select
            className={inputCls}
            style={inputStyle}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="">— select —</option>
            <option value="systems">systems</option>
            <option value="ai">ai</option>
            <option value="devops">devops</option>
            <option value="products">products</option>
          </select>
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>
            published at
          </label>
          <input
            className={inputCls}
            style={inputStyle}
            type="date"
            value={form.published_at}
            onChange={(e) => set("published_at", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured-article"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          style={{ accentColor: "var(--accent)" }}
        />
        <label
          htmlFor="featured-article"
          className="font-mono text-xs"
          style={{ color: "var(--muted)" }}
        >
          featured article
        </label>
      </div>

      {error && (
        <p className="font-mono text-xs" style={{ color: "#f87171" }}>
          ✕ {error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading || success}
          className="font-mono text-xs px-5 py-2.5 border transition-all"
          style={{
            borderColor: success ? "#34d399" : "#a78bfa",
            color: success ? "#34d399" : "#a78bfa",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {success
            ? "✓ saved"
            : loading
              ? "saving..."
              : article
                ? "update article"
                : "create article"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="font-mono text-xs px-4 py-2.5 border"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          cancel
        </button>
      </div>
    </form>
  );
}
