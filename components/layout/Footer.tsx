import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const links = {
    work: [
        { label: 'Projects', href: '/projects' },
        { label: 'Services', href: '/services' },
        { label: 'AI Lab', href: '/ai-lab' },
        { label: 'Pricing', href: '/pricing' },
    ],
    info: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'GitHub', href: 'https://github.com/webbyadnan', external: true },
    ],
};

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-border bg-card relative overflow-hidden">
            {/* Subtle grid bg */}
            <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

            <div className="relative container mx-auto px-6 pt-16 pb-8">
                {/* Top: Brand + CTA */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
                    <div className="max-w-sm">
                        <div className="mb-4">
                            <span className="font-mono font-bold text-xl tracking-tight">
                                <span className="text-primary">&lt;</span>
                                <span className="text-foreground">AK</span>
                                <span className="text-primary">/&gt;</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Full Stack Developer building fast, beautiful, and scalable web products. Available for freelance projects.
                        </p>
                        <div className="flex gap-2 mt-5">
                            <a
                                href="https://github.com/webbyadnan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl border border-border bg-secondary hover:border-primary hover:text-primary transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2.5 rounded-xl border border-border bg-secondary hover:border-primary hover:text-primary transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="mailto:adnan.khan114@yahoo.com"
                                className="p-2.5 rounded-xl border border-border bg-secondary hover:border-primary hover:text-primary transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Big CTA */}
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
                    >
                        Start a Project
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* Middle: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Work</p>
                        <ul className="space-y-3">
                            {links.work.map(l => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Info</p>
                        <ul className="space-y-3">
                            {links.info.map(l => (
                                <li key={l.href}>
                                    {'external' in l && l.external ? (
                                        <a
                                            href={l.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
                                        >
                                            {l.label} <ArrowUpRight className="w-3 h-3 opacity-50" />
                                        </a>
                                    ) : (
                                        <Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                                            {l.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Get in Touch</p>
                        <div className="space-y-2">
                            <a href="mailto:adnan.khan114@yahoo.com" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">adnan.khan114@yahoo.com</a>
                            <a href="tel:+923440787723" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">+92 344 0787723</a>
                            <p className="text-sm text-muted-foreground">Swat, Pakistan 🇵🇰</p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">© {year} Adnan Khan. All rights reserved.</p>
                    <p className="text-xs text-muted-foreground">Crafted with <span className="text-primary font-semibold">passion</span> using Next.js & Tailwind</p>
                </div>
            </div>
        </footer>
    );
}
