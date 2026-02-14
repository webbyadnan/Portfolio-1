"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Network,
    Terminal,
    Code2,
    Activity,
    Zap,
    ShieldCheck,
    Cpu,
    Database,
    Search,
    ChevronRight,
    Play,
    Copy,
    Check,
    Globe,
    Lock,
    MessageSquare,
    Users,
    Image as ImageIcon,
    ArrowLeft,
    Braces,
    LogOut,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- API Schema Definitions ---
const ENDPOINTS = [
    {
        id: "get-posts",
        method: "GET",
        path: "/v1/posts",
        description: "Retrieve a paginated list of global posts with social engagement metrics.",
        params: [
            { name: "limit", type: "integer", desc: "Max number of items to return (1-100)." },
            { name: "offset", type: "integer", desc: "Number of items to skip." },
            { name: "filter", type: "string", desc: "Filter by tag or category." }
        ],
        response: {
            status: 200,
            body: {
                success: true,
                data: [
                    { id: "p_942", content: "Architecture is the soul of software.", author_id: "u_101", likes: 1420 }
                ],
                meta: { total: 4291, page: 1 }
            }
        }
    },
    {
        id: "post-stream",
        method: "POST",
        path: "/v1/broadcast",
        description: "Create a real-time broadcast to all subscribed listeners in the network.",
        params: [
            { name: "content", type: "string", desc: "The message body (max 2000 chars)." },
            { name: "media_urns", type: "array", desc: "Identifiers for uploaded assets." }
        ],
        response: {
            status: 201,
            body: {
                id: "b_882",
                broadcast_at: "2026-02-14T12:00:00Z",
                nodes: 14
            }
        }
    },
    {
        id: "auth-verify",
        method: "PATCH",
        path: "/v1/iam/verify",
        description: "Verify biometrics or security tokens for high-privileged operations.",
        params: [
            { name: "challenge_id", type: "uuid", desc: "Unique ID from the initiation step." },
            { name: "signature", type: "string", desc: "Ed25519 signature of the payload." }
        ],
        response: {
            status: 200,
            body: { verified: true, ttl: 3600 }
        }
    }
];

// --- Components ---

