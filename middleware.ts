import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isAuthRoute = ["/login", "/sign-in", "/"].includes(request.nextUrl.pathname);

    if(token && isAuthRoute) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    if(!token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]
}