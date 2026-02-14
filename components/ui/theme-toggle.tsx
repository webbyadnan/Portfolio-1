'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="relative h-9 w-9 rounded-full flex items-center justify-center bg-secondary border border-border color-shift">
                <Sun className="h-4 w-4" />
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative h-9 w-9 rounded-full flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary color-shift overflow-hidden group"
            aria-label="Toggle theme"
        >
            <Sun
                className={`h-4 w-4 absolute transition-all duration-500 ${isDark
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100 text-amber-500 group-hover:text-primary-foreground'
                    }`}
            />
            <Moon
                className={`h-4 w-4 absolute transition-all duration-500 ${isDark
                    ? 'rotate-0 scale-100 opacity-100 text-cyan-400 group-hover:text-primary-foreground'
                    : '-rotate-90 scale-0 opacity-0'
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
