"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

// Color palette for book spines
const SPINE_COLORS = ["#00f5ff", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"];

interface ArticleCardProps {
  article: Article;
  index?: number;
  layout?: "shelf" | "list";
}

export default function ArticleCard({
  article,
  index = 0,
  layout = "list",
}: ArticleCardProps) {
  const spineColor = SPINE_COLORS[index % SPINE_COLORS.length];

  if (layout === "shelf") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: -10 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ delay: index * 0.08, duration: 0.45 }}
        style={{ perspective: "600px" }}
      >
        <Link href={`/writing/${article.slug}`} className="block group">
          <motion.div
            className="flex items-stretch border-2 overflow-hidden cursor-pointer"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "3px 3px 0px var(--pixel-border)",
              height: "180px",
            }}
            whileHover={{
              y: -6,
              rotateX: 2,
              boxShadow: `0 12px 28px rgba(0,0,0,0.18), 0 0 16px ${spineColor}30, 4px 4px 0px var(--pixel-border)`,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Book spine */}
            <div
              className="w-8 flex-shrink-0 flex items-center justify-center"
              style={{ background: spineColor }}
            >
              <p
                className="font-pixel text-[7px] whitespace-nowrap"
                style={{
                  color: "var(--background)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {article.title.slice(0, 18)}
              </p>
            </div>

            {/* Book cover image */}
            <div
              className="relative w-28 flex-shrink-0 border-r-2"
              style={{ borderColor: "var(--border)" }}
            >
              <SafeImage
                src={article.cover_image}
                alt={article.title}
                style={{ filter: "brightness(0.85) saturate(0.9)" }}
                placeholderLabel="cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${spineColor}20, transparent)`,
                }}
              />
            </div>

            {/* Book content */}
            <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {article.tags.slice(0, 2).map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
                <h3
                  className="font-semibold text-sm leading-snug line-clamp-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {article.title}
                </h3>
                <p
                  className="text-xs mt-1.5 line-clamp-2"
                  style={{ color: "var(--muted)", lineHeight: "1.6" }}
                >
                  {article.excerpt}
                </p>
              </div>
              <div
                className="flex items-center gap-3 text-xs"
                style={{ color: "var(--muted)" }}
              >
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {article.read_time} min
                </span>
                <span>{formatDate(article.published_at ?? "")}</span>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  // List layout (fallback)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      <Link href={`/writing/${article.slug}`} className="block group">
        <motion.div
          className="flex items-stretch border-2 overflow-hidden"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "3px 3px 0px var(--pixel-border)",
          }}
          whileHover={{
            y: -4,
            borderColor: spineColor,
            boxShadow: `0 0 16px ${spineColor}30, 4px 4px 0px var(--pixel-border)`,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Spine accent */}
          <div
            className="w-1 flex-shrink-0"
            style={{ background: spineColor }}
          />

          {/* Thumbnail */}
          <div
            className="relative w-44 sm:w-52 flex-shrink-0 border-r-2 hidden sm:block"
            style={{ borderColor: "var(--border)" }}
          >
            <SafeImage
              src={article.cover_image}
              alt={article.title}
              className="transition-transform duration-500 group-hover:scale-105"
              placeholderLabel="cover"
            />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-2.5 flex-1">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
            <h3
              className="font-semibold text-lg leading-snug"
              style={{ color: "var(--foreground)" }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm flex-1 leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {article.excerpt}
            </p>
            <div
              className="flex items-center gap-4 text-xs"
              style={{ color: "var(--muted)" }}
            >
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {article.read_time} min read
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={12} />
                {formatDate(article.published_at ?? "")}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
