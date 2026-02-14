"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Search,
    Mail,
    MapPin,
    Calendar,
    ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CUSTOMERS = [
    { id: "1", name: "Sarah Chen", email: "sarah@example.com", location: "San Francisco, CA", orders: 12, totalSpent: 3499.99, joined: "2025-11-15" },
    { id: "2", name: "Mike Johnson", email: "mike@example.com", location: "New York, NY", orders: 8, totalSpent: 2150.00, joined: "2025-12-03" },
    { id: "3", name: "Emma Wilson", email: "emma@example.com", location: "Austin, TX", orders: 5, totalSpent: 1299.00, joined: "2026-01-10" },
    { id: "4", name: "David Lee", email: "david@example.com", location: "Seattle, WA", orders: 15, totalSpent: 4899.99, joined: "2025-10-20" },
    { id: "5", name: "Lisa Park", email: "lisa@example.com", location: "Los Angeles, CA", orders: 3, totalSpent: 899.00, joined: "2026-02-01" },
];

export default function AdminCustomersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCustomers = MOCK_CUSTOMERS.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-3">Customers</h1>
                        <p className="text-slate-500">{MOCK_CUSTOMERS.length} total customers</p>
                    </div>

                    {/* Search */}
                    <div className="mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:border-white/30 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Customers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCustomers.map((customer, idx) => (
                            <motion.div
                                key={customer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-xl">
                                        {customer.name.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{customer.name}</h3>
                                        <p className="text-xs text-slate-500">Customer ID: {customer.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-400">{customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-400">{customer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-400">Joined {customer.joined}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 mb-1">Orders</p>
                                        <p className="text-2xl font-black">{customer.orders}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 mb-1">Total Spent</p>
                                        <p className="text-2xl font-black">${customer.totalSpent.toLocaleString()}</p>
                                    </div>
                                </div>

                                <button className="w-full mt-6 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-sm transition-colors">
                                    View Details
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
