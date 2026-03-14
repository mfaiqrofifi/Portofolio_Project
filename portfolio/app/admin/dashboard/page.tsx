import { getAllProjects } from "@/lib/queries/projects";
import { getAllArticles } from "@/lib/queries/articles";
import { getAllActivities } from "@/lib/queries/activities";
import Link from "next/link";
import { ArrowLeft, Folder, FileText, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, articles, activities] = await Promise.all([
    getAllProjects(),
    getAllArticles(),
    getAllActivities(),
  ]);

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      icon: Folder,
      color: "#00f5ff",
    },
    {
      label: "Articles",
      value: articles.length,
      icon: FileText,
      color: "#a78bfa",
    },
    {
      label: "Activities",
      value: activities.length,
      icon: Activity,
      color: "#34d399",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p
            className="font-pixel text-[10px] mb-2"
            style={{ color: "var(--accent)" }}
          >
            &gt; /admin/dashboard
          </p>
          <h1
            className="text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            Admin Dashboard
          </h1>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "var(--foreground)" }}
        >
          <ArrowLeft size={14} />
          Back to Site
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="p-6 border-2"
            style={{
              background: "var(--card)",
              borderColor: color,
              boxShadow: `3px 3px 0px ${color}`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Icon size={18} style={{ color }} />
              <p className="font-pixel text-[9px]" style={{ color }}>
                {label}
              </p>
            </div>
            <p
              className="text-4xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Notice */}
      <div
        className="p-6 border-2"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          boxShadow: "3px 3px 0px var(--pixel-border)",
        }}
      >
        <p className="font-pixel text-[10px] mb-3" style={{ color: "#fbbf24" }}>
          ⚠ Notice
        </p>
        <p
          className="text-sm"
          style={{ color: "var(--muted)", lineHeight: "1.7" }}
        >
          This is a read-only admin panel. Create/edit/delete functionality is
          not yet implemented. All data is served live from the Neon PostgreSQL
          database.
        </p>
      </div>
    </div>
  );
}
