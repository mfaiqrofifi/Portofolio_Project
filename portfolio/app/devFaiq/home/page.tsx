import { getHome } from "@/lib/queries/home";
import HomeForm from "@/components/admin/HomeForm";
import Link from "next/link";

export default async function HomeEditPage() {
  const home = await getHome();

  if (!home) {
    return (
      <div>
        <h1 className="admin-title">Home Content</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Home content not found. Please run the database migration.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="admin-title">Edit Home Page</h1>
        <Link href="/devFaiq/dashboard" className="admin-btn-secondary text-sm">
          ← Dashboard
        </Link>
      </div>

      <div className="admin-card">
        <HomeForm home={home} />
      </div>
    </div>
  );
}
