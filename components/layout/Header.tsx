"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled significantly
            setScrolled(currentScrollY > 20);

            // Determine direction and visibility
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and past threshold -> Hide
                setVisible(false);
            } else {
                // Scrolling up or at top -> Show
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { href: "/projects", label: "Projects" },
        { href: "/about", label: "About" },
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Contact" },
        { href: "/ai-lab", label: "AI Lab" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                visible ? "translate-y-0" : "-translate-y-full",
                scrolled
                    ? "bg-background/90 backdrop-blur-xl border-border shadow-sm h-16"
                    : "bg-background/50 backdrop-blur-sm border-transparent h-16 md:h-20"
            )}
        >
            <div className="container mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-1 relative z-50">
                    <span className="text-primary font-bold text-xl transition-colors duration-300">&lt;</span>
                    <span className="font-bold text-xl tracking-tight">AK</span>
                    <span className="text-primary font-bold text-xl transition-colors duration-300">/&gt;</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 color-shift",
                                pathname === link.href
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                            )}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="activeNavIndicator"
                                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                    <div className="ml-2 pl-2 border-l border-border">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        className="relative z-50 p-2 rounded-lg text-foreground hover:bg-secondary transition-colors color-shift"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 bg-white dark:bg-slate-950 z-[100] flex flex-col"
                        >
                            {/* Mobile Header */}
                            <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
                                <span className="font-bold text-lg dark:text-white text-slate-900">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Links */}
                            <div className="flex-1 flex flex-col p-6 gap-3 overflow-y-auto overscroll-y-contain no-scrollbar">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between w-full p-5 rounded-2xl border transition-all duration-300 group",
                                                pathname === link.href
                                                    ? "bg-indigo-600 dark:bg-cyan-500 text-white border-transparent shadow-lg shadow-indigo-500/20"
                                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            )}
                                        >
                                            <span className="text-lg font-bold">{link.label}</span>
                                            {pathname === link.href && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
