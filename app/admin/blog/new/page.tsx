import { BlogForm } from '@/components/admin/BlogForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewBlogPostPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/admin/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ChevronLeft className="w-4 h-4" /> Back to Blog
                </Link>
                <h1 className="text-3xl font-bold">New Blog Post</h1>
            </div>
            <BlogForm />
        </div>
    );
}
