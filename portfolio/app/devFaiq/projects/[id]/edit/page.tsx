import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/queries/projects";
import ProjectForm from "@/components/admin/ProjectForm";

interface Props {
  params: { id: string };
}

export default async function EditProjectPage({ params }: Props) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  return (
    <div>
      <h1
        className="font-mono text-sm mb-6"
        style={{ color: "var(--foreground)" }}
      >
        edit project
      </h1>
      <ProjectForm project={project} />
    </div>
  );
}
