import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getHomeById } from "@/lib/queries/home";
import { updateHome } from "@/lib/queries/admin";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const home = await getHomeById(params.id);
  if (!home) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(home);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updated = await updateHome(params.id, body);
  return NextResponse.json(updated);
}
