import { NextResponse } from "next/server";
import { getActivityBySlug } from "@/lib/queries/activities";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const activity = await getActivityBySlug(params.slug);
    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ data: activity });
  } catch (error) {
    console.error("[GET /api/activities/[slug]]", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 },
    );
  }
}
