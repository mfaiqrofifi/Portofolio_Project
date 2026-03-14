import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getAllProjects } from "@/lib/queries/projects";
import { createProject } from "@/lib/queries/admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await getAllProjects();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const body = await req.json();
    const project = await createProject(body);
    return NextResponse.json({ data: project }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
