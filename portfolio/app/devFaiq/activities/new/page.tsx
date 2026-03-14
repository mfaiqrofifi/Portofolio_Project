import ActivityForm from "@/components/admin/ActivityForm";

export default function NewActivityPage() {
  return (
    <div>
      <h1
        className="font-mono text-sm mb-6"
        style={{ color: "var(--foreground)" }}
      >
        new activity
      </h1>
      <ActivityForm />
    </div>
  );
}
