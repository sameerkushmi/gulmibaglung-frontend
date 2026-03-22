"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutHero({ onOurStoryClick }) {
  return (
    <section className="relative py-26 min-h-[100vh] w-full bg-gradient-to-br from-[#081a2b] to-[#0d2b45] overflow-hidden flex items-center">
      {/* Golden glow background */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-[#d4af37]/10 blur-[280px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#e6c984]">
            Crafting <span className="text-[#d4af37]">Timeless jewellery</span>
            <br /> with Passion & Precision
          </h1>

          <p className="text-[#c9b37e] text-lg max-w-xl leading-relaxed">
            We create fine gold and silver jewellery that blends tradition with modern elegance.
            Every piece tells a story of craftsmanship, heritage, and luxury.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={onOurStoryClick}
              className="px-8 py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:scale-105 transition">
              Our Story
            </button>
            <Link href={'/contact-us'}>
              <button className="px-8 py-3 rounded-full border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/about/about-hero.png"
            alt="About jewellery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          {/* Gold shimmer border */}
          <motion.div
            className="absolute inset-0 rounded-3xl border border-[#d4af37]/40 pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 20px rgba(212,175,55,0.25)",
                "0 0 60px rgba(212,175,55,0.6)",
                "0 0 20px rgba(212,175,55,0.25)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
