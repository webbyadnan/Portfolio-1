"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Settings,
    Search,
    Bell,
    Plus,
    MoreVertical,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Filter,
    Layers,
    Clock,
    ChevronRight,
    TrendingUp,
    Activity,
    LogOut,
    User,
    ArrowLeft,
    Command,
    HelpCircle,
    Globe,
    Zap,
    Shield,
    Cpu,
    Monitor,
    Database
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from "recharts";

// --- Design Tokens & Constants ---
const COLORS = {
    primary: "#3B82F6",
    accent: "#8B5CF6",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    bg: "#050508",
    card: "rgba(10, 10, 18, 0.4)",
    border: "rgba(255, 255, 255, 0.05)",
    textMain: "#F8FAFC",
    textMuted: "#64748B"
};

const CHART_DATA = [
    { time: "00:00", reqs: 420, latency: 120 },
    { time: "04:00", reqs: 320, latency: 110 },
    { time: "08:00", reqs: 850, latency: 240 },
    { time: "12:00", reqs: 1420, latency: 180 },
    { time: "16:00", reqs: 1100, latency: 150 },
    { time: "20:00", reqs: 900, latency: 130 },
    { time: "23:59", reqs: 550, latency: 140 },
];

const SERVER_STATIONS = [
    { id: "us-east", name: "US East (N. Virginia)", status: "Operational", load: 42, health: 99 },
    { id: "eu-west", name: "EU West (Dublin)", status: "Operational", load: 68, health: 98 },
    { id: "ap-south", name: "Asia Pacific (Mumbai)", status: "High Load", load: 91, health: 94 },
];

