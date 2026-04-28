'use client';

import { createBlogPost, updateBlogPost } from '@/lib/actions/blog';
import { useState } from 'react';
import { Sparkles, Loader2, Search, Info } from 'lucide-react';

interface BlogFormProps {
    post?: any;
}

export function BlogForm({ post }: BlogFormProps) {
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);

    // Controlled states for AI integration
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [content, setContent] = useState(post?.content || '');

    const handleGenerateAI = async () => {
        if (!title) return;

        setGenerating(true);
        try {
            const res = await fetch('/api/admin/blog/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            if (res.ok) {
                const data = await res.json();
                setExcerpt(data.excerpt);
                setContent(data.content);
                if (!slug) {
                    setSlug(title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''));
                }
            }
        } catch (err) {
            console.error('AI Gen Error:', err);
        } finally {
            setGenerating(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        // Use the current state values as they might have been updated by AI
        const data = new FormData();
        data.append('title', title);
        data.append('slug', slug);
        data.append('excerpt', excerpt);
        data.append('content', content);
        data.append('published', formData.get('published') || '');

        if (post) {
            await updateBlogPost(post.id, data);
        } else {
            await createBlogPost(data);
        }
        setLoading(false);
    };

    const inputClass = "w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors";
    const labelClass = "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2";

    return (
        <div className="space-y-8 max-w-5xl">
            {/* AI Assistant Banner */}
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/5">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Blog Content AI</h4>
                        <p className="text-xs text-muted-foreground">Draft high-quality content and summaries from just a title.</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={generating || !title}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 shadow-xl shadow-primary/20"
                >
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {generating ? 'Drafting...' : 'Generate Content'}
                </button>
            </div>

            <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 bg-card p-10 rounded-[2.5rem] border border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -mr-20 -mt-20 opacity-50" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <div className="space-y-2">
                            <label className={labelClass}>Post Title</label>
                            <input 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                                className={inputClass} 
                                placeholder="E.g. The Future of AI" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelClass}>URL Slug</label>
                            <input 
                                value={slug} 
                                onChange={(e) => setSlug(e.target.value)} 
                                required 
                                className={inputClass} 
                                placeholder="future-of-ai" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Excerpt</label>
                        <input 
                            value={excerpt} 
                            onChange={(e) => setExcerpt(e.target.value)} 
                            required 
                            className={inputClass} 
                            placeholder="A short summary for the card view..." 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Body Content (Markdown)</label>
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            required 
                            rows={15} 
                            className={`${inputClass} font-mono text-xs leading-relaxed resize-none`} 
                            placeholder="# Write your post here..." 
                        />
                    </div>

                    {/* SEO Section */}
                    <div className="pt-8 border-t border-border/50 space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Search className="w-4 h-4 text-primary" />
                            <h5 className="text-xs font-bold uppercase tracking-widest">SEO Meta Data</h5>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelClass}>Meta Title</label>
                                <input 
                                    name="seoTitle"
                                    defaultValue={post?.seoTitle} 
                                    className={inputClass} 
                                    placeholder="Search engine title..." 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Meta Description</label>
                                <input 
                                    name="seoDescription"
                                    defaultValue={post?.seoDescription} 
                                    className={inputClass} 
                                    placeholder="Search engine snippet..." 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Status & Save */}
                    <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-xl space-y-6">
                        <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-primary" />
                            <h5 className="text-xs font-bold uppercase tracking-widest">Publishing</h5>
                        </div>

                        <div className="flex items-center gap-3 bg-secondary/50 p-4 rounded-2xl border border-border/50">
                            <input 
                                type="checkbox" 
                                id="published" 
                                name="published" 
                                defaultChecked={post?.published} 
                                className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary transition-all" 
                            />
                            <label htmlFor="published" className="text-sm font-bold cursor-pointer">Live on Website</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || generating}
                            className="w-full py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-primary/20 text-lg"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : post ? 'Update Post' : 'Publish Article'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

