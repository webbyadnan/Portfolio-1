"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useCartStore, PRODUCTS } from "../../store";
import { cn } from "@/lib/utils";
import { User as AuthUser } from "@supabase/supabase-js";

export default function WishlistPage() {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const { wishlist, toggleWishlist, addToCart } = useCartStore((state: any) => ({
        wishlist: state.wishlist,
        toggleWishlist: state.toggleWishlist,
        addToCart: state.addToCart
    }));

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/projects/e-commerce/auth/login");
            } else {
                setUser(user);
            }
        };
        checkUser();
    }, [router]);

    const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

    const handleAddToCart = (productId: number) => {
        addToCart(productId);
        // Optional: show toast notification
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#020205] flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0]">
            <div className="container mx-auto px-6 py-12">
                <Link
                    href="/projects/e-commerce/account"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Account
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-3">My Wishlist</h1>
                    <p className="text-slate-500">
                        {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved
                    </p>
                </div>

                {wishlistProducts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 rounded-3xl border-2 border-dashed border-white/10"
                    >
                        <Heart className="w-16 h-16 mx-auto mb-6 text-slate-700" />
                        <h3 className="text-2xl font-black mb-2">Your wishlist is empty</h3>
                        <p className="text-slate-500 mb-8">Save your favorite items for later</p>
                        <Button
                            onClick={() => router.push("/projects/e-commerce")}
                            className="h-12 px-8 rounded-xl bg-white text-black font-black hover:bg-white/90"
                        >
                            Continue Shopping
                        </Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                            >
                                <div className="aspect-square bg-white/5 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="font-black text-lg mb-2">{product.name}</h3>
                                        <p className="text-slate-500 text-sm line-clamp-2">{product.description}</p>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            {product.salePrice ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-black">${product.salePrice.toFixed(2)}</span>
                                                    <span className="text-sm text-slate-500 line-through">${product.price.toFixed(2)}</span>
                                                </div>
                                            ) : (
                                                <span className="text-2xl font-black">${product.price.toFixed(2)}</span>
                                            )}
                                        </div>
                                        {product.stock < 10 && product.stock > 0 && (
                                            <span className="text-xs text-amber-500 font-bold">Only {product.stock} left</span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleAddToCart(product.id)}
                                            disabled={product.stock === 0}
                                            className="flex-1 h-11 rounded-xl bg-white text-black font-black text-xs hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            {product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                                        </Button>
                                        <Button
                                            onClick={() => toggleWishlist(product.id)}
                                            variant="outline"
                                            className="h-11 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/20"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>

                                {product.stock === 0 && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                        <span className="text-xl font-black">OUT OF STOCK</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
