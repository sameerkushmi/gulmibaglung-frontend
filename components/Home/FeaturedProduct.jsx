"use client";

import { useAuth } from "@/Context/AuthContext";
import Interceptor from "@/utils/Interceptor";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import formatPrice from "@/utils/formatPrice";
import { FaWhatsapp } from "react-icons/fa";

const api = Interceptor();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function FeaturedProduct() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const router = useRouter();
  const { user, USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig } = useAuth();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await api.get("/api/products/featured");
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleBuyNow = (product) => {
    if (!user) return toast.error("Please login to continue");
    if (product.stock <= 0) return toast.error("Product is out of stock");
    router.push(`/checkout?buyNow=true&productId=${product._id}`);
  };

  const handleWhatsAppPreBook = (product) => {
    const phoneNumber = process.env.NEXT_PUBLIC_SUPPORT_NUMBER
    const productUrl = `${window.location.origin}/product-details/${product._id}`;
    const message = `Luxury Inquiry: ${product.name}\nLink: ${productUrl}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="w-full py-14 md:py-24 bg-[#0d2b45] relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <header className="text-center mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#d4af37] uppercase tracking-[0.25em] text-xs md:text-sm font-medium mb-3 block"
          >
            Curated Excellence
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-6xl font-serif text-white mb-4"
          >
            The Featured Collection
          </motion.h2>

          <div className="w-16 md:w-24 h-[1px] bg-[#d4af37] mx-auto mb-6 md:mb-8" />
        </header>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.article
              key={product._id}
              variants={itemVariants}
              className="group relative flex flex-col bg-white/[0.02] border border-white/10 rounded-sm overflow-hidden hover:border-[#d4af37]/50 transition-colors duration-500"
            >

              {/* Image */}
              <div className="relative aspect-square overflow-hidden ">
                <Link href={`/product-details/${product._id}`}>
                  <Image
                    src={product?.images?.[0]?.url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>

                {/* Desktop Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex flex-col items-center justify-center gap-3 px-6">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="w-full py-2 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-widest hover:bg-white"
                  >
                    Quick Purchase
                  </button>

                  <button
                    onClick={() => handleWhatsAppPreBook(product)}
                    className="w-full py-2 border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp size={14} /> Inquiry
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-6 text-center bg-[#0d2b45]">

                <h3 className="text-white max-sm:truncate md:line-clamp-2 font-medium text-[10px] md:text-lg mb-1 md:mb-2 tracking-wide uppercase group-hover:text-[#d4af37] transition-colors">
                  <Link href={`/product-details/${product._id}`}>
                    {product.name}
                  </Link>
                </h3>

                {/* <p className="text-[#d4af37] font-light text-sm md:text-xl">
                  {formatPrice(product.discountPrice || product.price, {
                    USD_RATE,
                    EURO_RATE,
                    AUS_RATE,
                    currency,
                    currencyConfig
                  })}
                </p> */}

                {/* Mobile Buttons */}
                <div className="mt-3 flex gap-2 lg:hidden">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 py-1.5 bg-[#d4af37] text-[10px] font-bold text-black uppercase"
                  >
                    Buy
                  </button>

                  <button
                    onClick={() => handleWhatsAppPreBook(product)}
                    className="flex-1 py-1.5 border border-[#d4af37] text-[#d4af37] text-[10px] font-bold uppercase flex items-center justify-center gap-1"
                  >
                    <FaWhatsapp size={12} />
                    Chat
                  </button>
                </div>

              </div>

            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}