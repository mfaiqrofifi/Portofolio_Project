import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarfieldBackground from "@/components/StarfieldBackground";

export const metadata: Metadata = {
  title: "faiq.dev — Backend Engineer",
  description:
    "Backend Engineer building reliable distributed systems — Faiq Rofifi.",
  keywords: ["backend engineer", "Go", "Node.js", "PostgreSQL", "portfolio"],
  authors: [{ name: "Faiq Rofifi" }],
  openGraph: {
    title: "faiq.dev — Backend Engineer",
    description: "Backend Engineer building reliable distributed systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {/* Fixed deep-space background — z-index 0, behind all page chrome */}
          <StarfieldBackground />
          {/* Page chrome — stacking context above the canvas */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
