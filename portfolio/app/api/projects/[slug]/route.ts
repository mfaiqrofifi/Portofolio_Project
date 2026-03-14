import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/queries/projects";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const project = await getProjectBySlug(params.slug);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  } catch (error) {
    console.error("[GET /api/projects/[slug]]", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 },
    );
  }
}
