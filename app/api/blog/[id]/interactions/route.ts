import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { type } = await req.json(); // 'like' or 'dislike'

        if (type === 'like') {
            try {
                // @ts-ignore
                await (prisma as any).blogPost.update({
                    where: { id },
                    data: { likes: { increment: 1 } }
                });
            } catch (err) {
                // Fallback to raw query if client is out of sync
                await prisma.$executeRaw`UPDATE "BlogPost" SET "likes" = "likes" + 1 WHERE id = ${id}`;
            }
        } else if (type === 'dislike') {
            try {
                // @ts-ignore
                await (prisma as any).blogPost.update({
                    where: { id },
                    data: { dislikes: { increment: 1 } }
                });
            } catch (err) {
                // Fallback to raw query if client is out of sync
                await prisma.$executeRaw`UPDATE "BlogPost" SET "dislikes" = "dislikes" + 1 WHERE id = ${id}`;
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Interaction error:', error);
        return NextResponse.json({ error: 'Failed to update interaction' }, { status: 500 });
    }
}
