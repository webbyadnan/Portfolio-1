'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -200, y: -200 });
    const current = useRef({ x: -200, y: -200 });
    const raf = useRef<number>(0);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        // Only show on non-touch (pointer: fine) devices
        if (!window.matchMedia('(pointer: fine)').matches) return;

        setVisible(true);

        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };


        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);

        const onEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
                setHovered(true);
            }
        };
        const onLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
                setHovered(false);
            }
        };

        // Lerp animation loop
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            current.current.x = lerp(current.current.x, pos.current.x, 0.12);
            current.current.y = lerp(current.current.y, pos.current.y, 0.12);

            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }

            raf.current = requestAnimationFrame(animate);
        };

        raf.current = requestAnimationFrame(animate);

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('mouseover', onEnter);
        window.addEventListener('mouseout', onLeave);

        return () => {
            cancelAnimationFrame(raf.current);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('mouseover', onEnter);
            window.removeEventListener('mouseout', onLeave);
        };
    }, []);

    if (!visible) return null;

    return (
        <>
            {/* Outer ring — lags behind (lerp) */}
            <div
                ref={ringRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 99999,
                    pointerEvents: 'none',
                    width: hovered ? '52px' : clicking ? '28px' : '36px',
                    height: hovered ? '52px' : clicking ? '28px' : '36px',
                    borderRadius: '50%',
                    border: `1.5px solid ${hovered ? '#ff6b40' : 'rgba(255,107,64,0.5)'}`,
                    backgroundColor: hovered ? 'rgba(255,107,64,0.08)' : 'transparent',
                    boxShadow: hovered ? '0 0 20px rgba(255,107,64,0.25)' : 'none',
                    transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
                    willChange: 'transform',
                }}
            />
            {/* Inner dot — snaps instantly */}
            <div
                ref={dotRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 100000,
                    pointerEvents: 'none',
                    width: clicking ? '3px' : '5px',
                    height: clicking ? '3px' : '5px',
                    borderRadius: '50%',
                    backgroundColor: '#ff6b40',
                    transition: 'width 0.15s ease, height 0.15s ease',
                    willChange: 'transform',
                }}
            />
        </>
    );
}
