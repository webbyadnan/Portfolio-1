import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        
        let comments = [];
        try {
            // @ts-ignore
            comments = await (prisma as any).comment.findMany({
                where: { blogPostId: id },
                orderBy: { createdAt: 'desc' }
            });
        } catch (err) {
            // Fallback to raw query
            comments = await prisma.$queryRaw`SELECT * FROM "Comment" WHERE "blogPostId" = ${id} ORDER BY "createdAt" DESC` as any[];
        }
        
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Fetch comments error:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { content, authorName } = await req.json();

        if (!content) {
            return NextResponse.json({ error: 'Content is required' }, { status: 400 });
        }

        let comment;
        try {
            // @ts-ignore
            comment = await (prisma as any).comment.create({
                data: {
                    content,
                    authorName: authorName || 'Anonymous',
                    blogPostId: id
                }
            });
        } catch (err) {
            // Fallback to raw query if client is out of sync
            const commentId = Math.random().toString(36).substring(2, 15);
            const author = authorName || 'Anonymous';
            await prisma.$executeRaw`INSERT INTO "Comment" ("id", "content", "authorName", "blogPostId", "createdAt") VALUES (${commentId}, ${content}, ${author}, ${id}, NOW())`;
            comment = { id: commentId, content, authorName: author, blogPostId: id, createdAt: new Date() };
        }

        return NextResponse.json(comment);
    } catch (error) {
        console.error('Post comment error:', error);
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
    }
}
