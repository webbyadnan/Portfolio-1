'use client';

import { createProject, updateProject } from '@/lib/actions/projects';
import { useState } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Globe, Github, Info, Search } from 'lucide-react';

interface ProjectFormProps {
    project?: any;
}

export function ProjectForm({ project }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);

    // Controlled states
    const [title, setTitle] = useState(project?.title || '');
    const [num, setNum] = useState(project?.num || '');
    const [desc, setDesc] = useState(project?.desc || '');
    const [url, setUrl] = useState(project?.url || '');
    const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
    const [image, setImage] = useState(project?.image || '');
    const [videoUrl, setVideoUrl] = useState(project?.videoUrl || '');
    const [tags, setTags] = useState(project?.tags?.join(', ') || '');
    const [category, setCategory] = useState(project?.category || 'Web App');
    const [seoTitle, setSeoTitle] = useState(project?.seoTitle || '');
    const [seoDescription, setSeoDescription] = useState(project?.seoDescription || '');

    const handleGenerateAI = async () => {
        if (!title) return;
        setGenerating(true);
        try {
            const res = await fetch('/api/admin/projects/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            if (res.ok) {
                const data = await res.json();
                setDesc(data.description);
                setTags(data.tags.join(', '));
                if (!seoTitle) setSeoTitle(`${title} | Case Study`);
                if (!seoDescription) setSeoDescription(data.description.substring(0, 160));
            }
        } catch (err) {
            console.error('AI Gen Error:', err);
        } finally {
            setGenerating(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        const data = new FormData();
        data.append('title', title);
        data.append('num', num);
        data.append('desc', desc);
        data.append('url', url);
        data.append('githubUrl', githubUrl);
        data.append('image', image);
        data.append('videoUrl', videoUrl);
        data.append('tags', tags);
        data.append('category', category);
        data.append('seoTitle', seoTitle);
        data.append('seoDescription', seoDescription);

        if (project) {
            await updateProject(project.id, data);
        } else {
            await createProject(data);
        }
        setLoading(false);
    };

    const inputClass = "w-full bg-secondary border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary transition-all shadow-inner";
    const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1";

    return (
        <div className="space-y-8 max-w-5xl">
            {/* AI Assistant Banner */}
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-center md:text-left">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/5">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Project Architect AI</h4>
                        <p className="text-xs text-muted-foreground">Draft a compelling description and relevant tags in one click.</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={generating || !title}
                    className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-2xl text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 shadow-xl shadow-primary/20"
                >
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {generating ? 'Architecting...' : 'Build Draft'}
                </button>
            </div>

            <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6 bg-card p-10 rounded-[2.5rem] border border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -mr-20 -mt-20 opacity-50" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <div className="space-y-2">
                            <label className={labelClass}>Project Title</label>
                            <input 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                                className={inputClass} 
                                placeholder="E.g. Nexus AI" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className={labelClass}>Order Index</label>
                            <input 
                                value={num} 
                                onChange={(e) => setNum(e.target.value)} 
                                required 
                                className={inputClass} 
                                placeholder="01, 02, etc." 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClass}>Description</label>
                        <textarea 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)} 
                            required 
                            rows={4} 
                            className={`${inputClass} resize-none leading-relaxed`} 
                            placeholder="A brief overview of the project..." 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className={labelClass}>Category</label>
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)} 
                                className={inputClass}
                            >
                                <option value="Web App">Web App</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="Design">Design</option>
                                <option value="Open Source">Open Source</option>
                                <option value="AI / ML">AI / ML</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className={labelClass}>Tech Tags</label>
                            <input 
                                value={tags} 
                                onChange={(e) => setTags(e.target.value)} 
                                required 
                                className={inputClass} 
                                placeholder="Next.js, Tailwind, etc." 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className={labelClass}>Live Preview URL</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input 
                                    value={url} 
                                    onChange={(e) => setUrl(e.target.value)} 
                                    required 
                                    className={`${inputClass} pl-11`} 
                                    placeholder="https://..." 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className={labelClass}>GitHub Repository</label>
                            <div className="relative">
                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input 
                                    value={githubUrl} 
                                    onChange={(e) => setGithubUrl(e.target.value)} 
                                    className={`${inputClass} pl-11`} 
                                    placeholder="https://github.com/..." 
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Section */}
                    <div className="pt-8 border-t border-border/50 space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Search className="w-4 h-4 text-primary" />
                            <h5 className="text-xs font-bold uppercase tracking-widest">Search Engine Optimization</h5>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelClass}>Meta Title</label>
                                <input 
                                    value={seoTitle} 
                                    onChange={(e) => setSeoTitle(e.target.value)} 
                                    className={inputClass} 
                                    placeholder="Google search title..." 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}>Meta Description</label>
                                <input 
                                    value={seoDescription} 
                                    onChange={(e) => setSeoDescription(e.target.value)} 
                                    className={inputClass} 
                                    placeholder="Google search snippet..." 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Media & Actions */}
                <div className="space-y-8">
                    {/* Media Preview */}
                    <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-xl space-y-6">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-primary" />
                            <h5 className="text-xs font-bold uppercase tracking-widest">Media Assets</h5>
                        </div>

                        <div className="space-y-4">
                            <div className="aspect-video rounded-2xl bg-secondary border border-border/50 overflow-hidden group relative">
                                {image ? (
                                    <img src={image} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                                        <ImageIcon className="w-8 h-8 opacity-20" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">Preview Mode</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>Cover Image URL</label>
                                <input 
                                    value={image} 
                                    onChange={(e) => setImage(e.target.value)} 
                                    required 
                                    className={inputClass} 
                                    placeholder="/project-cover.png" 
                                />
                            </div>

                            <div className="space-y-2 pt-2">
                                <label className={labelClass}>Hover Video URL</label>
                                <input 
                                    value={videoUrl} 
                                    onChange={(e) => setVideoUrl(e.target.value)} 
                                    className={inputClass} 
                                    placeholder="https://..." 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Card */}
                    <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-xl space-y-6">
                        <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-primary" />
                            <h5 className="text-xs font-bold uppercase tracking-widest">Publishing</h5>
                        </div>
                        
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            Ensure all URLs are accessible and the order index is unique for correct display in the gallery.
                        </p>

                        <button
                            type="submit"
                            disabled={loading || generating}
                            className="w-full py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-primary/20 text-lg"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : project ? 'Update Portfolio' : 'Launch Project'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

