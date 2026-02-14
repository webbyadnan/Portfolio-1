"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Layout,
    Palette,
    Settings,
    Wand2,
    Rocket,
    Eye,
    Check,
    ChevronRight,
    ArrowLeft,
    ArrowRight,
    Monitor,
    Smartphone,
    Tablet,
    Layers,
    Code2,
    Globe,
    Zap,
    Star,
    Cpu
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Types ---
type Step = "identity" | "style" | "content" | "review";

const THEMES = [
    { id: "dark-glass", name: "Midnight Glass", color: "bg-slate-900", accent: "blue" },
    { id: "brutal", name: "Neo Brutalist", color: "bg-white", accent: "black" },
    { id: "monochrome", name: "Architect Mono", color: "bg-[#050505]", accent: "slate" },
    { id: "vibes", name: "Cyber Sunset", color: "bg-purple-950", accent: "pink" }
];

export default function AIPortfolioBuilder() {
    const [step, setStep] = useState<Step>("identity");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const progress = useMemo(() => {
        if (step === "identity") return 25;
        if (step === "style") return 50;
        if (step === "content") return 75;
        return 100;
    }, [step]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setIsComplete(true);
        }, 3000);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0] font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">

            {/* --- Stepper Header --- */}
            <header className="h-20 border-b border-white/5 bg-[#020205]/80 backdrop-blur-xl flex items-center justify-between px-8 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/projects" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-black tracking-tighter uppercase italic">NexusGen.</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {["Identity", "Style", "Content", "Review"].map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border",
                                progress >= (i + 1) * 25 ? "bg-blue-600 border-blue-600 text-white" : "border-white/10 text-slate-600"
                            )}>
                                {progress > (i + 1) * 25 ? <Check className="w-3 h-3" /> : (i + 1)}
                            </div>
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest",
                                step.toLowerCase() === s.toLowerCase() ? "text-white" : "text-slate-600"
                            )}>{s}</span>
                            {i < 3 && <div className="h-[1px] w-6 bg-white/5 mx-2" />}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">
                        Drafts
                    </Button>
                </div>
            </header>

            {/* --- Main Content Area --- */}
            <main className="flex-1 flex overflow-hidden">

                {/* Left: Configuration Panel */}
                <div className="w-full lg:w-[450px] border-r border-white/5 h-full p-10 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                    <div>
                        <AnimatePresence mode="wait">
                            {step === "identity" && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Basic Identity</span>
                                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Who are you?</h2>
                                        <p className="text-slate-500 text-sm leading-relaxed">Let's start with your legacy details. This will seed the AI generation engine.</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#404040]">Legal Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Adnan Khan"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-bold focus:border-blue-500/50 transition-all outline-none"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#404040]">Craft / Role</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Senior OS Architect"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-bold focus:border-blue-500/50 transition-all outline-none"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === "style" && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 mb-4 block">Visual Language</span>
                                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Aesthetic Mood.</h2>
                                        <p className="text-slate-500 text-sm leading-relaxed">Choose the design tokens that best represent your digital presence.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {THEMES.map(theme => (
                                            <button
                                                key={theme.id}
                                                onClick={() => setSelectedTheme(theme)}
                                                className={cn(
                                                    "relative p-6 rounded-3xl border transition-all text-left group",
                                                    selectedTheme.id === theme.id ? "bg-white/5 border-blue-500/50" : "bg-white/2 border-white/5 hover:border-white/20"
                                                )}
                                            >
                                                <div className={cn("w-10 h-10 rounded-xl mb-4 shadow-xl", theme.color)} />
                                                <h4 className="text-sm font-bold text-white group-hover:text-blue-500 transition-colors">{theme.name}</h4>
                                                {selectedTheme.id === theme.id && <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white"><Check className="w-3 h-3" /></div>}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === "content" && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block">Component Stack</span>
                                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Core Sections.</h2>
                                        <p className="text-slate-500 text-sm leading-relaxed">Select the architectural blocks you want to include in your structure.</p>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { id: "hero", name: "High-Fidelity Hero", icon: Sparkles },
                                            { id: "projects", name: "Project Showcases", icon: Layout },
                                            { id: "skills", name: "Skill Matrices", icon: Zap },
                                            { id: "contact", name: "Connect Portal", icon: Globe }
                                        ].map(section => (
                                            <div key={section.id} className="flex items-center justify-between p-5 rounded-[2rem] bg-white/2 border border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500"><section.icon className="w-5 h-5" /></div>
                                                    <span className="text-sm font-bold text-white">{section.name}</span>
                                                </div>
                                                <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full translate-x-6" /></div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === "review" && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-4 block">Final Sync</span>
                                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">Ready for Launch.</h2>
                                        <p className="text-slate-500 text-sm leading-relaxed">The AI has prepared your blueprint. Initiate deployment to finalize your portfolio.</p>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5">
                                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-sm">AK</div>
                                            <div>
                                                <h4 className="font-bold text-white uppercase">{name || "Adnan Khan"}</h4>
                                                <p className="text-xs text-slate-500 font-medium">{role || "System Architect"}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4 text-xs font-bold text-slate-400">
                                            <div className="flex justify-between"><span>Active Theme</span><span className="text-white">{selectedTheme.name}</span></div>
                                            <div className="flex justify-between"><span>Sections</span><span className="text-white">4 Applied</span></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="pt-10 flex items-center gap-4">
                        {step !== "identity" && (
                            <Button
                                onClick={() => setStep(step === "review" ? "content" : step === "content" ? "style" : "identity")}
                                variant="outline"
                                className="h-14 px-8 rounded-2xl border-white/10 bg-transparent text-white font-black text-xs hover:bg-white/5"
                            >
                                BACK
                            </Button>
                        )}
                        {step !== "review" ? (
                            <Button
                                onClick={() => setStep(step === "identity" ? "style" : step === "style" ? "content" : "review")}
                                className="flex-1 h-14 rounded-2xl bg-white text-black font-black text-xs hover:bg-blue-600 hover:text-white transition-all group"
                            >
                                CONTINUE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating || isComplete}
                                className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                            >
                                {isGenerating ? "OPTIMIZING PIPELINE..." : isComplete ? "LAUNCHED" : (
                                    <><Wand2 className="mr-2 w-4 h-4" /> GENERATE PORTFOLIO</>
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Right: Live Preview Panel */}
                <div className="hidden lg:block relative flex-1 bg-[#050508] p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5"><Layers className="w-48 h-48 rotate-12" /></div>

                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#404040]">
                            <span>Real-time Preview Simulation</span>
                            <div className="flex gap-4">
                                <Monitor className="w-4 h-4 text-white" />
                                <Tablet className="w-4 h-4" />
                                <Smartphone className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <AnimatePresence mode="wait">
                                {isGenerating ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <div className="w-32 h-32 relative mb-12">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 rounded-[2rem] border-2 border-dashed border-blue-500/30"
                                            />
                                            <motion.div
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-4 rounded-full border-2 border-double border-white/10"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center"><Zap className="w-8 h-8 text-blue-500 animate-pulse" /></div>
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-4">Nexus Engine is Active</h3>
                                        <p className="text-slate-500 text-xs font-medium max-w-xs leading-relaxed">Assembling high-fidelity components, optimizing texture maps, and injecting custom typography...</p>
                                    </motion.div>
                                ) : isComplete ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center">
                                        <div className="p-1 w-full max-w-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-600 rounded-[3rem] shadow-2xl shadow-blue-600/20">
                                            <div className="bg-[#050510] h-[500px] rounded-[2.9rem] p-10 flex flex-col items-center justify-center text-center overflow-hidden relative">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
                                                <div className="w-20 h-20 rounded-full bg-slate-800 border border-white/10 mb-8 flex items-center justify-center font-black text-2xl">AK</div>
                                                <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">I AM {name || "ADNAN KHAN"}</h1>
                                                <p className="text-slate-500 text-sm uppercase tracking-[0.4em] font-black">{role || "SYSTEM ARCHITECT"}</p>

                                                <div className="mt-12 grid grid-cols-2 gap-4 w-full px-12">
                                                    <div className="h-2 rounded-full bg-blue-600/20 border border-blue-500/10" />
                                                    <div className="h-2 rounded-full bg-blue-600/20 border border-blue-500/10" />
                                                    <div className="h-2 rounded-full bg-blue-600/20 border border-blue-500/10" />
                                                    <div className="h-2 rounded-full bg-blue-600/20 border border-blue-500/10" />
                                                </div>

                                                <Button className="mt-12 rounded-full bg-white text-black font-black text-[10px] px-10 h-12 uppercase tracking-widest shadow-xl">Explore Showcase</Button>
                                            </div>
                                        </div>
                                        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Portfolio Compiled Successfully</p>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full rounded-[3.5rem] bg-[#0A0A15] border border-white/5 p-12 relative overflow-hidden flex flex-col items-center justify-center text-center">
                                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                                            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600 blur-[100px] rounded-full" />
                                            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600 blur-[100px] rounded-full" />
                                        </div>

                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 mx-auto"><Monitor className="w-6 h-6 text-slate-400" /></div>
                                            <h3 className="text-2xl font-black text-white mb-4 italic uppercase tracking-tighter">Blueprint Active.</h3>
                                            <p className="text-slate-500 text-xs font-medium max-w-xs leading-relaxed mx-auto">Complete the generator manual on the left to see your high-fidelity portfolio evolve in real-time.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-12 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#202020]">
                            <span>Engine Status: Listen</span>
                            <span>Latency: 1.2ms</span>
                            <span>Buffer: Flush</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
