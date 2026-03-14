import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { updateArticle, deleteArticle } from "@/lib/queries/admin";

interface Params {
  params: { id: string };
}

export async function PUT(req: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const body = await req.json();
    const article = await updateArticle(params.id, body);
    return NextResponse.json({ data: article });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    await deleteArticle(params.id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 },
    );
  }
}
