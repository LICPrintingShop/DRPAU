import { cookies } from "next/headers";
import { getAdminCookieName } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(getAdminCookieName());

  return Response.json({ ok: true });
}
