import { sql } from "@/lib/db";
import type { ContactMessage } from "@/lib/types";

export interface CreateContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export async function createContactMessage(
  input: CreateContactMessageInput,
): Promise<ContactMessage> {
  const rows = await sql`
    INSERT INTO contact_messages (name, email, message)
    VALUES (${input.name}, ${input.email}, ${input.message})
    RETURNING *
  `;
  return rows[0] as ContactMessage;
}
