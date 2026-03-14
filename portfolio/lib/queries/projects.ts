import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/lib/db";
import type { Project } from "@/lib/types";

export async function getAllProjects(): Promise<Project[]> {
  noStore();
  const rows = await sql`
    SELECT * FROM projects
    ORDER BY featured DESC, created_at DESC
  `;
  return rows as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  noStore();
  const rows = await sql`
    SELECT * FROM projects
    WHERE featured = TRUE
    ORDER BY created_at DESC
  `;
  return rows as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  noStore();
  const rows = await sql`
    SELECT * FROM projects
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return (rows[0] as Project) ?? null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  noStore();
  const rows = await sql`
    SELECT * FROM projects
    WHERE id = ${id}
    LIMIT 1
  `;
  return (rows[0] as Project) ?? null;
}
