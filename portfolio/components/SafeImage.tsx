"use client";

import { useState } from "react";

interface SafeImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  /** Applied only to the <img> element (e.g. filter, transform). Not applied to placeholder/error states. */
  style?: React.CSSProperties;
  placeholderLabel?: string;
}

/** Fills its position:relative parent absolutely — same layout model as <Image fill>. */
export default function SafeImage({
  src,
  alt,
  className = "",
  style = {},
  placeholderLabel,
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  const fillBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  };

  // Case 1: no URL at all → placeholder
  if (!src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 ${className}`}
        style={{ ...fillBase, background: "var(--surface)" }}
      >
        <span
          className="font-mono text-xs opacity-30"
          style={{ color: "var(--muted)" }}
        >
          {placeholderLabel ?? "no image available"}
        </span>
      </div>
    );
  }

  // Case 2: URL provided but failed to load → fallback link
  if (errored) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 ${className}`}
        style={{ ...fillBase, background: "var(--surface)" }}
      >
        <span
          className="font-mono text-[10px] opacity-40"
          style={{ color: "var(--muted)" }}
        >
          failed to load
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] underline"
          style={{ color: "var(--accent)" }}
        >
          view image ↗
        </a>
      </div>
    );
  }

  // Case 3: valid URL — render with onError fallback
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
      style={{ ...fillBase, objectFit: "cover", display: "block", ...style }}
    />
  );
}
