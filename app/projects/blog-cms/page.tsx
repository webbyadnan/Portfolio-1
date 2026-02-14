"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Search,
    Bookmark,
    Share2,
    Clock,
    Eye,
    ArrowRight,
    ChevronRight,
    TrendingUp,
    Mail,
    Feather,
    Menu,
    X,
    ArrowLeft,
    User,
    Hash
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Mock Data ---
const POSTS = [
    {
        id: 1,
        title: "The Future of Hyper-Personalized AI Interfaces",
        excerpt: "Exploring how generative design and user-centric LLMs are reshaping the way we interact with digital machinery.",
        author: "Adnan Khan",
        date: "Feb 14, 2026",
        category: "AI & Design",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        featured: true
    },
    {
        id: 2,
        title: "Architecting Scalable Micro-Frontends in 2026",
        excerpt: "Why the industry is moving back to modularity and how 'Nexus-Core' is leading the transition.",
        author: "Adnan Khan",
        date: "Feb 12, 2026",
        category: "Engineering",
        readTime: "12 min",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: 3,
        title: "The Death of Static Typography",
        excerpt: "Fluid type scales and variable weighting are no longer optional—they are the soul of the modern web.",
        author: "Adnan Khan",
        date: "Feb 10, 2026",
        category: "Typography",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
        featured: false
    },
    {
        id: 4,
        title: "Quantum State Management with React 20",
        excerpt: "A deep dive into the new concurrent rendering patterns and how they eliminate traditional boilerplate.",
        author: "Adnan Khan",
        date: "Feb 08, 2026",
        category: "Development",
        readTime: "15 min",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        featured: false
    }
];

const CATEGORIES = ["All", "AI & Design", "Engineering", "Typography", "Development", "Cybersecurity"];

export default function BlogCMS() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const filteredPosts = useMemo(() => {
        return POSTS.filter(p => {
            const matchesCategory = activeCategory === "All" || p.category === activeCategory;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0] font-sans selection:bg-blue-500/30">
            {/* --- Sticky Header --- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#020205]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/projects/blog-cms" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 group">
                        <Feather className="w-6 h-6 text-blue-500 group-hover:rotate-12 transition-transform" />
                        INSIGHT<span className="text-blue-500">.</span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-10">
                        {["Articles", "Series", "Archive", "Newsletter"].map(item => (
                            <Link key={item} href="#" className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <button className="text-slate-500 hover:text-white"><Search className="w-5 h-5" /></button>
                        <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
                        <Button size="sm" className="hidden sm:flex rounded-full bg-blue-600 font-bold hover:bg-blue-700 h-9 px-6 text-[10px] tracking-widest uppercase">
                            Subscribe
                        </Button>
                        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 lg:px-12">

                    {/* --- Featured Highlight --- */}
                    {activeCategory === "All" && POSTS.slice(0, 1).map(post => (
                        <motion.section
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-24 relative overflow-hidden rounded-[4rem] bg-[#0A0A1F] border border-white/5 group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-12 lg:p-24 flex flex-col justify-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 block">Featured Analysis</span>
                                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                                        {post.title}
                                    </h1>
                                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <Button className="h-14 px-10 rounded-full bg-white text-black font-black text-xs hover:bg-blue-600 hover:text-white transition-all">
                                            READ ARTICLE <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">AK</div>
                                            <span className="text-xs font-bold text-slate-500">{post.readTime} reading</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                                    <img src={post.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A1F] to-transparent hidden lg:block" />
                                </div>
                            </div>
                        </motion.section>
                    ))}

                    {/* --- Categories & Search Bar --- */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-white/5 pb-10">
                        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-4 md:pb-0">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-6 h-10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                                        activeCategory === cat
                                            ? "bg-blue-600 text-white"
                                            : "bg-white/5 text-slate-500 border border-white/5 hover:border-blue-500/30"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                            <input
                                type="text"
                                placeholder="Filter by title..."
                                className="w-full h-12 bg-white/2 border border-white/5 rounded-2xl pl-12 pr-4 text-xs font-bold outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* --- Main Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post, idx) => (
                                <motion.article
                                    layout
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group flex flex-col"
                                >
                                    <Link href="#" className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-8 border border-white/5 block">
                                        <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                                            {post.category}
                                        </div>
                                    </Link>

                                    <div className="px-2 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">
                                            <span>{post.date}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            <span>{post.readTime}</span>
                                        </div>
                                        <Link href="#">
                                            <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-500 transition-colors">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-[10px]">AK</div>
                                                <span className="text-xs font-bold text-slate-400">Adnan Khan</span>
                                            </div>
                                            <button className="p-2 text-slate-600 hover:text-white transition-colors">
                                                <Bookmark className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* --- Newsletter / CTA --- */}
                    <section className="mt-32 p-12 lg:p-24 rounded-[4rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-white/5 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <TrendingUp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-blue-500/5 rotate-12" />
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 block">Stay Informed</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                                JOIN THE INSIGHT LIST.
                            </h2>
                            <p className="text-slate-400 text-lg mb-12">
                                Weekly deep-dives into software architecture, design psychology, and the future of human-AI collaboration.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-bold outline-none focus:border-blue-500/50 transition-all"
                                />
                                <Button className="h-14 px-10 rounded-2xl bg-white text-black font-black hover:bg-blue-600 hover:text-white transition-all">
                                    JOIN NOW
                                </Button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>

            {/* --- Footer --- */}
            <footer className="container mx-auto px-6 py-24 border-t border-white/5">
                <div className="flex flex-col lg:flex-row justify-between gap-12 text-center lg:text-left">
                    <div className="max-w-xs mx-auto lg:mx-0">
                        <div className="text-2xl font-black tracking-tighter text-white mb-6">INSIGHT<span className="text-blue-500">.</span></div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            A professional journal by Adnan Khan. Exploring the intersection of high-fidelity code and user-centered design.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
                        {[
                            { title: "Network", links: ["Twitter", "LinkedIn", "GitHub"] },
                            { title: "Resources", links: ["Style Guide", "Components", "Docs"] },
                            { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
                            { title: "Contact", links: ["Support", "Hire", "Talk"] }
                        ].map(group => (
                            <div key={group.title}>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">{group.title}</h4>
                                <ul className="space-y-4">
                                    {group.links.map(link => (
                                        <li key={link}><Link href="#" className="text-xs font-bold text-slate-600 hover:text-white transition-colors">{link}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-700 text-[10px] font-black uppercase tracking-widest">© 2026 insight journal inc.</p>
                    <Link href="/projects" className="inline-flex items-center gap-2 text-blue-500 font-bold hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Back to Project Hub
                    </Link>
                </div>
            </footer>
        </div>
    );
}
