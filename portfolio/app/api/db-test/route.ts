import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const result = await sql`SELECT NOW() AS server_time`;
    return NextResponse.json({
      status: "ok",
      database: "neondb",
      server_time: result[0].server_time,
    });
  } catch (error) {
    console.error("[GET /api/db-test]", error);
    return NextResponse.json(
      { status: "error", message: "Database connection failed" },
      { status: 500 },
    );
  }
}
