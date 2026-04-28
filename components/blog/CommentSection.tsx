"use client";

import { useState, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

export function CommentSection({ postId }: { postId: string }) {
    const [comments, setComments] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/blog/${postId}/comments`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (err) {
            console.error('Failed to fetch comments:', err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content || loading) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/blog/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, authorName: name || 'Anonymous' })
            });
            if (res.ok) {
                setContent('');
                fetchComments();
            }
        } catch (err) {
            console.error('Failed to post comment:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-12 pt-12 border-t border-border space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="w-6 h-6" />
                </div>
                Discussion ({comments.length})
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 bg-secondary/20 p-6 rounded-3xl border border-border/50 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                        <input 
                            placeholder="Anonymous" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-background border border-border/50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-all shadow-inner"
                        />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Comment</label>
                    <textarea 
                        placeholder="What's on your mind?" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={3}
                        className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none shadow-inner"
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading || !content}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-95"
                >
                    {loading ? 'Posting...' : <><Send className="w-4 h-4" /> Post Comment</>}
                </button>
            </form>

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0 border border-border/50">
                            <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-sm group-hover:text-primary transition-colors">{comment.authorName}</span>
                                <span className="text-[10px] text-muted-foreground font-bold tracking-tighter bg-secondary/50 px-2 py-1 rounded-md">
                                    {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="bg-secondary/10 p-4 rounded-2xl rounded-tl-none border border-border/30">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-border rounded-3xl opacity-40">
                        <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-bold uppercase tracking-widest">No comments yet</p>
                        <p className="text-xs mt-1">Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
