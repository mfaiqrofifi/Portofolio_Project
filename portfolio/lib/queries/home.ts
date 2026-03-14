import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/lib/db";
import type { Home } from "@/lib/types";

/**
 * Get the home page content (single row)
 */
export async function getHome(): Promise<Home | null> {
  noStore();

  const rows = await sql`
    SELECT * FROM home
    ORDER BY created_at DESC
    LIMIT 1
  `;

  return (rows[0] as Home) ?? null;
}

/**
 * Get home by ID (for admin editing)
 */
export async function getHomeById(id: string): Promise<Home | null> {
  noStore();

  const rows = await sql`
    SELECT * FROM home
    WHERE id = ${id}
  `;

  return (rows[0] as Home) ?? null;
}
