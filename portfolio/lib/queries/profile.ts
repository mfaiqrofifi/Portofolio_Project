import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/lib/db";
import type { Profile } from "@/lib/types";

export async function getProfile(): Promise<Profile | null> {
  noStore();
  const rows = await sql`
    SELECT * FROM profile
    ORDER BY created_at DESC
    LIMIT 1
  `;
  return (rows[0] as Profile) ?? null;
}

export async function getProfileById(id: string): Promise<Profile | null> {
  noStore();
  const rows = await sql`
    SELECT * FROM profile WHERE id = ${id} LIMIT 1
  `;
  return (rows[0] as Profile) ?? null;
}
