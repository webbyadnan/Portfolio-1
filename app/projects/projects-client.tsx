'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ExternalLink, Github, Filter, Search, X } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectsClientProps {
    projects: Project[];
    categories: string[];
}

export function ProjectsClient({ projects, categories }: ProjectsClientProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = projects.filter((project) => {
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const matchesSearch =
            searchQuery === '' ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tech_stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-6 pt-32 pb-24 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="mb-16 space-y-4">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Projects</h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-medium leading-relaxed">
                    A curated collection of digital products, experiments, and open-source contributions.
                </p>
            </div>

            {/* Controls */}
            <div className="sticky top-20 z-30 bg-background/90 backdrop-blur-xl py-5 mb-10 border-b border-border">
                <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
                    {/* Category Filter */}
                    <div className="w-full xl:w-auto overflow-x-auto no-scrollbar">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={cn(
                                    "px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 whitespace-nowrap color-shift",
                                    selectedCategory === 'All'
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                                )}
                            >
                                All Projects
                            </button>
                            {categories.filter(c => c !== 'All').map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 whitespace-nowrap color-shift",
                                        selectedCategory === category
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative w-full xl:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-11 pr-11 border border-border bg-card rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm placeholder:text-muted-foreground/50"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-28 rounded-2xl border-2 border-dashed border-border"
                >
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                        <Filter className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                    <p className="text-muted-foreground mb-8">
                        Try adjusting your search or category filter.
                    </p>
                    <button
                        onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
                        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-[var(--shift-hover)] transition-colors duration-300"
                    >
                        Clear Filters
                    </button>
                </motion.div>
            )}
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col h-full rounded-xl border border-border bg-card card-hover overflow-hidden"
        >
            {/* Image Area */}
            <div className="aspect-video bg-secondary relative overflow-hidden">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-card">
                        <Code2 className="h-10 w-10 opacity-20" />
                    </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-foreground text-primary p-3 rounded-xl hover:-translate-y-0.5 transition-transform"
                            title="Live Demo"
                        >
                            <ExternalLink className="h-5 w-5" />
                        </a>
                    )}
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-foreground text-primary p-3 rounded-xl hover:-translate-y-0.5 transition-transform"
                            title="Source Code"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md w-fit mb-3">
                    {project.category}
                </span>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech_stack.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-[10px] font-semibold px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
