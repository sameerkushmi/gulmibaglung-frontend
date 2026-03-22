import { useAuth } from "@/Context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductCard({ product, isWishlisted, toggleWishlist }) {

    const { addToCart } = useAuth()

    const handleAddToCart = async (product) => {
        if (product.stock <= 0) return;
        const data = await addToCart({ productId: product._id, quantity: 1 });
        if (data.success) return toast.success("Added to your collection");
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative"
        >
            <div className="relative aspect-square  md:aspect-[4/5] overflow-hidden bg-[#0a1929] rounded-2xl">
                {/* Wishlist */}
                <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-md p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
                >
                    {isWishlisted ? (
                        <FaHeart className="text-red-500 text-xs md:text-lg" />
                    ) : (
                        <FaRegHeart className="text-white text-xs md:text-lg group-hover:text-black" />
                    )}
                </button>

                <Link href={`/product-details/${product._id}`} >
                    <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </Link>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-2 md:p-6  md:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                    <button
                        disabled={product.stock > 0 ? false : true}
                        onClick={() => handleAddToCart(product)}
                        className="w-full disabled:cursor-not-allowed bg-white text-black py-2 md:py-4 rounded-xl font-bold uppercase text-[7px] md:text-[11px] tracking-[2px] shadow-2xl hover:bg-[#d4af37] transition-colors"
                    >
                        {product.stock > 0 ? "In Stock" : "Sold Out"}
                    </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />            </div>

            <div className="mt-6 text-center lg:text-left">
                <p className="text-[10px] uppercase tracking-[3px] text-gray-500 mb-1 font-bold">
                    {product.category?.name || "Handcrafted"}
                </p>
                <Link href={`/product-details/${product._id}`}>
                    <h3 className="text-lg font-serif text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                {/* <div className="mt-2 flex items-center justify-center lg:justify-start gap-3">
                    {product.discountPrice ? (
                        <>
                            <span className="text-white font-medium text-lg">
                                ${product.discountPrice.toLocaleString()}
                            </span>
                            <span className="line-through text-gray-600 text-sm">
                                ${product.price.toLocaleString()}
                            </span>
                        </>
                    ) : (
                        <span className="text-white font-medium text-lg">
                            ${product.price?.toLocaleString()}
                        </span>
                    )}
                </div> */}
            </div>
        </motion.div>
    );
}