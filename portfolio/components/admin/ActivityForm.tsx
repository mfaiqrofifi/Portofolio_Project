"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ActivityWithLinks } from "@/lib/types";

type LinkPair = { label: string; url: string };

type FormData = {
  title: string;
  caption: string;
  description: string;
  image: string;
  date: string;
  tag: string;
};

export default function ActivityForm({
  activity,
}: {
  activity?: ActivityWithLinks;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<FormData>({
    title: activity?.title ?? "",
    caption: activity?.caption ?? "",
    description: activity?.description ?? "",
    image: activity?.image ?? "",
    date: activity?.date
      ? new Date(activity.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    tag: activity?.tag ?? "Learning",
  });

  const [links, setLinks] = useState<LinkPair[]>(
    activity?.links?.length
      ? activity.links.map((l) => ({ label: l.label, url: l.url }))
      : [],
  );

  function setField(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function setLink(index: number, key: keyof LinkPair, value: string) {
    setLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [key]: value } : l)),
    );
  }

  function addLink() {
    setLinks((prev) => [...prev, { label: "", url: "" }]);
  }

  function removeLink(index: number) {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        title: form.title,
        caption: form.caption || undefined,
        description: form.description || undefined,
        image: form.image || undefined,
        date: form.date || undefined,
        tag: form.tag,
        links: links.filter((l) => l.url),
      };

      const url = activity
        ? `/api/devFaiq/activities/${activity.id}`
        : `/api/devFaiq/activities`;
      const res = await fetch(url, {
        method: activity ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed");

      setSuccess(true);
      setTimeout(() => router.push("/devFaiq/activities"), 800);
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
          onChange={(e) => setField("title", e.target.value)}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          caption
        </label>
        <input
          className={inputCls}
          style={inputStyle}
          value={form.caption}
          onChange={(e) => setField("caption", e.target.value)}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          description
        </label>
        <textarea
          rows={4}
          className={inputCls}
          style={{ ...inputStyle, resize: "vertical" }}
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </div>

      <div>
        <label className={labelCls} style={labelStyle}>
          image url
        </label>
        <input
          className={inputCls}
          style={inputStyle}
          type="url"
          value={form.image}
          onChange={(e) => setField("image", e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={labelStyle}>
            date
          </label>
          <input
            className={inputCls}
            style={inputStyle}
            type="date"
            value={form.date}
            onChange={(e) => setField("date", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>
            tag
          </label>
          <select
            className={inputCls}
            style={inputStyle}
            value={form.tag}
            onChange={(e) => setField("tag", e.target.value)}
          >
            <option value="Learning">Learning</option>
            <option value="Project Update">Project Update</option>
            <option value="Event">Event</option>
          </select>
        </div>
      </div>

      {/* Dynamic links */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            className={labelCls}
            style={{ ...labelStyle, marginBottom: 0 }}
          >
            links
          </label>
          <button
            type="button"
            onClick={addLink}
            className="font-mono text-[10px] px-3 py-1 border"
            style={{ borderColor: "#a78bfa", color: "#a78bfa" }}
          >
            + add link
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {links.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={inputCls}
                style={{ ...inputStyle, flex: "0 0 40%" }}
                placeholder="label"
                value={link.label}
                onChange={(e) => setLink(i, "label", e.target.value)}
              />
              <input
                className={inputCls}
                style={{ ...inputStyle, flex: 1 }}
                placeholder="https://..."
                type="url"
                value={link.url}
                onChange={(e) => setLink(i, "url", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeLink(i)}
                className="font-mono text-xs px-2 py-2"
                style={{ color: "#f87171", flexShrink: 0 }}
              >
                ✕
              </button>
            </div>
          ))}
          {links.length === 0 && (
            <p
              className="font-mono text-[10px]"
              style={{ color: "var(--muted)" }}
            >
              no links added
            </p>
          )}
        </div>
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
              : activity
                ? "update activity"
                : "create activity"}
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
