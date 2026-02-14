"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    User as UserIcon,
    Package,
    Heart,
    Settings,
    LogOut,
    ShoppingBag,
    MapPin,
    CreditCard,
    Clock,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { User as AuthUser } from "@supabase/supabase-js";

export default function AccountPage() {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/projects/e-commerce/auth/login");
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        checkUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/projects/e-commerce");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020205] flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    const stats = [
        { label: "Total Orders", value: "12", icon: Package, trend: "+3 this month" },
        { label: "Wishlist Items", value: "8", icon: Heart, trend: "2 new" },
        { label: "Rewards Points", value: "450", icon: TrendingUp, trend: "Platinum tier" },
    ];

    const recentOrders = [
        {
            id: "ORD-2024-001",
            date: "Feb 12, 2026",
            total: 549.98,
            status: "delivered",
            items: 2,
        },
        {
            id: "ORD-2024-002",
            date: "Feb 8, 2026",
            total: 299.00,
            status: "shipped",
            items: 1,
        },
    ];

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#020205]/80 backdrop-blur-xl border-b border-white/5 h-20">
                <div className="container mx-auto px-6 h-full flex items-center justify-between">
                    <Link href="/projects/e-commerce" className="flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="text-xl font-black tracking-tighter italic">ZENITH.</span>
                    </Link>
                    <Button
                        onClick={handleSignOut}
                        variant="outline"
                        className="h-10 px-4 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-3">My Account</h1>
                    <p className="text-slate-500 text-lg">
                        Welcome back, {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon className="w-8 h-8 text-white/50" />
                                <span className="text-3xl font-black">{stat.value}</span>
                            </div>
                            <p className="text-sm font-bold text-white mb-1">{stat.label}</p>
                            <p className="text-xs text-slate-500">{stat.trend}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recent Orders */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black">Recent Orders</h2>
                                <Link
                                    href="/projects/e-commerce/account/orders"
                                    className="text-sm font-bold text-white hover:underline"
                                >
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono text-sm font-bold">{order.id}</span>
                                            <span
                                                className={cn(
                                                    "text-xs font-bold px-3 py-1 rounded-full",
                                                    order.status === "delivered"
                                                        ? "bg-emerald-500/10 text-emerald-500"
                                                        : "bg-blue-500/10 text-blue-500"
                                                )}
                                            >
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-slate-500">
                                            <span>{order.date} · {order.items} items</span>
                                            <span className="text-white font-bold">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-black mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/projects/e-commerce/account/profile"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <UserIcon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                    <span className="text-sm font-semibold">Edit Profile</span>
                                </Link>
                                <Link
                                    href="/projects/e-commerce/account/orders"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <Package className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                    <span className="text-sm font-semibold">Order History</span>
                                </Link>
                                <Link
                                    href="/projects/e-commerce/account/wishlist"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <Heart className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                    <span className="text-sm font-semibold">Wishlist</span>
                                </Link>
                                <Link
                                    href="/projects/e-commerce/account/addresses"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <MapPin className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                    <span className="text-sm font-semibold">Addresses</span>
                                </Link>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-transparent border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black text-lg">
                                    {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{user.user_metadata?.full_name || "User"}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-xs text-slate-500 mb-1">Member Since</p>
                                <p className="text-sm font-bold">
                                    {new Date(user.created_at).toLocaleDateString("en-US", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
