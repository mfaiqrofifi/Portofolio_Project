import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getAllArticles } from "@/lib/queries/articles";
import { createArticle } from "@/lib/queries/admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const data = await getAllArticles();
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  try {
    const body = await req.json();
    const article = await createArticle(body);
    return NextResponse.json({ data: article }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 },
    );
  }
}
