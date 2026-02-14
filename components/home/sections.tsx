"use client";

import Link from "next/link";
import { ArrowRight, Code2, Database, Cloud, Layers, Terminal, Cpu, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const techStack = [
    { item: "React", icon: Code2, color: "text-sky-500" },
    { item: "Next.js", icon: Globe, color: "text-foreground" },
    { item: "TypeScript", icon: Terminal, color: "text-blue-500" },
    { item: "Node.js", icon: Database, color: "text-emerald-500" },
    { item: "PostgreSQL", icon: Database, color: "text-indigo-500" },
    { item: "Tailwind", icon: Layers, color: "text-cyan-500" },
    { item: "AWS", icon: Cloud, color: "text-amber-500" },
    { item: "Docker", icon: Cpu, color: "text-violet-500" },
];

const projects = [
    {
        title: "E-Commerce",
        desc: "Full-featured online store with payment integration and real‑time inventory management.",
        tags: ["Next.js", "Stripe", "Prisma"],
        slug: "e-commerce"
    },
    {
        title: "SaaS Dashboard",
        desc: "Real-time analytics dashboard with interactive charts and team collaboration tools.",
        tags: ["React", "Postgres", "D3.js"],
        slug: "saas-dashboard"
    },
    {
        title: "Blog CMS",
        desc: "Headless content management system with markdown editing and instant deployment.",
        tags: ["Next.js", "MDX", "Vercel"],
        slug: "blog-cms"
    },
    {
        title: "Social API",
        desc: "Interactive documentation and endpoint emulator for enterprise social architectures.",
        tags: ["Node.js", "REST", "Docs"],
        slug: "social-media-api"
    },
    {
        title: "AI Builder",
        desc: "Generative portfolio constructor with real-time UI simulations and AI logic.",
        tags: ["AI", "React", "Dynamic"],
        slug: "ai-portfolio-builder"
    },
];

export function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            {/* Dot pattern background */}
            <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-20" />

            <div className="container mx-auto px-6 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 color-shift">
                            Available for Freelance Work
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
                            Full Stack
                            <br />
                            <span className="text-primary">Developer.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-lg font-medium leading-relaxed mb-10 text-balance">
                            I build scalable, accessible, and performant web applications with a focus on modern architecture and clean design.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/projects"
                                className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-bold bg-primary text-primary-foreground rounded-xl color-shift hover:bg-[var(--shift-hover)]"
                            >
                                View Work
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold bg-secondary text-secondary-foreground rounded-xl border border-border hover:border-primary hover:text-primary color-shift"
                            >
                                Contact Me
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Content - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-48 h-48 md:w-80 md:h-80 xl:w-96 xl:h-96">
                            {/* Accent ring */}
                            <div className="absolute -inset-3 rounded-full border-2 border-primary/30 animate-pulse-glow" />
                            <div className="absolute inset-0 rounded-full border-4 border-primary/60 z-10" />
                            <img
                                src="/IMG_3862.png"
                                alt="Adnan Khan"
                                className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function TechStackSection() {
    return (
        <section className="py-24 bg-card border-y border-border">
            <div className="container mx-auto px-6">
                <div className="mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Technologies</h2>
                    <p className="text-muted-foreground text-lg">Tools & frameworks I work with daily</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {techStack.map((tech) => (
                        <div
                            key={tech.item}
                            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-background border border-border card-hover cursor-default"
                        >
                            <tech.icon className={`w-7 h-7 text-muted-foreground group-hover:${tech.color} transition-colors duration-300`} />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                {tech.item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FeaturedProjectsSection() {
    return (
        <section className="py-28 container mx-auto px-6">
            <div className="flex justify-between items-end mb-14">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">Selected Work</h2>
                    <p className="text-muted-foreground text-lg">Recent projects I&apos;m proud of</p>
                </div>
                <Link
                    href="/projects"
                    className="hidden md:flex items-center font-semibold text-primary hover:text-[var(--shift-hover)] transition-colors duration-300"
                >
                    View All <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                    <Link
                        href={`/projects/${project.slug}`}
                        key={i}
                        className="group block"
                    >
                        <div className="aspect-[4/3] bg-card rounded-xl border border-border mb-5 relative overflow-hidden card-hover group-hover:border-primary">
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                            <div className="absolute bottom-3 left-3 text-xs font-bold bg-background/90 px-3 py-1.5 rounded-lg border border-border text-muted-foreground">
                                0{i + 1}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.desc}</p>

                        <div className="flex gap-2 flex-wrap">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-10 md:hidden">
                <Link href="/projects" className="flex items-center font-semibold text-primary">
                    View All Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

export function CTASection() {
    return (
        <section className="py-28 bg-primary text-primary-foreground">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-none">
                    Let&apos;s Build Something.
                </h2>
                <p className="text-xl text-primary-foreground/70 mb-12 max-w-xl mx-auto">
                    I&apos;m currently available for freelance projects and open to full-time opportunities.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold bg-primary-foreground text-primary rounded-xl hover:opacity-90 transition-opacity duration-300"
                >
                    Start a Project
                </Link>
            </div>
        </section>
    );
}
