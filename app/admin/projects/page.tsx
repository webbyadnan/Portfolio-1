import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { num: 'asc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <Link 
                    href="/admin/projects/new" 
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" /> Add Project
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                    <Card key={project.id} className="p-6 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-10 rounded bg-secondary overflow-hidden border border-border">
                                <img src={project.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    {project.title}
                                    <span className="text-xs text-muted-foreground font-mono">#{project.num}</span>
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-1 max-w-md">{project.desc}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <a 
                                href={project.url} 
                                target="_blank" 
                                className="p-2 hover:text-primary transition-colors"
                                title="View Live"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                            <Link 
                                href={`/admin/projects/${project.id}`} 
                                className="p-2 hover:text-blue-500 transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-5 h-5" />
                            </Link>
                            {/* In a real app we'd add a delete action here */}
                            <button 
                                className="p-2 hover:text-red-500 transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </Card>
                ))}
                {projects.length === 0 && <p className="text-muted-foreground">No projects found.</p>}
            </div>
        </div>
    );
}
