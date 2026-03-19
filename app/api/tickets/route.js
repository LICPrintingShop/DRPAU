import { sql, createTicketsTable } from "@/lib/db";

function makeTicketId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `DRP-${random}`;
}

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
    createdAt: row.created_at,
  };
}

export async function GET(request) {
  try {
    await createTicketsTable();

    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();

    if (q) {
      const like = `%${q}%`;
      const result = await sql`
        SELECT * FROM tickets
        WHERE
          ticket_id ILIKE ${like}
          OR COALESCE(contact_person, '') ILIKE ${like}
          OR COALESCE(contact_number, '') ILIKE ${like}
          OR COALESCE(region, '') ILIKE ${like}
          OR COALESCE(province, '') ILIKE ${like}
          OR COALESCE(city, '') ILIKE ${like}
          OR COALESCE(barangay, '') ILIKE ${like}
          OR COALESCE(manual_address, '') ILIKE ${like}
          OR COALESCE(branch, '') ILIKE ${like}
          OR COALESCE(type, '') ILIKE ${like}
          OR COALESCE(concern, '') ILIKE ${like}
          OR COALESCE(status, '') ILIKE ${like}
        ORDER BY created_at DESC
      `;
      return Response.json({ tickets: result.rows.map(formatTicketRow) });
    }

    const result = await sql`
      SELECT * FROM tickets
      ORDER BY created_at DESC
    `;
    return Response.json({ tickets: result.rows.map(formatTicketRow) });
  } catch {
    return Response.json({ error: "Failed to load tickets." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await createTicketsTable();

    const body = await req.json();

    if (!body.contactPerson) {
      return Response.json({ error: "Contact person is required" }, { status: 400 });
    }
    if (!body.contactNumber) {
      return Response.json({ error: "Contact number is required" }, { status: 400 });
    }
    if (!body.type) {
      return Response.json({ error: "Request type is required" }, { status: 400 });
    }
    if (!body.concern) {
      return Response.json({ error: "Concern is required" }, { status: 400 });
    }
    if (body.addressMode === "dropdown" && (!body.region || !body.province || !body.city)) {
      return Response.json({ error: "Please complete the dropdown address" }, { status: 400 });
    }
    if (body.addressMode === "manual" && !body.manualAddress) {
      return Response.json({ error: "Manual address is required" }, { status: 400 });
    }

    let ticketId = makeTicketId();

    const inserted = await sql`
      INSERT INTO tickets (
        ticket_id, name, email, contact_person, contact_number,
        address_mode, region, province, city, barangay, manual_address,
        branch, type, concern, details, status, remarks
      )
      VALUES (
        ${ticketId},
        ${body.name || ""},
        ${body.email || ""},
        ${body.contactPerson},
        ${body.contactNumber},
        ${body.addressMode || "dropdown"},
        ${body.region || ""},
        ${body.province || ""},
        ${body.city || ""},
        ${body.barangay || ""},
        ${body.manualAddress || ""},
        ${"UNASSIGNED"},
        ${body.type},
        ${body.concern},
        ${body.details || ""},
        ${"Received"},
        ${""}
      )
      RETURNING *
    `;

    return Response.json({ ticket: formatTicketRow(inserted.rows[0]) }, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}
