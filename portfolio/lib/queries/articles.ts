import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/lib/db";
import type { Article } from "@/lib/types";

export async function getAllArticles(): Promise<Article[]> {
  noStore();
  const rows = await sql`
    SELECT * FROM articles
    ORDER BY published_at DESC, created_at DESC
  `;
  return rows as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  noStore();
  const rows = await sql`
    SELECT * FROM articles
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return (rows[0] as Article) ?? null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  noStore();
  const rows = await sql`
    SELECT * FROM articles
    WHERE id = ${id}
    LIMIT 1
  `;
  return (rows[0] as Article) ?? null;
}

export async function getRelatedArticles(
  excludeId: string,
  tags: string[],
): Promise<Article[]> {
  noStore();
  if (!tags || tags.length === 0) return [];
  const rows = await sql`
    SELECT * FROM articles
    WHERE id != ${excludeId}
      AND tags && ${tags}
    ORDER BY published_at DESC
    LIMIT 3
  `;
  return rows as Article[];
}
