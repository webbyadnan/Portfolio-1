export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Blog</h1>
                <Link 
                    href="/admin/blog/new" 
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" /> New Post
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {posts.map((post) => (
                    <Card key={post.id} className="p-6 flex items-center justify-between group">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-lg">{post.title}</h3>
                                {post.published ? (
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Published</span>
                                ) : (
                                    <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Draft</span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">/blog/{post.slug}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link 
                                href={`/admin/blog/${post.id}`} 
                                className="p-2 hover:text-blue-500 transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-5 h-5" />
                            </Link>
                            <button 
                                className="p-2 hover:text-red-500 transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </Card>
                ))}
                {posts.length === 0 && <p className="text-muted-foreground">No blog posts found.</p>}
            </div>
        </div>
    );
}
