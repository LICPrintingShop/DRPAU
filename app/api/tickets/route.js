import { NextResponse } from "next/server";
import { createTicket, getTickets } from "@/lib/ticket-service";
import { validateTicketPayload } from "@/lib/validators";

export async function GET() {
  try {
    const tickets = await getTickets();
    return NextResponse.json({ tickets });
  } catch {
    return NextResponse.json(
      { error: "Failed to load tickets." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validated = validateTicketPayload(payload);
    const ticket = await createTicket(validated);

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create ticket." },
      { status: 400 }
    );
  }
}
