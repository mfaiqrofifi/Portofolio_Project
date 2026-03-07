"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, FileText } from "lucide-react";
import { Project } from "@/lib/dummy-projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="relative"
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative border-2 overflow-hidden h-full flex flex-col"
        style={{
          background: "var(--card)",
          borderColor: hovered ? "var(--accent)" : "var(--border)",
          transition: "border-color 0.2s",
          boxShadow: hovered
            ? "0 0 20px var(--accent, #00f5ff)30, 4px 4px 0px var(--pixel-border)"
            : "3px 3px 0px var(--pixel-border)",
        }}
        animate={{ y: hovered ? -5 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Terminal header bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 border-b-2"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#f87171" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#fbbf24" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#34d399" }}
          />
          <span
            className="ml-2 font-pixel text-[7px]"
            style={{ color: "var(--muted)" }}
          >
            EXP-{String(index + 1).padStart(3, "0")}.exe
          </span>
          <span className="ml-auto">
            <span
              className={
                project.status === "completed"
                  ? "status-completed"
                  : "status-experimental"
              }
            >
              {project.status}
            </span>
          </span>
        </div>

        {/* Thumbnail */}
        <div
          className="relative h-40 overflow-hidden border-b-2"
          style={{ borderColor: "var(--border)" }}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            style={{
              filter: hovered ? "none" : "grayscale(20%) brightness(0.9)",
              transition: "filter 0.3s, transform 0.4s",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
            }}
          />
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span
              className="font-pixel text-[7px] px-2 py-1"
              style={{
                background: "var(--accent)",
                color: "var(--background)",
              }}
            >
              {project.domain}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3 flex-1">
          <h3
            className="font-semibold text-base leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm flex-1 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {project.shortDescription}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="tech-badge">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover reveal panel */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 p-4 border-t-2 flex gap-3 items-center"
              style={{
                background: "var(--card)",
                borderColor: "var(--accent)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 flex items-center justify-center gap-1.5 font-pixel text-[8px] py-2.5 border-2"
                style={{
                  background: "var(--accent)",
                  color: "var(--background)",
                  borderColor: "var(--pixel-border)",
                  boxShadow: "2px 2px 0px var(--pixel-border)",
                }}
              >
                <FileText size={11} />
                Dev Log
              </Link>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 font-pixel text-[8px] py-2.5 px-3 border-2"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                  boxShadow: "2px 2px 0px var(--pixel-border)",
                }}
              >
                <Github size={11} />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 font-pixel text-[8px] py-2.5 px-3 border-2"
                  style={{
                    background: "var(--background)",
                    color: "var(--accent)",
                    borderColor: "var(--accent)",
                    boxShadow: "2px 2px 0px var(--pixel-border)",
                  }}
                >
                  <ExternalLink size={11} />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
