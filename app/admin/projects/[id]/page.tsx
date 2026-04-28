import { ProjectForm } from '@/components/admin/ProjectForm';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: { id }
    });

    if (!project) notFound();

    return (
        <div className="space-y-8">
            <div>
                <Link href="/admin/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ChevronLeft className="w-4 h-4" /> Back to Projects
                </Link>
                <h1 className="text-3xl font-bold">Edit Project: {project.title}</h1>
            </div>
            <ProjectForm project={project} />
        </div>
    );
}
