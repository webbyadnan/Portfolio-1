'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    Home, User, Briefcase, Mail, Cpu, DollarSign,
    Github, Folder, ArrowUpRight, Command, Search, X
} from 'lucide-react';

type Item = {
    id: string;
    label: string;
    sublabel?: string;
    icon: React.ElementType;
    action: () => void;
    group: string;
    shortcut?: string;
};

export function CommandPalette() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const nav = useCallback((href: string) => {
        router.push(href);
        setOpen(false);
        setQuery('');
    }, [router]);

    const ALL_ITEMS: Item[] = [
        { id: 'home', group: 'Navigate', label: 'Home', icon: Home, action: () => nav('/'), shortcut: 'H' },
        { id: 'projects', group: 'Navigate', label: 'Projects', icon: Folder, action: () => nav('/projects'), shortcut: 'P' },
        { id: 'about', group: 'Navigate', label: 'About Me', icon: User, action: () => nav('/about'), shortcut: 'A' },
        { id: 'services', group: 'Navigate', label: 'Services', icon: Briefcase, action: () => nav('/services'), shortcut: 'S' },
        { id: 'contact', group: 'Navigate', label: 'Contact', icon: Mail, action: () => nav('/contact'), shortcut: 'C' },
        { id: 'ailab', group: 'Navigate', label: 'AI Lab', icon: Cpu, action: () => nav('/ai-lab'), shortcut: 'L' },
        { id: 'pricing', group: 'Navigate', label: 'Pricing', icon: DollarSign, action: () => nav('/pricing'), shortcut: 'R' },
        {
            id: 'github', group: 'Links', label: 'GitHub Profile',
            sublabel: 'github.com/webbyadnan',
            icon: Github,
            action: () => { window.open('https://github.com/webbyadnan', '_blank'); setOpen(false); },
        },
        {
            id: 'aibuilder', group: 'Projects', label: 'AI Builder',
            sublabel: 'aibuilder.adnanxdev.site',
            icon: ArrowUpRight,
            action: () => { window.open('https://aibuilder.adnanxdev.site/', '_blank'); setOpen(false); },
        },
        {
            id: 'resumeai', group: 'Projects', label: 'Resume AI',
            sublabel: 'resumeai.adnanxdev.site',
            icon: ArrowUpRight,
            action: () => { window.open('https://resumeai.adnanxdev.site/', '_blank'); setOpen(false); },
        },
        {
            id: 'xgpt', group: 'Projects', label: 'xGPT',
            sublabel: 'xgpt.adnanxdev.site',
            icon: ArrowUpRight,
            action: () => { window.open('https://xgpt.adnanxdev.site/', '_blank'); setOpen(false); },
        },
        {
            id: 'email', group: 'Contact', label: 'Send Email',
            sublabel: 'adnan.khan114@yahoo.com',
            icon: Mail,
            action: () => { window.location.href = 'mailto:adnan.khan114@yahoo.com'; setOpen(false); },
        },
        {
            id: 'whatsapp', group: 'Contact', label: 'WhatsApp',
            sublabel: '+92 344 0787723',
            icon: Mail,
            action: () => { window.open('https://wa.me/923440787723', '_blank'); setOpen(false); },
        },
    ];

    const q = query.toLowerCase().trim();
    const filtered = q
        ? ALL_ITEMS.filter(it =>
            it.label.toLowerCase().includes(q) ||
            (it.sublabel?.toLowerCase().includes(q)) ||
            it.group.toLowerCase().includes(q)
        )
        : ALL_ITEMS;

    // Group items
    const groups: Record<string, Item[]> = {};
    for (const item of filtered) {
        (groups[item.group] ??= []).push(item);
    }

    // Flat list for keyboard nav
    const flat = filtered;

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // Open: Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(o => !o);
                setQuery('');
                setActiveIdx(0);
                return;
            }
            if (!open) return;

            if (e.key === 'Escape') { setOpen(false); setQuery(''); return; }
            if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, flat.length - 1)); return; }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); return; }
            if (e.key === 'Enter') {
                if (flat[activeIdx]) { flat[activeIdx].action(); setQuery(''); }
                return;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, flat, activeIdx]);

    // Focus input on open
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 30);
    }, [open]);

    // Reset index on query change
    useEffect(() => { setActiveIdx(0); }, [query]);

    // Scroll active item into view
    useEffect(() => {
        const active = listRef.current?.querySelector('[data-active="true"]');
        active?.scrollIntoView({ block: 'nearest' });
    }, [activeIdx]);

    if (!open) return null;

    let flatIdx = 0;

    return (
        <div
            className="fixed inset-0 z-[9000] flex items-start justify-center pt-[15vh] px-4"
            onClick={() => { setOpen(false); setQuery(''); }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Panel */}
            <div
                className="relative w-full max-w-xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,107,64,0.1)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Search bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search pages, projects, links..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50 font-medium"
                    />
                    {query && (
                        <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary border border-border text-[10px] font-bold text-muted-foreground shrink-0">
                        esc
                    </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[58vh] overflow-y-auto no-scrollbar py-2">
                    {flat.length === 0 && (
                        <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
                            <Search className="w-8 h-8 opacity-30" />
                            <p className="text-sm font-medium">No results for &ldquo;{query}&rdquo;</p>
                        </div>
                    )}

                    {Object.entries(groups).map(([groupName, items]) => (
                        <div key={groupName} className="mb-1">
                            <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                {groupName}
                            </p>
                            {items.map(item => {
                                const Icon = item.icon;
                                const idx = flat.indexOf(item);
                                const isActive = idx === activeIdx;
                                flatIdx++;
                                return (
                                    <button
                                        key={item.id}
                                        data-active={isActive}
                                        onClick={() => { item.action(); setQuery(''); }}
                                        onMouseEnter={() => setActiveIdx(idx)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mx-1 text-left transition-all duration-150 ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'hover:bg-secondary text-foreground'
                                            }`}
                                        style={{ width: 'calc(100% - 8px)' }}
                                    >
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                                            }`}>
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{item.label}</p>
                                            {item.sublabel && (
                                                <p className="text-xs text-muted-foreground truncate">{item.sublabel}</p>
                                            )}
                                        </div>
                                        {item.shortcut && (
                                            <kbd className={`hidden sm:flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold shrink-0 transition-colors ${isActive ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border bg-secondary text-muted-foreground'
                                                }`}>
                                                {item.shortcut}
                                            </kbd>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Footer hint */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/50">
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-card font-mono">↑↓</kbd>
                            navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-card font-mono">↵</kbd>
                            select
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-card font-mono">esc</kbd>
                            close
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <Command className="w-3 h-3" />
                        <span>Command Palette</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
