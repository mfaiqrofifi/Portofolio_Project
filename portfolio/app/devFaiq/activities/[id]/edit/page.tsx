import { notFound } from "next/navigation";
import { getActivityById } from "@/lib/queries/activities";
import ActivityForm from "@/components/admin/ActivityForm";

interface Props {
  params: { id: string };
}

export default async function EditActivityPage({ params }: Props) {
  const activity = await getActivityById(params.id);
  if (!activity) notFound();

  // cast to satisfy form prop — ActivityWithLinks is a superset of Activity
  return (
    <div>
      <h1
        className="font-mono text-sm mb-6"
        style={{ color: "var(--foreground)" }}
      >
        edit activity
      </h1>
      <ActivityForm activity={activity} />
    </div>
  );
}
