"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Database, Cloud, Layers, Terminal, Cpu, Globe, Zap, Server, Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";

// ── DATA ────────────────────────────────────────────────────────────

const techStack = [
  { item: "React", icon: Code2 },
  { item: "Next.js", icon: Globe },
  { item: "TypeScript", icon: Terminal },
  { item: "Node.js", icon: Database },
  { item: "PostgreSQL", icon: Database },
  { item: "Tailwind CSS", icon: Layers },
  { item: "AWS", icon: Cloud },
  { item: "Docker", icon: Cpu },
  { item: "GraphQL", icon: Zap },
  { item: "Redis", icon: Server },
];

const projects = [
  {
    title: "AI Builder",
    desc: "AI-powered landing page builder SaaS. Generates stunning, production-ready pages in seconds.",
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

// ── HERO ─────────────────────────────────────────────────────────────


import { ReactVisual } from "./ReactVisual";

export function HeroSection() {
  return (
    <section className="pt-40 pb-20 md:pt-52 md:pb-32 container mx-auto px-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-3xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
              Adnan Khan. <br />
              <span className="text-muted-foreground">Full Stack Developer.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light">
              Full-stack developer and AI enthusiast dedicated to building high-performance web applications. I specialize in crafting scalable SaaS platforms and intelligent digital solutions using Next.js, TypeScript, and modern cloud technologies.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-bold rounded-2xl hover:bg-secondary active:scale-95 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side Visual (Desktop Only) - React Visual */}
        <div className="hidden lg:block relative">
            <ReactVisual />
        </div>
      </div>
    </section>
  );
}

// ── TECH STACK ───────────────────────────────────────────────────────

export function TechStackSection() {
  return (
    <section className="py-24 border-y border-border bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:items-center">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-foreground mb-4">Core Technologies</h2>
            <p className="text-muted-foreground">The tools and frameworks I use daily to build production-ready applications.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.item}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-background hover:border-foreground/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-sm text-foreground">{tech.item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────────

export function FeaturedProjectsSection({ projects }: { projects: any[] }) {
  return (
    <section className="py-32 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Selected Work</h2>
        </div>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors"
        >
          View all projects <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border bg-secondary mb-6">
              {project.videoUrl ? (
                <video 
                  src={project.videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 hidden group-hover:block absolute inset-0 z-10"
                />
              ) : null}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:underline underline-offset-4 decoration-2 decoration-border">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                  {project.githubStats && (
                    <div className="flex items-center gap-3 ml-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-l border-border pl-3">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500/20 text-yellow-500" /> {project.githubStats.stars}</span>
                        <span className="flex items-center gap-1"><GitFork className="w-3 h-3 text-primary" /> {project.githubStats.forks}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold text-muted-foreground/30 tabular-nums">
                {project.num}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────

export function CTASection() {
  return (
    <section className="py-24 container mx-auto px-6 mb-12">
      <div className="p-12 md:p-20 rounded-2xl bg-foreground text-background">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to build something?
          </h2>
          <p className="text-lg md:text-xl text-background/80 mb-10 leading-relaxed">
            I am currently available for freelance work and open to full-time opportunities.
          </p>
          <Link
            href="mailto:adnanxdev@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background text-foreground font-medium rounded-md hover:bg-background/90 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
