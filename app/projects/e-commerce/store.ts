"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    salePrice?: number;
    rating: number;
    reviews: number;
    image: string;
    images?: string[]; // Multiple images for gallery
    description: string;
    featured: boolean;
    newArrival?: boolean;
    trending?: boolean;
    stock: number;
    specs?: Record<string, string>;
    variants?: {
        colors?: string[];
        sizes?: string[];
    };
}

export interface Review {
    id: number;
    productId: number;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    title: string;
    comment: string;
    helpful: number;
    images?: string[];
    date: string;
}

export interface ShippingAddress {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: ShippingAddress;
    createdAt: string;
    trackingNumber?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Aura Pro Headset",
        category: "Audio",
        price: 349.99,
        rating: 4.8,
        reviews: 124,
        stock: 45,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Lossless audio with active noise cancellation and 40-hour battery life. Designed for those who demand the highest fidelity.",
        featured: true,
        trending: true,
        specs: {
            "Frequency Response": "20Hz - 20kHz",
            "Drivers": "40mm Custom Dynamic",
            "Bluetooth": "5.3 with LE Audio",
            "Weight": "250g"
        },
        variants: {
            colors: ["Black", "Silver", "Blue"]
        }
    },
    {
        id: 2,
        name: "Lumina Gen 3 Watch",
        category: "Wearables",
        price: 299.00,
        salePrice: 249.00,
        rating: 4.9,
        reviews: 89,
        stock: 12,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        description: "Advanced health tracking with always-on retina display and titanium casing. Your health, redefined in brilliance.",
        featured: true,
        newArrival: true,
        specs: {
            "Display": "1.9\" Always-on OLED",
            "Battery Life": "36 Hours",
            "Water Resistance": "WR50",
            "Sensors": "ECG, SpO2, Heart Rate"
        },
        variants: {
            colors: ["Titanium", "Gold", "Space Gray"]
        }
    },
    {
        id: 3,
        name: "Nebula M1 Mouse",
        category: "Computing",
        price: 89.50,
        rating: 4.7,
        reviews: 210,
        stock: 156,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800",
        description: "Ergonomic wireless mouse with precision optical sensor and customizable RGB. Speed meets comfort in a cosmic shell.",
        featured: false,
        specs: {
            "DPI": "Up to 25,600",
            "Switches": "Optical Mechanical",
            "Weight": "63g",
            "Connectivity": "2.4GHz Lightspeed"
        }
    },
    {
        id: 4,
        name: "Volt Charging Hub",
        category: "Accessories",
        price: 49.00,
        rating: 4.6,
        reviews: 56,
        stock: 89,
        image: "https://images.unsplash.com/photo-1610940882244-5966235741fc?auto=format&fit=crop&q=80&w=800",
        description: "100W GaN charger with 4 ports and foldable plugs for travel. Power all your devices with a single, compact hub.",
        featured: false,
        specs: {
            "Total Wattage": "100W Max",
            "Ports": "3x USB-C, 1x USB-A",
            "Technology": "GaN (Gallium Nitride)",
            "Protection": "Overcurrent, Surge"
        }
    },
    {
        id: 5,
        name: "Sonic Buds Elite",
        category: "Audio",
        price: 159.00,
        rating: 4.8,
        reviews: 342,
        stock: 3,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
        description: "Minimalist earbuds with deep bass and sweat resistance. Pure sound, anywhere you go.",
        featured: false,
        trending: true,
        specs: {
            "ANC": "Hybrid Active Noise Cancellation",
            "Battery": "8h + 24h with case",
            "Rating": "IPX4 Water Resistant",
            "Charging": "Wireless (Qi Compatible)"
        }
    },
    {
        id: 6,
        name: "Zenith Keyboard",
        category: "Computing",
        price: 199.99,
        rating: 4.9,
        reviews: 128,
        stock: 67,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
        description: "Hot-swappable mechanical keyboard with premium PBT keycaps. Type into the stratosphere with unparalleled feel.",
        featured: true,
        newArrival: true,
        specs: {
            "Layout": "75% Tenkeyless",
            "Case": "CNC Anodized Aluminum",
            "Switches": "Factory Lubed Linear",
            "Connectivity": "USB-C, Bluetooth 5.1"
        }
    }
];

export const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        productId: 1,
        userId: "user_1",
        userName: "Sarah Chen",
        rating: 5,
        title: "Best headphones I've ever owned",
        comment: "The sound quality is absolutely phenomenal. I use these for music production and they reveal details I never heard before. Battery life is excellent too.",
        helpful: 24,
        date: "2026-02-10",
    },
    {
        id: 2,
        productId: 1,
        userId: "user_2",
        userName: "Marcus Thompson",
        rating: 4,
        title: "Great, but pricey",
        comment: "Amazing audio quality and comfort. Only downside is the price, but you get what you pay for.",
        helpful: 12,
        date: "2026-02-08",
    },
];

export interface CartItem {
    productId: number;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

interface CartStore {
    cart: CartItem[];
    wishlist: number[];
    recentlyViewed: number[];
    addToCart: (productId: number, options?: { color?: string; size?: string }) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    toggleWishlist: (productId: number) => void;
    addToRecentlyViewed: (productId: number) => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: [],
            wishlist: [],
            recentlyViewed: [],

            addToCart: (productId, options) => set((state) => {
                const existingItem = state.cart.find((item) =>
                    item.productId === productId &&
                    item.selectedColor === options?.color &&
                    item.selectedSize === options?.size
                );

                if (existingItem) {
                    return {
                        cart: state.cart.map((item) =>
                            item.productId === productId &&
                                item.selectedColor === options?.color &&
                                item.selectedSize === options?.size
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                }
                return {
                    cart: [...state.cart, {
                        productId,
                        quantity: 1,
                        selectedColor: options?.color,
                        selectedSize: options?.size
                    }]
                };
            }),

            removeFromCart: (productId) => set((state) => ({
                cart: state.cart.filter((item) => item.productId !== productId),
            })),

            updateQuantity: (productId, quantity) => set((state) => ({
                cart: state.cart.map((item) =>
                    item.productId === productId ? { ...item, quantity } : item
                ),
            })),

            clearCart: () => set({ cart: [] }),

            toggleWishlist: (productId) => set((state) => ({
                wishlist: state.wishlist.includes(productId)
                    ? state.wishlist.filter((id) => id !== productId)
                    : [...state.wishlist, productId],
            })),

            addToRecentlyViewed: (productId) => set((state) => {
                const filtered = state.recentlyViewed.filter((id) => id !== productId);
                return {
                    recentlyViewed: [productId, ...filtered].slice(0, 10), // Keep last 10
                };
            }),
        }),
        {
            name: 'zenith-cart-storage',
        }
    )
);
