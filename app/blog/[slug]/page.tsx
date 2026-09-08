export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { BlogInteractions } from '@/components/blog/BlogInteractions';
import { CommentSection } from '@/components/blog/CommentSection';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = process.env.NODE_ENV === 'development'
        ? null
        : await prisma.blogPost.findUnique({
            where: { slug }
        }).catch(() => null);

    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt,
            type: 'article',
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = process.env.NODE_ENV === 'development'
        ? null
        : await prisma.blogPost.findUnique({
            where: { slug }
        }).catch(() => null);

    if (!post || !post.published) {
        notFound();
    }

    return (
        <article className="pt-32 pb-24 min-h-screen container mx-auto px-6 max-w-3xl">
            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    {post.createdAt.toLocaleDateString()}
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary mb-16">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <BlogInteractions 
                postId={post.id} 
                initialLikes={post?.likes || 0} 
                initialDislikes={post?.dislikes || 0} 
            />
            
            <CommentSection postId={post.id} />
        </article>
    );
}
