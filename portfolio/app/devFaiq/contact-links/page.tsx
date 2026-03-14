import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getAllContactLinks } from "@/lib/queries/contact-links";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export default async function ContactLinksListPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/devFaiq/login");

  const links = await getAllContactLinks();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Contact Links</h1>
        <Link
          href="/devFaiq/contact-links/new"
          className="admin-btn-primary text-sm"
        >
          + New Link
        </Link>
      </div>

      {links.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          No contact links yet.
        </p>
      ) : (
        <div className="border" style={{ borderColor: "var(--border)" }}>
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-4 border-b last:border-0"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {link.label}
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {link.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  Order: {link.display_order} · Icon: {link.icon}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/devFaiq/contact-links/${link.id}/edit`}
                  className="admin-btn-secondary text-xs"
                >
                  Edit
                </Link>
                <AdminDeleteButton id={link.id} entity="contact-links" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
