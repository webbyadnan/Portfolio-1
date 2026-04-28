import { BlogForm } from '@/components/admin/BlogForm';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { id }
    });

    if (!post) notFound();

    return (
        <div className="space-y-8">
            <div>
                <Link href="/admin/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ChevronLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <h1 className="text-3xl font-bold">Edit Post: {post.title}</h1>
            </div>
            <BlogForm post={post} />
        </div>
    );
}
