"use client";

import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export function BlogInteractions({ postId, initialLikes, initialDislikes }: { postId: string, initialLikes: number, initialDislikes: number }) {
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [loading, setLoading] = useState(false);

    const handleInteraction = async (type: 'like' | 'dislike') => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/blog/${postId}/interactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type })
            });
            if (res.ok) {
                if (type === 'like') setLikes(l => l + 1);
                else setDislikes(d => d + 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-6 border-t border-border pt-8 mt-12">
            <button 
                onClick={() => handleInteraction('like')}
                disabled={loading}
                className="flex items-center gap-2 group hover:text-primary transition-colors"
            >
                <div className="p-2 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-bold text-lg leading-none">{likes}</span>
                    <span className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">Likes</span>
                </div>
            </button>
            <button 
                onClick={() => handleInteraction('dislike')}
                disabled={loading}
                className="flex items-center gap-2 group hover:text-red-500 transition-colors"
            >
                <div className="p-2 rounded-full bg-secondary group-hover:bg-red-500/10 transition-colors">
                    <ThumbsDown className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-bold text-lg leading-none">{dislikes}</span>
                    <span className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground">Dislikes</span>
                </div>
            </button>
        </div>
    );
}
