'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'adnan.khan114@yahoo.com', href: 'mailto:adnan.khan114@yahoo.com', accent: '#6366f1' },
    { icon: Phone, label: 'Phone', value: '+92-344-0787723', href: 'tel:+923440787723', accent: '#10b981' },
    { icon: MessageSquare, label: 'WhatsApp', value: '+92-344-0787723', href: 'https://wa.me/923440787723', accent: '#22c55e' },
    { icon: MapPin, label: 'Location', value: 'Swat, Pakistan', href: '#', accent: '#f59e0b' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed');
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setError('Failed to send. Please try again or reach out directly.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const inputBase = "w-full bg-secondary border border-border rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/40";

    return (
        <div className="pt-28 pb-24 min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* ── HEADER ── */}
                <div className="mb-16 pt-8 max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">Let&apos;s Talk</p>
                    <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.02] mb-6">
                        Get In<br />
                        <span className="text-gradient">Touch.</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Have a project in mind? I&apos;d love to hear about it. Send me a message or reach out via your preferred channel below.
                    </p>
                </div>

                {/* ── MAIN GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

                    {/* Contact form */}
                    <form
                        onSubmit={handleSubmit}
                        className="relative rounded-3xl border border-border bg-card p-8 md:p-10 overflow-hidden"
                    >
                        {/* Subtle orange blob */}
                        <div
                            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-5"
                            style={{ background: 'radial-gradient(circle, #ff6b40, transparent)' }}
                        />

                        <h2 className="font-display font-bold text-2xl mb-8">Send a Message</h2>

                        {success && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Message sent! I&apos;ll get back to you within 24 hours.
                            </div>
                        )}
                        {error && (
                            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Name *</label>
                                <input
                                    type="text" id="name" name="name"
                                    value={formData.name} onChange={handleChange}
                                    required className={inputBase} placeholder="Adnan Khan"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Email *</label>
                                <input
                                    type="email" id="email" name="email"
                                    value={formData.email} onChange={handleChange}
                                    required className={inputBase} placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Subject *</label>
                            <input
                                type="text" id="subject" name="subject"
                                value={formData.subject} onChange={handleChange}
                                required className={inputBase} placeholder="Project inquiry / Collaboration / ..."
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Message *</label>
                            <textarea
                                id="message" name="message"
                                value={formData.message} onChange={handleChange}
                                required rows={6}
                                className={`${inputBase} resize-none`}
                                placeholder="Tell me about your project, goals, timeline, and budget..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Contact sidebar */}
                    <div className="flex flex-col gap-5">
                        {/* Contact cards */}
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <h2 className="font-display font-bold text-lg mb-5">Contact Info</h2>
                            <div className="space-y-3">
                                {contactInfo.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="group flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary/40 bg-secondary hover:bg-primary/5 transition-all duration-300"
                                        >
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                style={{ background: `${item.accent}20` }}
                                            >
                                                <Icon className="w-4 h-4" style={{ color: item.accent }} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{item.label}</p>
                                                <p className="text-sm font-semibold group-hover:text-primary transition-colors duration-200">{item.value}</p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* WhatsApp quick CTA */}
                        <Link
                            href="https://wa.me/923440787723"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-6 rounded-3xl bg-[#22c55e] text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            <div>
                                <p className="text-lg font-display font-bold mb-1">Chat on WhatsApp</p>
                                <p className="text-sm text-white/70 font-normal">Fastest way to reach me</p>
                            </div>
                            <MessageSquare className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                        </Link>

                        {/* Response time */}
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Usually online</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                I typically respond within <span className="font-bold text-foreground">24 hours</span>. For urgent projects, use WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
