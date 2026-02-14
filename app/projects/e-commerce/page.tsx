"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    Search,
    Menu,
    X,
    Star,
    ArrowRight,
    ChevronDown,
    Filter,
    CreditCard,
    Truck,
    ShieldCheck,
    RefreshCw,
    Heart,
    Eye,
    ArrowLeft,
    User
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PRODUCTS, useCartStore } from "./store";

const CATEGORIES = ["All", "Audio", "Wearables", "Computing", "Accessories"];

export default function ECommerceStorefront() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const wishlist = useCartStore((state) => state.wishlist);
    const toggleWishlist = useCartStore((state) => state.toggleWishlist);


    // Fix hydration mismatch for zustand persist
    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => {
            const matchesCategory = activeCategory === "All" || p.category === activeCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const cartItemsCount = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }, [cart]);

    const cartTotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            const price = product?.salePrice || product?.price || 0;
            return acc + price * item.quantity;
        }, 0);
    }, [cart]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] text-[#E0E0E0] font-sans selection:bg-blue-500/30">
            {/* --- Sticky Header --- */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Link href="/projects/e-commerce" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
                            ZENITH.
                        </Link>
                        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#A0A0A0]">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "hover:text-white transition-colors relative py-1",
                                        activeCategory === cat && "text-white"
                                    )}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div layoutId="navunderline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500" />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 h-10 w-64 focus-within:border-blue-500/50 transition-colors">
                            <Search className="w-4 h-4 text-[#606060]" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm px-3 w-full placeholder:text-[#606060]"
                            />
                        </div>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-[#A0A0A0] hover:text-white transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>

                        <Link
                            href="/projects/e-commerce/account"
                            className="hidden md:block p-2 text-[#A0A0A0] hover:text-white transition-colors"
                        >
                            <User className="w-6 h-6" />
                        </Link>

                        <button
                            className="lg:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="pt-32 pb-24">
                {/* Banner Section */}
                <section className="container mx-auto px-6 mb-20">
                    <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#0A0A20] to-[#050510] border border-white/5 p-12 lg:p-24 flex flex-col items-center text-center">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
                            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10 max-w-3xl"
                        >
                            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9]">
                                FUTURE OF <br /> <span className="text-blue-500">HARDWARE.</span>
                            </h1>
                            <p className="text-[#A0A0A0] text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                                Experience high-fidelity technology designed for the modern desktop. Precision engineering meets uncompromising aesthetic.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Button size="lg" className="h-14 px-10 rounded-full bg-white text-black hover:bg-white/90 font-bold transition-transform active:scale-95">
                                    Shop Zenith Pro
                                </Button>
                                <Link href="/projects" className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-white/20 bg-transparent text-white font-bold hover:bg-white/5">
                                    View All Projects
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Filters/Intro */}
                <section className="container mx-auto px-6 mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Collection</h2>
                            <p className="text-[#606060] text-lg">Showing {filteredProducts.length} items for your setup</p>
                        </div>

                        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-6 h-11 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                                        activeCategory === cat
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                            : "bg-white/5 border border-white/10 text-[#A0A0A0] hover:border-white/20"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((p, idx) => (
                                <motion.div
                                    layout
                                    key={p.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group relative flex flex-col bg-white/2 border border-white/5 hover:border-white/20 rounded-[2.5rem] p-5 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Card Badges */}
                                    {p.newArrival && (
                                        <div className="absolute top-8 left-8 z-10 px-3 py-1 bg-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                            New
                                        </div>
                                    )}
                                    {p.trending && !p.newArrival && (
                                        <div className="absolute top-8 left-8 z-10 px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                            Trending
                                        </div>
                                    )}
                                    {p.salePrice && (
                                        <div className="absolute top-8 right-20 z-10 px-3 py-1 bg-red-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                            Sale
                                        </div>
                                    )}

                                    {/* Actions (Hidden by default) */}
                                    <div className="absolute top-8 right-8 z-10 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <button
                                            onClick={() => toggleWishlist(p.id)}
                                            className={cn(
                                                "w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all",
                                                wishlist.includes(p.id)
                                                    ? "bg-red-500 border-red-500 text-white"
                                                    : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
                                            )}
                                        >
                                            <Heart className={cn("w-4 h-4", wishlist.includes(p.id) && "fill-current")} />
                                        </button>
                                        <Link href={`/projects/e-commerce/product/${p.id}`} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    {/* Image Area */}
                                    <Link href={`/projects/e-commerce/product/${p.id}`} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 bg-[#0A0A15] block">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </Link>

                                    {/* Content */}
                                    <div className="px-3 flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{p.category}</span>
                                            <div className="flex items-center gap-1 text-[#606060] font-bold text-xs">
                                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                {p.rating}
                                            </div>
                                        </div>
                                        <Link href={`/projects/e-commerce/product/${p.id}`} className="block">
                                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight hover:text-blue-500 transition-colors">{p.name}</h3>
                                        </Link>
                                        <p className="text-[#606060] text-sm mb-6 leading-relaxed line-clamp-2">{p.description}</p>

                                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                                            <div>
                                                {p.salePrice ? (
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-black text-white">${p.salePrice}</span>
                                                        <span className="text-base font-bold text-[#606060] line-through">${p.price}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-2xl font-black text-white">${p.price}</span>
                                                )}
                                                {p.stock < 10 && p.stock > 0 && (
                                                    <p className="text-[10px] font-bold text-amber-500 mt-1">Only {p.stock} left</p>
                                                )}
                                                {p.stock === 0 && (
                                                    <p className="text-[10px] font-bold text-red-500 mt-1">Out of stock</p>
                                                )}
                                            </div>
                                            <Button
                                                onClick={() => addToCart(p.id)}
                                                disabled={p.stock === 0}
                                                className="h-12 w-12 rounded-2xl bg-white text-black hover:bg-blue-600 hover:text-white p-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Trust Section */}
                <section className="container mx-auto px-6 mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-20 border-y border-white/5">
                        {[
                            { icon: Truck, title: "Global Express", desc: "Ships to 120+ countries" },
                            { icon: ShieldCheck, title: "Zenith Warranty", desc: "2-year premium coverage" },
                            { icon: RefreshCw, title: "Hassle-Free", desc: "60-day return policy" },
                            { icon: CreditCard, title: "Flexible Pay", desc: "0% APR financing available" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center px-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 border border-white/10">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-[#606060] text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* --- Side Cart Drawer --- */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-[#0A0A15] border-l border-white/10 flex flex-col p-8"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-3xl font-black tracking-tighter text-white">YOUR CART.</h3>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 text-[#A0A0A0] hover:text-white"
                                >
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
                                {cart.length > 0 ? (
                                    cart.map((item, idx) => {
                                        const p = PRODUCTS.find(prod => prod.id === item.productId);
                                        return (
                                            <div key={idx} className="flex gap-5 p-4 bg-white/2 border border-white/5 rounded-3xl">
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#050510] border border-white/10 shrink-0">
                                                    <img src={p?.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-white truncate">{p?.name}</h4>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <p className="text-[#606060] text-sm font-bold">${p?.price} x {item.quantity}</p>
                                                        <button
                                                            onClick={() => removeFromCart(item.productId)}
                                                            className="text-xs text-red-500 font-bold hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <ShoppingCart className="w-16 h-16 text-[#202020] mb-4" />
                                        <p className="text-[#404040] font-bold">Your setup is looking lonely.</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[#A0A0A0] font-medium">Subtotal</span>
                                    <span className="text-3xl font-black text-white">${cartTotal.toFixed(2)}</span>
                                </div>
                                <Link href="/projects/e-commerce/cart" onClick={() => setIsCartOpen(false)}>
                                    <Button
                                        disabled={cart.length === 0}
                                        className="w-full h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg tracking-tight shadow-xl shadow-blue-600/20 active:scale-95 transition-transform"
                                    >
                                        GO TO CART
                                    </Button>
                                </Link>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full text-center mt-6 text-[#606060] font-medium text-sm hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- Footer --- */}
            <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center">
                <div className="mb-8">
                    <Link href="/projects/e-commerce" className="text-xl font-black tracking-tighter text-white">ZENITH.</Link>
                </div>
                <p className="text-[#404040] text-sm mb-6">Built by Adnan Khan © 2026. All rights reserved.</p>
                <div className="flex items-center justify-center gap-6 text-[#606060] text-sm font-medium">
                    <Link href="/projects" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="/projects" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="/projects" className="hover:text-white transition-colors">Shipping</Link>
                </div>
            </footer>
        </div>
    );
}
