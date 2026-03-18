global.tickets = global.tickets || [];

export async function GET(req, { params }) {
  const ticket = global.tickets.find(
    (item) => item.ticketId === params.ticketId
  );

  if (!ticket) {
    return Response.json({ error: "Ticket not found" }, { status: 404 });
  }

  return Response.json({ ticket });
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();

    const ticketIndex = global.tickets.findIndex(
      (item) => item.ticketId === params.ticketId
    );

    if (ticketIndex === -1) {
      return Response.json({ error: "Ticket not found" }, { status: 404 });
    }

    global.tickets[ticketIndex] = {
      ...global.tickets[ticketIndex],
      status: body.status || global.tickets[ticketIndex].status,
      remarks: body.remarks || global.tickets[ticketIndex].remarks,
      branch: body.branch || global.tickets[ticketIndex].branch,
    };

    return Response.json({ ticket: global.tickets[ticketIndex] });
  } catch (error) {
    return Response.json({ error: "Failed to update ticket" }, { status: 500 });
  }
}
