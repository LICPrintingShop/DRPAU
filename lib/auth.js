import crypto from "crypto";

const COOKIE_NAME = "drpau_admin_session";

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export function isValidAdminLogin(username, password) {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export function getSessionCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
