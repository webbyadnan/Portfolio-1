'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center container mx-auto px-6">
            <div className="text-center max-w-md">
                <h1 className="text-8xl md:text-9xl font-extrabold text-primary mb-4 tracking-tight">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl color-shift hover:bg-[var(--shift-hover)]">
                        <Home className="mr-2 h-4 w-4" />
                        Go Home
                    </Link>
                    <button onClick={() => window.history.back()} className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl border border-border hover:border-primary hover:text-primary color-shift">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
