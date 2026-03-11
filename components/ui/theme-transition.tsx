'use client';

import React, { createContext, useContext, useCallback, useRef, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

// ── Context ────────────────────────────────────────────────────────────────────

type TransitionFn = (nextTheme: 'light' | 'dark') => void;

const ThemeTransitionContext = createContext<{ trigger: TransitionFn }>({
    trigger: () => { },
});

export function useThemeTransition() {
    return useContext(ThemeTransitionContext);
}

// ── Provider + Overlay ─────────────────────────────────────────────────────────

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
    const { setTheme } = useTheme();

    // overlay state
    const [visible, setVisible] = useState(false);
    const [phase, setPhase] = useState<'rise' | 'fall' | 'idle'>('idle');
    const [nextTheme, setNextTheme] = useState<'light' | 'dark'>('dark');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearT = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

    // Text shown on the curtain
    const label = nextTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
    const icon = nextTheme === 'dark' ? '🌙' : '☀️';

    const trigger: TransitionFn = useCallback((next) => {
        clearT();
        setNextTheme(next);
        setVisible(true);
        setPhase('rise');           // curtain rises from bottom

        // halfway through → actually switch the theme
        timeoutRef.current = setTimeout(() => {
            setTheme(next);
        }, 420);

        // then drop the curtain back down
        timeoutRef.current = setTimeout(() => {
            setPhase('fall');
        }, 700);

        // finally hide the overlay
        timeoutRef.current = setTimeout(() => {
            setVisible(false);
            setPhase('idle');
        }, 1200);
    }, [setTheme]);

    // Cleanup on unmount
    useEffect(() => () => clearT(), []);

    return (
        <ThemeTransitionContext.Provider value={{ trigger }}>
            {children}

            {/* ── Curtain Overlay ── */}
            {visible && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // curtain panel fills from bottom
                        clipPath: phase === 'rise'
                            ? 'inset(0% 0% 0% 0%)'           // fully visible
                            : 'inset(100% 0% 0% 0%)',         // retract upward
                        background: nextTheme === 'dark'
                            ? 'linear-gradient(160deg, #0c0c0a 60%, #1a140f 100%)'
                            : 'linear-gradient(160deg, #fafaf8 60%, #fff5ef 100%)',
                        transition: phase === 'rise'
                            ? 'clip-path 0.55s cubic-bezier(0.76, 0, 0.24, 1)'
                            : 'clip-path 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
                        // initial state is "hidden below" before animation starts
                        ...(phase === 'idle' ? { clipPath: 'inset(100% 0% 0% 0%)' } : {}),
                    }}
                >
                    {/* Label text */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                            opacity: phase === 'rise' ? 1 : 0,
                            transform: phase === 'rise' ? 'translateY(0)' : 'translateY(12px)',
                            transition: 'opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s',
                        }}
                    >
                        <span style={{ fontSize: '3rem', lineHeight: 1 }}>{icon}</span>
                        <span
                            style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: nextTheme === 'dark' ? '#f2f0eb' : '#0c0c0a',
                                fontFamily: 'var(--font-space-grotesk, system-ui)',
                            }}
                        >
                            {label}
                        </span>
                        {/* Orange accent line */}
                        <div
                            style={{
                                width: '48px',
                                height: '3px',
                                borderRadius: '99px',
                                background: '#ff6b40',
                            }}
                        />
                    </div>
                </div>
            )}
        </ThemeTransitionContext.Provider>
    );
}

// ── Drop-in ThemeToggle (uses the transition) ────────────────────────────────

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const { trigger } = useThemeTransition();

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) {
        return (
            <button className="relative h-9 w-9 rounded-full flex items-center justify-center bg-secondary border border-border">
                <Sun className="h-4 w-4" />
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => trigger(isDark ? 'light' : 'dark')}
            className="relative h-9 w-9 rounded-full flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary transition-all duration-300 overflow-hidden group"
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
                    ? 'rotate-0 scale-100 opacity-100 text-sky-400 group-hover:text-primary-foreground'
                    : '-rotate-90 scale-0 opacity-0'
                    }`}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
