"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Interceptor from "@/utils/Interceptor";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import formatPrice from "@/utils/formatPrice";

const api = Interceptor();

export default function RelatedProducts({ productId }) {
    const [products, setProducts] = useState([]);
    const {
        wishlist,
        toggleWishlist,
        user,
        addToCart,
        USD_RATE,
        EURO_RATE,
        AUS_RATE,
        currency,
        currencyConfig
    } = useAuth();

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const { data } = await api.get(`/api/products/related/${productId}`);
                setProducts(data || []);
            } catch (err) {
                console.error(err);
            }
        };
        if (productId) fetchRelated();
    }, [productId]);

    const handleWishlist = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return toast.error("Please login to save to wishlist");
        await toggleWishlist(id);
    };

    const handleAddToCart = async (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.stock <= 0) return toast.error("Out of stock");

        const res = await addToCart({ productId: product._id, quantity: 1 });
        if (res?.success) toast.success("Added to your collection");
    };

    if (!products.length) return null;

    return (
        <div className="mt-32 px-6 lg:px-12 pb-20">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <span className="text-gold-500 uppercase tracking-[0.3em] text-[10px] font-bold block mb-2">
                        Complete the Look
                    </span>
                    <h2 className="text-4xl font-serif text-white">
                        You Might Also Like
                    </h2>
                </div>
                <div className="hidden md:block h-px flex-1 mx-10 bg-white/10 mb-2" />
            </div>

            {/* Horizontal Scroll with Masking */}
            <div className="relative group">
                <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory">
                    {products.map((item, idx) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="snap-start relative min-w-[280px] md:min-w-[320px] group/card"
                        >
                            <Link href={`/product-details/${item._id}`}>
                                <div className="relative aspect-[4/4] overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 transition-all duration-500 group-hover/card:border-gold-500/30">

                                    {/* ❤️ Wishlist */}
                                    <button
                                        onClick={(e) => handleWishlist(e, item._id)}
                                        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white hover:text-red-500 transition-all duration-300 border border-white/10"
                                    >
                                        {wishlist.includes(item._id) ? <FaHeart /> : <FaRegHeart />}
                                    </button>

                                    {/* Product Image */}
                                    <div className="absolute inset-0 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-700 ease-out">
                                        <Image
                                            src={item.images[0]?.url}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Quick Add Button overlay */}
                                    <button
                                        onClick={(e) => handleAddToCart(e, item)}
                                        disabled={item.stock <= 0}
                                        className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-white text-black text-[10px] font-bold tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gold-500 transition-colors"
                                    >
                                        <FiPlus /> {item.stock > 0 ? "QUICK ADD" : "SOLD OUT"}
                                    </button>
                                </div>

                                <div className="mt-4 space-y-1">
                                    <h3 className="text-white font-medium tracking-wide group-hover/card:text-gold-400 transition-colors">
                                        {item.name}
                                    </h3>
                                    {/* <p className="text-gold-500 font-light tracking-widest text-sm uppercase">
                                        {formatPrice(item.discountPrice || item.price, {
                                            USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig
                                        })}
                                    </p> */}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .mask-fade {
                    mask-image: linear-gradient(to right, black 85%, transparent 100%);
                }
                .text-gold-400 { color: #d4af37; }
                .text-gold-500 { color: #c5a028; }
            `}</style>
        </div>
    );
}