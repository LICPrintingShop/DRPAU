import { NextResponse } from "next/server";
import { createSessionToken, getAdminCookieName } from "@/lib/auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminLoginPage = pathname.startsWith("/admin-login");

  const cookie = request.cookies.get(getAdminCookieName())?.value;
  const isLoggedIn = cookie && cookie === createSessionToken();

  if (isAdminPage && !isLoggedIn) {
    const loginUrl = new URL("/admin-login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminLoginPage && isLoggedIn) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"]
};
