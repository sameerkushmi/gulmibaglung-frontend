'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function TryAtHomeHero() {
    return (
        <section className="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">

            {/* 🔥 Background Image */}
            <Image
                src="/images/try-at-home/banner.jpg" // replace with your premium image
                alt="Try at Home"
                fill
                priority
                className="object-cover scale-105 brightness-[0.6]"
            />

            {/* 🌈 Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d2b45]/80 via-black/40 to-[#0d2b45]/90" />

            {/* ✨ Glow Effect */}
            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#d4af37] opacity-20 blur-[120px] rounded-full" />

            {/* 💎 Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl">

                {/* Tag */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="uppercase tracking-[0.4em] text-[#e6c984] text-xs mb-4"
                >
                    Luxury Experience
                </motion.p>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-6xl font-bold text-white leading-tight"
                >
                    Try Jewellery <br />
                    <span className="text-[#e6c984]">At Your Home</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-white/80 text-sm md:text-lg max-w-xl mx-auto"
                >
                    Experience elegance like never before. Book a personalized session and explore our exclusive collections from the comfort of your home.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Secondary Button */}
                    <Link href="/products/search">
                        <button className="px-8 py-3 border border-white/40 text-white text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all">
                            Explore Collection
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* ✨ Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0d2b45] to-transparent" />

        </section>
    );
}