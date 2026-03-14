"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/types";

type FormData = {
  title: string;
  short_description: string;
  summary: string;
  problem: string;
  solution: string;
  tech_stack: string; // comma-separated
  domain: string;
  status: string;
  thumbnail: string;
  screenshots: string; // comma-separated
  github_url: string;
  live_url: string;
  featured: boolean;
};

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<FormData>({
    title: project?.title ?? "",
    short_description: project?.short_description ?? "",
    summary: project?.summary ?? "",
    problem: project?.problem ?? "",
    solution: project?.solution ?? "",
    tech_stack: project?.tech_stack?.join(", ") ?? "",
    domain: project?.domain ?? "",
    status: project?.status ?? "experimental",
    thumbnail: project?.thumbnail ?? "",
    screenshots: project?.screenshots?.join(", ") ?? "",
    github_url: project?.github_url ?? "",
    live_url: project?.live_url ?? "",
    featured: project?.featured ?? false,
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
        short_description: form.short_description || undefined,
        summary: form.summary || undefined,
        problem: form.problem || undefined,
        solution: form.solution || undefined,
        tech_stack: form.tech_stack
          ? form.tech_stack
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        domain: form.domain || undefined,
        status: form.status || undefined,
        thumbnail: form.thumbnail || undefined,
        screenshots: form.screenshots
          ? form.screenshots
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        github_url: form.github_url || undefined,
        live_url: form.live_url || undefined,
        featured: form.featured,
      };

      const url = project
        ? `/api/devFaiq/projects/${project.id}`
        : `/api/devFaiq/projects`;
      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed");

      setSuccess(true);
      setTimeout(() => router.push("/devFaiq/projects"), 800);
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
      {/* Title */}
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

      {/* Short description */}
      <div>
        <label className={labelCls} style={labelStyle}>
          short description
        </label>
        <input
          className={inputCls}
          style={inputStyle}
          value={form.short_description}
          onChange={(e) => set("short_description", e.target.value)}
        />
      </div>

      {/* Summary */}
      <div>
        <label className={labelCls} style={labelStyle}>
          summary
        </label>
        <textarea
          rows={3}
          className={inputCls}
          style={inputStyle}
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
        />
      </div>

      {/* Problem / Solution */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={labelStyle}>
            problem
          </label>
          <textarea
            rows={3}
            className={inputCls}
            style={inputStyle}
            value={form.problem}
            onChange={(e) => set("problem", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>
            solution
          </label>
          <textarea
            rows={3}
            className={inputCls}
            style={inputStyle}
            value={form.solution}
            onChange={(e) => set("solution", e.target.value)}
          />
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <label className={labelCls} style={labelStyle}>
          tech stack (comma-separated)
        </label>
        <input
          className={inputCls}
          style={inputStyle}
          placeholder="Go, PostgreSQL, Docker"
          value={form.tech_stack}
          onChange={(e) => set("tech_stack", e.target.value)}
        />
      </div>

      {/* Domain + Status */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={labelStyle}>
            domain
          </label>
          <select
            className={inputCls}
            style={inputStyle}
            value={form.domain}
            onChange={(e) => set("domain", e.target.value)}
          >
            <option value="">— select —</option>
            <option value="systems">systems</option>
            <option value="products">products</option>
            <option value="ai">ai</option>
            <option value="infrastructure">infrastructure</option>
          </select>
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>
            status
          </label>
          <select
            className={inputCls}
            style={inputStyle}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="experimental">experimental</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>

      {/* Thumbnail */}
      <div>
        <label className={labelCls} style={labelStyle}>
          thumbnail url
        </label>
        <input
          className={inputCls}
          style={inputStyle}
          type="url"
          value={form.thumbnail}
          onChange={(e) => set("thumbnail", e.target.value)}
        />
      </div>

      {/* Screenshots */}
      <div>
        <label className={labelCls} style={labelStyle}>
          screenshots (comma-separated urls)
        </label>
        <input
          className={inputCls}
          style={inputStyle}
          value={form.screenshots}
          onChange={(e) => set("screenshots", e.target.value)}
        />
      </div>

      {/* GitHub + Live URL */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={labelStyle}>
            github url
          </label>
          <input
            className={inputCls}
            style={inputStyle}
            type="url"
            value={form.github_url}
            onChange={(e) => set("github_url", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>
            live url
          </label>
          <input
            className={inputCls}
            style={inputStyle}
            type="url"
            value={form.live_url}
            onChange={(e) => set("live_url", e.target.value)}
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="w-3.5 h-3.5 accent-current"
          style={{ accentColor: "var(--accent)" }}
        />
        <label
          htmlFor="featured"
          className="font-mono text-xs"
          style={{ color: "var(--muted)" }}
        >
          featured project
        </label>
      </div>

      {/* Error */}
      {error && (
        <p className="font-mono text-xs" style={{ color: "#f87171" }}>
          ✕ {error}
        </p>
      )}

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading || success}
          className="font-mono text-xs px-5 py-2.5 border transition-all"
          style={{
            borderColor: success ? "#34d399" : "var(--accent)",
            color: success ? "#34d399" : "var(--accent)",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {success
            ? "✓ saved"
            : loading
              ? "saving..."
              : project
                ? "update project"
                : "create project"}
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
