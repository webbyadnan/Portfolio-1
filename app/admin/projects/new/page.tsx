import { ProjectForm } from '@/components/admin/ProjectForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewProjectPage() {
    return (
        <div className="space-y-8">
            <div>
                <Link href="/admin/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ChevronLeft className="w-4 h-4" /> Back to Projects
                </Link>
                <h1 className="text-3xl font-bold">New Project</h1>
            </div>
            <ProjectForm />
        </div>
    );
}
