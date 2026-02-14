"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    CreditCard,
    MapPin,
    Package,
    Lock,
    Check,
    Truck,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useCartStore, PRODUCTS, CartItem } from "../store";
import { cn } from "@/lib/utils";
import { User as AuthUser } from "@supabase/supabase-js";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart } = useCartStore((state) => ({
        cart: state.cart,
        clearCart: state.clearCart
    }));
    const [user, setUser] = useState<AuthUser | null>(null);
    const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
    const [processing, setProcessing] = useState(false);

    const [shippingData, setShippingData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "USA",
    });

    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
    });

    const [shippingMethod, setShippingMethod] = useState("standard");

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setShippingData((prev: typeof shippingData) => ({
                    ...prev,
                    fullName: user.user_metadata?.full_name || "",
                    email: user.email || "",
                }));
            }
        };
        checkUser();
    }, []);

    const cartItems = useMemo(() => {
        return cart.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            return { ...item, product };
        });
    }, [cart]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum: number, item) => {
            const price = item.product?.salePrice || item.product?.price || 0;
            return sum + price * item.quantity;
        }, 0);
    }, [cartItems]);

    const shippingCost = shippingMethod === "express" ? 19.99 : shippingMethod === "overnight" ? 39.99 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    const handlePlaceOrder = async () => {
        setProcessing(true);
        // Simulate order processing
        setTimeout(() => {
            clearCart();
            router.push("/projects/e-commerce/success");
        }, 2000);
    };

    if (cart.length === 0 && !processing) {
        return (
            <div className="min-h-screen bg-[#020205] text-[#E0E0E0] flex items-center justify-center">
                <div className="text-center">
                    <Package className="w-16 h-16 mx-auto mb-6 text-slate-700" />
                    <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
                    <p className="text-slate-500 mb-8">Add some items to checkout</p>
                    <Button
                        onClick={() => router.push("/projects/e-commerce")}
                        className="h-12 px-8 rounded-xl bg-white text-black font-black"
                    >
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020205] text-[#E0E0E0]">
            <div className="container mx-auto px-6 py-12">
                {/* Back Button */}
                <Link
                    href="/projects/e-commerce"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shop
                </Link>

                <h1 className="text-4xl md:text-5xl font-black mb-12">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Steps */}
                        <div className="flex items-center gap-4">
                            {["shipping", "payment", "review"].map((s, i) => (
                                <div key={s} className="flex items-center gap-2">
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all",
                                            step === s || (step === "payment" && s === "shipping") || (step === "review" && s !== "review")
                                                ? "bg-white text-black border-white"
                                                : "border-white/20 text-slate-600"
                                        )}
                                    >
                                        {i + 1}
                                    </div>
                                    <span
                                        className={cn(
                                            "text-sm font-bold uppercase tracking-wider hidden sm:block",
                                            step === s ? "text-white" : "text-slate-600"
                                        )}
                                    >
                                        {s}
                                    </span>
                                    {i < 2 && <div className="h-[2px] w-12 bg-white/10" />}
                                </div>
                            ))}
                        </div>

                        {/* Shipping Form */}
                        <AnimatePresence mode="wait">
                            {step === "shipping" && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/10"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <MapPin className="w-6 h-6" />
                                        <h2 className="text-2xl font-black">Shipping Address</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={shippingData.fullName}
                                            onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                                            className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none md:col-span-2"
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={shippingData.email}
                                            onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                                            className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone"
                                            value={shippingData.phone}
                                            onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                                            className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={shippingData.address}
                                            onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                                            className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none md:col-span-2"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={shippingData.city}
                                            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                                            className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="State"
                                            value={shippingData.state}
                                            onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                                            className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="ZIP Code"
                                            value={shippingData.zip}
                                            onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                                            className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">
                                            Shipping Method
                                        </h3>
                                        <div className="space-y-3">
                                            {[
                                                { id: "standard", name: "Standard Shipping", time: "5-7 business days", price: 5.99, icon: Package },
                                                { id: "express", name: "Express Shipping", time: "2-3 business days", price: 19.99, icon: Truck },
                                                { id: "overnight", name: "Overnight Delivery", time: "Next business day", price: 39.99, icon: Zap },
                                            ].map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => setShippingMethod(method.id)}
                                                    className={cn(
                                                        "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                                                        shippingMethod === method.id
                                                            ? "bg-white/10 border-white/30"
                                                            : "bg-white/5 border-white/10 hover:border-white/20"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <method.icon className="w-5 h-5" />
                                                        <div className="text-left">
                                                            <p className="font-bold text-sm">{method.name}</p>
                                                            <p className="text-xs text-slate-500">{method.time}</p>
                                                        </div>
                                                    </div>
                                                    <span className="font-black">${method.price.toFixed(2)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => setStep("payment")}
                                        className="w-full h-14 mt-8 bg-white text-black font-black rounded-xl hover:bg-white/90"
                                    >
                                        Continue to Payment
                                    </Button>
                                </motion.div>
                            )}

                            {/* Payment Form */}
                            {step === "payment" && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/10"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <CreditCard className="w-6 h-6" />
                                        <h2 className="text-2xl font-black">Payment Information</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            value={paymentData.cardNumber}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                            maxLength={19}
                                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Cardholder Name"
                                            value={paymentData.cardName}
                                            onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={paymentData.expiry}
                                                onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                                                maxLength={5}
                                                className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                value={paymentData.cvv}
                                                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                                                maxLength={4}
                                                className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-white/30 focus:outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                        <Lock className="w-4 h-4 text-blue-500" />
                                        <p className="text-xs text-blue-500">Your payment information is secure and encrypted</p>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            onClick={() => setStep("shipping")}
                                            variant="outline"
                                            className="flex-1 h-14 rounded-xl border-white/10 bg-white/5"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            onClick={() => setStep("review")}
                                            className="flex-1 h-14 bg-white text-black font-black rounded-xl hover:bg-white/90"
                                        >
                                            Review Order
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Review */}
                            {step === "review" && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/10"
                                >
                                    <h2 className="text-2xl font-black mb-6">Review Your Order</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-2">
                                                Shipping To
                                            </h3>
                                            <p className="text-sm">
                                                {shippingData.fullName}<br />
                                                {shippingData.address}<br />
                                                {shippingData.city}, {shippingData.state} {shippingData.zip}
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-white/5">
                                            <Button
                                                onClick={() => setStep("payment")}
                                                variant="outline"
                                                className="mr-4 h-12 px-6 rounded-xl border-white/10 bg-white/5"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                onClick={handlePlaceOrder}
                                                disabled={processing}
                                                className="h-14 px-12 bg-white text-black font-black rounded-xl hover:bg-white/90 disabled:opacity-50"
                                            >
                                                {processing ? "Processing..." : `Place Order · $${total.toFixed(2)}`}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-black mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.productId} className="flex gap-4">
                                        <img
                                            src={item.product?.image}
                                            alt={item.product?.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-bold text-sm">{item.product?.name}</p>
                                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-bold text-sm">
                                            ${((item.product?.salePrice || item.product?.price || 0) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-6 border-t border-white/5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Shipping</span>
                                    <span className="font-bold">${shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Tax</span>
                                    <span className="font-bold">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between pt-6 border-t border-white/5">
                                <span className="text-lg font-black">Total</span>
                                <span className="text-2xl font-black">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
