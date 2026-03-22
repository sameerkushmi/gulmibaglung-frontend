"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMaximize2, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const products = [
  { name: "Gold Baby Bala", image: "/images/products/baby-bala/1.png", category: "Bangles" },
  { name: "Empire Gold Necklace", image: "/images/products/chandra-haar/1/1.png", category: "Necklaces" },
  { name: "Gold Wedding Necklace", image: "/images/products/mangalsutra/3/2.png", category: "Bracelets" },
  { name: "Silver Kada", image: "/images/products/silver-kada/1/3.png", category: "Earrings" },
  { name: "Solid Bangle Collection", image: "/images/products/gold-bala/1/3.png", category: "Bangle" },
  { name: "Heritage Gold Necklace", image: "/images/products/temple-haar/3.png", category: "Necklaces" },
  { name: "Glimmer Moti Mala", image: "/images/products/moti-mala/1/5.png", category: "Rings" },
  { name: "Ethereal Moti Mala", image: "/images/products/moti-mala/5/5.png", category: "Earrings" },
];

export default function Collection() {
  const [index, setIndex] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setZoom(1);
    }
  }, [index]);

  return (
    <section className="w-full bg-[#0d2b45] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-[#d4af37]/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <header className="text-center mb-12 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#d4af37] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block"
          >
            Curated Treasures
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-7xl font-serif text-white mb-8"
          >
            The <span className="italic font-light text-[#d4af37]">Signature</span> Collection
          </motion.h2>
          <div className="w-24 h-[1px] bg-[#d4af37]/40 mx-auto" />
        </header>

        {/* ================= GRID ================= */}
        <div className="columns-2 sm:columns-2 lg:columns-4 gap-2 md:p-4 md:gap-6 space-y-4 md:space-y-6">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setIndex(i)}
              className="relative group cursor-none break-inside-avoid rounded-sm overflow-hidden bg-white/5 border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Hover UI Overlay */}
                <div className="absolute inset-0 bg-[#050b14]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                  <div className="p-2 md:p-4 bg-[#d4af37] text-black rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                    <FiMaximize2 size={20} />
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="p-3 md:p-6 bg-[#0d2b45] flex justify-between items-center">
                <div>
                  <p className="text-[#d4af37] text-[7px] md:text-[8px] tracking-[0.25em] uppercase mb-1">{p.category}</p>
                  <h3 className="text-white text-xs md:text-sm font-serif tracking-wide">{p.name}</h3>
                </div>
                <div className="w-6 h-[1px] bg-white/20 group-hover:w-10 group-hover:bg-[#d4af37] transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0d2b45]/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
          >
            {/* Top Bar Navigation */}
            <div className="absolute top-0 w-full p-8 flex justify-between items-center z-[110]">
              <div className="text-white/40 text-[10px] tracking-[0.5em] uppercase">
                Product {index + 1} <span className="mx-2">/</span> {products.length}
              </div>
              <button
                onClick={() => setIndex(null)}
                className="text-white/60 hover:text-[#d4af37] transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Main Carousel Area */}
            <div className="relative w-full h-[55vh] md:h-[70vh] flex items-center justify-center px-4 md:px-24">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i - 1 + products.length) % products.length);
                }}
                className="absolute left-4 md:left-12 p-2 md:p-2 md:p-4 border border-white/10 rounded-full text-white hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all z-[120]"
              >
                <FiChevronLeft size={24} />
              </motion.button>

              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={products[index].image}
                  alt={products[index].name}
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
              </motion.div>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i + 1) % products.length);
                }}
                className="absolute right-4 md:right-12 p-2 md:p-2 md:p-4 border border-white/10 rounded-full text-white hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all z-[120]"
              >
                <FiChevronRight size={24} />
              </motion.button>
            </div>

            {/* Bottom Caption Overlay */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-12 text-center"
            >
              <h3 className="text-[#d4af37] font-serif text-xl sm:text-2xl md:text-5xl mb-4 italic">
                {products[index].name}
              </h3>
              <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">
                Artisanal Gold Collection • Nepal
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}