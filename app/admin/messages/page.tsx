export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { MessageReply } from '@/components/admin/MessageReply';
import { User, Clock, AtSign } from 'lucide-react';

export default async function MessagesPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Inbound Messages</h1>
                <span className="px-3 py-1 rounded-full bg-secondary text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border">
                    {messages.length} Total
                </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {messages.map(msg => (
                    <Card key={msg.id} className="p-8 bg-secondary/5 border-border/50 hover:border-primary/20 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative">
                            <div className="space-y-4 flex-1">
                                <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-tighter">
                                    <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-2 py-1 rounded-md">
                                        <User className="w-3.5 h-3.5" /> {msg.name}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
                                        <AtSign className="w-3.5 h-3.5" /> {msg.email}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
                                        <Clock className="w-3.5 h-3.5" /> {new Date(msg.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                
                                <div className="bg-background/50 p-6 rounded-2xl border border-border/30 shadow-inner">
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{msg.message}</p>
                                </div>
                            </div>

                            <div className="shrink-0 md:pt-1">
                                <MessageReply 
                                    email={msg.email} 
                                    name={msg.name} 
                                    originalMessage={msg.message} 
                                />
                            </div>
                        </div>
                    </Card>
                ))}
                {messages.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl opacity-30">
                        <User className="w-12 h-12 mx-auto mb-4" />
                        <p className="text-lg font-bold">Inbox Empty</p>
                        <p className="text-sm">New inquiries will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
