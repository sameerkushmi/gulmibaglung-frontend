"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BlogHero() {
    return (
        <section className="relative py-26 w-full md:h-screen bg-gradient-to-br from-[#081a2b] to-[#0d2b45] overflow-hidden flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-[#d4af37]/10 blur-[250px] rounded-full -z-10"></div>

            {/* Hero Content */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:flex-1 text-center md:text-left space-y-6"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#e6c984] leading-tight">
                        Discover the <span className="text-[#d4af37]">Art of jewellery</span>
                    </h1>
                    <p className="text-[#c9b37e] text-lg md:text-xl">
                        Explore our blog to learn the latest trends, care tips, and the cultural significance of gold and silver jewellery.
                    </p>
                    <Link
                        href="#blog-posts"
                        className="inline-block mt-6 px-8 py-3 rounded-full border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#081a2b] font-semibold transition"
                    >
                        Read Our Blog
                    </Link>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:flex-1 relative w-full h-90 md:h-[460px] rounded-3xl  shadow-2xl"
                >
                    <Image
                        src="/images/blog/blog-hero.jpg"
                        alt="jewellery Blog Hero"
                        fill
                        className="object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>

                    {/* Gold shimmer border */}
                    <motion.div
                        className="absolute inset-0 rounded-3xl border border-[#d4af37]/40 pointer-events-none"
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(212,175,55,0.25)",
                                "0 0 50px rgba(212,175,55,0.6)",
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
