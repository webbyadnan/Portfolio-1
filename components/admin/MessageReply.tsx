"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Send, X, Loader2, CheckCircle2 } from 'lucide-react';

export function MessageReply({ email, name, originalMessage }: { email: string, name: string, originalMessage: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleReply = async () => {
        if (!message) return;
        setLoading(true);
        try {
            const res = await fetch('/api/admin/messages/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    to: email, 
                    subject: `Re: Contact from ${name}`, 
                    message 
                }),
            });
            if (res.ok) {
                setSent(true);
                setTimeout(() => {
                    setSent(false);
                    setIsOpen(false);
                    setMessage('');
                }, 2000);
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || 'Failed to send email'}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-all bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10"
            >
                <Mail className="w-3.5 h-3.5" /> Reply via Email
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-lg p-8 relative shadow-2xl border-primary/20 bg-secondary/10 backdrop-blur-2xl">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <Mail className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Direct Reply</h2>
                        <p className="text-xs text-muted-foreground">Replying to <span className="text-foreground font-bold">{name}</span> ({email})</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-4 bg-secondary/40 rounded-2xl text-xs text-muted-foreground border border-border/50 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
                        <span className="font-bold uppercase tracking-[0.1em] text-[9px] block mb-2 opacity-60">Inquiry Context:</span>
                        <p className="italic leading-relaxed">"{originalMessage}"</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Response Draft</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your professional response..."
                            rows={8}
                            className="w-full bg-background border border-border/50 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all resize-none shadow-inner leading-relaxed"
                        />
                    </div>

                    <Button 
                        onClick={handleReply}
                        disabled={loading || !message || sent}
                        className={`w-full py-7 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                            sent ? 'bg-green-500 hover:bg-green-500 shadow-green-500/20' : 'shadow-primary/20'
                        }`}
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 
                         sent ? <CheckCircle2 className="w-6 h-6" /> : 
                         <Send className="w-5 h-5" />}
                        {loading ? 'Transmitting Email...' : sent ? 'Response Dispatched!' : 'Send Professional Reply'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
