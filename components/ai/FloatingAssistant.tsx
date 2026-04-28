'use client';

import { useState, useRef, useEffect } from "react";
import { Send, Zap, Brain, Sparkles, User, Trash2, Cpu, X, MessageSquare, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Message = {
    role: "user" | "ai" | "system";
    content: string;
};

const INITIAL_MESSAGE: Message = {
    role: "ai",
    content: "Hi there! I am Adnan's Assistant. I can tell you about his projects, skills, or help with coding. How can I help you?"
};

export function FloatingAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [model, setModel] = useState<"groq" | "deepseek">("groq");
    const [history, setHistory] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const pathname = usePathname();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Visibility check moved to return to avoid hook error
    const isVisible = !(pathname?.startsWith('/admin') || pathname === '/ai-lab');

    useEffect(() => {
        const savedHistory = localStorage.getItem("adnan-assistant-history");
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                setHistory([INITIAL_MESSAGE]);
            }
        } else {
            setHistory([INITIAL_MESSAGE]);
        }
    }, []);

    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("adnan-assistant-history", JSON.stringify(history));
        }
    }, [history]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [history, isLoading, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentInput = input;
        if (!currentInput.trim() || isLoading) return;

        setInput("");
        setIsLoading(true);

        const newHistory = [...history, { role: "user" as const, content: currentInput }];
        setHistory([...newHistory, { role: "ai", content: "..." }]);

        try {
            const apiMessages = newHistory.map(msg => ({
                role: msg.role === 'ai' ? 'assistant' : 'user',
                content: msg.content
            }));

            const res = await fetch("/api/ai-lab", {
                method: "POST",
                body: JSON.stringify({ messages: apiMessages, model }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();

            setHistory(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "ai", content: data.content };
                return updated;
            });
        } catch (error) {
            setHistory(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "ai", content: "Error connecting to AI. Try again." };
                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[350px] sm:w-[400px] h-[550px] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4 text-primary" />
                                <span className="font-bold text-sm">Adnan's Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-secondary rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                            {history.map((msg, idx) => (
                                <div key={idx} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}>
                                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1", msg.role === "user" ? "bg-secondary" : "bg-primary text-primary-foreground")}>
                                        {msg.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 animate-pulse text-primary-foreground" />}
                                    </div>
                                    <div className={cn("text-xs leading-relaxed max-w-[80%] p-3 rounded-2xl", msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary/50 text-foreground rounded-tl-none")}>
                                        {msg.content === "..." ? "Thinking..." : (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                                {msg.content}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-card">
                            <form onSubmit={handleSubmit} className="relative">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full bg-secondary border border-border rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none min-h-[44px] max-h-[120px]"
                                    rows={1}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                />
                                <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 bottom-2 p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50">
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group",
                    isOpen ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
                )}
            >
                {isOpen ? <X className="w-6 h-6" /> : (
                    <div className="relative">
                        <Bot className="w-6 h-6 animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-primary animate-ping" />
                    </div>
                )}
            </button>
        </div>
    );
}
