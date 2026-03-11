import type { Metadata } from 'next';
import { Download, GraduationCap, Code2, Terminal, Database, Cloud, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Adnan Khan — Full Stack Developer from Swat, Pakistan.',
};

const skills = {
    Frontend: {
        items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
        icon: Code2,
        accent: '#6366f1',
    },
    Backend: {
        items: ['Node.js', 'Express.js', 'Next.js API Routes', 'RESTful APIs', 'GraphQL', 'JWT Auth'],
        icon: Terminal,
        accent: '#10b981',
    },
    Database: {
        items: ['Supabase', 'Firebase', 'PostgreSQL', 'MongoDB'],
        icon: Database,
        accent: '#f59e0b',
    },
    Cloud: {
        items: ['AWS', 'Vercel', 'Git/GitHub', 'CI/CD', 'Docker'],
        icon: Cloud,
        accent: '#8b5cf6',
    },
};

const timeline = [
    {
        year: '2024 – Now',
        title: 'Bachelor of Computer Science',
        org: 'Iqra National University, Swat',
        desc: 'Focused on software engineering, web technologies, and database systems.',
        type: 'edu',
    },
    {
        year: '2024',
        title: 'Freelance Full Stack Developer',
        org: 'Self-employed',
        desc: 'Built SaaS products and web apps for clients globally. Shipped AI Builder, Resume AI, and xGPT.',
        type: 'work',
    },
    {
        year: '2022',
        title: 'Started Web Development',
        org: 'Self-taught',
        desc: 'Began learning HTML, CSS, and JavaScript. Quickly moved to React and Next.js ecosystem.',
        type: 'start',
    },
];

export default function AboutPage() {
    return (
        <div className="pt-28 pb-24 min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* ── INTRO ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28 pt-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">About Me</p>
                        <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.02] mb-8">
                            I craft digital<br />
                            <span className="text-gradient">experiences.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
                            I&apos;m a passionate Full Stack Web Developer with 2+ years of experience building modern,
                            scalable web applications. Based in Swat, Pakistan, I specialize in creating seamless digital
                            experiences that solve real-world problems.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
                            From SaaS platforms to AI-powered tools, I build end-to-end solutions with a focus on performance,
                            clean code, and delightful user interfaces.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-opacity">
                                <Download className="w-4 h-4" />
                                Download CV
                            </button>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border bg-secondary font-bold rounded-2xl hover:border-primary hover:text-primary transition-all"
                            >
                                Hire Me <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Photo + stats */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden border border-border aspect-[4/5] max-w-sm mx-auto">
                            <img src="/IMG_3862.png" alt="Adnan Khan" className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5">
                                <p className="text-white font-display font-bold text-lg">Adnan Khan</p>
                                <p className="text-white/60 text-sm">Full Stack Developer</p>
                            </div>
                        </div>
                        {/* Stat bubble */}
                        <div className="absolute -right-4 top-10 glass p-5 rounded-2xl shadow-xl">
                            <div className="text-3xl font-display font-bold text-primary mb-0.5">2+</div>
                            <div className="text-xs text-muted-foreground font-medium">Years of<br />Experience</div>
                        </div>
                        <div className="absolute -left-4 bottom-16 glass p-5 rounded-2xl shadow-xl">
                            <div className="text-3xl font-display font-bold text-primary mb-0.5">15+</div>
                            <div className="text-xs text-muted-foreground font-medium">Projects<br />Shipped</div>
                        </div>
                    </div>
                </div>

                {/* ── SKILLS ── */}
                <section className="mb-28">
                    <div className="flex items-end gap-4 mb-12">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Expertise</p>
                            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Skills & Stack</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Object.entries(skills).map(([category, { items, icon: Icon, accent }]) => (
                            <div
                                key={category}
                                className="group p-7 rounded-3xl border border-border bg-card card-lift relative overflow-hidden"
                            >
                                {/* Accent corner */}
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full"
                                    style={{ background: accent }}
                                />
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${accent}20` }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: accent }} />
                                    </div>
                                    <h3 className="font-display font-bold text-lg">{category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-secondary text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── TIMELINE ── */}
                <section className="mb-28">
                    <div className="mb-12">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Journey</p>
                        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">My Story</h2>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

                        <div className="space-y-10 pl-16">
                            {timeline.map((item, i) => (
                                <div key={i} className="relative group">
                                    {/* Dot */}
                                    <div className="absolute -left-[42px] top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />

                                    <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-300">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                            <div className="flex items-center gap-3">
                                                {item.type === 'edu' && <GraduationCap className="w-4 h-4 text-primary shrink-0" />}
                                                <h3 className="font-display font-bold text-lg">{item.title}</h3>
                                            </div>
                                            <span className="text-xs font-bold font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-lg shrink-0">{item.year}</span>
                                        </div>
                                        <p className="text-sm text-primary font-semibold mb-2">{item.org}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <div className="relative rounded-3xl overflow-hidden bg-foreground dark:bg-card dark:border dark:border-border p-12 md:p-16 text-center noise">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{ background: 'radial-gradient(circle at 50% 50%, #ff6b40 0%, transparent 70%)' }}
                    />
                    <p className="relative text-xs font-bold uppercase tracking-widest text-primary mb-4">Let&apos;s Work Together</p>
                    <h2 className="relative font-display font-bold text-4xl md:text-5xl text-background dark:text-foreground mb-5 tracking-tight">
                        Ready to build something great?
                    </h2>
                    <p className="relative text-background/60 dark:text-muted-foreground mb-10 max-w-lg mx-auto">
                        I&apos;m available for freelance projects and open to full-time roles.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
                    >
                        Get In Touch <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>

            </div>
        </div>
    );
}
