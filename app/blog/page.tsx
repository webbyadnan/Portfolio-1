import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 max-w-4xl">
            <h1 className="text-5xl font-bold mb-12">Insights & Articles</h1>
            <div className="space-y-8">
                {posts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                        <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                {post.createdAt.toLocaleDateString()}
                            </span>
                        </div>
                    </Link>
                ))}
                {posts.length === 0 && (
                    <p className="text-muted-foreground text-lg">Coming soon! I am working on some exciting content.</p>
                )}
            </div>
        </div>
    );
}
