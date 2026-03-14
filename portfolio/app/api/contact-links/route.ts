import { NextResponse } from "next/server";
import { getAllContactLinks } from "@/lib/queries/contact-links";

export async function GET() {
  try {
    const links = await getAllContactLinks();
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching contact links:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact links" },
      { status: 500 },
    );
  }
}
