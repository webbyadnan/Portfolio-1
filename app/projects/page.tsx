import type { Metadata } from 'next';
import { ProjectsClient } from './projects-client';
import { prisma } from '@/lib/prisma';
import { Project } from '@/types';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Browse my portfolio of web development projects built with modern technologies.',
};

export const revalidate = 3600; // Revalidate every hour

async function getProjects() {
    try {
        const dbProjects = await prisma.project.findMany({
            orderBy: { num: 'asc' },
        });

        return dbProjects.map(p => ({
            id: p.id,
            title: p.title,
            description: p.desc,
            image: p.image,
            tech_stack: p.tags,
            live_url: p.url,
            github_url: p.githubUrl || '',
            featured: true,
            category: p.category || 'Web App',
            created_at: p.createdAt.toISOString(),
            updated_at: p.updatedAt.toISOString(),
            video_url: p.videoUrl
        })) as Project[];
    } catch (err) {
        console.error('Failed to fetch projects', err);
        return [];
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
