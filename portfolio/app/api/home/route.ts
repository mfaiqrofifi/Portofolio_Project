import { NextResponse } from "next/server";
import { getHome } from "@/lib/queries/home";

export async function GET() {
  try {
    const home = await getHome();

    if (!home) {
      return NextResponse.json(
        { error: "Home content not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(home);
  } catch (error) {
    console.error("Error fetching home:", error);
    return NextResponse.json(
      { error: "Failed to fetch home content" },
      { status: 500 },
    );
  }
}
