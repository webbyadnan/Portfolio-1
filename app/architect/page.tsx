'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Sparkles, Lightbulb, ArrowDown, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const examplePrompts = [
    "A real-time chat app for remote teams using WebSockets",
    "An AI-powered e-commerce recommendation engine",
    "A multi-tenant SaaS dashboard with analytics",
    "A social media scheduling tool with AI content generation",
];

export default function ArchitectPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);



    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
        }
    }, [input]);

    const handleSubmit = async (promptText?: string) => {
        const text = promptText || input;
        if (!text.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text.trim(),
        };

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '',
        };

        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/architect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: text }),
            });

            if (!res.ok) throw new Error(res.statusText);

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    setMessages((prev) => {
                        const updated = [...prev];
                        const lastMsg = updated[updated.length - 1];
                        if (lastMsg.role === 'assistant') {
                            lastMsg.content += chunk;
                        }
                        return updated;
                    });
                }
            }
        } catch (error) {
            console.error('Failed to generate architecture:', error);
            setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg.role === 'assistant') {
                    lastMsg.content = '**Error**: Failed to contact the System Architect. Please try again.';
                }
                return updated;
            });
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-5xl mx-auto pt-24">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 no-scrollbar">
                {messages.length === 0 ? (
                    <EmptyState onPromptClick={(p) => handleSubmit(p)} />
                ) : (
                    <div className="space-y-6 pb-4">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} isLoading={loading && message.role === 'assistant' && message === messages[messages.length - 1]} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Sticky Input Bar */}
            <div className="border-t border-border bg-background/90 backdrop-blur-xl px-4 md:px-6 py-4">
                <div className="flex items-end gap-3 max-w-4xl mx-auto">
                    {messages.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="p-2.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 shrink-0 mb-0.5"
                            title="Clear chat"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}

                    <div className="flex-1 relative bg-card border border-border rounded-2xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 overflow-hidden">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe your app idea..."
                            className="w-full px-4 py-3.5 pr-12 bg-transparent resize-none focus:outline-none text-sm min-h-[48px] max-h-[160px]"
                            disabled={loading}
                            rows={1}
                        />
                        <div className="absolute right-2 bottom-2">
                            <span className="text-[10px] text-muted-foreground/50 mr-1">{input.length}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => handleSubmit()}
                        disabled={loading || !input.trim()}
                        className={cn(
                            "p-3 rounded-xl shrink-0 transition-all duration-300 mb-0.5",
                            loading
                                ? "bg-secondary text-muted-foreground cursor-wait"
                                : input.trim()
                                    ? "bg-primary text-primary-foreground hover:bg-[var(--shift-hover)]"
                                    : "bg-secondary text-muted-foreground"
                        )}
                    >
                        {loading ? (
                            <Sparkles className="h-5 w-5 animate-spin" />
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

function EmptyState({ onPromptClick }: { onPromptClick: (prompt: string) => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg"
            >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    <Cpu className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                    System <span className="text-primary">Architect</span>
                </h1>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                    Describe your app idea below. I&apos;ll generate a comprehensive technical proposal, tech stack, and roadmap.
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Try an example</span>
                    </div>
                    {examplePrompts.map((prompt) => (
                        <button
                            key={prompt}
                            onClick={() => onPromptClick(prompt)}
                            className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm text-muted-foreground hover:text-foreground"
                        >
                            &ldquo;{prompt}&rdquo;
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

function MessageBubble({ message, isLoading }: { message: Message; isLoading: boolean }) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex", isUser ? "justify-end" : "justify-start")}
        >
            <div
                className={cn(
                    "max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4",
                    isUser
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md"
                )}
            >
                {isUser ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                ) : (
                    <>
                        {message.content ? (
                            <div className="prose prose-sm dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 max-w-none">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        ) : isLoading ? (
                            <div className="flex items-center gap-1.5 py-1">
                                <span className="w-2 h-2 rounded-full bg-primary typing-dot-1" />
                                <span className="w-2 h-2 rounded-full bg-primary typing-dot-2" />
                                <span className="w-2 h-2 rounded-full bg-primary typing-dot-3" />
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </motion.div>
    );
}
