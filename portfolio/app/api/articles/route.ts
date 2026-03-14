import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/queries/articles";

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json({ data: articles });
  } catch (error) {
    console.error("[GET /api/articles]", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
