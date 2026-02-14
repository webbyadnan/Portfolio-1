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
        id: 'local-ecommerce',
        title: 'Zenith E-Commerce',
        description: 'A premium, high-fidelity e-commerce storefront with a focus on minimalist design and seamless user experience.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
        tech_stack: ['Next.js 15', 'TypeScript', 'Zustand', 'Framer Motion'],
        live_url: '/projects/e-commerce',
        featured: true,
        category: 'E-Commerce',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'local-saas',
        title: 'Nexus SaaS Dashboard',
        description: 'An enterprise-grade architectural dashboard for monitoring distributed systems and network infrastructure.',
        image: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=800',
        tech_stack: ['React', 'Recharts', 'Architectural UI', 'Tailwind'],
        live_url: '/projects/saas-dashboard',
        featured: true,
        category: 'SaaS',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'local-blog',
        title: 'Insight Blog CMS',
        description: 'A typography-focused publishing platform with high-end reading experiences and masonry content grids.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
        tech_stack: ['Next.js', 'MDX', 'Premium Type', 'Framer Motion'],
        live_url: '/projects/blog-cms',
        featured: true,
        category: 'CMS',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'local-api',
        title: 'NexConnect Social API',
        description: 'A technical showcase of a robust social media API with interactive documentation and endpoint emulation.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800',
        tech_stack: ['Node.js', 'REST API', 'API Docs', 'JSON Visualizer'],
        live_url: '/projects/social-media-api',
        featured: true,
        category: 'Backend',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'local-builder',
        title: 'NexusGen AI Builder',
        description: 'An AI-driven portfolio generator with multi-step configuration and real-time layout preview simulations.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        tech_stack: ['AI Engine', 'React', 'Dynamic UI', 'Framer Motion'],
        live_url: '/projects/ai-portfolio-builder',
        featured: true,
        category: 'AI / Tool',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
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
