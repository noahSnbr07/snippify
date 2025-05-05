import getAuthentication from '@/functions/get-authentication';
import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const auth = await getAuthentication();

    //not logged in
    if (!auth) {
        return NextResponse.redirect(new URL('/error?status=403&message=log+in', request.url));
    }

    //admin panel required admin privileges
    if (request.nextUrl.pathname.startsWith("/admin") && (!auth.isAdmin || !auth)) {
        return NextResponse.redirect(new URL('/error?status=403&message=admin+access+required', request.url));
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        //admin panel
        "/admin",
        "/api/user/me",
    ],
}