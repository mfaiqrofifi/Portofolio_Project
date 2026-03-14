import { getAllArticles } from "@/lib/queries/articles";
import WritingView from "@/components/WritingView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WritingPage() {
  const articles = await getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 py-8 md:py-16">
      {/* Page header */}
      <div className="mb-5 md:mb-6">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/writing
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-base md:text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Writing
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {articles.length} notes
          </span>
        </div>
      </div>
      <WritingView articles={articles} />
    </div>
  );
}
