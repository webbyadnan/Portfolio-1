"use client";

import { use, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    Star,
    ArrowLeft,
    ShieldCheck,
    Truck,
    RefreshCw,
    Heart,
    Share2,
    Check,
    ChevronRight,
    Minus,
    Plus
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PRODUCTS, useCartStore } from "../../store";

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [mounted, setMounted] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);
    const wishlist = useCartStore((state) => state.wishlist);
    const toggleWishlist = useCartStore((state) => state.toggleWishlist);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);


    const product = useMemo(() => {
        return PRODUCTS.find(p => p.id === Number(params.id));
    }, [params.id]);

    useEffect(() => {
        if (product?.variants?.colors && product.variants.colors.length > 0) {
            setSelectedColor(product.variants.colors[0]);
        }
        if (product?.variants?.sizes && product.variants.sizes.length > 0) {
            setSelectedSize(product.variants.sizes[0]);
        }
    }, [product]);

    if (!mounted) return null;
    if (!product) return (
        <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <Link href="/projects/e-commerce" className="text-blue-500 hover:underline">Back to Shop</Link>
        </div>
    );

    const handleAddToCart = () => {
        addToCart(product.id, { color: selectedColor, size: selectedSize });
    };

    const images = product?.images || [product?.image];
    const reviews = [
        { id: 1, author: "Sarah M.", rating: 5, date: "Feb 10, 2026", text: "Absolutely love these! The sound quality is incredible.", verified: true },
        { id: 2, author: "Mike T.", rating: 4, date: "Feb 8, 2026", text: "Great product overall. Battery life could be better.", verified: true },
    ];

    return (
        <div className="min-h-screen bg-[#050510] text-[#E0E0E0] font-sans selection:bg-blue-500/30">
            {/* Header Snippet */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-xl border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/projects/e-commerce" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
                        ZENITH.
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/projects/e-commerce/cart" className="relative p-2 text-[#A0A0A0] hover:text-white transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#606060] mb-12">
                        <Link href="/projects/e-commerce" className="hover:text-white transition-colors">Shop</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-blue-500">{product.category}</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {/* Main Image */}
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#0A0A15] border border-white/5 group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedImage}
                                        src={images[selectedImage]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                </AnimatePresence>
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="absolute top-8 right-8 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all active:scale-90"
                                >
                                    <Heart className={cn("w-6 h-6 transition-colors", wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-white")} />
                                </button>
                            </div>

                            {/* Thumbnail Gallery */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={cn(
                                                "aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                                                selectedImage === idx ? "border-white" : "border-white/10 opacity-50 hover:opacity-100"
                                            )}
                                        >
                                            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <div className="mb-10">
                                <div className="flex items-center gap-2 mb-6">
                                    {product.newArrival && (
                                        <span className="px-3 py-1 bg-emerald-600/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                                            New
                                        </span>
                                    )}
                                    {product.salePrice && (
                                        <span className="px-3 py-1 bg-red-600/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-500/20">
                                            Sale
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1 text-[#A0A0A0] text-xs font-bold">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        {product.rating} ({reviews.length} reviews)
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                                    {product.name}
                                </h1>
                                <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8 max-w-xl">
                                    {product.description}
                                </p>
                                <div className="mb-6">
                                    {product.salePrice ? (
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-black text-white">${product.salePrice}</span>
                                            <span className="text-2xl font-bold text-slate-500 line-through">${product.price}</span>
                                        </div>
                                    ) : (
                                        <span className="text-4xl font-black text-white">${product.price}</span>
                                    )}
                                </div>
                                {product.stock < 10 && product.stock > 0 && (
                                    <p className="text-sm font-bold text-amber-500">Only {product.stock} left in stock!</p>
                                )}
                                {product.stock === 0 && (
                                    <p className="text-sm font-bold text-red-500">Out of stock</p>
                                )}
                            </div>

                            {/* Variants & Quantity */}
                            <div className="space-y-8 mb-12">
                                {/* Color Selector */}
                                {product.variants?.colors && product.variants.colors.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#606060] mb-4">Color: {selectedColor}</h4>
                                        <div className="flex gap-3">
                                            {product.variants.colors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={cn(
                                                        "px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all capitalize",
                                                        selectedColor === color
                                                            ? "border-white bg-white text-black"
                                                            : "border-white/10 bg-white/5 hover:border-white/30"
                                                    )}
                                                >
                                                    {color}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size Selector */}
                                {product.variants?.sizes && product.variants.sizes.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#606060] mb-4">Size: {selectedSize}</h4>
                                        <div className="flex gap-3">
                                            {product.variants.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={cn(
                                                        "w-14 h-14 rounded-xl border-2 font-bold transition-all",
                                                        selectedSize === size
                                                            ? "border-white bg-white text-black"
                                                            : "border-white/10 bg-white/5 hover:border-white/30"
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-[#606060] mb-4">Quantity</h4>
                                    <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl w-fit p-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-[#A0A0A0] hover:text-white transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-bold text-white">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-10 h-10 flex items-center justify-center text-[#A0A0A0] hover:text-white transition-colors"
                                            disabled={quantity >= product.stock}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        size="lg"
                                        className="flex-1 h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-2xl shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="h-16 w-16 rounded-[2rem] border-white/10 bg-transparent text-white hover:bg-white/5 p-0"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-6 p-8 bg-white/2 border border-white/5 rounded-[2.5rem]">
                                {product.specs && Object.entries(product.specs).map(([key, val]) => (
                                    <div key={key}>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#606060] mb-1">{key}</p>
                                        <p className="text-sm font-bold text-white">{val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-12 space-y-4">
                                <div className="flex items-center gap-3 text-sm font-medium text-[#A0A0A0]">
                                    <Truck className="w-4 h-4 text-blue-500" />
                                    Free worldwide shipping on orders over $500
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium text-[#A0A0A0]">
                                    <RefreshCw className="w-4 h-4 text-blue-500" />
                                    60-day hassle-free returns
                                </div>
                                <div className="flex items-center gap-3 text-sm font-medium text-[#A0A0A0]">
                                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                                    2-year Zenith Global Warranty
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Recommended Products */}
            <section className="container mx-auto px-6 py-24 border-t border-white/5 text-center">
                <h2 className="text-3xl font-black text-white mb-12 tracking-tighter">YOU MAY ALSO LIKE.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                        <Link href={`/projects/e-commerce/product/${p.id}`} key={p.id} className="group text-left">
                            <div className="aspect-square rounded-[2rem] overflow-hidden bg-[#0A0A15] border border-white/5 mb-4 relative">
                                <img src={p.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-white group-hover:text-blue-500 transition-colors">{p.name}</h4>
                            <p className="text-[#606060] font-bold text-sm">${p.price}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center">
                <p className="text-[#404040] text-sm">Built by Adnan Khan © 2026. Zenith Technology Inc.</p>
            </footer>
        </div>
    );
}
