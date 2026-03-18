import { createTicketsTable } from "@/lib/db";

export async function GET(request) {
  const auth = request.headers.get("x-setup-secret");

  if (!process.env.SETUP_SECRET || auth !== process.env.SETUP_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await createTicketsTable();
    return Response.json({ ok: true, message: "Database setup complete." });
  } catch {
    return Response.json({ error: "Failed to set up database." }, { status: 500 });
  }
}
