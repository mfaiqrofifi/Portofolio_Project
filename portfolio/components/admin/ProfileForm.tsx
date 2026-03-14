"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Profile, TechStackGroup } from "@/lib/types";
import { Trash2, Plus, MoveUp, MoveDown } from "lucide-react";

interface ProfileFormProps {
  profile: Profile;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [location, setLocation] = useState(profile.location ?? "");
  const [status, setStatus] = useState(profile.status ?? "");
  const [focus, setFocus] = useState(profile.focus ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [photoUrl, setPhotoUrl] = useState(profile.photo_url ?? "");

  const [techStack, setTechStack] = useState<TechStackGroup[]>(
    profile.tech_stack,
  );
  const [strengths, setStrengths] = useState<string[]>(profile.strengths);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/devFaiq/profile/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          location,
          status,
          focus,
          bio,
          photo_url: photoUrl,
          tech_stack: techStack,
          strengths,
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      router.refresh();
      alert("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function addTechStackGroup() {
    setTechStack([...techStack, { group: "", items: [] }]);
  }

  function updateTechStackGroup(index: number, group: string) {
    const updated = [...techStack];
    updated[index].group = group;
    setTechStack(updated);
  }

  function updateTechStackItems(index: number, items: string) {
    const updated = [...techStack];
    updated[index].items = items
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setTechStack(updated);
  }

  function removeTechStackGroup(index: number) {
    setTechStack(techStack.filter((_, i) => i !== index));
  }

  function moveTechStackGroup(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === techStack.length - 1)
    )
      return;

    const updated = [...techStack];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setTechStack(updated);
  }

  function addStrength() {
    setStrengths([...strengths, ""]);
  }

  function updateStrength(index: number, value: string) {
    const updated = [...strengths];
    updated[index] = value;
    setStrengths(updated);
  }

  function removeStrength(index: number) {
    setStrengths(strengths.filter((_, i) => i !== index));
  }

  function moveStrength(index: number, direction: "up" | "down") {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === strengths.length - 1)
    )
      return;

    const updated = [...strengths];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setStrengths(updated);
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

      {/* Basic Info Section */}
      <div className="admin-card">
        <h3
          className="text-sm font-semibold mb-4 pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          Basic Information
        </h3>

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
              Role <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="admin-input"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="admin-input"
              placeholder="Indonesia"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--foreground)" }}
            >
              Status
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="admin-input"
              placeholder="open to opportunities"
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--foreground)" }}
          >
            Focus
          </label>
          <input
            type="text"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            className="admin-input"
            placeholder="systems · fullstack · AI"
          />
        </div>

        <div className="mt-4">
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--foreground)" }}
          >
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="admin-input"
            rows={3}
            placeholder="Available for backend engineering roles..."
          />
        </div>

        <div className="mt-4">
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--foreground)" }}
          >
            Photo URL
          </label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="admin-input"
            placeholder="https://example.com/photo.jpg"
          />
          {photoUrl && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                Preview:
              </span>
              <img
                src={photoUrl}
                alt="Preview"
                className="w-12 h-12 object-cover rounded border"
                style={{ borderColor: "var(--border)" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="admin-card">
        <div
          className="flex items-center justify-between mb-4 pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-semibold">Tech Stack</h3>
          <button
            type="button"
            onClick={addTechStackGroup}
            className="admin-btn-secondary text-xs flex items-center gap-1"
          >
            <Plus size={14} />
            Add Group
          </button>
        </div>

        <div className="space-y-3">
          {techStack.map((group, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  Group #{i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveTechStackGroup(i, "up")}
                    disabled={i === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    title="Move up"
                  >
                    <MoveUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTechStackGroup(i, "down")}
                    disabled={i === techStack.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                    title="Move down"
                  >
                    <MoveDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTechStackGroup(i)}
                    className="p-1 hover:bg-red-50 rounded text-red-500"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={group.group}
                  onChange={(e) => updateTechStackGroup(i, e.target.value)}
                  placeholder="Group name (e.g. Languages, Databases)"
                  className="admin-input text-sm"
                />
                <textarea
                  value={group.items.join(", ")}
                  onChange={(e) => updateTechStackItems(i, e.target.value)}
                  placeholder="Items (comma-separated): Go, Rust, Python, TypeScript"
                  className="admin-input text-sm"
                  rows={2}
                />
              </div>
            </div>
          ))}

          {techStack.length === 0 && (
            <p
              className="text-sm text-center py-4"
              style={{ color: "var(--muted)" }}
            >
              No tech stack groups yet. Click "Add Group" to create one.
            </p>
          )}
        </div>
      </div>

      {/* Strengths Section */}
      <div className="admin-card">
        <div
          className="flex items-center justify-between mb-4 pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-semibold">Core Strengths</h3>
          <button
            type="button"
            onClick={addStrength}
            className="admin-btn-secondary text-xs flex items-center gap-1"
          >
            <Plus size={14} />
            Add Strength
          </button>
        </div>

        <div className="space-y-2">
          {strengths.map((strength, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span
                  className="text-xs font-mono shrink-0 w-6"
                  style={{ color: "var(--muted)" }}
                >
                  {i + 1}.
                </span>
                <textarea
                  value={strength}
                  onChange={(e) => updateStrength(i, e.target.value)}
                  className="admin-input flex-1 text-sm"
                  placeholder="Describe a core strength or capability..."
                  rows={2}
                />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => moveStrength(i, "up")}
                  disabled={i === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Move up"
                >
                  <MoveUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveStrength(i, "down")}
                  disabled={i === strengths.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Move down"
                >
                  <MoveDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeStrength(i)}
                  className="p-1 hover:bg-red-50 rounded text-red-500"
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {strengths.length === 0 && (
            <p
              className="text-sm text-center py-4"
              style={{ color: "var(--muted)" }}
            >
              No strengths yet. Click "Add Strength" to create one.
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
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
