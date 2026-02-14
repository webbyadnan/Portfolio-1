"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Store,
    CreditCard,
    Truck,
    Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
    const [storeName, setStoreName] = useState("Zenith");
    const [storeEmail, setStoreEmail] = useState("support@zenith.com");
    const [currency, setCurrency] = useState("USD");
    const [taxRate, setTaxRate] = useState("8.5");
    const [freeShippingThreshold, setFreeShippingThreshold] = useState("50");
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert("Settings saved successfully!");
        }, 1000);
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
                            <h1 className="text-4xl md:text-5xl font-black mb-3">Settings</h1>
                            <p className="text-slate-500">Manage your store configuration</p>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="h-12 px-6 rounded-xl bg-white text-black font-black hover:bg-white/90"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? "Saving..." : "Save All"}
                        </Button>
                    </div>

                    <div className="max-w-3xl space-y-6">
                        {/* Store Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Store className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black">Store Information</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Store Name</label>
                                    <input
                                        type="text"
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Support Email</label>
                                    <input
                                        type="email"
                                        value={storeEmail}
                                        onChange={(e) => setStoreEmail(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Currency</label>
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black">Payment Settings</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Shipping Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black">Shipping Settings</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Free Shipping Threshold ($)</label>
                                    <input
                                        type="number"
                                        value={freeShippingThreshold}
                                        onChange={(e) => setFreeShippingThreshold(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        Orders above this amount get free shipping
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Notifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black">Notifications</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: "New orders", id: "new-orders" },
                                    { label: "Low stock alerts", id: "low-stock" },
                                    { label: "Customer reviews", id: "reviews" },
                                ].map((item) => (
                                    <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="w-5 h-5 rounded bg-white/5 border border-white/10"
                                        />
                                        <span className="text-sm font-semibold">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
