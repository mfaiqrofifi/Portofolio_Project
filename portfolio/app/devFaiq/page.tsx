import Link from "next/link";
import { getAllProjects } from "@/lib/queries/projects";
import { getAllArticles } from "@/lib/queries/articles";
import { getAllActivities } from "@/lib/queries/activities";
import DashboardStats from "@/components/admin/DashboardStats";

export const dynamic = "force-dynamic";

export default async function StudioDashboard() {
  const [projects, articles, activities] = await Promise.all([
    getAllProjects(),
    getAllArticles(),
    getAllActivities(),
  ]);

  const stats = [
    {
      label: "projects",
      count: projects.length,
      href: "/devFaiq/projects",
      newHref: "/devFaiq/projects/new",
      color: "var(--accent)",
    },
    {
      label: "articles",
      count: articles.length,
      href: "/devFaiq/articles",
      newHref: "/devFaiq/articles/new",
      color: "#a78bfa",
    },
    {
      label: "activities",
      count: activities.length,
      href: "/devFaiq/activities",
      newHref: "/devFaiq/activities/new",
      color: "#34d399",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/studio
        </p>
        <h1
          className="font-mono text-xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Dashboard
        </h1>
      </div>

      {/* Stats — client component handles hover handlers */}
      <DashboardStats stats={stats} />

      {/* Recent entries */}
      <div className="border" style={{ borderColor: "var(--border)" }}>
        <div
          className="px-4 py-2 border-b font-mono text-xs"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted)",
            background: "var(--surface)",
          }}
        >
          recent projects
        </div>
        {projects.slice(0, 4).map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between px-4 py-3 border-b last:border-0"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <p
                className="font-mono text-sm"
                style={{ color: "var(--foreground)" }}
              >
                {p.title}
              </p>
              <p
                className="font-mono text-[10px]"
                style={{ color: "var(--muted)" }}
              >
                {p.domain ?? "—"} · {p.status ?? "—"}
              </p>
            </div>
            <Link
              href={`/devFaiq/projects/${p.id}/edit`}
              className="font-mono text-[10px] px-2 py-1 border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
