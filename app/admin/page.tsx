export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { Users, Layout, MessageSquare, BookOpen, Monitor, Smartphone, Tablet } from 'lucide-react';

export default async function AdminDashboard() {
    const projectsCount = await prisma.project.count();
    const messagesCount = await prisma.contactMessage.count();
    const blogCount = await prisma.blogPost.count();
    
    // Fallback for when Prisma Client hasn't been regenerated yet
    let visitorsCount = 0;
    let recentVisitors: any[] = [];
    
    try {
        // @ts-ignore
        visitorsCount = await (prisma as any).visitor?.count() || 0;
        // @ts-ignore
        recentVisitors = await (prisma as any).visitor?.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10
        }) || [];
    } catch (err) {
        console.error("Visitor tracking error (Prisma Client sync needed):", err);
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold flex items-center gap-1 border border-green-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Online
                    </span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-primary/5 border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-110" />
                    <div className="flex items-center gap-4 relative">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Total Visitors</h3>
                            <p className="text-3xl font-bold font-mono">{visitorsCount}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-blue-500/5 border-blue-500/10 relative overflow-hidden group">
                    <div className="flex items-center gap-4 relative">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                            <Layout className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Projects</h3>
                            <p className="text-3xl font-bold font-mono">{projectsCount}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-purple-500/5 border-purple-500/10 relative overflow-hidden group">
                    <div className="flex items-center gap-4 relative">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Messages</h3>
                            <p className="text-3xl font-bold font-mono">{messagesCount}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-orange-500/5 border-orange-500/10 relative overflow-hidden group">
                    <div className="flex items-center gap-4 relative">
                        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-wider">Blog Posts</h3>
                            <p className="text-3xl font-bold font-mono">{blogCount}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="overflow-hidden border-border/50 bg-secondary/5 backdrop-blur-sm shadow-2xl">
                <div className="p-6 border-b border-border/50 flex justify-between items-center bg-secondary/20">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase bg-background border border-border px-2 py-1 rounded-md">Live Stream</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/30 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                                <th className="p-6">Visitor Identifier</th>
                                <th className="p-6">Device Profile</th>
                                <th className="p-6">Geographic Data</th>
                                <th className="p-6 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {recentVisitors.map((visitor) => (
                                <tr key={visitor.id} className="hover:bg-primary/5 transition-all duration-300 group">
                                    <td className="p-6">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-sm font-bold group-hover:text-primary transition-colors">{visitor.ip}</span>
                                            <span className="text-[10px] text-muted-foreground truncate max-w-[250px] opacity-60" title={visitor.userAgent}>
                                                {visitor.browser} • {visitor.userAgent}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-secondary rounded-lg">
                                                {visitor.device === 'Mobile' ? <Smartphone className="w-4 h-4" /> : 
                                                 visitor.device === 'Tablet' ? <Tablet className="w-4 h-4" /> : 
                                                 <Monitor className="w-4 h-4" />}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{visitor.os}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{visitor.device}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{visitor.city !== 'Unknown' ? visitor.city : 'N/A'}, {visitor.country !== 'Unknown' ? visitor.country : 'N/A'}</span>
                                            <span className="text-[10px] text-muted-foreground opacity-60">Geolocation</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-foreground">
                                                {new Date(visitor.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground font-medium">
                                                {new Date(visitor.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {recentVisitors.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-20">
                                            <Users className="w-12 h-12" />
                                            <p className="text-sm font-bold uppercase tracking-widest">No signals detected</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-secondary/10 border-t border-border/50 text-center">
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                        View Complete Audit Log
                    </button>
                </div>
            </Card>
        </div>
    );
}
