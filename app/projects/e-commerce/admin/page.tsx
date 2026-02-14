"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    TrendingUp,
    DollarSign,
    AlertCircle,
    BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { PRODUCTS } from "../store";
import { cn } from "@/lib/utils";
import { User as AuthUser } from "@supabase/supabase-js";

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            // In a real app, check if user has admin role
            if (!user) {
                router.push("/projects/e-commerce/auth/login");
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        checkAdmin();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020205] flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    const stats = [
        {
            label: "Total Revenue",
            value: "$12,450",
            change: "+12.5%",
            icon: DollarSign,
            trend: "up",
        },
        {
            label: "Total Orders",
            value: "156",
            change: "+8.2%",
            icon: ShoppingCart,
            trend: "up",
        },
        {
            label: "Products",
            value: PRODUCTS.length.toString(),
            change: "+2 this week",
            icon: Package,
            trend: "up",
        },
        {
            label: "Low Stock Alerts",
            value: "3",
            change: "Needs attention",
            icon: AlertCircle,
            trend: "warning",
        },
    ];

    const recentOrders = [
        { id: "ORD-156", customer: "Sarah Chen", total: 549.98, status: "processing", time: "2 min ago" },
        { id: "ORD-155", customer: "Mike Johnson", total: 299.00, status: "shipped", time: "1 hour ago" },
        { id: "ORD-154", customer: "Emma Wilson", total: 159.00, status: "delivered", time: "3 hours ago" },
    ];

    const lowStockProducts = PRODUCTS.filter((p) => p.stock < 10);

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0]">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-white/5 border-r border-white/10 p-6 hidden lg:block">
                <div className="mb-12">
                    <h2 className="text-2xl font-black tracking-tighter italic">ZENITH</h2>
                    <p className="text-xs text-slate-500 mt-1">Admin Panel</p>
                </div>

                <nav className="space-y-2">
                    {[
                        { href: "/projects/e-commerce/admin", icon: LayoutDashboard, label: "Dashboard", active: true },
                        { href: "/projects/e-commerce/admin/products", icon: Package, label: "Products" },
                        { href: "/projects/e-commerce/admin/orders", icon: ShoppingCart, label: "Orders" },
                        { href: "/projects/e-commerce/admin/customers", icon: Users, label: "Customers" },
                        { href: "/projects/e-commerce/admin/analytics", icon: BarChart3, label: "Analytics" },
                        { href: "/projects/e-commerce/admin/settings", icon: Settings, label: "Settings" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                                item.active
                                    ? "bg-white/10 text-white"
                                    : "text-slate-500 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-semibold text-sm">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <Link
                        href="/projects/e-commerce"
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <span className="text-sm font-semibold">View Store</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                <div className="container mx-auto px-6 py-12">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-3">Dashboard</h1>
                        <p className="text-slate-500">Welcome back, Admin</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <stat.icon className={cn(
                                        "w-8 h-8",
                                        stat.trend === "warning" ? "text-amber-500" : "text-white/50"
                                    )} />
                                    <span
                                        className={cn(
                                            "text-xs font-bold px-3 py-1 rounded-full",
                                            stat.trend === "up"
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-amber-500/10 text-amber-500"
                                        )}
                                    >
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
                                <p className="text-3xl font-black">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Orders */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black">Recent Orders</h2>
                                <Link
                                    href="/projects/e-commerce/admin/orders"
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
                                            <div>
                                                <span className="font-mono text-sm font-bold">{order.id}</span>
                                                <p className="text-xs text-slate-500 mt-1">{order.customer}</p>
                                            </div>
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
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">{order.time}</span>
                                            <span className="text-white font-bold">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Low Stock Alerts */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black">Low Stock Alerts</h2>
                                <Link
                                    href="/projects/e-commerce/admin/products"
                                    className="text-sm font-bold text-white hover:underline"
                                >
                                    Manage
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {lowStockProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="font-bold text-sm">{product.name}</p>
                                                <p className="text-xs text-amber-500 font-bold mt-1">
                                                    Only {product.stock} left in stock
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
