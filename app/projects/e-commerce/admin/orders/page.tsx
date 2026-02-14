"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Search,
    Filter,
    Download,
    Eye,
    Package,
    Truck,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
    { id: "ORD-156", customer: "Sarah Chen", email: "sarah@example.com", total: 549.98, status: "processing", items: 3, date: "2026-02-14" },
    { id: "ORD-155", customer: "Mike Johnson", email: "mike@example.com", total: 299.00, status: "shipped", items: 1, date: "2026-02-13" },
    { id: "ORD-154", customer: "Emma Wilson", email: "emma@example.com", total: 159.00, status: "delivered", items: 1, date: "2026-02-12" },
    { id: "ORD-153", customer: "David Lee", email: "david@example.com", total: 899.99, status: "processing", items: 2, date: "2026-02-12" },
    { id: "ORD-152", customer: "Lisa Park", email: "lisa@example.com", total: 449.00, status: "cancelled", items: 1, date: "2026-02-11" },
];

const STATUS_OPTIONS = ["all", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredOrders = MOCK_ORDERS.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "processing":
                return Package;
            case "shipped":
                return Truck;
            case "delivered":
                return CheckCircle2;
            case "cancelled":
                return XCircle;
            default:
                return Package;
        }
    };

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
                            <h1 className="text-4xl md:text-5xl font-black mb-3">Orders</h1>
                            <p className="text-slate-500">{MOCK_ORDERS.length} total orders</p>
                        </div>
                        <Button className="h-12 px-6 rounded-xl bg-white text-black font-black hover:bg-white/90">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:border-white/30 focus:outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            {STATUS_OPTIONS.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={cn(
                                        "h-14 px-6 rounded-xl border font-bold text-sm transition-all capitalize",
                                        statusFilter === status
                                            ? "bg-white text-black border-white"
                                            : "bg-white/5 border-white/10 hover:border-white/30"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Order ID
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Customer
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Date
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Items
                                        </th>
                                        <th className="text-left p-6 text-xs font-black uppercase tracking-wider text-slate-500">
                                            Total
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
                                    {filteredOrders.map((order) => {
                                        const StatusIcon = getStatusIcon(order.status);
                                        return (
                                            <tr
                                                key={order.id}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                            >
                                                <td className="p-6">
                                                    <span className="font-mono text-sm font-bold">{order.id}</span>
                                                </td>
                                                <td className="p-6">
                                                    <div>
                                                        <p className="font-bold text-sm">{order.customer}</p>
                                                        <p className="text-xs text-slate-500 mt-1">{order.email}</p>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <span className="text-sm font-semibold">{order.date}</span>
                                                </td>
                                                <td className="p-6">
                                                    <span className="text-sm font-semibold">{order.items} items</span>
                                                </td>
                                                <td className="p-6">
                                                    <span className="text-sm font-black">${order.total.toFixed(2)}</span>
                                                </td>
                                                <td className="p-6">
                                                    <span
                                                        className={cn(
                                                            "inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full",
                                                            order.status === "delivered"
                                                                ? "bg-emerald-500/10 text-emerald-500"
                                                                : order.status === "shipped"
                                                                    ? "bg-blue-500/10 text-blue-500"
                                                                    : order.status === "cancelled"
                                                                        ? "bg-red-500/10 text-red-500"
                                                                        : "bg-amber-500/10 text-amber-500"
                                                        )}
                                                    >
                                                        <StatusIcon className="w-3 h-3" />
                                                        {order.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
