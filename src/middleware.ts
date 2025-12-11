import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {

        // Allow login page in admin (if you have /admin/login, or handle it differently)
        // Assuming /admin/login is the page to login, we shouldn't block it.
        if (request.nextUrl.pathname.startsWith("/admin/login")) {
            return NextResponse.next();
        }

        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        const payload = await verifyToken(token);
        if (!payload || payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
