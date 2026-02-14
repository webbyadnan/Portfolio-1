import type { Metadata } from 'next';
import { Download, Briefcase, GraduationCap, Code2, Terminal, Database, Cloud } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Adnan Khan - Full Stack Web Developer from Swat, Pakistan.',
};

const skills = {
    frontend: { items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Responsive Design'], color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20', icon: Code2 },
    backend: { items: ['Node.js', 'Express.js', 'Next.js API Routes', 'RESTful APIs', 'GraphQL', 'JWT Authentication'], color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', icon: Terminal },
    database: { items: ['Supabase', 'Firebase', 'PostgreSQL', 'MongoDB'], color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', icon: Database },
    cloud: { items: ['AWS', 'Vercel', 'Git/GitHub', 'CI/CD'], color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20', icon: Cloud },
};

const experience = [
    {
        title: 'Senior Full Stack Developer',
        company: 'Freelance',
        period: '2022 - Present',
        description: 'Building custom web applications for clients worldwide. Specializing in Next.js, React, and modern backend technologies.',
        achievements: [
            'Developed 50+ production-ready web applications',
            'Maintained 98% client satisfaction rate',
            'Implemented scalable architectures serving 100K+ users',
        ],
    },
    {
        title: 'Full Stack Developer',
        company: 'Tech Solutions',
        period: '2020 - 2022',
        description: 'Worked on enterprise-level applications using React, Node.js, and AWS.',
        achievements: [
            'Led team of 5 developers on major projects',
            'Reduced application load time by 60%',
            'Implemented automated testing and CI/CD pipelines',
        ],
    },
    {
        title: 'Web Developer',
        company: 'Digital Agency',
        period: '2019 - 2020',
        description: 'Created responsive websites and web applications for various clients.',
        achievements: [
            'Built 30+ responsive websites',
            'Improved SEO rankings for client websites',
            'Mentored junior developers',
        ],
    },
];

const education = [
    {
        degree: 'Bachelor of Computer Science',
        institution: 'University of Swat',
        period: '2015 - 2019',
        description: 'Focused on software engineering, web technologies, and database systems.',
    },
];

export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 pt-32 pb-24 max-w-6xl min-h-screen">
            {/* Introduction */}
            <div className="mb-20 space-y-6">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none">
                    About <span className="text-primary">Me</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-medium leading-relaxed">
                    I&apos;m a passionate Full Stack Web Developer with over 5 years of experience building modern,
                    scalable web applications. Based in Swat, Pakistan, I specialize in creating seamless digital
                    experiences that solve real-world problems.
                </p>

                <div className="pt-4">
                    <button className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl color-shift hover:bg-[var(--shift-hover)] group">
                        <Download className="mr-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                        Download CV
                    </button>
                </div>
            </div>

            {/* Skills */}
            <section className="mb-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">Skills & Expertise</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(skills).map(([category, { items, color, icon: Icon }]) => (
                        <div key={category} className="rounded-xl border border-border bg-card p-6 card-hover group">
                            <div className="flex items-center gap-3 mb-5">
                                <span className={`p-2 rounded-lg border ${color}`}>
                                    <Icon className="w-4 h-4" />
                                </span>
                                <h3 className="font-bold text-base uppercase tracking-wide">{category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border ${color} transition-all duration-300`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section className="mb-24">
                <div className="flex items-center gap-3 mb-10">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <Briefcase className="h-5 w-5" />
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Work Experience</h2>
                </div>

                <div className="space-y-8">
                    {experience.map((job, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-border group hover:border-primary transition-colors duration-500">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-card border-2 border-border group-hover:border-primary group-hover:bg-primary transition-all duration-500" />

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">{job.title}</h3>
                                    <p className="text-muted-foreground mt-0.5">{job.company}</p>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-3 py-1.5 rounded-md mt-2 md:mt-0 w-fit">
                                    {job.period}
                                </span>
                            </div>

                            <p className="text-muted-foreground mb-4 max-w-2xl">{job.description}</p>

                            <ul className="space-y-2">
                                {job.achievements.map((achievement, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                                        <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 shrink-0" />
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mb-24">
                <div className="flex items-center gap-3 mb-10">
                    <span className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/20">
                        <GraduationCap className="h-5 w-5" />
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Education</h2>
                </div>

                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <div key={index} className="rounded-xl border-2 border-border p-8 bg-card card-hover relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-r-full" />
                            <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <GraduationCap className="w-20 h-20" />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 relative z-10">
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">{edu.degree}</h3>
                                    <p className="text-muted-foreground mt-0.5">{edu.institution}</p>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-2 md:mt-0">
                                    {edu.period}
                                </span>
                            </div>
                            <p className="text-muted-foreground relative z-10 max-w-xl">{edu.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="text-center py-20 border-t border-border">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                    Let&apos;s Build Something <span className="text-primary">Amazing</span>
                </h2>
                <p className="mb-10 text-xl text-muted-foreground max-w-2xl mx-auto">
                    Ready to start your next project? Let&apos;s discuss how I can help.
                </p>
                <Link href="/contact" className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl color-shift hover:bg-[var(--shift-hover)]">
                    Get In Touch
                </Link>
            </div>
        </div>
    );
}
