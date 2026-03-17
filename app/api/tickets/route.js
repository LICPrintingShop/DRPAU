global.tickets = global.tickets || [];

function makeTicketId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `DRP-${random}`;
}

export async function GET() {
  return Response.json({ tickets: global.tickets });
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.type) {
      return Response.json({ error: "Request type is required" }, { status: 400 });
    }

    if (!body.concern) {
      return Response.json({ error: "Concern is required" }, { status: 400 });
    }

    const ticket = {
      ticketId: makeTicketId(),
      name: body.name || "",
      email: body.email || "",
      branch: body.branch || "108",
      type: body.type,
      concern: body.concern,
      details: body.details || "",
      status: "Received",
      remarks: "",
      createdAt: new Date().toLocaleString()
    };

    global.tickets.unshift(ticket);

    return Response.json({ ticket }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}
