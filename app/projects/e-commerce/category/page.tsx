"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import {
    ShoppingCart,
    Star,
    Heart,
    Eye,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PRODUCTS, useCartStore, type Product } from "../store";

const CATEGORIES = ["All", "Audio", "Wearables", "Computing", "Accessories"];

function CategoryContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "All";

    const addToCart = useCartStore((state: any) => state.addToCart);
    const wishlist = useCartStore((state: any) => state.wishlist);
    const toggleWishlist = useCartStore((state: any) => state.toggleWishlist);

    const filteredProducts = PRODUCTS.filter((p) =>
        category === "All" ? true : p.category === category
    );

    const categoryInfo = {
        Audio: {
            title: "Premium Audio",
            description: "Experience sound like never before with our cutting-edge audio technology.",
        },
        Wearables: {
            title: "Smart Wearables",
            description: "Stay connected with intelligent devices that fit your lifestyle.",
        },
        Computing: {
            title: "Next-Gen Computing",
            description: "Power through your day with revolutionary computing solutions.",
        },
        Accessories: {
            title: "Essential Accessories",
            description: "Complete your setup with premium accessories designed for perfection.",
        },
    };

    const info = categoryInfo[category as keyof typeof categoryInfo];

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#020205]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/projects/e-commerce" className="text-2xl font-black tracking-tighter text-white">
                        ZENITH.
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat}
                                href={`/projects/e-commerce/category?category=${cat}`}
                                className={cn(
                                    "text-sm font-semibold transition-colors",
                                    category === cat ? "text-white" : "text-slate-500 hover:text-white"
                                )}
                            >
                                {cat}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <div className="container mx-auto px-6 pt-32 pb-24">
                {/* Back Button */}
                <Link
                    href="/projects/e-commerce"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shop
                </Link>

                {/* Category Hero */}
                {info && (
                    <div className="mb-16 text-center max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                                {info.title}
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                {info.description}
                            </p>
                        </motion.div>
                    </div>
                )}

                {/* Products Count */}
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
                    <p className="text-slate-500">
                        {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProducts.map((p, idx) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative flex flex-col bg-white/2 border border-white/5 hover:border-white/20 rounded-[2.5rem] p-5 transition-all duration-500"
                        >
                            {/* Badges */}
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

                            {/* Quick Actions */}
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
                                <Link
                                    href={`/projects/e-commerce/product/${p.id}`}
                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Product Image */}
                            <Link href={`/projects/e-commerce/product/${p.id}`} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 bg-[#0A0A15] block">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </Link>

                            {/* Product Info */}
                            <div className="px-3 flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{p.category}</span>
                                    <div className="flex items-center gap-1 text-[#606060] font-bold text-xs">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        {p.rating}
                                    </div>
                                </div>
                                <Link href={`/projects/e-commerce/product/${p.id}`} className="block">
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight hover:text-blue-500 transition-colors">
                                        {p.name}
                                    </h3>
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
                                    </div>
                                    <Button
                                        onClick={() => addToCart(p.id)}
                                        disabled={p.stock === 0}
                                        className="h-12 w-12 rounded-2xl bg-white text-black hover:bg-blue-600 hover:text-white p-0 transition-colors disabled:opacity-50"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CategoryPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#020205] flex items-center justify-center">
                <div className="text-white">Loading products...</div>
            </div>
        }>
            <CategoryContent />
        </Suspense>
    );
}
