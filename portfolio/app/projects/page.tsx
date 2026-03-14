import { getAllProjects } from "@/lib/queries/projects";
import ProjectsView from "@/components/ProjectsView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-5 py-8 md:py-16">
      {/* Page header */}
      <div className="mb-6">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/projects
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Projects
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {projects.length} items
          </span>
        </div>
      </div>
      <ProjectsView projects={projects} />
    </div>
  );
}
