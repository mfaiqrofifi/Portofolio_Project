"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactLink } from "@/lib/types";
import {
  Github,
  Linkedin,
  Mail,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";

interface ContactLinkFormProps {
  link?: ContactLink;
  mode: "new" | "edit";
}

const ICON_OPTIONS = [
  { value: "github", label: "GitHub", Icon: Github },
  { value: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { value: "mail", label: "Email", Icon: Mail },
  { value: "link", label: "Link", Icon: LinkIcon },
];

export default function ContactLinkForm({ link, mode }: ContactLinkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [label, setLabel] = useState(link?.label ?? "");
  const [value, setValue] = useState(link?.value ?? "");
  const [href, setHref] = useState(link?.href ?? "");
  const [icon, setIcon] = useState(link?.icon ?? "link");
  const [displayOrder, setDisplayOrder] = useState(
    link?.display_order?.toString() ?? "0",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      label,
      value,
      href,
      icon,
      display_order: parseInt(displayOrder, 10),
    };

    try {
      const url =
        mode === "new"
          ? "/api/devFaiq/contact-links"
          : `/api/devFaiq/contact-links/${link!.id}`;
      const method = mode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");
      router.push("/devFaiq/contact-links");
      router.refresh();
    } catch (err) {
      const error = err as Error;
      setError(error.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  const selectedIconOption = ICON_OPTIONS.find((opt) => opt.value === icon);

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

      {/* Contact Link Details */}
      <div className="admin-card">
        <h3
          className="text-sm font-semibold mb-4 pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          Link Details
        </h3>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Label <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
              className="admin-input"
              placeholder="GitHub"
            />
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              The display name for this contact link
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Display Value <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="admin-input"
              placeholder="github.com/username"
            />
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              The text shown to users (e.g., username or email)
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              URL <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                required
                className="admin-input pr-10"
                placeholder="https://github.com/username"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--muted)" }}
              >
                <ExternalLink size={16} />
              </div>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Full URL including https://
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Icon
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setIcon(opt.value)}
                  className="p-3 border rounded-lg flex flex-col items-center gap-2 transition-all"
                  style={{
                    borderColor:
                      icon === opt.value ? "var(--accent)" : "var(--border)",
                    background:
                      icon === opt.value ? "var(--surface)" : "transparent",
                    borderWidth: icon === opt.value ? "2px" : "1px",
                  }}
                >
                  <opt.Icon
                    size={20}
                    style={{
                      color:
                        icon === opt.value ? "var(--accent)" : "var(--muted)",
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      color:
                        icon === opt.value ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              className="admin-input"
              placeholder="0"
            />
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Lower numbers appear first (0 = highest priority)
            </p>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      {label && value && (
        <div className="admin-card">
          <h3
            className="text-sm font-semibold mb-3 pb-2 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            Preview
          </h3>
          <div
            className="flex items-center gap-3 p-3 border rounded-lg"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            {selectedIconOption && (
              <selectedIconOption.Icon
                size={20}
                style={{ color: "var(--accent)" }}
              />
            )}
            <div className="flex-1">
              <div
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {label}
              </div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                {value}
              </div>
            </div>
            <ExternalLink size={14} style={{ color: "var(--muted)" }} />
          </div>
        </div>
      )}

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
          {loading
            ? "Saving..."
            : mode === "new"
              ? "Create Contact Link"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
