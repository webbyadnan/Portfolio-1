'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const max = el.scrollHeight - el.clientHeight;
            if (max <= 0) { setPct(0); return; }
            setPct((window.scrollY / max) * 100);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 9998,
                height: '2px',
                width: `${pct}%`,
                background: 'linear-gradient(90deg, #ff6b40, #ff9a7a)',
                transition: 'width 0.08s linear',
                willChange: 'width',
                boxShadow: '0 0 8px rgba(255,107,64,0.5)',
            }}
        />
    );
}
