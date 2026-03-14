import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllContactLinks } from "@/lib/queries/contact-links";
import { createContactLink } from "@/lib/queries/admin";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await getAllContactLinks();
  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const created = await createContactLink(body);
  return NextResponse.json(created, { status: 201 });
}
