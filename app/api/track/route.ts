import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST() {
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ success: true, skipped: true });
    }

    try {
        const headerList = await headers();
        const ip = headerList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const userAgent = headerList.get('user-agent') || 'unknown';
        
        // Basic parsing of User Agent
        let device = 'Desktop';
        if (/mobile/i.test(userAgent)) device = 'Mobile';
        else if (/tablet/i.test(userAgent)) device = 'Tablet';

        let os = 'Unknown OS';
        if (/windows/i.test(userAgent)) os = 'Windows';
        else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
        else if (/android/i.test(userAgent)) os = 'Android';
        else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
        else if (/linux/i.test(userAgent)) os = 'Linux';

        let browser = 'Unknown Browser';
        if (/edg/i.test(userAgent)) browser = 'Edge';
        else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
        else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
        else if (/safari/i.test(userAgent)) browser = 'Safari';
        else if (/opera|opr/i.test(userAgent)) browser = 'Opera';

        // Location info (often provided by deployment platforms like Vercel)
        const country = headerList.get('x-vercel-ip-country') || 'Unknown';
        const city = headerList.get('x-vercel-ip-city') || 'Unknown';

        await prisma.visitor.create({
            data: {
                ip,
                userAgent,
                device,
                os,
                browser,
                country,
                city,
            },
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false }, { status: 200 });
    }
}
