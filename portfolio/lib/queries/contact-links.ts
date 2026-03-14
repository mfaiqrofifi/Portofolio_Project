import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/lib/db";
import type { ContactLink } from "@/lib/types";

export async function getAllContactLinks(): Promise<ContactLink[]> {
  noStore();
  const rows = await sql`
    SELECT * FROM contact_links
    ORDER BY display_order ASC, created_at ASC
  `;
  return rows as ContactLink[];
}

export async function getContactLinkById(
  id: string,
): Promise<ContactLink | null> {
  noStore();
  const rows = await sql`
    SELECT * FROM contact_links WHERE id = ${id} LIMIT 1
  `;
  return (rows[0] as ContactLink) ?? null;
}
