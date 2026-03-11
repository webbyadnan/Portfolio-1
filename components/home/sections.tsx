"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Database, Cloud, Layers, Terminal, Cpu, Globe, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";

// ── DATA ────────────────────────────────────────────────────────────

const techStack = [
    { item: "React", icon: Code2 },
    { item: "Next.js", icon: Globe },
    { item: "TypeScript", icon: Terminal },
    { item: "Node.js", icon: Database },
    { item: "PostgreSQL", icon: Database },
    { item: "Tailwind", icon: Layers },
    { item: "AWS", icon: Cloud },
    { item: "Docker", icon: Cpu },
    { item: "GraphQL", icon: Zap },
    { item: "Firebase", icon: Sparkles },
    { item: "Vercel", icon: Globe },
    { item: "Supabase", icon: Database },
];

const projects = [
    {
        title: "AI Builder",
        desc: "AI-powered landing page builder SaaS — generates stunning, production-ready pages in seconds.",
        tags: ["Next.js", "NestJS", "Groq AI"],
        url: "https://aibuilder.adnanxdev.site/",
        image: "/project-aibuilder.png",
        num: "01",
    },
    {
        title: "Resume AI",
        desc: "Intelligent resume builder that crafts compelling, ATS-optimized resumes tailored to job descriptions.",
        tags: ["Next.js", "Gemini AI", "Firebase"],
        url: "https://resumeai.adnanxdev.site/",
        image: "/project-resumeai.png",
        num: "02",
    },
    {
        title: "xGPT",
        desc: "Multi-model AI chat app supporting GPT-4, Claude, Gemini, and open-source models.",
        tags: ["Next.js", "Groq", "DeepSeek"],
        url: "https://xgpt.adnanxdev.site/",
        image: "/project-xgpt.png",
        num: "03",
    },
];

const stats = [
    { value: "2+", label: "Years building" },
    { value: "15+", label: "Projects shipped" },
    { value: "100%", label: "Client satisfaction" },
];

// ── TYPEWRITER ───────────────────────────────────────────────────────
const Typewriter = memo(function Typewriter({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !deleting) {
            const t = setTimeout(() => setDeleting(true), 1800);
            return () => clearTimeout(t);
        }
        if (subIndex === 0 && deleting) {
            setDeleting(false);
            setIndex((i) => (i + 1) % words.length);
            return;
        }
        const t = setTimeout(() => {
            setSubIndex((s) => s + (deleting ? -1 : 1));
        }, deleting ? 50 : 80);
        return () => clearTimeout(t);
    }, [subIndex, index, deleting, words]);

    return (
        <span>
            {words[index].substring(0, subIndex)}
            <span className="animate-blink text-primary ml-0.5">|</span>
        </span>
    );
});

