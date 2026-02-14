"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function ProfileSettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Form fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/projects/e-commerce/auth/login");
        } else {
            setUser(user);
            setFullName(user.user_metadata?.full_name || "");
            setEmail(user.email || "");
            setPhone(user.user_metadata?.phone || "");
        }
        setLoading(false);
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName, phone }
            });

            if (error) throw error;
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        setSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;
            alert("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error(error);
            alert("Failed to update password");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
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
                    <h1 className="text-4xl md:text-5xl font-black mb-3">Profile Settings</h1>
                    <p className="text-slate-500">Manage your account information and preferences</p>
                </div>

                <div className="max-w-2xl space-y-8">
                    {/* Personal Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10"
                    >
                        <h2 className="text-2xl font-black mb-6">Personal Information</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm opacity-50 cursor-not-allowed"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Contact support to change your email address
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <Button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="h-14 px-8 rounded-xl bg-white text-black font-black hover:bg-white/90"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </motion.div>

                    {/* Change Password */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10"
                    >
                        <h2 className="text-2xl font-black mb-6">Change Password</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-sm focus:border-white/30 focus:outline-none"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    >
                                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-sm focus:border-white/30 focus:outline-none"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    >
                                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <Button
                                onClick={handleChangePassword}
                                disabled={saving || !newPassword || !confirmPassword}
                                className="h-14 px-8 rounded-xl bg-white text-black font-black hover:bg-white/90 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {saving ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </motion.div>

                    {/* Danger Zone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20"
                    >
                        <h2 className="text-2xl font-black mb-3 text-red-500">Danger Zone</h2>
                        <p className="text-sm text-slate-400 mb-6">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button
                            variant="outline"
                            className="h-12 px-6 rounded-xl border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20 font-black"
                        >
                            Delete Account
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
