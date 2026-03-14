import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminSignOut from "@/components/AdminSignOut";

const NAV = [
  { href: "/devFaiq", label: "dashboard", prefix: "~/studio" },
  { href: "/devFaiq/home", label: "home", prefix: "~/studio/home" },
  { href: "/devFaiq/projects", label: "projects", prefix: "~/studio/projects" },
  { href: "/devFaiq/articles", label: "articles", prefix: "~/studio/articles" },
  {
    href: "/devFaiq/activities",
    label: "activities",
    prefix: "~/studio/activities",
  },
  { href: "/devFaiq/profile", label: "profile", prefix: "~/studio/profile" },
  {
    href: "/devFaiq/contact-links",
    label: "contact links",
    prefix: "~/studio/contact",
  },
];

export default async function DevFaiqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAuth = session?.user?.email === process.env.ALLOWED_EMAIL;

  // If not logged in, just render children (login page handles itself)
  if (!isAuth) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--background)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-52 shrink-0 flex flex-col border-r"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {/* Brand */}
        <div
          className="px-4 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="font-mono text-[10px]"
            style={{ color: "var(--muted)" }}
          >
            logged in as
          </p>
          <p
            className="font-mono text-xs truncate"
            style={{ color: "var(--accent)" }}
          >
            {session?.user?.email}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col flex-1 py-2">
          {NAV.map(({ href, label, prefix }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col px-4 py-2.5 transition-colors border-l-2"
              style={{
                borderLeftColor: "transparent",
                color: "var(--muted)",
              }}
            >
              <span
                className="font-mono text-[9px]"
                style={{ color: "var(--muted-dim)" }}
              >
                {prefix}
              </span>
              <span className="font-mono text-xs">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
          <AdminSignOut />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
