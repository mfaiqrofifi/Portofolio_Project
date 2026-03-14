"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Entity = "projects" | "articles" | "activities" | "contact-links";

export default function AdminDeleteButton({
  id,
  entity,
  onDeleted,
}: {
  id: string;
  entity: Entity;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/devFaiq/${entity}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      if (onDeleted) {
        onDeleted();
      } else {
        router.refresh();
      }
    } catch {
      alert("Failed to delete");
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  }

  if (confirm) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[10px]">
        <span style={{ color: "#f87171" }}>confirm?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-2 py-0.5 border"
          style={{ borderColor: "#f87171", color: "#f87171" }}
        >
          {loading ? "..." : "yes"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="px-2 py-0.5 border"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          no
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="font-mono text-[10px] px-2 py-0.5 border"
      style={{ borderColor: "#f87171", color: "#f87171" }}
    >
      delete
    </button>
  );
}
