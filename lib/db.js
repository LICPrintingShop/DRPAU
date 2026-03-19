import { sql } from "@vercel/postgres";

export { sql };

export async function createTicketsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS tickets (
      id SERIAL PRIMARY KEY,
      ticket_id TEXT UNIQUE NOT NULL,
      name TEXT,
      email TEXT,
      contact_person TEXT NOT NULL,
      contact_number TEXT NOT NULL,
      address_mode TEXT NOT NULL DEFAULT 'dropdown',
      region TEXT,
      province TEXT,
      city TEXT,
      barangay TEXT,
      manual_address TEXT,
      branch TEXT NOT NULL DEFAULT 'UNASSIGNED',
      type TEXT NOT NULL,
      concern TEXT NOT NULL,
      details TEXT,
      status TEXT NOT NULL DEFAULT 'Received',
      remarks TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;
}
