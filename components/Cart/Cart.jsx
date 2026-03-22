"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Interceptor from "@/utils/Interceptor";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import EmptyCart from "./EmptyCart";
import Link from "next/link";
import formatPrice from "@/utils/formatPrice";

// Premium Icon Imports
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiOutlineArrowLeft } from "react-icons/hi2";
import { FiLock, FiShoppingBag } from "react-icons/fi";

const api = Interceptor();

export default function Cart() {
    const {
        cart,
        fetchCart,
        USD_RATE,
        EURO_RATE,
        AUS_RATE,
        currency,
        currencyConfig
    } = useAuth();

    const [loadingItems, setLoadingItems] = useState({});

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = async (productId, newQty) => {
        if (newQty < 1) return;
        try {
            setLoadingItems((prev) => ({ ...prev, [productId]: true }));
            const { data } = await api.put("/api/cart/update-quantity", {
                productId,
                quantity: newQty,
            });
            if (data.success) {
                toast.success("Quantity updated");
                await fetchCart();
            }
        } catch (err) {
            toast.error("Could not update quantity");
        } finally {
            setLoadingItems((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            setLoadingItems((prev) => ({ ...prev, [itemId]: true }));
            const { data } = await api.delete(`/api/cart/remove/${itemId}`);
            if (data.success) {
                toast.success("Item removed");
                await fetchCart();
            }
        } catch (err) {
            toast.error("Could not remove item");
        } finally {
            setLoadingItems((prev) => ({ ...prev, [itemId]: false }));
        }
    };

    const getUnitPrice = (product) => {
        return product.discountPrice > 0 ? product.discountPrice : product.price;
    };

    const totalPrice = cart?.items?.reduce((acc, item) => {
        return acc + getUnitPrice(item.product) * item.quantity;
    }, 0);

    if (!cart.items || cart?.items?.length === 0) {
        return <EmptyCart />;
    }

    return (
        <section className="min-h-screen bg-[#0d2b45] text-white py-24 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <header className="mb-12">
                    <Link href="/products/search" className="group flex items-center gap-2 text-[#e6c984]/60 hover:text-[#e6c984] transition-colors mb-4 text-sm tracking-widest uppercase">
                        <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Shop
                    </Link>
                    <div className="flex items-end gap-4">
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight italic font-serif">Your Cart</h1>
                        <span className="text-[#e6c984] text-lg mb-2 flex items-center gap-2">
                            <FiShoppingBag /> ({cart.items.length})
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Items Column */}
                    <div className="lg:col-span-8 space-y-6">
                        {cart.items.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-[#ffffff03] border border-[#ffffff08] rounded-2xl hover:border-[#e6c98422] transition-all group"
                            >
                                {/* Product Image */}
                                <div className="w-40 h-40 bg-[#000] rounded-xl overflow-hidden relative border border-[#ffffff10] flex-shrink-0">
                                    <Link href={`/product-details/${item.product._id}`}>
                                        <Image
                                            src={item.product.images[0]?.url || "/images/fallback.png"}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </Link>
                                </div>

                                {/* Details */}
                                <div className="flex-1 space-y-2 text-center sm:text-left">
                                    <Link href={`/product-details/${item.product._id}`}>
                                        <h2 className="text-xl font-medium text-[#e6c984]">{item.product.name}</h2>
                                    </Link>
                                    <p className="text-sm text-gray-500 font-light italic">
                                        {item.product.material} &bull; {item.product.purity} &bull; {item.product.weight}g
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-center sm:justify-start gap-4 pt-4">
                                        <div className="flex items-center border border-[#ffffff15] rounded-full px-2 py-1 bg-black/20">
                                            <button
                                                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                className="p-2 hover:text-[#e6c984] disabled:opacity-20"
                                                disabled={loadingItems[item.product._id] || item.quantity <= 1}
                                            >
                                                <HiOutlineMinus size={16} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                                className="p-2 hover:text-[#e6c984]"
                                                disabled={loadingItems[item.product._id]}
                                            >
                                                <HiOutlinePlus size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item._id)}
                                            className="text-gray-500 hover:text-red-400 transition-colors p-2"
                                            title="Remove"
                                        >
                                            <HiOutlineTrash size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-center sm:text-right flex-shrink-0">
                                    <p className="text-2xl font-light text-[#e6c984]">
                                        {formatPrice(getUnitPrice(item.product) * item.quantity, {
                                            USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig
                                        })}
                                    </p>
                                    <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] mt-1">Total Price</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sticky Column */}
                    <div className="lg:col-span-4 sticky top-28">
                        <div className="bg-[#ffffff05] border border-[#e6c9841a] p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden">
                            {/* Decorative background flare */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#e6c984] opacity-[0.03] blur-3xl rounded-full" />

                            <h3 className="text-xl font-serif italic border-b border-[#ffffff10] pb-6 mb-6">Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm text-gray-400 font-light uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(totalPrice, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig })}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400 font-light uppercase tracking-widest">
                                    <span>Shipping</span>
                                    <span className="text-[#e6c984] text-[10px]">Complimentary</span>
                                </div>
                                <div className="pt-6 border-t border-[#ffffff10] flex justify-between items-baseline">
                                    <span className="text-lg">Total</span>
                                    <span className="text-3xl font-medium text-[#e6c984]">
                                        {formatPrice(totalPrice, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig })}
                                    </span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block">
                                <button className="relative w-full py-5 bg-[#e6c984] text-[#050c14] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 group overflow-hidden">
                                    <span className="relative z-10 flex items-center justify-center gap-2 italic">
                                        <FiLock /> Proceed to Payment
                                    </span>
                                    {/* Button shimmer effect */}
                                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                                </button>
                            </Link>

                            <p className="mt-6 text-center text-[10px] text-gray-600 tracking-tighter uppercase font-light">
                                Secured by Bank-Grade Encryption • 256-bit SSL
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}