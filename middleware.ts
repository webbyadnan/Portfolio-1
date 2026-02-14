import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Define allowed project subdomains and their target paths
    const projectMappings: Record<string, string> = {
        'e-commerce': '/projects/e-commerce',
        'saas': '/projects/saas-dashboard',
        'api': '/projects/social-media-api',
        'blog': '/projects/blog-cms',
        'builder': '/projects/ai-portfolio-builder',
        'ai-lab': '/ai-lab',
    };

    // Extract subdomain (e.g., "e-commerce" from "e-commerce.adnan-dev-alpha.vercel.app")
    // This logic works for both "sub.domain.com" and "sub.localhost:3000"
    const currentSubdomain = hostname.split('.')[0].toLowerCase();

    // Check if we are on a project subdomain
    if (projectMappings[currentSubdomain]) {
        const targetPath = projectMappings[currentSubdomain];

        // Prevent infinite loops if already on the target path
        if (url.pathname.startsWith(targetPath)) {
            return NextResponse.next();
        }

        // Rewrite internal URL to the project path
        // For example: ecommerce.site.com/cart -> site.com/projects/e-commerce/cart
        return NextResponse.rewrite(new URL(`${targetPath}${url.pathname === '/' ? '' : url.pathname}`, request.url));
    }

    // Check if the path is an admin route (existing logic)
    if (url.pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
