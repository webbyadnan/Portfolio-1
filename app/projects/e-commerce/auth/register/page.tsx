"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Mail, Lock, User, ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!acceptTerms) {
            setError("Please accept the terms and conditions");
            setLoading(false);
            return;
        }

        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                    },
                },
            });

            if (authError) throw authError;

            //Auto-login and redirect
            router.push("/projects/e-commerce/account");
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0] flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <Link
                    href="/projects/e-commerce"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shop
                </Link>

                {/* Logo */}
                <Link href="/projects/e-commerce" className="flex items-center gap-2 justify-center mb-12">
                    <ShoppingBag className="w-8 h-8" />
                    <span className="text-2xl font-black tracking-tighter italic">ZENITH.</span>
                </Link>

                {/* Auth Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl"
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-black mb-2">Create Account</h1>
                        <p className="text-slate-500 text-sm">Join Zenith and start shopping</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    required
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:border-white/30 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:border-white/30 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 text-sm focus:border-white/30 focus:outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:border-white/30 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer text-sm">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded border-white/10 bg-white/5 text-white focus:ring-white/20"
                            />
                            <span className="text-slate-400">
                                I agree to the{" "}
                                <Link href="#" className="text-white hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-white hover:underline">
                                    Privacy Policy
                                </Link>
                            </span>
                        </label>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-white text-black font-black text-sm hover:bg-white/90 disabled:opacity-50 rounded-xl group"
                        >
                            {loading ? "CREATING ACCOUNT..." : (
                                <>
                                    CREATE ACCOUNT <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-slate-500">Already have an account? </span>
                        <Link href="/projects/e-commerce/auth/login" className="text-white font-bold hover:underline">
                            Sign in
                        </Link>
                    </div>
                </motion.div>

                <div className="mt-8 text-center">
                    <Link href="/projects/e-commerce" className="text-slate-500 hover:text-white text-sm transition-colors">
                        ← Back to Store
                    </Link>
                </div>
            </div>
        </div>
    );
}
