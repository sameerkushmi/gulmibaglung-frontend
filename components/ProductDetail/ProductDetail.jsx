"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Interceptor from "@/utils/Interceptor";
import { useAuth } from "@/Context/AuthContext";
import Loading from "@/components/Shared/Loading/Loading";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import {
  FaHeart,
  FaRegHeart,
  FaShippingFast,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import formatPrice from "@/utils/formatPrice";
import ProductImageGallery from "./ProductImageGallery";
import { CustomizationSection } from "./CustomizationSection";
import SpecItem from "./SpecItem";

const api = Interceptor();

export default function ProductDetail({ slug }) {
  const router = useRouter();
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    user,
    USD_RATE,
    EURO_RATE,
    AUS_RATE,
    currency,
    currencyConfig,
  } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/get-byId/${slug}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <div className="relative h-screen bg-[#050b14]">
        <Loading />
      </div>
    );

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center text-gold-500">
        Product not found
      </div>
    );

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    const data = await addToCart({ productId: product._id, quantity: 1 });
    if (data.success) toast.success("Added to your collection");
  };

  const handleBuyNow = (product) => {
    if (!user) return toast.error("Please login to continue payment");
    if (!product) return toast.error("Product not selected");
    if (product.stock <= 0) return toast.error("Product is out of stock");

    router.push(`/checkout?buyNow=true&productId=${product._id}`);
  };

  const handleWhatsAppPreBook = (product) => {
    const phoneNumber = process.env.NEXT_PUBLIC_SUPPORT_NUMBER;
    const productUrl = `${window.location.origin}/product-details/${product._id}`;
    const message = `Luxury Inquiry: ${product.name}\nLink: ${productUrl}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="min-h-screen bg-[#0d2b45] text-slate-200 selection:bg-gold-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-gold-900/5 blur-[100px] rounded-full" />
      </div>

      <div className="lg:max-w-screen mx-auto py-24 lg:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: IMAGE GALLERY */}
          <ProductImageGallery product={product} />

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 px-6 lg:px-0 lg:pr-10">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold">
                    Fine Jewelry
                  </span>
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="text-white/60 hover:text-red-500 transition-colors"
                  >
                    {wishlist.includes(product._id) ? (
                      <FaHeart size={24} className="text-red-500" />
                    ) : (
                      <FaRegHeart size={24} />
                    )}
                  </button>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  {/* <p className="text-3xl font-light text-gold-400">
                    {formatPrice(product.discountPrice || product.price, {
                      USD_RATE,
                      EURO_RATE,
                      AUS_RATE,
                      currency,
                      currencyConfig,
                    })}
                  </p> */}
                  <div className="h-4 w-px bg-white/20" />
                  <div className="flex text-xs text-yellow-500 gap-1">
                    {"★★★★★".split("").map((s, i) => (
                      <span
                        key={i}
                        className={i >= product.averageRating ? "opacity-30" : ""}
                      >
                        {s}
                      </span>
                    ))}
                    <span className="text-white/40 ml-2">
                      ({product.reviewsCount} Reviews)
                    </span>
                  </div>
                </div>

                {/* CUSTOMIZATION SECTION */}
                <CustomizationSection
                  product={product}
                />

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-y border-white/10 py-8 mb-8">
                  <SpecItem
                    icon={<IoDiamondOutline />}
                    label="Material"
                    value={product.material}
                  />
                  <SpecItem
                    icon={<FaShieldAlt />}
                    label="Purity"
                    value={product.purity}
                  />
                  <SpecItem
                    icon={<span className="text-[10px] font-bold">GR</span>}
                    label="Weight"
                    value={`${product.weight}g`}
                  />
                  <SpecItem
                    icon={
                      <div
                        className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"
                          }`}
                      />
                    }
                    label="Availability"
                    value={product.stock > 0 ? "In Stock" : "Sold Out"}
                  />
                </div>

                <div
                  className="text-white/60 leading-relaxed mb-10 prose-sm prose-invert"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />

                {/* MARQUEE SLIDER */}
                <div className="relative overflow-hidden mb-6 border-y border-white/10 py-3">
                  <div className="flex whitespace-nowrap animate-marquee gap-12 text-[11px] tracking-widest uppercase text-gold-500 font-semibold">

                    <span>✨ 10 Years of Trust</span>
                    <span>💎 15 Day Money-Back Guarantee</span>
                    <span>🚚 100% Certified & Free Shipping</span>
                    <span>🛡 One Year Warranty</span>
                    <span>📦 Lifetime Exchange & Buyback</span>

                    {/* duplicate for smooth loop */}
                    <span>✨ 10 Years of Trust</span>
                    <span>💎 15 Day Money-Back Guarantee</span>
                    <span>🚚 100% Certified & Free Shipping</span>
                    <span>🛡 One Year Warranty</span>
                    <span>📦 Lifetime Exchange & Buyback</span>

                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="flex-1 bg-gold-600 disabled:cursor-not-allowed hover:bg-gold-500 disabled:bg-white/10 text-black font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 cursor-pointer border border-white/20 hover:border-gold-500 hover:text-gold-500 text-white font-bold py-4 rounded-full transition-all duration-300"
                  >
                    BUY IT NOW
                  </button>

                  <button
                    onClick={() => handleWhatsAppPreBook(product)}
                    className="flex-1 py-4 border border-[#d4af37] text-[#d4af37] text-[10px] font-bold uppercase flex items-center justify-center gap-2 rounded-full"
                  >
                    <FaWhatsapp size={12} />
                    Inquiry
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex items-center justify-between text-[10px] text-white/40 tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <FaShippingFast /> Free Express Shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt /> Warranty
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProductReviews productId={product._id} />
        <RelatedProducts productId={product._id} />
      </div>

      <style jsx global>{`
        .text-gold-400 {
          color: #d4af37;
        }
        .text-gold-500 {
          color: #c5a028;
        }
        .bg-gold-600 {
          background-color: #b8860b;
        }
        .bg-gold-500 {
          background-color: #d4af37;
        }
        .border-gold-500 {
          border-color: #d4af37;
        }

          @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </section>
  );
}