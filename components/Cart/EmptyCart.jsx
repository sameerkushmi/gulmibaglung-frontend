"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingBagLine } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";

export default function EmptyCart() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#0d2b45] bg-[radial-gradient(circle_at_center,_#163a5f_0%,_#0d2b45_100%)] relative overflow-hidden px-6">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af3705] blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#d4af3705] blur-[100px] rounded-full" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-md"
      >
        {/* Animated Image Container */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-[#d4af3710] blur-2xl rounded-full scale-75" />
          <Image
            src="/images/cart/empty.png" 
            alt="Empty Cart"
            width={280}
            height={280}
            className="mx-auto relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#e6c984] tracking-tight">
            Empty Treasure Box
          </h1>
          <p className="text-[#ffffff66] text-sm uppercase tracking-[0.2em] font-medium px-4">
            Your collection is waiting for its first masterpiece.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products/search" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-10 py-4 bg-gradient-to-r from-[#d4af37] to-[#e6c984] text-[#0a1f35] rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-[#00000044]"
              >
                <RiShoppingBagLine size={18} />
                Explore Boutique
              </motion.button>
            </Link>

            <Link href="/" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 bg-transparent border border-[#ffffff10] text-[#ffffff88] rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#ffffff05] hover:text-[#e6c984] transition-all">
                <BiArrowBack size={14} />
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Luxury Footer Detail */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-20">
        <div className="h-[1px] w-12 bg-[#d4af37]" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]" />
        <div className="h-[1px] w-12 bg-[#d4af37]" />
      </div>
    </section>
  );
}