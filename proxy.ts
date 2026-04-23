import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/builder"];
const authRoutes = ["/login"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.includes(pathname);

  // Skip proxy if auth is not configured (development without credentials)
  const hasAuthSecret =
    process.env.AUTH_SECRET &&
    !process.env.AUTH_SECRET.startsWith("dev-secret");
  const hasGoogleCreds =
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_ID !== "your-google-client-id-here";

  // Without real credentials, allow all routes (auth pages will show setup info)
  if (!hasAuthSecret || !hasGoogleCreds) {
    return NextResponse.next();
  }

  // With real credentials, check session via cookie
  const sessionToken =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token");

  const isLoggedIn = !!sessionToken;

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
