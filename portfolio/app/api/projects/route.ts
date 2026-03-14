import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/queries/projects";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error("[GET /api/projects]", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
