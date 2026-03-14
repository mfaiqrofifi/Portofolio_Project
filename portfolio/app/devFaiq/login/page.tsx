"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const params = useSearchParams();
  const isError = params.get("error") === "AccessDenied";

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <div
        className="w-full max-w-sm p-8 border"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {/* Header */}
        <div className="mb-8">
          <p
            className="font-mono text-xs mb-1"
            style={{ color: "var(--muted)" }}
          >
            system access
          </p>
          <h1
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Studio
          </h1>
          <div className="h-px mt-3" style={{ background: "var(--border)" }} />
        </div>

        {/* Error */}
        {isError && (
          <div
            className="mb-5 px-3 py-2 border font-mono text-xs"
            style={{
              borderColor: "#f87171",
              color: "#f87171",
              background: "rgba(248,113,113,0.08)",
            }}
          >
            ✕ access denied — wrong account
          </div>
        )}

        {/* Info row */}
        <div
          className="mb-6 px-3 py-2 border font-mono text-xs"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted)",
            background: "var(--background)",
          }}
        >
          auth: google oauth &nbsp;·&nbsp; 1 account allowed
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/devFaiq" })}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 font-mono text-xs transition-all border"
          style={{
            background: "var(--accent)",
            borderColor: "var(--accent)",
            color: "var(--background)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          continue with google
        </button>

        <p
          className="mt-5 text-center font-mono text-[10px]"
          style={{ color: "var(--muted-dim)" }}
        >
          restricted access
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
