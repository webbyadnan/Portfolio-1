"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, PenTool, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <div className="min-h-screen bg-background">{children}</div>;
    }

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
        { label: 'Blog Posts', href: '/admin/blog', icon: PenTool },
        { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground pt-16">
            <aside className="w-64 border-r border-border/50 p-6 flex flex-col gap-2 bg-secondary/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground">A</div>
                    <div className="font-bold text-lg tracking-tight">Admin Console</div>
                </div>
                
                <div className="flex-1 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link 
                                key={item.href}
                                href={item.href} 
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                                    isActive 
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold' 
                                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="pt-4 border-t border-border/50">
                    <button 
                        onClick={() => {
                            // Simple signout by clearing the cookie (requires a tiny API or just redirecting)
                            document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                            window.location.href = '/admin/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-10 bg-secondary/10">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
