import { NextResponse } from "next/server";
import { z } from "zod";
import { createContactMessage } from "@/lib/queries/contact";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const message = await createContactMessage(parsed.data);
    return NextResponse.json({ data: message }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
