import { getProjectBySlug } from "@/lib/queries/projects";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Back */}
      <Link
        href="/projects"
        className="flex items-center gap-2 text-sm mb-8 opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: "var(--foreground)" }}
      >
        <ArrowLeft size={14} />
        Back to Projects
      </Link>

      {/* Hero image */}
      <div
        className="relative h-64 sm:h-80 mb-8 border-2 overflow-hidden"
        style={{
          borderColor: "var(--border)",
          boxShadow: "4px 4px 0px var(--pixel-border)",
        }}
      >
        <SafeImage
          src={project.thumbnail}
          alt={project.title}
          placeholderLabel={project.domain ?? "project"}
        />
      </div>

      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p
            className="font-pixel text-[10px] mb-2"
            style={{ color: "var(--accent)" }}
          >
            {project.domain}
          </p>
          <h1
            className="text-3xl sm:text-4xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            {project.title}
          </h1>
        </div>
        <span
          className={
            project.status === "completed"
              ? "status-completed"
              : "status-experimental"
          }
        >
          {project.status}
        </span>
      </div>

      {/* Summary */}
      <p
        className="text-lg mb-10"
        style={{ color: "var(--muted)", lineHeight: "1.8" }}
      >
        {project.summary}
      </p>

      {/* Problem / Solution */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div
          className="p-5 border-2"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "3px 3px 0px var(--pixel-border)",
          }}
        >
          <p
            className="font-pixel text-[9px] mb-3"
            style={{ color: "#f472b6" }}
          >
            ⚠ Problem
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--muted)", lineHeight: "1.7" }}
          >
            {project.problem}
          </p>
        </div>
        <div
          className="p-5 border-2"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "3px 3px 0px var(--pixel-border)",
          }}
        >
          <p
            className="font-pixel text-[9px] mb-3"
            style={{ color: "#34d399" }}
          >
            ✓ Solution
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--muted)", lineHeight: "1.7" }}
          >
            {project.solution}
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-10">
        <p
          className="font-pixel text-[10px] mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="tech-badge text-sm px-3 py-1.5">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      {project.screenshots.length > 0 && (
        <div className="mb-10">
          <p
            className="font-pixel text-[10px] mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Screenshots
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.screenshots.map((src, i) => (
              <div
                key={i}
                className="relative h-48 border-2 overflow-hidden"
                style={{
                  borderColor: "var(--border)",
                  boxShadow: "2px 2px 0px var(--pixel-border)",
                }}
              >
                <SafeImage
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  placeholderLabel="screenshot"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div
        className="flex flex-wrap gap-4 pt-6 border-t-2"
        style={{ borderColor: "var(--border)" }}
      >
        <a
          href={project.github_url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-pixel text-[9px] px-5 py-3 border-2 transition-all hover:-translate-y-0.5"
          style={{
            background: "var(--card)",
            borderColor: "var(--pixel-border)",
            color: "var(--foreground)",
            boxShadow: "3px 3px 0px var(--pixel-border)",
          }}
        >
          <Github size={13} />
          GitHub
        </a>
        {project.live_url && (
          <a
            href={project.live_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-pixel text-[9px] px-5 py-3 border-2 transition-all hover:-translate-y-0.5"
            style={{
              background: "var(--accent)",
              borderColor: "var(--pixel-border)",
              color: "var(--background)",
              boxShadow: "3px 3px 0px var(--pixel-border)",
            }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
