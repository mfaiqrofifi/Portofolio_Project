"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Home, HomeDomain } from "@/lib/types";
import {
  Trash2,
  Plus,
  MoveUp,
  MoveDown,
  Code,
  Briefcase,
  Sparkles,
  Server,
  Layout,
} from "lucide-react";

// Icon mapping for domains
const DOMAIN_ICONS: Record<string, any> = {
  backend: Server,
  fullstack: Layout,
  frontend: Code,
  ai: Sparkles,
  systems: Server,
  default: Briefcase,
};

function getDomainIcon(key: string) {
  const IconComponent = DOMAIN_ICONS[key.toLowerCase()] || DOMAIN_ICONS.default;
  return <IconComponent size={16} />;
}

export default function HomeForm({ home }: { home: Home }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tagline, setTagline] = useState(home.tagline);
  const [name, setName] = useState(home.name);
  const [title, setTitle] = useState(home.title);
  const [intro, setIntro] = useState(home.intro);
  const [domains, setDomains] = useState<HomeDomain[]>(home.domains);
  const [footerHint, setFooterHint] = useState(home.footer_hint ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/devFaiq/home/${home.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tagline,
          name,
          title,
          intro,
          domains,
          footer_hint: footerHint,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      alert("Home content updated!");
      router.refresh();
    } catch (error: any) {
      setError(error.message ?? "Unknown error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function addDomain() {
    setDomains([...domains, { key: "", label: "", desc: "" }]);
  }

  function removeDomain(index: number) {
    setDomains(domains.filter((_, i) => i !== index));
  }

  function updateDomain(index: number, field: keyof HomeDomain, value: string) {
    const updated = [...domains];
    updated[index] = { ...updated[index], [field]: value };
    setDomains(updated);
  }

  function moveDomain(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === domains.length - 1)
    )
      return;

    const updated = [...domains];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setDomains(updated);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="p-4 border-l-4 rounded"
          style={{
            borderColor: "#ef4444",
            background: "#fee2e2",
            color: "#991b1b",
          }}
        >
          <p className="text-sm font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Hero Section */}
      <div className="admin-card">
        <h3
          className="text-sm font-semibold mb-4 pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          Hero Content
        </h3>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Tagline <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
              className="admin-input"
              placeholder="~ /home/faiq"
            />
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Short status text shown at the top (e.g., "~ /home/faiq")
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--foreground)" }}
              >
                Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="admin-input"
                placeholder="Faiq Rofifi"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--foreground)" }}
              >
                Title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="admin-input"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Introduction <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              required
              className="admin-input"
              rows={4}
              placeholder="I build reliable systems..."
            />
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Brief introduction or tagline describing what you do
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Footer Hint
            </label>
            <input
              type="text"
              value={footerHint}
              onChange={(e) => setFooterHint(e.target.value)}
              className="admin-input"
              placeholder="open to backend, fullstack, and AI engineering roles"
            />
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Hint displayed at the bottom (optional)
            </p>
          </div>
        </div>
      </div>

      {/* Domains Section */}
      <div className="admin-card">
        <div
          className="flex items-center justify-between mb-4 pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-semibold">Domain Expertise</h3>
          <button
            type="button"
            onClick={addDomain}
            className="admin-btn-secondary text-xs flex items-center gap-1"
          >
            <Plus size={14} />
            Add Domain
          </button>
        </div>

        <div className="space-y-3">
          {domains.map((domain, i) => (
            <div
              key={i}
              className="p-4 border-l-4 rounded-lg"
              style={{
                borderColor: domain.key ? "var(--accent)" : "var(--border)",
                background: "var(--surface)",
                borderLeftWidth: "4px",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="p-1.5 rounded"
                    style={{
                      background: "var(--background)",
                      color: "var(--accent)",
                    }}
                  >
                    {getDomainIcon(domain.key)}
                  </span>
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    Domain #{i + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveDomain(i, "up")}
                    disabled={i === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    title="Move up"
                  >
                    <MoveUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDomain(i, "down")}
                    disabled={i === domains.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    title="Move down"
                  >
                    <MoveDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeDomain(i)}
                    className="p-1 hover:bg-red-50 rounded text-red-500"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    className="block text-xs font-medium mb-1"
                    style={{ color: "var(--muted)" }}
                  >
                    Key <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={domain.key}
                    onChange={(e) => updateDomain(i, "key", e.target.value)}
                    placeholder="backend, fullstack, systems, etc."
                    className="admin-input text-sm"
                    required
                  />
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    Lowercase identifier (affects icon display)
                  </p>
                </div>

                <div>
                  <label
                    className="block text-xs font-medium mb-1"
                    style={{ color: "var(--muted)" }}
                  >
                    Label <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={domain.label}
                    onChange={(e) => updateDomain(i, "label", e.target.value)}
                    placeholder="Backend Engineer, Fullstack Developer, etc."
                    className="admin-input text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-medium mb-1"
                    style={{ color: "var(--muted)" }}
                  >
                    Description <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    value={domain.desc}
                    onChange={(e) => updateDomain(i, "desc", e.target.value)}
                    placeholder="Describe this expertise area..."
                    className="admin-input text-sm"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          {domains.length === 0 && (
            <p
              className="text-sm text-center py-4"
              style={{ color: "var(--muted)" }}
            >
              No domains yet. Click "Add Domain" to create one.
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div
        className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          type="submit"
          disabled={loading}
          className="admin-btn-primary w-full"
        >
          {loading ? "Saving..." : "Save Home Content"}
        </button>
      </div>
    </form>
  );
}
