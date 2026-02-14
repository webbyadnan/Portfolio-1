'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
    { icon: Mail, label: 'Email', value: 'adnan.khan114@yahoo.com', href: 'mailto:adnan.khan114@yahoo.com', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
    { icon: Phone, label: 'Phone', value: '+92-344-0787723', href: 'tel:+923440787723', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { icon: MessageSquare, label: 'WhatsApp', value: '+92-344-0787723', href: 'https://wa.me/923440787723', color: 'bg-green-500/10 text-green-600 dark:text-green-400' },
    { icon: MapPin, label: 'Location', value: 'Swat, Pakistan', href: '#', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
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
            if (!response.ok) throw new Error('Failed to send message');
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const inputClasses = "w-full bg-card border border-border rounded-xl p-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground/50";

    return (
        <div className="container mx-auto px-6 pt-32 pb-24 max-w-6xl">
            <div className="mb-16">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
                    Get In <span className="text-primary">Touch</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Have a project in mind or just want to say hi? Feel free to reach out!
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="rounded-2xl border border-border p-8 bg-card">
                        <h2 className="text-2xl font-bold mb-8">Send a Message</h2>

                        {success && (
                            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                Message sent successfully! I&apos;ll get back to you soon.
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Name *</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder="Your name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Email *</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="your@email.com" />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Subject *</label>
                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClasses} placeholder="What's this about?" />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Message *</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className={`${inputClasses} resize-none`} placeholder="Tell me about your project..." />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl color-shift hover:bg-[var(--shift-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Sending...' : (
                                <>
                                    Send Message
                                    <Send className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h2 className="text-lg font-bold mb-5">Contact Information</h2>
                        <div className="space-y-3">
                            {contactInfo.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-3 p-3.5 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 group"
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        <span className={`p-2.5 rounded-lg ${item.color}`}>
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
                                            <p className="font-semibold text-sm">{item.value}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h3 className="font-bold text-lg mb-3">Quick Response</h3>
                        <p className="text-sm text-muted-foreground mb-5">
                            I typically respond within 24 hours. For urgent inquiries, please call or WhatsApp.
                        </p>
                        <Link
                            href="https://wa.me/923440787723"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full px-4 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors duration-300"
                        >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            WhatsApp Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
