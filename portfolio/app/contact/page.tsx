"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ContactLink, Profile } from "@/lib/types";

const icons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  link: LinkIcon,
};

export default function ContactPage() {
  const [links, setLinks] = useState<ContactLink[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/contact-links").then((res) => res.json()),
      fetch("/api/profile").then((res) => res.json()),
    ])
      .then(([linksData, profileData]) => {
        setLinks(linksData);
        setProfile(profileData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs mb-1" style={{ color: "var(--muted)" }}>
          ~/contact
        </p>
        <div className="flex items-center gap-3">
          <h1
            className="font-mono text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Contact
          </h1>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border)" }}
          />
        </div>
      </div>

      <motion.p
        className="text-sm leading-relaxed mb-10"
        style={{ color: "var(--muted)", maxWidth: "34rem" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {profile?.bio ??
          "Available for backend engineering roles, consulting, or interesting collaborations. Reach out via any of the channels below."}
      </motion.p>

      {/* Links */}
      <motion.div
        className="flex flex-col border"
        style={{ borderColor: "var(--border)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        {links.map(({ id, href, icon, label, value }) => {
          const Icon = icons[icon] ?? LinkIcon;
          return (
            <a
              key={id}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-4 py-4 border-b last:border-0 transition-colors"
              style={{
                borderColor: "var(--border)",
                background: "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <Icon
                size={14}
                className="shrink-0"
                style={{ color: "var(--muted)" }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  {label}
                </p>
                <p
                  className="font-mono text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {value}
                </p>
              </div>
              <span
                className="font-mono text-xs opacity-0 group-hover:opacity-60 transition-opacity"
                style={{ color: "var(--muted)" }}
              ></span>
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}
