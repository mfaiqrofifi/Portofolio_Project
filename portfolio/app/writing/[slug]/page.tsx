import { getArticleBySlug, getRelatedArticles } from "@/lib/queries/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { ArrowLeft, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.id, article.tags);

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
      {/* Back */}
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 font-mono text-xs mb-10 transition-opacity opacity-60 hover:opacity-100"
        style={{ color: "var(--foreground)" }}
      >
        <ArrowLeft size={12} />
        /writing
      </Link>

      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs mb-2" style={{ color: "var(--muted)" }}>
          ~/writing/{article.slug}
        </p>

        <h1
          className="font-mono text-xl md:text-3xl font-semibold leading-snug mb-5 break-words"
          style={{ color: "var(--foreground)" }}
        >
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-5">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {formatDate(article.published_at ?? "")}
          </span>
          <span
            className="flex items-center gap-1.5 font-mono text-xs"
            style={{ color: "var(--muted)" }}
          >
            <Clock size={11} />
            {article.read_time} min read
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((t) => (
            <span key={t} className="tag-chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Cover image — only rendered when a URL exists */}
      {article.cover_image && (
        <div
          className="relative w-full h-52 sm:h-72 mb-8 border-2 overflow-hidden"
          style={{
            borderColor: "var(--border)",
            boxShadow: "3px 3px 0px var(--pixel-border)",
          }}
        >
          <SafeImage
            src={article.cover_image}
            alt={article.title}
            style={{ filter: "brightness(0.88) saturate(0.9)" }}
          />
        </div>
      )}

      <div className="h-px mb-10" style={{ background: "var(--border)" }} />

      {/* Article content */}
      <article className="space-y-0">
        {(article.content ?? "")
          .trim()
          .split("\n")
          .map((line, i) => {
            if (line.startsWith("# ")) {
              return (
                <h2
                  key={i}
                  className="font-mono text-xl font-semibold mt-10 mb-4"
                  style={{ color: "var(--foreground)" }}
                >
                  {line.slice(2)}
                </h2>
              );
            }
            if (line.startsWith("## ")) {
              return (
                <h3
                  key={i}
                  className="font-mono text-base font-semibold mt-8 mb-3"
                  style={{ color: "var(--foreground)" }}
                >
                  {line.slice(3)}
                </h3>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h4
                  key={i}
                  className="font-mono text-sm font-semibold mt-6 mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {line.slice(4)}
                </h4>
              );
            }
            if (line.startsWith("```")) {
              return null;
            }
            if (line.startsWith("> ")) {
              return (
                <blockquote
                  key={i}
                  className="my-4 pl-4 text-sm italic"
                  style={{
                    borderLeft: "2px solid var(--accent)",
                    color: "var(--muted)",
                  }}
                >
                  {line.slice(2)}
                </blockquote>
              );
            }
            if (line.startsWith("- ") || line.startsWith("* ")) {
              return (
                <div key={i} className="flex items-start gap-2 my-1">
                  <span
                    className="font-mono text-xs mt-1 shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    —
                  </span>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "var(--muted)" }}
                  >
                    {line.slice(2)}
                  </p>
                </div>
              );
            }
            if (line.match(/^\s{2,}/) && line.trim().length > 0) {
              return (
                <pre
                  key={i}
                  className="font-mono text-xs px-4 py-1 my-0.5 overflow-x-auto"
                  style={{
                    background: "var(--surface)",
                    color: "var(--foreground)",
                    borderLeft: "2px solid var(--border-strong)",
                  }}
                >
                  {line}
                </pre>
              );
            }
            if (line === "") {
              return <div key={i} className="h-4" />;
            }
            return (
              <p
                key={i}
                className="text-sm leading-7"
                style={{ color: "var(--muted)" }}
              >
                {line}
              </p>
            );
          })}
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <div
          className="mt-14 pt-10"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--muted)" }}
            >
              related
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--border)" }}
            />
          </div>
          <div className="flex flex-col gap-0">
            {related.map((a) => (
              <Link
                key={a.id}
                href={`/writing/${a.slug}`}
                className="group flex items-start justify-between gap-4 py-3 border-b transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p
                    className="font-mono text-sm mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    {a.title}
                  </p>
                  <p
                    className="font-mono text-[10px]"
                    style={{ color: "var(--muted-dim)" }}
                  >
                    {formatDate(a.published_at ?? "")} &middot; {a.read_time}m
                    read
                  </p>
                </div>
                <span
                  className="font-mono text-xs opacity-0 group-hover:opacity-60 transition-opacity mt-1 shrink-0"
                  style={{ color: "var(--accent)" }}
                >
                  &gt;
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
