import { getAllActivities } from "@/lib/queries/activities";
import ActivityView from "@/components/ActivityView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ActivityPage() {
  const activities = await getAllActivities();

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/activity
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Developer Log
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            {activities.length} entries
          </span>
        </div>
      </div>
      <ActivityView activities={activities} />
    </div>
  );
}
