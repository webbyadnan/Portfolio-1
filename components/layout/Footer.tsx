import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
    navigation: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Services', href: '/services' },
    ],
    services: [
        { label: 'Web Development', href: '/services' },
        { label: 'Full Stack', href: '/services' },
        { label: 'API Development', href: '/services' },
        { label: 'Cloud Setup', href: '/services' },
    ],
    contact: [
        { icon: Mail, label: 'adnan.khan114@yahoo.com', href: 'mailto:adnan.khan114@yahoo.com' },
        { icon: Phone, label: '+92-344-0787723', href: 'tel:+923440787723' },
        { icon: MapPin, label: 'Swat, Pakistan', href: '#' },
    ],
};

const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', hoverColor: 'hover:bg-slate-700 hover:text-white dark:hover:bg-slate-300 dark:hover:text-slate-900' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', hoverColor: 'hover:bg-blue-600 hover:text-white' },
    { icon: Twitter, href: '#', label: 'Twitter', hoverColor: 'hover:bg-sky-500 hover:text-white' },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* Brand */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-1">
                            <span className="text-primary font-bold text-xl">&lt;</span>
                            <span className="font-bold text-xl tracking-tight">AK</span>
                            <span className="text-primary font-bold text-xl">/&gt;</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Full Stack Web Developer building modern, scalable web applications with a passion for clean code and great design.
                        </p>
                        <div className="flex gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2.5 rounded-lg bg-secondary border border-border color-shift ${social.hoverColor}`}
                                        aria-label={social.label}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-foreground">Navigation</h4>
                        <ul className="space-y-3">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-foreground">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-foreground">Get in Touch</h4>
                        <ul className="space-y-3">
                            {footerLinks.contact.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2.5"
                                        >
                                            <span className="p-1.5 rounded-md bg-primary/10 text-primary">
                                                <Icon className="h-3.5 w-3.5" />
                                            </span>
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Adnan Khan. All rights reserved.</p>
                    <p className="text-xs">Built with <span className="text-primary">Next.js</span> & <span className="text-accent">Tailwind CSS</span></p>
                </div>
            </div>
        </footer>
    );
}
