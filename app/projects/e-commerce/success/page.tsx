"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle,
    ArrowRight,
    Package,
    Truck,
    ShieldCheck,
    House
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../store";

export default function CheckoutSuccess() {
    const [mounted, setMounted] = useState(false);
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
            clearCart();
        }, 0);
        return () => clearTimeout(timer);
    }, [clearCart]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
            <div className="max-w-xl w-full text-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-10 border border-emerald-500/20"
                >
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-5xl font-black tracking-tighter mb-6 uppercase">Order Confirmed.</h1>
                    <p className="text-[#A0A0A0] text-lg mb-12 leading-relaxed">
                        Thank you for choosing Zenith. Your hardware is being precision-checked and will be dispatched via Global Express within 24 hours.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
                >
                    <div className="p-6 bg-white/2 border border-white/5 rounded-3xl">
                        <Package className="w-6 h-6 text-blue-500 mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#606060]">Status</p>
                        <p className="text-xs font-bold text-white">Preparing</p>
                    </div>
                    <div className="p-6 bg-white/2 border border-white/5 rounded-3xl">
                        <Truck className="w-6 h-6 text-blue-500 mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#606060]">Carrier</p>
                        <p className="text-xs font-bold text-white">Global Express</p>
                    </div>
                    <div className="p-6 bg-white/2 border border-white/5 rounded-3xl">
                        <ShieldCheck className="w-6 h-6 text-blue-500 mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#606060]">Warranty</p>
                        <p className="text-xs font-bold text-white">2-Year Active</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/projects/e-commerce">
                        <Button className="h-16 px-10 rounded-[2rem] bg-white text-black font-black text-lg hover:bg-white/90 active:scale-95 transition-transform">
                            RETURN TO SHOP
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" className="h-16 px-10 rounded-[2rem] border-white/10 bg-transparent text-white font-black text-lg hover:bg-white/5 active:scale-95 transition-transform gap-2">
                            <House className="w-5 h-5" /> HOME
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
