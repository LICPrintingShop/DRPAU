import { cookies } from "next/headers";
import { sql, createTicketsTable } from "@/lib/db";
import { createSessionToken, getAdminCookieName } from "@/lib/auth";

function formatTicketRow(row) {
  return {
    ticketId: row.ticket_id,
    name: row.name,
    email: row.email,
    contactPerson: row.contact_person,
    contactNumber: row.contact_number,
    addressMode: row.address_mode,
    region: row.region,
    province: row.province,
    city: row.city,
    barangay: row.barangay,
    manualAddress: row.manual_address,
    branch: row.branch,
    type: row.type,
    concern: row.concern,
    details: row.details,
    status: row.status,
    remarks: row.remarks,
    createdAt: row.created_at
  };
}

export async function GET(req, { params }) {
  try {
    await createTicketsTable();

    const result = await sql`
      SELECT *
      FROM tickets
      WHERE ticket_id = ${params.ticketId}
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      return Response.json({ error: "Ticket not found" }, { status: 404 });
    }

    return Response.json({ ticket: formatTicketRow(result.rows[0]) });
  } catch {
    return Response.json({ error: "Failed to load ticket" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(getAdminCookieName())?.value;

    if (!session || session !== createSessionToken()) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await createTicketsTable();

    const body = await req.json();

    const existing = await sql`
      SELECT 1 FROM tickets WHERE ticket_id = ${params.ticketId} LIMIT 1
    `;

    if (existing.rows.length === 0) {
      return Response.json({ error: "Ticket not found" }, { status: 404 });
    }

    const updated = await sql`
      UPDATE tickets
      SET
        branch = COALESCE(${body.branch}, branch),
        status = COALESCE(${body.status}, status),
        remarks = COALESCE(${body.remarks}, remarks),
        updated_at = NOW()
      WHERE ticket_id = ${params.ticketId}
      RETURNING *
    `;

    return Response.json({ ticket: formatTicketRow(updated.rows[0]) });
  } catch {
    return Response.json({ error: "Failed to update ticket" }, { status: 500 });
  }
}
