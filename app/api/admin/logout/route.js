import { cookies } from "next/headers";
import { getAdminCookieName, getSessionCookieOptions } from '../../../../lib/auth';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(getAdminCookieName());
  return Response.json({ ok: true });
}
