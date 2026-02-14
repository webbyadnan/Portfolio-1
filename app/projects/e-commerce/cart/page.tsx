"use client";

import { useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    Trash2,
    ArrowLeft,
    ArrowRight,
    Minus,
    Plus,
    CreditCard,
    ShieldCheck,
    Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PRODUCTS, useCartStore } from "../store";

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const cartTotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            return acc + (product?.price || 0) * item.quantity;
        }, 0);
    }, [cart]);

    const shipping = cartTotal > 500 ? 0 : 25;
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + shipping + tax;

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] text-[#E0E0E0] font-sans selection:bg-blue-500/30">
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/projects/e-commerce" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
                        ZENITH.
                    </Link>
                    <div className="text-xs font-black uppercase tracking-widest text-[#606060]">
                        Secure Portal
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">

                        {/* Cart List */}
                        <div className="flex-1 w-full">
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                <h1 className="text-4xl font-black text-white tracking-tighter">SHOPPING BAG.</h1>
                                <span className="text-[#606060] font-bold">{cart.length} Items</span>
                            </div>

                            {cart.length > 0 ? (
                                <div className="space-y-8">
                                    <AnimatePresence mode="popLayout">
                                        {cart.map((item) => {
                                            const product = PRODUCTS.find(p => p.id === item.productId);
                                            if (!product) return null;
                                            return (
                                                <motion.div
                                                    layout
                                                    key={item.productId}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="flex flex-col sm:flex-row gap-8 p-6 bg-white/2 border border-white/10 rounded-[2rem] group"
                                                >
                                                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[#0A0A15] border border-white/10 shrink-0">
                                                        <img src={product.image} className="w-full h-full object-cover" />
                                                    </div>

                                                    <div className="flex-1 flex flex-col justify-between py-1">
                                                        <div>
                                                            <div className="flex items-start justify-between gap-4">
                                                                <Link href={`/projects/e-commerce/product/${product.id}`}>
                                                                    <h3 className="text-xl font-bold text-white hover:text-blue-500 transition-colors uppercase">{product.name}</h3>
                                                                </Link>
                                                                <button
                                                                    onClick={() => removeFromCart(product.id)}
                                                                    className="p-2 text-[#404040] hover:text-red-500 transition-colors"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                            <p className="text-xs font-bold text-blue-500/60 uppercase tracking-widest mt-1">{product.category}</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                                                                <button
                                                                    onClick={() => updateQuantity(product.id, Math.max(1, item.quantity - 1))}
                                                                    className="w-8 h-8 flex items-center justify-center text-[#606060] hover:text-white"
                                                                >
                                                                    <Minus className="w-3 h-3" />
                                                                </button>
                                                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(product.id, item.quantity + 1)}
                                                                    className="w-8 h-8 flex items-center justify-center text-[#606060] hover:text-white"
                                                                >
                                                                    <Plus className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                            <div className="text-xl font-black text-white">
                                                                ${(product.price * item.quantity).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>

                                    <button
                                        onClick={clearCart}
                                        className="text-xs font-black uppercase tracking-widest text-[#404040] hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            ) : (
                                <div className="py-24 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                        <ShoppingCart className="w-10 h-10 text-[#404040]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Cart is empty</h2>
                                    <p className="text-[#606060] mb-8">Start adding tech to your setup today.</p>
                                    <Link href="/projects/e-commerce">
                                        <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-transparent text-white font-bold hover:bg-white/5">
                                            Return to Shop
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-[400px]">
                            <div className="sticky top-32 p-10 bg-white/2 border border-blue-500/10 rounded-[3rem] shadow-2xl shadow-blue-500/5">
                                <h2 className="text-2xl font-black text-white tracking-tighter mb-10">SUMMARY.</h2>

                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#A0A0A0] font-medium">Subtotal</span>
                                        <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#A0A0A0] font-medium">Shipping</span>
                                        <span className="text-white font-bold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#A0A0A0] font-medium">Tax</span>
                                        <span className="text-white font-bold">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 flex justify-between">
                                        <span className="text-xl font-black text-white">TOTAL.</span>
                                        <span className="text-xl font-black text-blue-500">${grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Link href="/projects/e-commerce/success">
                                        <Button
                                            disabled={cart.length === 0}
                                            className="w-full h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-lg tracking-tight shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                                        >
                                            CHECKOUT NOW <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <p className="text-[10px] text-[#404040] text-center font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                        Encrypted & Secure Transaction
                                    </p>
                                </div>

                                <div className="mt-12 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Zap className="w-4 h-4 text-blue-500" />
                                        <h4 className="text-xs font-black text-white uppercase tracking-widest">Zenith Perks</h4>
                                    </div>
                                    <p className="text-[11px] text-[#A0A0A0] leading-relaxed">
                                        Orders over $1,000 include complimentary Priority Express shipping and setup assistance.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center mt-24">
                <Link href="/projects/e-commerce" className="inline-flex items-center gap-2 text-primary font-bold hover:underline mb-4">
                    <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
                <p className="text-[#404040] text-sm">Zenith Technology Inc. © 2026</p>
            </footer>
        </div>
    );
}
