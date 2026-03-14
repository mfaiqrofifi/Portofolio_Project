import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// neon() creates a serverless SQL tag function — safe to import module-level
export const sql = neon(process.env.DATABASE_URL);
