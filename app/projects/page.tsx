export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { ProjectsClient } from './projects-client';
import { prisma } from '@/lib/prisma';
import { Project } from '@/types';
import { portfolioProjects, siteDescription } from '@/lib/portfolio';

export const metadata: Metadata = {
    title: 'Projects',
    description: siteDescription,
};

export const revalidate = 3600; // Revalidate every hour

async function getProjects() {
    let dbProjects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];

    if (process.env.NODE_ENV !== 'development') {
        try {
            dbProjects = await prisma.project.findMany({
                orderBy: { num: 'asc' },
            });
        } catch {
            dbProjects = [];
        }
    }

    const dbByTitle = new Map(dbProjects.map((project) => [project.title, project]));
    const extraProjects = dbProjects.filter(
        (project) => !portfolioProjects.some((updatedProject) => updatedProject.title === project.title)
    );
    const projects = [...portfolioProjects, ...extraProjects];

    return projects.map((p) => {
        const dbProject = dbByTitle.get(p.title);
        const createdAt = "createdAt" in p ? p.createdAt : dbProject?.createdAt || new Date();
        const updatedAt = "updatedAt" in p ? p.updatedAt : dbProject?.updatedAt || new Date();

        return {
            id: "id" in p ? p.id : p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            title: p.title,
            description: p.desc,
            image: p.image,
            tech_stack: p.tags,
            live_url: p.url,
            github_url: p.githubUrl || '',
            featured: true,
            category: p.category || 'Web App',
            created_at: createdAt.toISOString(),
            updated_at: updatedAt.toISOString(),
            video_url: "videoUrl" in p ? p.videoUrl : dbProject?.videoUrl,
        };
    }) as Project[];
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
