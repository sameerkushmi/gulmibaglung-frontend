"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDiamond } from "react-icons/fa6";

/* ------------------ Static Product ------------------ */
const product = {
  name: "Celestial Gold Bangle",
  collection: "The Heritage Series",
  description:
    "Experience timeless luxury with this 24K solid gold bangle. Handcrafted by skilled Nepalese artisans and adorned with a certified VVS1 diamond, it’s a masterpiece that merges heritage artistry with modern elegance.",
  details: [
    "24K Handcrafted Gold",
    "Certified VVS1 Diamond",
    "Exclusive Heritage Edition"
  ],
  image: "/images/products/baby-bala/3.png",
};

export default function HomeProductDetail() {
  const [glints, setGlints] = useState([]);

  useEffect(() => {
    setGlints(
      Array.from({ length: 8 }).map((_, i) => ({
        top: `${20 + Math.random() * 60}%`,
        left: `${20 + Math.random() * 60}%`,
        delay: i * 0.8,
      }))
    );
  }, []);

  return (
    <section
      itemScope
      itemType="https://schema.org/Product"
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center bg-[#0d2b45] overflow-hidden py-14 md:py-20 px-4 sm:px-6 md:px-12"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[32vw] md:text-[25vw] font-serif font-bold text-white uppercase tracking-tighter">
          Exquisite
        </h2>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#d4af37]/10 blur-[120px] md:blur-[150px] rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">

        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="relative group"
        >
          <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] mx-auto overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-b from-white/5 to-transparent p-1 shadow-xl">
            <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden bg-[#0d2b45]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain scale-90 group-hover:scale-100 transition-transform duration-[3s]"
                itemProp="image"
              />
            </div>

            {/* Diamond Sparkle */}
            {glints.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0, 1.2, 0], rotate: [0, 90, 180] }}
                transition={{ duration: 3, repeat: Infinity, delay: g.delay }}
                className="absolute w-4 h-4 md:w-6 md:h-6 z-20 pointer-events-none"
                style={{ top: g.top, left: g.left }}
              >
                <div
                  className="w-full h-full bg-white blur-[2px] shadow-[0_0_12px_white]"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-xl md:rounded-2xl"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <FaDiamond size={20} />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] text-[#d4af37] uppercase tracking-[0.2em] font-bold">
                Purity Guaranteed
              </p>
              <p className="text-white text-xs md:text-sm font-serif">
                Certified 24K Hallmark
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-6 md:gap-8 text-left"
        >
          <div>
            <span className="text-[#d4af37] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-3 block">
              {product.collection}
            </span>

            <h1
              itemProp="name"
              className="text-3xl sm:text-4xl md:text-7xl font-serif text-white leading-tight mb-4 md:mb-6"
            >
              {product.name.split(" ").slice(0, -1).join(" ")} <br />
              <span className="italic text-[#d4af37] font-light">
                {product.name.split(" ").pop()}
              </span>
            </h1>

            <div className="w-14 md:w-20 h-[1px] bg-[#d4af37] mb-4 md:mb-8" />
          </div>

          <p
            itemProp="description"
            className="text-white/60 text-sm md:text-lg leading-relaxed max-w-lg font-light"
          >
            {product.description}
          </p>

          <ul className="space-y-3 md:space-y-4 my-3 md:my-4">
            {product.details.map((detail, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-3 text-white/80 text-xs md:text-sm tracking-wide"
              >
                <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
                {detail}
              </motion.li>
            ))}
          </ul>

          <motion.div whileHover={{ scale: 1.02 }} className="mt-2 md:mt-4">
            <Link href="/contact-us" className="px-8 md:px-12 py-3 md:py-4 bg-[#d4af37] text-black uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold rounded-sm hover:bg-white transition-colors">
              Inquire Now
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Side Decoration */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-20">
        <span className="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[1em] text-white">
          EST. 2016
        </span>
        <div className="w-px h-24 bg-white/20 mx-auto" />
      </div>
    </section>
  );
}