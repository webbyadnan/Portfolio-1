import type { Metadata } from 'next';
import { Code2, Database, Cloud, Wrench, Rocket, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Professional web development services — full stack, SaaS, API, and cloud deployment.',
};

const services = [
    {
        icon: Code2,
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
        features: ['Responsive for all devices', 'SEO-optimized structure', 'Fast loading times', 'Cross-browser compatible', 'Modern UI/UX'],
        accent: '#6366f1',
        tag: 'Most popular',
    },
    {
        icon: Rocket,
        title: 'Full Stack Development',
        description: 'End-to-end application development — frontend to backend, database design, and deployment.',
        features: ['React & Next.js frontend', 'Node.js backend', 'Database design', 'RESTful APIs', 'Auth systems'],
        accent: '#f43f5e',
        tag: null,
    },
    {
        icon: Database,
        title: 'API Development',
        description: 'Scalable and secure APIs with comprehensive documentation and best practices.',
        features: ['RESTful API design', 'GraphQL', 'API security', 'Rate limiting', 'Docs'],
        accent: '#10b981',
        tag: null,
    },
    {
        icon: Cloud,
        title: 'Deployment & Cloud',
        description: 'Professional deployment and cloud infrastructure for reliable, scalable apps.',
        features: ['Vercel / AWS', 'CI/CD pipeline', 'Domain & SSL', 'Performance monitor', 'Auto scaling'],
        accent: '#0ea5e9',
        tag: null,
    },
    {
        icon: Cpu,
        title: 'SaaS Development',
        description: 'Build your SaaS platform with subscription management and user dashboards.',
        features: ['Multi-tenant', 'Billing & subscriptions', 'User management', 'Analytics dashboard', 'Email notifications'],
        accent: '#8b5cf6',
        tag: 'New',
    },
    {
        icon: Wrench,
        title: 'Maintenance & Support',
        description: 'Ongoing maintenance, updates, and technical support to keep your app running.',
        features: ['Bug fixes', 'Performance tuning', 'Security patches', 'Feature additions', '24/7 support'],
        accent: '#f59e0b',
        tag: null,
    },
];

const process = [
    { step: '01', title: 'Discovery', desc: 'Deep dive into your requirements, goals, and audience.' },
    { step: '02', title: 'Planning', desc: 'Roadmap, wireframes, and technical spec before a single line of code.' },
    { step: '03', title: 'Development', desc: 'Build with modern stack, clean code, and constant communication.' },
    { step: '04', title: 'Deployment', desc: 'Ship to production with proper monitoring and handover docs.' },
];

export default function ServicesPage() {
    return (
        <div className="pt-28 pb-24 min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* ── HEADER ── */}
                <div className="mb-20 pt-8 max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">What I Do</p>
                    <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.02] mb-6">
                        Services that<br />
                        <span className="text-gradient">deliver.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        From concept to deployment — professional web development tailored to bring your ideas to life.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-opacity"
                    >
                        Start a Project <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* ── SERVICES BENTO ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-24">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={service.title}
                                className="group relative p-7 rounded-3xl border border-border bg-card card-lift overflow-hidden flex flex-col"
                            >
                                {/* Accent blob in corner */}
                                <div
                                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{ background: service.accent }}
                                />

                                {service.tag && (
                                    <span
                                        className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                                        style={{ background: `${service.accent}20`, color: service.accent }}
                                    >
                                        {service.tag}
                                    </span>
                                )}

                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: `${service.accent}20` }}
                                >
                                    <Icon className="w-6 h-6" style={{ color: service.accent }} />
                                </div>

                                <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

                                <ul className="mt-auto space-y-2.5 border-t border-border pt-5">
                                    {service.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* ── PROCESS ── */}
                <section className="mb-24">
                    <div className="mb-12">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">How I Work</p>
                        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">My Process</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {process.map((phase, i) => (
                            <div key={phase.step} className="relative p-7 rounded-3xl border border-border bg-card card-lift group">
                                {/* Step number */}
                                <div className="text-6xl font-display font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-300 mb-4 leading-none">
                                    {phase.step}
                                </div>
                                <h3 className="font-display font-bold text-lg mb-2">{phase.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{phase.desc}</p>
                                {/* Connector line */}
                                {i < process.length - 1 && (
                                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-px bg-border z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <div className="relative rounded-3xl overflow-hidden bg-foreground dark:bg-card dark:border dark:border-border p-12 md:p-16 text-center noise">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{ background: 'radial-gradient(circle at 30% 50%, #ff6b40 0%, transparent 60%)' }}
                    />
                    <div className="relative">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Ready to Start?</p>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-background dark:text-foreground mb-5 tracking-tight">
                            Let&apos;s build your next big idea.
                        </h2>
                        <p className="text-background/60 dark:text-muted-foreground mb-10 max-w-xl mx-auto">
                            Tell me about your project and I&apos;ll get back within 24 hours with a plan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
                            >
                                Get In Touch <ArrowUpRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="inline-flex items-center justify-center px-10 py-5 rounded-2xl border border-background/30 dark:border-border text-background dark:text-foreground font-bold text-lg hover:bg-background/10 dark:hover:bg-secondary transition-colors"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