// --- Hand-crafted Sub-components ---

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm font-bold text-white">
                            {entry.value.toLocaleString()} {entry.name === "reqs" ? "requests" : "ms"}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const NavigationItem = ({ icon: Icon, name, active, onClick, badge }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "relative w-full flex items-center gap-4 px-4 h-11 rounded-xl text-sm font-medium transition-all duration-300 group",
            active ? "bg-white/5 text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
        )}
    >
        {active && (
            <motion.div
                layoutId="nav-pill"
                className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
            />
        )}
        <Icon className={cn("w-4 h-4 transition-colors", active ? "text-blue-500" : "group-hover:text-blue-400")} />
        <span>{name}</span>
        {badge && (
            <span className="ml-auto flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        )}
    </button>
);

const SectionHeader = ({ title, subtitle, action }: any) => (
    <div className="flex items-end justify-between mb-8">
        <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            <p className="text-xs font-medium text-slate-500 mt-1">{subtitle}</p>
        </div>
        {action && (
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-blue-400 transition-colors">
                {action}
            </button>
        )}
    </div>
);

// --- Main Dashboard Implementation ---

export default function NexusDashboard() {
    const [activeTab, setActiveTab] = useState("insights");
    const [timeframe, setTimeframe] = useState("24h");
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050508] text-[#F8FAFC] font-sans selection:bg-blue-500/30 flex overflow-hidden">

            {/* --- Architectural Sidebar --- */}
            <aside className="hidden lg:flex flex-col w-[280px] h-screen fixed left-0 top-0 border-r border-white/5 bg-[#08080C] z-50">
                <div className="h-20 flex items-center px-8 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                <Command className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-slate-950 border-2 border-white/10" />
                        </div>
                        <span className="text-lg font-black tracking-tighter uppercase italic">Nexus.</span>
                    </Link>
                </div>

                <div className="p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
                    {/* Main Nav */}
                    <div className="space-y-1">
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">Core Engine</p>
                        <NavigationItem icon={LayoutDashboard} name="Operations" active={activeTab === "insights"} onClick={() => setActiveTab("insights")} badge />
                        <NavigationItem icon={Globe} name="Network Stack" active={activeTab === "network"} onClick={() => setActiveTab("network")} />
                        <NavigationItem icon={Database} name="Data Lake" active={activeTab === "data"} onClick={() => setActiveTab("data")} />
                    </div>

                    {/* Management */}
                    <div className="space-y-1">
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">Governance</p>
                        <NavigationItem icon={Users} name="Access Control" active={activeTab === "access"} onClick={() => setActiveTab("access")} />
                        <NavigationItem icon={Shield} name="Security Audit" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
                        <NavigationItem icon={Settings} name="Architecture" active={activeTab === "config"} onClick={() => setActiveTab("config")} />
                    </div>

                    {/* Quick Stats Sidebar Widget */}
                    <div className="mt-8 px-2">
                        <div className="p-5 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#404040]">Resources</span>
                                <Activity className="w-3 h-3 text-emerald-500" />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] mb-1.5">
                                        <span className="text-slate-400 font-bold">Quantum Memory</span>
                                        <span className="text-white font-black">62%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: "62%" }} className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] mb-1.5">
                                        <span className="text-slate-400 font-bold">CPU Threading</span>
                                        <span className="text-white font-black">18%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: "18%" }} className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-white/5">
                    <Link href="/projects" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white transition-colors text-xs font-bold bg-white/2 rounded-xl group/exit">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover/exit:-translate-x-1" />
                        <span>Back to Hub</span>
                    </Link>
                </div>
            </aside>

            {/* --- Main Dashboard View --- */}
            <main className="flex-1 lg:ml-[280px] h-screen overflow-y-auto bg-[#050508] relative group/main">
                {/* Subtle Background Glows - Hand-placed */}
                <div className="fixed inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full" />
                    <div className="absolute bottom-[5%] left-[5%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
                </div>

                {/* Global Toolbar */}
                <header className="h-20 flex items-center justify-between px-10 sticky top-0 z-40 bg-[#050508]/60 backdrop-blur-3xl border-b border-white/[0.03]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center px-4 h-10 rounded-xl bg-white/5 border border-white/5 focus-within:border-blue-500/50 transition-all duration-500">
                            <span className="text-[10px] font-black tracking-widest text-[#404040] mr-2">⌘K</span>
                            <input
                                type="text"
                                placeholder="Search Engine..."
                                className="bg-transparent border-none outline-none text-xs w-48 placeholder:text-[#404040] font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">System Online</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/5 mx-2" />
                        <button className="relative p-2 text-slate-500 hover:text-white transition-colors">
                            <Bell className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-[10px]">AK</div>
                        </button>
                    </div>
                </header>

                <div className="p-10 max-w-7xl mx-auto">
                    {/* Dashboard Hero */}
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">
                                <span>Operations</span>
                                <span className="text-slate-800">/</span>
                                <span className="text-slate-300">Insights</span>
                            </nav>
                            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Cluster Overview.</h1>
                            <p className="text-slate-500 font-medium">Monitoring Real-time Node Activity and Latency Buffers.</p>
                        </div>

                        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
                            {['1h', '24h', '7d'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTimeframe(t)}
                                    className={cn(
                                        "px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        timeframe === t ? "bg-white text-black" : "text-slate-500 hover:text-slate-200"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tier 1: Real-time Visuals */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">

                        {/* Main Area Chart - Hand Crafted SVG elements */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-8 p-10 rounded-[2.5rem] bg-[#0A0A0F] border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-10">
                                <Cpu className="w-24 h-24 text-blue-500/5 rotate-12 -mr-6 -mt-6" />
                            </div>

                            <SectionHeader
                                title="Traffic Throughput"
                                subtitle="Packets processed per node interval"
                                action="Metrics View"
                            />

                            <div className="h-[380px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={CHART_DATA}>
                                        <defs>
                                            <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                            <filter id="shadow" height="200%">
                                                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                                                <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
                                                <feMerge>
                                                    <feMergeNode />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(255,255,255,0.02)" />
                                        <XAxis
                                            dataKey="time"
                                            stroke="#475569"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                            fontWeight="bold"
                                        />
                                        <YAxis
                                            stroke="#475569"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            dx={-10}
                                            fontWeight="bold"
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                                        <Area
                                            type="monotone"
                                            dataKey="reqs"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorReq)"
                                            filter="url(#shadow)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Side Status Indicators */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 p-8 rounded-[2.5rem] bg-[#0A0A0F] border border-white/5"
                            >
                                <SectionHeader title="Node Density" subtitle="Current distributed spread" />
                                <div className="h-[200px] w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[{ v: 60, c: '#3B82F6' }, { v: 25, c: '#8B5CF6' }, { v: 15, c: '#10B981' }]}
                                                innerRadius={65}
                                                outerRadius={80}
                                                paddingAngle={8}
                                                dataKey="v"
                                                stroke="none"
                                            >
                                                {SERVER_STATIONS.map((_, i) => <Cell key={i} fill={['#3B82F6', '#8B5CF6', '#10B981'][i]} />)}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black text-white">42</span>
                                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">Active Nodes</span>
                                    </div>
                                </div>
                                <div className="mt-8 space-y-3">
                                    {['North America', 'Europe', 'APAC'].map((reg, i) => (
                                        <div key={reg} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981'][i] }} />
                                                <span className="text-slate-400 font-bold">{reg}</span>
                                            </div>
                                            <span className="text-white font-black">{[60, 25, 15][i]}%</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-blue-600 shadow-[0_20px_40px_rgba(59,130,246,0.2)] text-white"
                            >
                                <TrendingUp className="w-8 h-8 mb-4" />
                                <h4 className="text-xl font-black tracking-tight mb-2">Premium Scale.</h4>
                                <p className="text-blue-100 text-xs font-medium leading-relaxed mb-6 opacity-80">
                                    Your architecture is optimized for 1M+ concurrent TCP streams. No bottlenecks detected.
                                </p>
                                <Button size="sm" className="w-full bg-white text-blue-600 font-black text-[10px] h-10 rounded-xl hover:bg-slate-50">
                                    LEARN MORE
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Tier 2: Inventory / Status Table */}
                    <div className="grid grid-cols-1 gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[3rem] bg-[#0A0A0F] border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                                        <Monitor className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Station Health</h4>
                                        <p className="text-xs text-slate-500">Live monitoring of bare metal clusters</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Total Latency: 42ms
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {SERVER_STATIONS.map((station, i) => (
                                    <div key={station.id} className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/[0.02] transition-all duration-500">
                                        <div className="flex items-center gap-6">
                                            <div className="text-2xl font-black text-slate-800 group-hover:text-blue-500/20 transition-colors">0{i + 1}</div>
                                            <div>
                                                <h5 className="font-bold text-white mb-1">{station.name}</h5>
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#404040]">{station.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-12 mt-4 md:mt-0">
                                            <div className="w-32 hidden md:block">
                                                <div className="flex justify-between text-[10px] mb-2">
                                                    <span className="text-slate-500 font-bold uppercase tracking-widest">Load</span>
                                                    <span className="text-white font-black">{station.load}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${station.load}%` }}
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            station.load > 80 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#404040] mb-1">Health</p>
                                                <p className="text-lg font-black text-white">{station.health}%</p>
                                            </div>

                                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Tooltips or Micro-Interactions could go here */}

                <footer className="p-12 border-t border-white/5 flex flex-col items-center gap-6 mt-12 bg-[#08080C]">
                    <button className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-blue-500 transition-colors">
                        Synchronize Cloud Storage
                    </button>
                    <div className="flex items-center gap-12 text-[#202020] text-[10px] font-black uppercase tracking-[0.2em]">
                        <span>System Log: 11:02:44</span>
                        <span>Kernel: Stable</span>
                        <span>Uptime: 99.999%</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
