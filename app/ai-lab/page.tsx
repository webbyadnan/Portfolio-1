"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Flame,
    Code2,
    Bug,
    Send,
    Sparkles,
    ChevronRight,
    Zap,
    Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TOOLS = [
    {
        id: "qa",
        name: "Portfolio Q&A",
        description: "Ask anything about Adnan's skills and projects.",
        icon: MessageSquare,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        prompt: "Ask me about Adnan's Next.js experience or his latest projects..."
    },
    {
        id: "roaster",
        name: "Project Roaster",
        description: "Get a witty senior dev critique of your idea.",
        icon: Flame,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        prompt: "Paste your project idea or code here for a roast..."
    },
    {
        id: "generator",
        name: "Component Generator",
        description: "Describe a UI component, get React code.",
        icon: Code2,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        prompt: "Describe the component (e.g. 'A glassy landing page hero')..."
    },
    {
        id: "fixer",
        name: "Error Fixer",
        description: "Paste your error log and get an instant fix.",
        icon: Bug,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        prompt: "Paste your error message or stack trace..."
    }
];

export default function AILabPage() {
    const [activeTool, setActiveTool] = useState(TOOLS[0]);
    const [model, setModel] = useState<"groq" | "deepseek">("groq");
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Record<string, { user: string; ai: string }>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentInput = input;
        if (!currentInput.trim() || isLoading) return;

        // Clear input immediately for better UX
        setInput("");
        setIsLoading(true);

        // Capture the id of the tool that initiated the request
        const currentToolId = activeTool.id;

        // Initialize history with user message and empty AI response
        setHistory(prev => ({
            ...prev,
            [currentToolId]: { user: currentInput, ai: "..." }
        }));

        try {
            const res = await fetch("/api/ai-lab", {
                method: "POST",
                body: JSON.stringify({
                    message: currentInput,
                    type: currentToolId,
                    model
                }),
            });

            if (!res.ok) throw new Error("Failed to fetch");

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) throw new Error("No reader available");

            let accumulated = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                accumulated += decoder.decode(value, { stream: true });

                setHistory(prev => ({
                    ...prev,
                    [currentToolId]: { user: currentInput, ai: accumulated }
                }));
            }
        } catch (error) {
            console.error("AI Lab Error:", error);
            setHistory(prev => ({
                ...prev,
                [currentToolId]: { user: currentInput, ai: "Oops! Something went wrong. Please check your connection and try again." }
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const currentChat = history[activeTool.id];

    return (
        <main className="min-h-screen pt-24 pb-12 bg-slate-950 text-white selection:bg-primary/30">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 mb-2"
                        >
                            AI Lab
                        </motion.h1>
                        <p className="text-slate-400 text-lg">Interactive experiments powered by high-speed neural networks.</p>
                    </div>

                    {/* Model Switcher */}
                    <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
                        <button
                            onClick={() => setModel("groq")}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300",
                                model === "groq" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Zap className="w-4 h-4" /> Groq (Fast)
                        </button>
                        <button
                            onClick={() => setModel("deepseek")}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300",
                                model === "deepseek" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Brain className="w-4 h-4" /> DeepSeek (Logic)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Sidebar / Tool Selection */}
                    <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        {TOOLS.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool)}
                                className={cn(
                                    "relative group flex flex-col p-5 rounded-2xl border transition-all duration-500 text-left overflow-hidden",
                                    activeTool.id === tool.id
                                        ? "bg-slate-900 border-primary/50 ring-1 ring-primary/20"
                                        : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                                )}
                            >
                                <div className={cn("p-2 w-fit rounded-lg mb-4 transition-transform group-hover:scale-110", tool.bgColor)}>
                                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{tool.name}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>

                                {activeTool.id === tool.id && (
                                    <motion.div
                                        layoutId="toolBadge"
                                        className="absolute top-4 right-4"
                                    >
                                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Playground Interface */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[500px]">

                            {/* Interaction UI */}
                            <div className="flex-1 flex flex-col gap-6">
                                <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                                    <div className={cn("p-2 rounded-lg", activeTool.bgColor)}>
                                        <activeTool.icon className={cn("w-5 h-5", activeTool.color)} />
                                    </div>
                                    <h2 className="text-xl font-bold">{activeTool.name} Playground</h2>
                                </div>

                                {/* Response Log */}
                                <div className="flex-1 overflow-y-auto space-y-6 min-h-[250px] relative scrollbar-hide py-4">
                                    <AnimatePresence mode="wait">
                                        {currentChat ? (
                                            <motion.div
                                                key={activeTool.id + currentChat.user}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-6"
                                            >
                                                {/* User Message */}
                                                <div className="flex justify-end">
                                                    <div className="bg-primary/10 border border-primary/20 px-5 py-3 rounded-2xl max-w-[80%] text-sm text-primary-foreground/90">
                                                        {currentChat.user}
                                                    </div>
                                                </div>
                                                {/* AI Response */}
                                                <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                                                    {currentChat.ai}
                                                </div>
                                            </motion.div>
                                        ) : !isLoading && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="h-full flex flex-col items-center justify-center text-slate-600 italic py-12"
                                            >
                                                <activeTool.icon className="w-12 h-12 mb-4 opacity-20" />
                                                Enter a prompt to start {activeTool.name}...
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {isLoading && (
                                        <div className="flex items-center gap-2 text-primary animate-pulse py-2">
                                            <Sparkles className="w-4 h-4" /> Thinking with {model === "groq" ? "Groq" : "DeepSeek"}...
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <form onSubmit={handleSubmit} className="relative group mt-auto">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={activeTool.prompt}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none h-32 text-sm md:text-base"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit(e);
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !input}
                                        className="absolute right-3 bottom-3 h-10 w-10 p-0 rounded-xl bg-primary hover:bg-primary/80 text-white shadow-xl shadow-primary/20"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                            </div>

                            {/* Decorative Mesh */}
                            <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                            <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
                        </div>

                        <p className="text-center text-xs text-slate-600 px-4">
                            Generated content may be inaccurate. Experiments are powered by {model === "groq" ? "Llama 3.3 (Groq)" : "DeepSeek-V3"}.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
