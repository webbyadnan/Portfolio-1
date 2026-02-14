import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname
    const path = request.nextUrl.pathname;

    // Check if the path is an admin route
    const isAdminPath = path.startsWith('/admin');

    // For admin routes, check authentication
    if (isAdminPath) {
        // TODO: Implement proper authentication check
        // For now, this is a placeholder for future admin authentication

        // Example: Check for session cookie or JWT token
        // const token = request.cookies.get('admin-token');
        // if (!token) {
        //   return NextResponse.redirect(new URL('/login', request.url));
        // }

        // Allow access for now (you'll implement auth later)
        return NextResponse.next();
    }

    return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
