import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // Protected routes
  const protectedRoutes = ["/editor", "/files", "/api-keys", "/preview"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Check if accessing protected route
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if no token
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // Verify token
    const user = await verifyToken(token);
    if (!user) {
      // Invalid token, redirect to login
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(url);
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // Redirect to editor if already logged in and trying to access login/signup
  if ((pathname === "/login" || pathname === "/signup") && token) {
    const user = await verifyToken(token);
    if (user) {
      const url = new URL("/editor", request.url);
      return NextResponse.redirect(url, { status: 307 }); // Temporary redirect
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/editor/:path*",
    "/files/:path*",
    "/api-keys/:path*",
    "/preview/:path*",
    "/login",
    "/signup",
  ],
};
