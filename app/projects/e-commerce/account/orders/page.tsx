"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Package, MapPin, Calendar, DollarSign, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

import { User } from "@supabase/supabase-js";

export default function OrderHistoryPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/projects/e-commerce/auth/login");
        } else {
            setUser(user);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    // Mock order data
    const orders = [
        {
            id: "ORD-2026-001",
            date: "Feb 12, 2026",
            total: 549.98,
            status: "delivered",
            items: [
                { name: "Aura Pro Headset", quantity: 1, price: 349.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" },
                { name: "Volt Charging Hub", quantity: 1, price: 49.00, image: "https://images.unsplash.com/photo-1610940882244-5966235741fc?auto=format&fit=crop&q=80&w=800" },
            ],
            shipping: {
                name: user?.user_metadata?.full_name || "John Doe",
                address: "123 Tech Street, San Francisco, CA 94105",
            },
            trackingNumber: "ZTH29485729374",
        },
        {
            id: "ORD-2026-002",
            date: "Feb 8, 2026",
            total: 299.00,
            status: "shipped",
            items: [
                { name: "Lumina Gen 3 Watch", quantity: 1, price: 299.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
            ],
            shipping: {
                name: user?.user_metadata?.full_name || "John Doe",
                address: "123 Tech Street, San Francisco, CA 94105",
            },
            trackingNumber: "ZTH29485729375",
        },
        {
            id: "ORD-2026-003",
            date: "Feb 1, 2026",
            total: 159.00,
            status: "processing",
            items: [
                { name: "Sonic Buds Elite", quantity: 1, price: 159.00, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800" },
            ],
            shipping: {
                name: user?.user_metadata?.full_name || "John Doe",
                address: "123 Tech Street, San Francisco, CA 94105",
            },
        },
    ];

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
                    <h1 className="text-4xl md:text-5xl font-black mb-3">Order History</h1>
                    <p className="text-slate-500">{orders.length} orders placed</p>
                </div>

                <div className="space-y-8">
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-black">{order.id}</h3>
                                        <span
                                            className={cn(
                                                "text-xs font-bold px-3 py-1 rounded-full",
                                                order.status === "delivered"
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : order.status === "shipped"
                                                        ? "bg-blue-500/10 text-blue-500"
                                                        : "bg-amber-500/10 text-amber-500"
                                            )}
                                        >
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {order.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            ${order.total.toFixed(2)}
                                        </div>
                                        {order.trackingNumber && (
                                            <div className="flex items-center gap-2">
                                                <Truck className="w-4 h-4" />
                                                {order.trackingNumber}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {order.trackingNumber && (
                                        <Button
                                            variant="outline"
                                            className="h-10 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                                        >
                                            Track Order
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        className="h-10 px-4 rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mt-6 space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                                            <p className="text-xs text-slate-500">Quantity: {item.quantity}</p>
                                        </div>
                                        <span className="font-bold">${item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Shipping Address */}
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-bold">Shipping Address</span>
                                </div>
                                <p className="text-sm ml-6">{order.shipping.name}</p>
                                <p className="text-sm ml-6 text-slate-500">{order.shipping.address}</p>
                            </div>

                            {/* Reorder Button */}
                            {order.status === "delivered" && (
                                <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                                    <Button className="h-10 px-6 rounded-xl bg-white text-black font-black hover:bg-white/90">
                                        Reorder
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
