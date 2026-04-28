'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const icons = ['{ }', '</>', '[ ]', '( )', '=>', '&&', '||', '!=', '==', '++'];

export function CodeConstellation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
            
            {/* Interactive Nodes */}
            <div className="relative w-full h-full">
                {[...Array(15)].map((_, i) => (
                    <Node key={i} index={i} mousePosition={mousePosition} />
                ))}
            </div>

            {/* Central Creative Core */}
            <motion.div 
                animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                }}
                transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                className="absolute w-64 h-64 border-2 border-primary/10 rounded-full flex items-center justify-center"
            >
                <div className="w-48 h-48 border border-primary/20 rounded-full border-dashed animate-spin-slow" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-6xl font-bold text-primary/20 select-none pointer-events-none"
                    >
                        &lt;/&gt;
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Code Snippets */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
            >
                <FloatingTag text="Next.js" x="20%" y="30%" delay={0} />
                <FloatingTag text="TypeScript" x="70%" y="20%" delay={1} />
                <FloatingTag text="Groq AI" x="80%" y="70%" delay={2} />
                <FloatingTag text="React" x="15%" y="75%" delay={3} />
            </motion.div>
        </div>
    );
}

function Node({ index, mousePosition }: { index: number, mousePosition: { x: number, y: number } }) {
    const x = (index % 4) * 25 + 10 + Math.random() * 10;
    const y = Math.floor(index / 4) * 25 + 10 + Math.random() * 10;
    
    const icon = icons[index % icons.length];

    return (
        <motion.div
            animate={{
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}
            className="absolute text-primary/10 font-mono text-2xl select-none"
        >
            {icon}
        </motion.div>
    );
}

function FloatingTag({ text, x, y, delay }: { text: string, x: string, y: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{ 
                duration: 6, 
                repeat: Infinity, 
                delay,
                ease: "easeInOut"
            }}
            style={{ left: x, top: y }}
            className="absolute px-4 py-2 border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary/40 backdrop-blur-sm"
        >
            {text}
        </motion.div>
    );
}
