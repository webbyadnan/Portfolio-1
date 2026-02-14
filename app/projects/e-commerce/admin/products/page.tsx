"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Search,
    Plus,
    Edit,
    Trash2,
    Filter,
    MoreVertical,
    Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "../../store";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ["all", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0]">
            <div className="lg:ml-64">
                <div className="container mx-auto px-6 py-12">
                    <Link
                        href="/projects/e-commerce/admin"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3">Products</h1>
                            <p className="text-slate-500">{PRODUCTS.length} total products</p>
                        </div>
                        <Button className="h-12 px-6 rounded-xl bg-white text-black font-black hover:bg-white/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:border-white/30 focus:outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={cn(
                                        "h-14 px-6 rounded-xl border font-bold text-sm transition-all capitalize",
                                        categoryFilter === cat
                                            ? "bg-white text-black border-white"
                                            : "bg-white/5 border-white/10 hover:border-white/30"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Product
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Category
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Price
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Stock
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>
                                        <th className="text-right p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-16 h-16 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-sm">{product.name}</p>
                                                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="text-sm font-semibold">{product.category}</span>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-sm">
                                                    {product.salePrice ? (
                                                        <>
                                                            <span className="font-black">${product.salePrice.toFixed(2)}</span>
                                                            <span className="text-slate-500 line-through ml-2">${product.price.toFixed(2)}</span>
                                                        </>
                                                    ) : (
                                                        <span className="font-black">${product.price.toFixed(2)}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span
                                                    className={cn(
                                                        "text-sm font-bold",
                                                        product.stock === 0
                                                            ? "text-red-500"
                                                            : product.stock < 10
                                                                ? "text-amber-500"
                                                                : "text-emerald-500"
                                                    )}
                                                >
                                                    {product.stock} units
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <span
                                                    className={cn(
                                                        "text-xs font-bold px-3 py-1 rounded-full",
                                                        product.featured
                                                            ? "bg-blue-500/10 text-blue-500"
                                                            : "bg-white/10 text-slate-500"
                                                    )}
                                                >
                                                    {product.featured ? "FEATURED" : "STANDARD"}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <Package className="w-16 h-16 mx-auto mb-6 text-slate-700" />
                            <h3 className="text-2xl font-black mb-2">No products found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
