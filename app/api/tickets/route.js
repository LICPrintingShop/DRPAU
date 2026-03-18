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

    if (!body.contactPerson) {
      return Response.json(
        { error: "Contact person is required" },
        { status: 400 }
      );
    }

    if (!body.contactNumber) {
      return Response.json(
        { error: "Contact number is required" },
        { status: 400 }
      );
    }

    if (!body.type) {
      return Response.json(
        { error: "Request type is required" },
        { status: 400 }
      );
    }

    if (!body.concern) {
      return Response.json(
        { error: "Concern is required" },
        { status: 400 }
      );
    }

    if (
      body.addressMode === "dropdown" &&
      (!body.region || !body.province || !body.city)
    ) {
      return Response.json(
        { error: "Please complete the dropdown address" },
        { status: 400 }
      );
    }

    if (body.addressMode === "manual" && !body.manualAddress) {
      return Response.json(
        { error: "Manual address is required" },
        { status: 400 }
      );
    }

    const ticket = {
      ticketId: makeTicketId(),
      name: body.name || "",
      email: body.email || "",
      contactPerson: body.contactPerson || "",
      contactNumber: body.contactNumber || "",
      addressMode: body.addressMode || "dropdown",
      region: body.region || "",
      province: body.province || "",
      city: body.city || "",
      barangay: body.barangay || "",
      manualAddress: body.manualAddress || "",
      branch: "UNASSIGNED",
      type: body.type,
      concern: body.concern,
      details: body.details || "",
      status: "Received",
      remarks: "",
      createdAt: new Date().toLocaleString(),
    };

    global.tickets.unshift(ticket);

    return Response.json({ ticket }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}
