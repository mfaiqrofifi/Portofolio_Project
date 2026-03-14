import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getAllActivities } from "@/lib/queries/activities";
import { createActivity } from "@/lib/queries/admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await getAllActivities();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const body = await req.json();
    const activity = await createActivity(body);
    return NextResponse.json({ data: activity }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 },
    );
  }
}
