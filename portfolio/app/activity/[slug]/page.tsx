import { getActivityBySlug } from "@/lib/queries/activities";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

const tagColors: Record<string, { bg: string; text: string; border: string }> =
  {
    Learning: {
      bg: "rgba(99,102,241,0.15)",
      text: "#818cf8",
      border: "#818cf8",
    },
    "Project Update": {
      bg: "rgba(16,185,129,0.15)",
      text: "#34d399",
      border: "#34d399",
    },
    Event: { bg: "rgba(245,158,11,0.15)", text: "#fbbf24", border: "#fbbf24" },
  };

export default async function ActivityDetailPage({ params }: Props) {
  const item = await getActivityBySlug(params.slug);
  if (!item) notFound();

  const colors = tagColors[item.tag ?? "Learning"] ?? tagColors["Learning"];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/activity"
        className="flex items-center gap-2 text-sm mb-8 opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: "var(--foreground)" }}
      >
        <ArrowLeft size={14} />
        Back to Activity
      </Link>

      {/* Hero image — only rendered when a URL exists */}
      {item.image && (
        <div
          className="relative h-64 sm:h-80 mb-8 border-2 overflow-hidden"
          style={{
            borderColor: "var(--border)",
            boxShadow: "4px 4px 0px var(--pixel-border)",
          }}
        >
          <SafeImage src={item.image} alt={item.title} />
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[9px] font-pixel px-2 py-1 border"
          style={{
            background: colors.bg,
            color: colors.text,
            borderColor: colors.border,
          }}
        >
          {item.tag}
        </span>
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          {formatDate(item.date ?? "")}
        </span>
      </div>

      <h1
        className="text-3xl sm:text-4xl font-black mb-4"
        style={{ color: "var(--foreground)" }}
      >
        {item.title}
      </h1>

      <p
        className="text-lg mb-8 font-medium"
        style={{ color: "var(--accent)", lineHeight: "1.7" }}
      >
        {item.caption}
      </p>

      <div
        className="text-base border-t-2 pt-8"
        style={{
          color: "var(--muted)",
          lineHeight: "1.9",
          borderColor: "var(--border)",
        }}
      >
        {item.description}
      </div>

      {item.links && item.links.length > 0 && (
        <div className="mt-10">
          <p
            className="font-pixel text-[9px] mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Links
          </p>
          <div className="flex flex-wrap gap-3">
            {item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-pixel text-[9px] px-4 py-2 border-2"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--pixel-border)",
                  color: "var(--accent)",
                  boxShadow: "2px 2px 0px var(--pixel-border)",
                }}
              >
                <ExternalLink size={11} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
