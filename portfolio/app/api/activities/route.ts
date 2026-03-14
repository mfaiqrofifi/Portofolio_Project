import { NextResponse } from "next/server";
import { getAllActivities } from "@/lib/queries/activities";

export async function GET() {
  try {
    const activities = await getAllActivities();
    return NextResponse.json({ data: activities });
  } catch (error) {
    console.error("[GET /api/activities]", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 },
    );
  }
}