const CodeBlock = ({ code, language = "json" }: { code: any, language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(code, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors backdrop-blur-md"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <pre className="bg-[#050508] p-6 rounded-2xl border border-white/5 overflow-x-auto text-xs font-mono leading-relaxed text-blue-400/80 custom-scrollbar">
                {JSON.stringify(code, null, 2)}
            </pre>
        </div>
    );
};

export default function NexConnectAPI() {
    const [activeEndpoint, setActiveEndpoint] = useState(ENDPOINTS[0]);
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const simulateRequest = () => {
        setIsTesting(true);
        setTestResult(null);
        setTimeout(() => {
            setTestResult(activeEndpoint.response);
            setIsTesting(false);
        }, 1200);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050508] text-[#E0E0E0] font-mono selection:bg-blue-500/30">

            {/* --- Terminal Navbar --- */}
            <header className="h-20 fixed top-0 left-0 right-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/projects/social-media-api" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <Network className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-black text-white tracking-widest uppercase italic">NexConnect v1.4</span>
                    </Link>
                    <div className="hidden md:flex bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">
                        Operational
                    </div>
                </div>

                <nav className="hidden lg:flex items-center gap-8">
                    {["Endpoint Ref", "Webhooks", "Security", "Uptime"].map(t => (
                        <Link key={t} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">{t}</Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors"><Search className="w-4 h-4" /></button>
                    <Button variant="outline" className="h-9 px-4 rounded-xl border-white/10 bg-white/2 text-white font-bold text-[10px] hover:bg-white/5 space-x-2">
                        <LogOut className="w-3 h-3" /> <span>Developer Hub</span>
                    </Button>
                </div>
            </header>

            <main className="pt-32 pb-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- Left Column: Navigation --- */}
                    <aside className="lg:col-span-3 space-y-10">
                        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#404040] mb-6">Service Catalog</h4>
                            <div className="space-y-2">
                                {ENDPOINTS.map(ep => (
                                    <button
                                        key={ep.id}
                                        onClick={() => setActiveEndpoint(ep)}
                                        className={cn(
                                            "w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 group",
                                            activeEndpoint.id === ep.id ? "bg-blue-600/10 border border-blue-500/30" : "hover:bg-white/2"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-[8px] font-black px-1.5 py-0.5 rounded border",
                                            ep.method === "GET" ? "text-emerald-500 border-emerald-500/30" :
                                                ep.method === "POST" ? "text-blue-500 border-blue-500/30" :
                                                    "text-amber-500 border-amber-500/30"
                                        )}>
                                            {ep.method}
                                        </span>
                                        <span className={cn(
                                            "text-[11px] font-bold tracking-tight truncate transition-colors",
                                            activeEndpoint.id === ep.id ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                                        )}>
                                            {ep.path}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 pb-12 rounded-[2rem] bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/5">
                            <Activity className="w-6 h-6 text-indigo-500 mb-6" />
                            <h5 className="text-xs font-black text-white uppercase tracking-widest mb-2">Protocol Health</h5>
                            <p className="text-[10px] text-slate-500 leading-relaxed mb-6">Global latency averages 24ms. Cluster 04 (EMEA) scaling due to traffic.</p>
                            <div className="grid grid-cols-5 gap-1">
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className="h-4 bg-emerald-500/60 rounded-[1px] shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* --- Center: Documentation --- */}
                    <div className="lg:col-span-9 space-y-12">

                        {/* Hero Intro */}
                        <motion.div
                            key={activeEndpoint.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-blue-500 uppercase tracking-widest">{activeEndpoint.method}</span>
                                <h2 className="text-3xl font-black text-white tracking-tighter">{activeEndpoint.path}</h2>
                            </div>
                            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                                {activeEndpoint.description}
                            </p>
                        </motion.div>

                        {/* Request Configuration */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5">
                                    <SectionTitle icon={Terminal} title="Parameters" />
                                    <div className="space-y-6 mt-8">
                                        {activeEndpoint.params.map(param => (
                                            <div key={param.name} className="flex items-start justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <code className="text-blue-500 font-bold text-xs">{param.name}</code>
                                                        <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest">{param.type}</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-500">{param.desc}</p>
                                                </div>
                                                <span className="text-[9px] font-bold text-slate-700">Required</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-[#0A0A0F] border border-white/5">
                                    <SectionTitle icon={Play} title="Console Emulator" />
                                    <div className="mt-8">
                                        <Button
                                            onClick={simulateRequest}
                                            disabled={isTesting}
                                            className="w-full h-14 rounded-2xl bg-white text-black font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-600/5 group"
                                        >
                                            {isTesting ? "PROCESSING..." : (
                                                <>EXECUTE CALL <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5"><Braces className="w-24 h-24" /></div>
                                    <SectionTitle icon={Zap} title="Expected Response" />
                                    <div className="mt-8">
                                        <CodeBlock code={activeEndpoint.response.body} />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {testResult && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">HTTP 200 OK</span>
                                                <span className="text-[10px] text-slate-500 font-bold">Latency: 18ms</span>
                                            </div>
                                            <CodeBlock code={testResult.body} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Interactive Usage Graph placeholder */}
                        <div className="p-12 rounded-[3.5rem] bg-[#0A0A0F] border border-white/5 relative group">
                            <div className="flex items-center justify-between mb-12">
                                <SectionTitle icon={Activity} title="Live Infrastructure" />
                                <div className="flex gap-2">
                                    {['US', 'EU', 'AS'].map(r => <span key={r} className="px-2 py-1 bg-white/5 rounded text-[8px] font-black text-slate-500">{r}</span>)}
                                </div>
                            </div>
                            <div className="h-48 flex items-end gap-1.5">
                                {[...Array(40)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${Math.random() * 80 + 10}%` }}
                                        transition={{ delay: i * 0.01, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                                        className="flex-1 bg-blue-500/20 group-hover:bg-blue-500/40 transition-colors rounded-t-sm"
                                    />
                                ))}
                            </div>
                            <div className="mt-8 flex items-center justify-center text-[10px] font-black text-[#202020] uppercase tracking-[0.4em]">
                                Encrypted Tunnel Established • Ed25519 Validated
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <footer className="container mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-24">
                <div className="flex items-center gap-6">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-blue-500 font-bold hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Exit documentation
                    </Link>
                    <span className="text-slate-700 text-[10px] font-black uppercase tracking-widest opacity-50">v1.4.2-stable</span>
                </div>
                <div className="flex items-center gap-10">
                    {['Status', 'GitHub', 'Email'].map(t => <Link key={t} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">{t}</Link>)}
                </div>
            </footer>
        </div>
    );
}

function SectionTitle({ icon: Icon, title }: any) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-500" />
            </div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest">{title}</h4>
        </div>
    );
}