// ── HERO ─────────────────────────────────────────────────────────────

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
            {/* Background blobs — only 1, with will-change */}
            <div
                className="absolute -top-32 -right-32 w-[500px] h-[500px] animate-blob opacity-15 dark:opacity-8 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #ff6b40 0%, transparent 70%)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', willChange: 'border-radius' }}
            />

            {/* Grid background */}
            <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center">

                    {/* — Left — */}
                    <div>
                        {/* Badge */}
                        <div className="animate-fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Available for Projects
                        </div>

                        {/* Name + role */}
                        <h1 className="animate-fade-up-2 font-display font-bold leading-[1.02] tracking-tight mb-6">
                            <span className="block text-muted-foreground text-lg md:text-xl font-medium mb-2 font-sans">Hi, I&apos;m Adnan Khan —</span>
                            <span className="block text-5xl md:text-6xl xl:text-7xl text-foreground">
                                <Typewriter words={["Full Stack Dev", "SaaS Builder", "UI Craftsman", "Problem Solver"]} />
                            </span>
                        </h1>

                        <p className="animate-fade-up-3 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
                            I build scalable web apps, SaaS products, and AI-powered tools. Clean code, stunning UI, and real results.
                        </p>

                        {/* CTAs */}
                        <div className="animate-fade-up-4 flex flex-wrap gap-3 mb-14">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:opacity-90 transition-all duration-300 glow-strong"
                            >
                                View My Work
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-7 py-4 border border-border bg-secondary text-foreground rounded-2xl font-bold text-sm hover:border-primary hover:text-primary transition-all duration-300"
                            >
                                Contact Me
                            </Link>
                        </div>

                        {/* Stats row */}
                        <div className="animate-fade-up-4 flex gap-8 border-t border-border pt-8">
                            {stats.map((s) => (
                                <div key={s.label}>
                                    <p className="text-3xl font-display font-bold text-primary">{s.value}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 font-medium">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* — Right: Photo card — */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        {/* Spinning deco ring */}
                        <div
                            className="absolute -inset-6 rounded-full border border-dashed border-primary/20 animate-spin-slow"
                            style={{ borderRadius: '50%' }}
                        />

                        {/* Card */}
                        <div className="relative rounded-3xl border border-border overflow-hidden bg-card shadow-2xl animate-float">
                            <img
                                src="/IMG_3862.png"
                                alt="Adnan Khan"
                                className="w-full aspect-[3/4] object-cover object-top"
                            />
                            {/* Overlay info */}
                            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                                <p className="text-white font-display font-bold text-xl">Adnan Khan</p>
                                <p className="text-white/60 text-sm">Full Stack Developer · Swat, Pakistan</p>
                                <div className="flex gap-1.5 mt-3">
                                    {["React", "Next.js", "Node.js"].map(t => (
                                        <span key={t} className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-[10px] font-bold backdrop-blur-sm">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -right-4 top-8 glass p-4 rounded-2xl shadow-xl"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <Star className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold">Top Rated</p>
                                    <p className="text-[10px] text-muted-foreground">100% success rate</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ── TECH STACK MARQUEE ───────────────────────────────────────────────

export function TechStackSection() {
    const doubled = [...techStack, ...techStack];
    return (
        <section className="py-16 border-y border-border overflow-hidden bg-secondary/50">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
                Technologies I work with
            </p>
            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-secondary/50 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-secondary/50 to-transparent pointer-events-none" />
                <div className="animate-marquee">
                    {doubled.map((tech, i) => {
                        const Icon = tech.icon;
                        return (
                            <div
                                key={`${tech.item}-${i}`}
                                className="group flex items-center gap-3 mx-5 px-6 py-3.5 rounded-2xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-default select-none shrink-0"
                            >
                                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                                    {tech.item}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ── PROJECTS ─────────────────────────────────────────────────────────

export function FeaturedProjectsSection() {
    return (
        <section className="py-28 container mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Selected Work</p>
                    <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-none">
                        Projects that<br />
                        <span className="text-gradient">matter.</span>
                    </h2>
                </div>
                <Link
                    href="/projects"
                    className="group hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-border bg-secondary text-sm font-bold hover:border-primary hover:text-primary transition-all duration-300"
                >
                    All Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            {/* Project grid */}
            <div className="space-y-6">
                {projects.map((project, i) => (
                    <motion.a
                        key={i}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="group grid grid-cols-1 md:grid-cols-[1fr_400px] xl:grid-cols-[1fr_480px] items-center gap-6 p-6 md:p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-500 card-lift"
                        style={i % 2 === 1 ? { direction: 'rtl' } : {}}
                    >
                        {/* Info */}
                        <div style={{ direction: 'ltr' }} className="flex flex-col justify-center gap-5">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl md:text-6xl font-display font-bold text-primary/20 leading-none tabular-nums">{project.num}</span>
                                <div className="h-px flex-1 bg-border" />
                            </div>
                            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight group-hover:text-primary transition-colors duration-300">
                                {project.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">{project.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View Project <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Image */}
                        <div style={{ direction: 'ltr' }} className="relative rounded-2xl overflow-hidden border border-border aspect-[16/10] bg-secondary">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </motion.a>
                ))}
            </div>

            <div className="mt-8 sm:hidden">
                <Link href="/projects" className="flex items-center gap-2 font-bold text-primary">
                    All Projects <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

// ── CTA ──────────────────────────────────────────────────────────────

export function CTASection() {
    return (
        <section className="py-8 px-6 pb-20 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-3xl overflow-hidden bg-foreground dark:bg-card dark:border dark:border-border noise"
            >
                {/* Inner glow blob */}
                <div
                    className="absolute top-0 right-0 w-96 h-96 opacity-20"
                    style={{ background: 'radial-gradient(circle, #ff6b40 0%, transparent 70%)' }}
                />
                <div className="relative z-10 py-20 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Let&apos;s Collaborate</p>
                        <h2 className="font-display font-bold text-4xl md:text-6xl xl:text-7xl text-background dark:text-foreground tracking-tight leading-[1.02] mb-4">
                            Build something<br />
                            <span className="text-primary">extraordinary.</span>
                        </h2>
                        <p className="text-background/60 dark:text-muted-foreground text-lg max-w-md">
                            Open to freelance projects, full-time roles, and interesting collaborations.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 shrink-0">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity glow"
                        >
                            Start a Project <ArrowUpRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl border border-background/30 dark:border-border text-background dark:text-foreground font-bold text-lg hover:bg-background/10 dark:hover:bg-secondary transition-colors"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
