import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1
        className="font-mono text-sm mb-6"
        style={{ color: "var(--foreground)" }}
      >
        new project
      </h1>
      <ProjectForm />
    </div>
  );
}
