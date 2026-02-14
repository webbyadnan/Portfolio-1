"use client";

import { use, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    ArrowLeft,
    Clock,
    Bookmark,
    Share2,
    ChevronLeft,
    ChevronRight,
    Heart,
    MessageCircle,
    Hash,
    Copy,
    Check,
    Twitter,
    Linkedin,
    Github
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Mock Data ---
const POSTS = [
    {
        id: 1,
        title: "The Future of Hyper-Personalized AI Interfaces",
        content: `
      <h2>The Shift in Digital Paradigms</h2>
      <p>Digital interfaces have remained largely static for decades. We interact with grids, buttons, and menus that were designed for mouse-and-keyboard input. However, with the emergence of powerful Large Language Models (LLMs), the very nature of interaction is shifting from explicit commands to nuanced intent.</p>
      
      <blockquote>
        "The best interface is no interface. But the second best interface is one that understands you as deeply as a lifelong collaborator."
      </blockquote>

      <h2>Generative Component Architecture</h2>
      <p>We are entering an era of 'Just-in-Time' UI. Instead of shipping a fixed bundle of React components, imagine a system that generates its own interface elements based on the specific complexity of your request. If you're managing a complex database, the AI drafts a specialized data-grid; if you're composing music, it provides a tailored sequencer.</p>

      <div class="h-[2px] w-full bg-white/5 my-12"></div>

      <h2>Typography as the Soul of Reading</h2>
      <p>In a world of constant noise, the reading experience should be a sanctuary. We prioritize readable leading, sufficient whitespace, and variable font-weights that adapt to the ambient light of your device. This isn't just aesthetic—it's accessibility as a fundamental right.</p>
    `,
        author: "Adnan Khan",
        date: "Feb 14, 2026",
        category: "AI & Design",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    }
];

export default function BlogPostDetail() {
    const params = useParams();
    const [mounted, setMounted] = useState(false);
    const { scrollYProgress } = useScroll();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const post = useMemo(() => {
        return POSTS.find(p => p.id === Number(params.id)) || POSTS[0];
    }, [params.id]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0] font-sans selection:bg-blue-500/30">

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Floating Toolbar */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-32 right-8 hidden lg:flex flex-col gap-4 z-40"
            >
                <button
                    onClick={() => setLiked(!liked)}
                    className={cn(
                        "w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all bg-white/2 backdrop-blur-md",
                        liked ? "bg-red-500/10 text-red-500 border-red-500/20" : "text-slate-500 hover:text-white"
                    )}
                >
                    <Heart className={cn("w-5 h-5", liked && "fill-red-500")} />
                </button>
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all bg-white/2 backdrop-blur-md">
                    <Bookmark className="w-5 h-5" />
                </button>
                <div className="h-[1px] w-8 mx-auto bg-white/5 my-2" />
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all bg-white/2 backdrop-blur-md">
                    <Share2 className="w-4 h-4" />
                </button>
            </motion.div>

            <header className="fixed top-0 left-0 right-0 z-50 bg-[#020205]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/projects/blog-cms" className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to INSIGHT.
                    </Link>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#404040] hidden sm:block">
                        Currently Reading: <span className="text-white">{post.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 hover:text-white"><Twitter className="w-4 h-4" /></button>
                        <button className="text-slate-500 hover:text-white"><Linkedin className="w-4 h-4" /></button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-32">
                <article className="container mx-auto px-6 max-w-4xl">
                    {/* Entry Header */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8">
                            <span className="px-3 py-1 border border-blue-500/20 rounded-full">{post.category}</span>
                            <span className="text-slate-700">•</span>
                            <span className="text-slate-500">{post.date}</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-10 leading-[0.9] tracking-tighter">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-sm">AK</div>
                                <div>
                                    <p className="text-sm font-bold text-white leading-none mb-1">Written by {post.author}</p>
                                    <p className="text-xs text-slate-500 font-medium">Software Architect • 2h ago</p>
                                </div>
                            </div>
                            <div className="h-8 w-[1px] bg-white/5" />
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                                <Clock className="w-4 h-4" /> {post.readTime}
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="aspect-video rounded-[3rem] overflow-hidden mb-20 border border-white/5">
                        <img src={post.image} className="w-full h-full object-cover" />
                    </div>

                    {/* Content Body */}
                    <div className="prose prose-invert max-w-none 
             prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tight prose-h2:mb-8 prose-h2:mt-16
             prose-p:text-xl prose-p:leading-relaxed prose-p:text-slate-400 prose-p:mb-8
             prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-white/2 prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:text-white prose-blockquote:text-2xl
           ">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    {/* Interaction / Community placeholder */}
                    <div className="mt-24 pt-24 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-600/10">
                            <h4 className="text-lg font-black text-white mb-4 italic">Enjoyed this analysis?</h4>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">Support the craft and get early access to subsequent chapters in the Insight series.</p>
                            <div className="flex gap-4">
                                <Button className="flex-1 rounded-xl bg-white text-black font-black text-xs hover:bg-blue-600 hover:text-white h-12 uppercase tracking-widest">Share Article</Button>
                                <Button variant="outline" className="rounded-xl border-white/10 h-12 px-6"><Bookmark className="w-4 h-4" /></Button>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center px-4">
                            <div className="flex items-center gap-3 text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">
                                <MessageCircle className="w-4 h-4 text-blue-500" /> Community Discussion
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Log in to join the architect circle and contribute to the evolution of this design theory. 42 contributors active.
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-32 flex items-center justify-between">
                        <Link href="#" className="flex flex-col gap-2 group max-w-[200px]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                                <ChevronLeft className="w-3 h-3" /> Previous
                            </span>
                            <p className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors line-clamp-2">Scalable Micro-Frontends in 2026</p>
                        </Link>
                        <Link href="#" className="flex flex-col gap-2 group text-right max-w-[200px]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 flex items-center justify-end gap-2">
                                Next <ChevronRight className="w-3 h-3" />
                            </span>
                            <p className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors line-clamp-2">The Death of Static Typography</p>
                        </Link>
                    </div>
                </article>
            </main>

            <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center">
                <p className="text-slate-800 text-[9px] font-black uppercase tracking-[0.5em]">Nexus Insight Engine • Stable v2.0</p>
            </footer>
        </div>
    );
}
