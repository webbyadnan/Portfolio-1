"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Command } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-transition";

const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/ai-lab", label: "AI Lab" },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 30);
            setVisible(y < lastScrollY || y < 80);
            setLastScrollY(y);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    visible ? "translate-y-0" : "-translate-y-full",
                )}
            >
                {/* Inner pill nav */}
                <div className="flex justify-center pt-5 px-4">
                    <div className={cn(
                        "relative flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl transition-all duration-500 w-full max-w-4xl",
                        scrolled
                            ? "glass shadow-2xl shadow-black/20"
                            : "bg-transparent"
                    )}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center group shrink-0">
                            <span className="font-mono font-bold text-base tracking-tight">
                                <span className="text-primary">&lt;</span>
                                <span className="text-foreground">AK</span>
                                <span className="text-primary">/&gt;</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-0.5">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "deco-underline relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-300",
                                            isActive
                                                ? "text-primary active"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right controls */}
                        <div className="flex items-center gap-2">
                            <div className="hidden md:block">
                                <ThemeToggle />
                            </div>
                            {/* Ctrl+K hint */}
                            <button
                                onClick={() => {
                                    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
                                }}
                                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300 text-xs font-bold"
                                aria-label="Open command palette"
                            >
                                <Command className="w-3 h-3" />
                                <span className="hidden lg:inline">Search</span>
                                <kbd className="opacity-60">⌘K</kbd>
                            </button>
                            <Link
                                href="/contact"
                                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
                            >
                                Hire Me <ArrowUpRight className="w-3 h-3" />
                            </Link>
                            {/* Mobile */}
                            <div className="flex items-center gap-2 md:hidden">
                                <ThemeToggle />
                                <button
                                    className="p-2 rounded-xl border border-border bg-secondary text-foreground"
                                    onClick={() => setMobileMenuOpen(true)}
                                >
                                    <Menu className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex flex-col"
                    >
                        {/* Close row */}
                        <div className="flex justify-between items-center px-6 pt-8 pb-6">
                            <span className="font-mono font-bold text-lg tracking-tight">
                                <span className="text-primary">&lt;</span>
                                <span className="text-foreground">AK</span>
                                <span className="text-primary">/&gt;</span>
                            </span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-xl border border-border"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex-1 px-6 flex flex-col gap-2 overflow-y-auto">
                            {navLinks.map((link, i) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between w-full p-5 rounded-2xl border transition-all duration-300 group",
                                                isActive
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-secondary text-foreground border-border hover:border-primary/40"
                                            )}
                                        >
                                            <span className="text-xl font-bold font-display">{link.label}</span>
                                            <ArrowUpRight className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "opacity-100" : "opacity-30")} />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="px-6 pb-10 pt-4">
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg"
                            >
                                Start a Project →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
