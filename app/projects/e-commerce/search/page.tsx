"use client";

import { useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import {
    ShoppingCart,
    Search,
    Star,
    Filter,
    X,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PRODUCTS, useCartStore } from "../store";

const CATEGORIES = ["All", "Audio", "Wearables", "Computing", "Accessories"];
const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
];

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [showFilters, setShowFilters] = useState(false);

    const addToCart = useCartStore((state: any) => state.addToCart);

    const filteredProducts = useMemo(() => {
        let results = PRODUCTS.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        );

        // Category filter
        if (selectedCategory !== "All") {
            results = results.filter((p) => p.category === selectedCategory);
        }

        // Price range filter
        results = results.filter((p) => {
            const price = p.salePrice || p.price;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort
        if (sortBy === "price-low") {
            results.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        } else if (sortBy === "price-high") {
            results.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        } else if (sortBy === "rating") {
            results.sort((a, b) => b.rating - a.rating);
        }

        return results;
    }, [query, selectedCategory, priceRange, sortBy]);

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#020205]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/projects/e-commerce" className="text-2xl font-black tracking-tighter text-white">
                        ZENITH.
                    </Link>
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

                {/* Search Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Search Results for &quot;{query}&quot;
                    </h1>
                    <p className="text-slate-500">
                        {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                    </p>
                </div>

                <div className="flex gap-12">
                    {/* Sidebar Filters */}
                    <div className={cn(
                        "lg:block lg:w-64 shrink-0",
                        showFilters ? "fixed inset-0 z-50 bg-[#020205] p-6 overflow-y-auto" : "hidden"
                    )}>
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <h3 className="text-xl font-black">Filters</h3>
                            <button onClick={() => setShowFilters(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-8">
                            <h4 className="text-sm font-black uppercase tracking-wider mb-4">Category</h4>
                            <div className="space-y-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={cn(
                                            "w-full text-left px-4 py-3 rounded-xl transition-all font-semibold text-sm",
                                            selectedCategory === cat
                                                ? "bg-white text-black"
                                                : "bg-white/5 hover:bg-white/10"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-8">
                            <h4 className="text-sm font-black uppercase tracking-wider mb-4">Price Range</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
                                        placeholder="Min"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Controls */}
                        <div className="flex items-center justify-between mb-8">
                            <button
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-bold"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>

                            <div className="flex items-center gap-3 ml-auto">
                                <span className="text-sm font-semibold text-slate-500">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold text-sm"
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((p, idx) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group"
                                    >
                                        <Link href={`/projects/e-commerce/product/${p.id}`} className="block mb-4">
                                            <div className="aspect-square rounded-2xl overflow-hidden bg-[#0A0A15] mb-4">
                                                <img
                                                    src={p.image}
                                                    alt={p.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold text-blue-500 uppercase">{p.category}</span>
                                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                    {p.rating}
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-500 transition-colors">
                                                {p.name}
                                            </h3>
                                            <div>
                                                {p.salePrice ? (
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-black">${p.salePrice}</span>
                                                        <span className="text-sm text-slate-500 line-through">${p.price}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-black">${p.price}</span>
                                                )}
                                            </div>
                                        </Link>
                                        <Button
                                            onClick={() => addToCart(p.id)}
                                            className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-black"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <Search className="w-16 h-16 mx-auto mb-6 text-slate-700" />
                                <h3 className="text-2xl font-black mb-2">No products found</h3>
                                <p className="text-slate-500 mb-8">Try adjusting your search or filters</p>
                                <Link href="/projects/e-commerce">
                                    <Button className="h-12 px-6 rounded-xl bg-white text-black font-black">
                                        Browse All Products
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#020205] flex items-center justify-center">
                <div className="text-white">Searching...</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
