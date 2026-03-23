import { cookies } from "next/headers";
import {
  createSessionToken,
  getAdminCookieName,
  getSessionCookieOptions,
  isValidAdminLogin,
} import ... from '../../../../lib/auth';

export async function POST(req) {
  try {
    const body = await req.json();
    const username = body.username || "";
    const password = body.password || "";

    if (!isValidAdminLogin(username, password)) {
      return Response.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(
      getAdminCookieName(),
      createSessionToken(),
      getSessionCookieOptions()
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
