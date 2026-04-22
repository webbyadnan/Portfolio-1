import type { Metadata } from 'next';
import { ProjectsClient } from './projects-client';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Browse my portfolio of web development projects built with modern technologies.',
};

export const revalidate = 3600; // Revalidate every hour

const LOCAL_PROJECTS: Project[] = [
    {
        id: 'aibuilder',
        title: 'AI Builder',
        description: 'An AI-powered landing page builder SaaS that lets users generate stunning, production-ready landing pages in seconds using advanced AI models.',
        image: '/project-aibuilder.png',
        tech_stack: ['Next.js', 'TypeScript', 'Firebase', 'NestJS', 'Groq AI'],
        live_url: 'https://aibuilder.adnanxdev.site/',
        github_url: 'https://github.com/adnanxdev/ai-builder',
        featured: true,
        category: 'AI / SaaS',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'resumeai',
        title: 'Resume AI',
        description: 'An intelligent resume builder powered by AI that helps users craft compelling, ATS-optimized resumes tailored to specific job descriptions.',
        image: '/project-resumeai.png',
        tech_stack: ['Next.js', 'TypeScript', 'Gemini AI', 'Firebase', 'Tailwind'],
        live_url: 'https://resumeai.adnanxdev.site/',
        github_url: 'https://github.com/adnanxdev/resume-ai',
        featured: true,
        category: 'AI / Tool',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'xgpt',
        title: 'xGPT',
        description: 'A sleek, multi-model AI chat application supporting GPT-4, Claude, Gemini, and open-source models with a premium conversational UI.',
        image: '/project-xgpt.png',
        tech_stack: ['Next.js', 'TypeScript', 'Groq', 'DeepSeek', 'Firebase'],
        live_url: 'https://xgpt.adnanxdev.site/',
        github_url: 'https://github.com/adnanxdev/xgpt',
        featured: true,
        category: 'AI / App',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'xfer',
        title: 'XFER - P2P File Transfer',
        description: 'A high-speed, professional-grade P2P file-sharing web application enabling seamless, serverless file transfers between devices on the same local network.',
        image: '/project-xfer.png',
        tech_stack: ['React', 'Vite', 'PeerJS', 'MQTT', 'Tailwind CSS'],
        live_url: 'https://xfer.adnanxdev.site/',
        github_url: 'https://github.com/adnanxdev/p2p-file-transfer',
        featured: true,
        category: 'Web App / Utility',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

async function getProjects() {
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            return LOCAL_PROJECTS;
        }

        // Merge local projects with DB projects, keeping local unique
        const dbProjects = projects || [];
        return [...LOCAL_PROJECTS, ...dbProjects];
    } catch (err) {
        return LOCAL_PROJECTS;
    }
}

async function getCategories(projects: Project[]) {
    const categories = [...new Set(projects?.map(p => p.category) || [])];
    return ['All', ...categories];
}

export default async function ProjectsPage() {
    const projects = await getProjects();
    const categories = await getCategories(projects);

    return <ProjectsClient projects={projects} categories={categories} />;
}
