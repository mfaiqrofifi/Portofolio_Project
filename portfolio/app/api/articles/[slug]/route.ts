import { NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/queries/articles";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const article = await getArticleBySlug(params.slug);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ data: article });
  } catch (error) {
    console.error("[GET /api/articles/[slug]]", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
