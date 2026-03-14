import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/lib/db";
import type { ActivityWithLinks } from "@/lib/types";

export async function getAllActivities(): Promise<ActivityWithLinks[]> {
  noStore();
  const rows = await sql`
    SELECT
      a.*,
      COALESCE(
        json_agg(
          json_build_object('id', l.id, 'activity_id', l.activity_id, 'label', l.label, 'url', l.url)
        ) FILTER (WHERE l.id IS NOT NULL),
        '[]'
      ) AS links
    FROM activities a
    LEFT JOIN activity_links l ON l.activity_id = a.id
    GROUP BY a.id
    ORDER BY a.date DESC, a.created_at DESC
  `;
  return rows as ActivityWithLinks[];
}

export async function getActivityBySlug(
  slug: string,
): Promise<ActivityWithLinks | null> {
  noStore();
  const rows = await sql`
    SELECT
      a.*,
      COALESCE(
        json_agg(
          json_build_object('id', l.id, 'activity_id', l.activity_id, 'label', l.label, 'url', l.url)
        ) FILTER (WHERE l.id IS NOT NULL),
        '[]'
      ) AS links
    FROM activities a
    LEFT JOIN activity_links l ON l.activity_id = a.id
    WHERE a.slug = ${slug}
    GROUP BY a.id
    LIMIT 1
  `;
  return (rows[0] as ActivityWithLinks) ?? null;
}

export async function getActivityById(
  id: string,
): Promise<ActivityWithLinks | null> {
  noStore();
  const rows = await sql`
    SELECT
      a.*,
      COALESCE(
        json_agg(
          json_build_object('id', l.id, 'activity_id', l.activity_id, 'label', l.label, 'url', l.url)
        ) FILTER (WHERE l.id IS NOT NULL),
        '[]'
      ) AS links
    FROM activities a
    LEFT JOIN activity_links l ON l.activity_id = a.id
    WHERE a.id = ${id}
    GROUP BY a.id
    LIMIT 1
  `;
  return (rows[0] as ActivityWithLinks) ?? null;
}
