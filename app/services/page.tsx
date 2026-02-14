import type { Metadata } from 'next';
import { Code2, Database, Cloud, Wrench, Rocket, Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Professional web development services including full stack development, API development, and cloud deployment.',
};

const services = [
    {
        icon: Code2,
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
        features: ['Responsive design for all devices', 'SEO-optimized structure', 'Fast loading times', 'Cross-browser compatibility', 'Modern UI/UX design'],
        iconColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    },
    {
        icon: Rocket,
        title: 'Full Stack Development',
        description: 'End-to-end application development from frontend to backend, database design, and deployment.',
        features: ['React & Next.js frontend', 'Node.js backend development', 'Database design & optimization', 'RESTful API development', 'Authentication & authorization'],
        iconColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    },
    {
        icon: Database,
        title: 'API Development',
        description: 'Scalable and secure APIs for your applications with comprehensive documentation.',
        features: ['RESTful API design', 'GraphQL implementation', 'API security & authentication', 'Rate limiting & optimization', 'Complete documentation'],
        iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
        icon: Cloud,
        title: 'Deployment & Cloud Setup',
        description: 'Professional deployment and cloud infrastructure setup for reliable, scalable applications.',
        features: ['Vercel/AWS deployment', 'CI/CD pipeline setup', 'Domain & SSL configuration', 'Performance monitoring', 'Automatic scaling'],
        iconColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    },
    {
        icon: Cpu,
        title: 'Custom SaaS Development',
        description: 'Build your Software-as-a-Service platform with subscription management and user dashboards.',
        features: ['Multi-tenant architecture', 'Subscription & billing', 'User management system', 'Analytics dashboard', 'Email notifications'],
        iconColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    },
    {
        icon: Wrench,
        title: 'Maintenance & Support',
        description: 'Ongoing maintenance, updates, and technical support to keep your application running smoothly.',
        features: ['Bug fixes & updates', 'Performance optimization', 'Security patches', 'Feature enhancements', '24/7 support available'],
        iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
];

export default function ServicesPage() {
    return (
        <div className="container mx-auto px-6 pt-32 pb-24 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="mb-20 space-y-6">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none">
                    Services
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-medium leading-relaxed">
                    Professional web development services tailored to bring your ideas to life.
                    From concept to deployment, I handle every aspect of your project.
                </p>

                <div className="pt-4">
                    <Link href="/contact" className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl color-shift hover:bg-[var(--shift-hover)]">
                        Start A Project
                    </Link>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <div key={service.title} className="rounded-xl border border-border bg-card p-7 card-hover group">
                            <div className={`h-14 w-14 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 ${service.iconColor} group-hover:scale-110`}>
                                <Icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{service.description}</p>
                            <ul className="space-y-2.5 pt-5 border-t border-border">
                                {service.features.map((feature) => (
                                    <li key={feature} className="text-sm flex items-start text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                        <span className="mr-2.5 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Process Section */}
            <section className="mb-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">My Process</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { step: '01', title: 'Discovery', description: 'Understanding your requirements, goals, and target audience.' },
                        { step: '02', title: 'Planning', description: 'Creating detailed project roadmap, wireframes, and technical specifications.' },
                        { step: '03', title: 'Development', description: 'Building your application with modern technologies and best practices.' },
                        { step: '04', title: 'Deployment', description: 'Launching your project and providing ongoing support.' },
                    ].map((phase) => (
                        <div key={phase.step} className="relative p-6 rounded-xl border border-border bg-card card-hover group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                {phase.step}
                            </div>
                            <h3 className="text-lg font-bold tracking-tight mb-2">{phase.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <div className="rounded-2xl p-12 text-center bg-primary text-primary-foreground relative overflow-hidden">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                    Ready to Start Your Project?
                </h2>
                <p className="text-xl mb-10 text-primary-foreground/70 max-w-2xl mx-auto font-medium">
                    Let&apos;s discuss your requirements and create a custom solution that fits your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-primary-foreground text-primary px-8 py-3.5 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                    >
                        Get In Touch
                    </Link>
                    <Link
                        href="/pricing"
                        className="inline-flex items-center justify-center border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-primary-foreground/10 transition-colors duration-300"
                    >
                        View Pricing
                    </Link>
                </div>
            </div>
        </div>
    );
}
