"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";

// --- Icons ---
import { FaTrashCan, FaBagShopping, FaRegHeart } from "react-icons/fa6";
import { MdOutlineAutoAwesome, MdOutlineArrowRightAlt } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import formatPrice from "@/utils/formatPrice";

const api = Interceptor();

export default function WishlistPage() {
    const { wishlist, toggleWishlist, addToCart, USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (!wishlist.length) {
                setProducts([]);
                setLoading(false);
                return;
            }
            try {
                const { data } = await api.post("/api/products/by-ids", { ids: wishlist });
                setProducts(data.products || []);
            } catch {
                toast.error("Failed to load wishlist");
            } finally {
                setLoading(false);
            }
        };
        fetchWishlistProducts();
    }, [wishlist]);

    const handleAddToCart = async (product) => {
        if (product.stock <= 0) return toast.error("Item is out of stock");
        const data = await addToCart({ productId: product._id, quantity: 1 });
        if (data.success) toast.success(`${product.name} added to cart`);
    };

    /* ================= EMPTY STATE ================= */
    if (!loading && !products.length) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center text-center bg-[#050b14] bg-[radial-gradient(circle_at_center,_#0d2339_0%,_#050b14_100%)] text-white px-6">
                <div className="relative mb-8">
                    <FaRegHeart className="text-8xl text-white/10 animate-pulse" />
                    <IoDiamondOutline className="absolute -bottom-2 -right-2 text-4xl text-[#d4af37]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-black italic tracking-tight">YOUR COLLECTION IS EMPTY</h2>
                <p className="text-slate-400 mt-4 max-w-sm leading-relaxed">
                    Every masterpiece starts with a choice. Begin curating your signature look today.
                </p>
                <Link
                    href="/"
                    className="mt-10 group flex items-center gap-3 bg-[#d4af37] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                >
                    Explore Boutique
                    <MdOutlineArrowRightAlt className="text-2xl group-hover:translate-x-2 transition-transform" />
                </Link>
            </section>
        );
    }

    /* ================= WISHLIST GRID ================= */
    return (
        <section className="bg-[#0d2b45] px-6 md:px-12 py-32 min-h-screen">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <MdOutlineAutoAwesome className="text-[#d4af37] text-2xl" />
                    <span className="text-[#d4af37] font-bold tracking-[0.3em] text-xs uppercase">Curated Favorites</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-black italic text-white leading-tight">
                    MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3d97d] to-[#d4af37]">COLLECTION</span>
                </h1>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="group relative bg-[#0a1929]/50 border border-white/10 rounded-[2rem] overflow-hidden hover:border-[#d4af37]/30 transition-all duration-500 backdrop-blur-lg"
                    >
                        {/* Remove */}
                        <button
                            onClick={() => toggleWishlist(product._id)}
                            className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-red-500/80 backdrop-blur-md p-3 rounded-2xl transition-all duration-300 text-white/50 hover:text-white"
                        >
                            <FaTrashCan size={14} />
                        </button>

                        {/* Image */}
                        <Link href={`/product-details/${product._id}`} className="block relative overflow-hidden h-72">
                            <img
                                src={product.images?.[0]?.url || "/placeholder.png"}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-transparent to-transparent opacity-60" />
                        </Link>

                        {/* Details */}
                        <div className="p-6">
                            <h3 className="text-lg font-serif font-bold text-white truncate group-hover:text-[#d4af37] transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                                {product.category?.name || "Jewellery"}
                            </p>

                            <div className="flex items-end justify-between">
                                <div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Price</span>
                                    <p className="text-xl font-black text-white italic">
                                        {formatPrice(product.discountPrice || product.price, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig })}
                                    </p>
                                </div>

                                {product.stock <= 0 && (
                                    <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded border border-red-500/20 font-bold uppercase tracking-tighter">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock <= 0}
                                className={`mt-6 w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.1em] transition-all duration-300 ${product.stock > 0
                                    ? "bg-[#d4af37] text-black hover:bg-white hover:text-[#d4af37] hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                                    : "bg-slate-900 text-slate-700 cursor-not-allowed border border-white/10"
                                    }`}
                            >
                                <FaBagShopping className="text-base" />
                                {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}