'use client';

import { motion } from 'framer-motion';

export function ReactVisual() {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative w-64 h-64"
            >
                {/* Main Rotating React Logo */}
                <motion.div
                    animate={{ 
                        rotate: 360,
                        y: [0, -10, 0]
                    }}
                    transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-full h-full relative"
                >
                    <svg 
                        viewBox="-11.5 -10.23174 23 20.46348" 
                        className="w-full h-full text-foreground/20 fill-none stroke-foreground stroke-[0.2]"
                    >
                        <circle cx="0" cy="0" r="1.5" fill="currentColor" className="text-primary/60" />
                        <g>
                            <ellipse rx="11" ry="4.2" />
                            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                    </svg>
                </motion.div>
            </motion.div>

        </div>
    );
}
