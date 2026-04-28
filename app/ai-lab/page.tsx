"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Zap, Brain, Atom, User, Trash2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Message = {
    role: "user" | "ai" | "system";
    content: string;
};

const INITIAL_MESSAGE: Message = {
    role: "ai",
    content: "Hi there! I am Adnan's Digital Twin and Assistant. You can ask me anything about his skills, projects, and background, or use me to help with your daily coding tasks. How can I help you today?"
};

export default function AILabPage() {
    const [input, setInput] = useState("");
    const [model, setModel] = useState<"groq" | "deepseek">("groq");
    const [history, setHistory] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Load history from localStorage on mount
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

    // Save history to localStorage on change
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("adnan-assistant-history", JSON.stringify(history));
        }
    }, [history]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isLoading]);

    const handleClearChat = () => {
        if (confirm("Are you sure you want to clear the conversation history?")) {
            setHistory([INITIAL_MESSAGE]);
            localStorage.removeItem("adnan-assistant-history");
            inputRef.current?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentInput = input;
        if (!currentInput.trim() || isLoading) return;

        setInput("");
        setIsLoading(true);

        const newHistory = [...history, { role: "user" as const, content: currentInput }];
        
        setHistory([
            ...newHistory,
            { role: "ai", content: "..." }
        ]);

        try {
            // Map our local history to the API format (ignoring initial if needed, but we can pass it all)
            const apiMessages = newHistory.map(msg => ({
                role: msg.role === 'ai' ? 'assistant' : 'user',
                content: msg.content
            }));

            const res = await fetch("/api/ai-lab", {
                method: "POST",
                body: JSON.stringify({
                    messages: apiMessages,
                    model
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();

            setHistory(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "ai", content: data.content };
                return updated;
            });
        } catch (error) {
            console.error("AI Lab Error:", error);
            setHistory(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { 
                    role: "ai", 
                    content: "System Error: Connection failed. Please try again." 
                };
                return updated;
            });
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    return (
        <main className="h-[100dvh] md:min-h-screen pt-20 md:pt-28 pb-4 md:pb-12 bg-background text-foreground flex flex-col">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl flex-1 flex flex-col min-h-0">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">Adnan's Assistant</h1>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Your personal digital twin. Ask about Adnan or use me as a coding assistant!
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleClearChat}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                            title="Clear Chat"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex p-1 bg-secondary rounded-lg border border-border">
                            <button
                                onClick={() => setModel("groq")}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
                                    model === "groq" ? "bg-background text-foreground shadow-sm border border-border/50" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Zap className="w-3.5 h-3.5" /> Fast
                            </button>
                            <button
                                onClick={() => setModel("deepseek")}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors",
                                    model === "deepseek" ? "bg-background text-foreground shadow-sm border border-border/50" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Brain className="w-3.5 h-3.5" /> Logic
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Interface Area */}
                <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm relative min-h-0">
                    
                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 scrollbar-hide">
                        {history.map((msg, idx) => (
                            <div key={idx} className={cn("flex gap-4 max-w-[95%] md:max-w-[85%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto")}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                                    msg.role === "user" ? "bg-secondary" : "bg-primary text-primary-foreground"
                                )}>
                                    {msg.role === "user" ? <User className="w-4 h-4 text-muted-foreground" /> : <Atom className="w-4 h-4 animate-[spin_4s_linear_infinite]" />}
                                </div>
                                
                                <div className="space-y-1 overflow-hidden min-w-0">
                                    <div className={cn(
                                        "flex items-center gap-2 text-xs font-semibold mb-1",
                                        msg.role === "user" ? "justify-end text-muted-foreground" : "text-primary"
                                    )}>
                                        {msg.role === "user" ? "You" : "Adnan's Assistant"}
                                    </div>
                                    
                                    <div className={cn(
                                        "text-sm leading-relaxed prose prose-invert max-w-none break-words",
                                        msg.role === "user" ? "text-right" : "text-foreground"
                                    )}>
                                        {msg.content === "..." ? (
                                            <span className="flex items-center gap-1 text-muted-foreground py-2">
                                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </span>
                                        ) : (
                                            msg.role === "user" ? (
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            ) : (
                                                <ReactMarkdown 
                                                    remarkPlugins={[remarkGfm]} 
                                                    rehypePlugins={[rehypeHighlight]}
                                                    components={{
                                                        p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                                                        pre: ({node, ...props}) => <pre className="bg-[#0d1117] border border-border rounded-lg p-4 my-3 overflow-x-auto text-xs font-mono shadow-sm" {...props} />,
                                                        code: ({node, className, children, ...props}) => {
                                                            const match = /language-(\w+)/.exec(className || '');
                                                            const isInline = !match && !className?.includes('hljs');
                                                            return isInline 
                                                                ? <code className="bg-secondary/50 text-primary border border-border/50 rounded px-1.5 py-0.5 text-[0.8em] font-mono" {...props}>{children}</code>
                                                                : <code className={className} {...props}>{children}</code>;
                                                        },
                                                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                                                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                                                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                                                        a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                                        strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                                                        h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                                        h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-4 mb-2" {...props} />,
                                                        h3: ({node, ...props}) => <h3 className="text-base font-bold mt-3 mb-2" {...props} />,
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 md:p-4 border-t border-border bg-card shrink-0">
                        <form onSubmit={handleSubmit} className="relative flex items-end">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me about Adnan's projects, skills, or ask a coding question..."
                                disabled={isLoading}
                                className="w-full bg-background border border-border rounded-xl pl-4 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none min-h-[56px] max-h-[150px] text-base md:text-sm disabled:opacity-50 shadow-inner scrollbar-hide"
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 bottom-2 h-[40px] w-[40px] flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}
