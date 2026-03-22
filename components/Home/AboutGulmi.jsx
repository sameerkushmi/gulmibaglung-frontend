"use client";

import { motion } from "framer-motion";

const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function AboutGulmibaglungJewellers() {
    return (
        <section className="w-full bg-[#0d2b45] py-20 md:py-28 relative overflow-hidden">

            {/* subtle luxury glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] uppercase tracking-[0.35em] text-xs block mb-4">
                        About Our Brand
                    </span>

                    <h2 className="text-white font-serif text-3xl md:text-5xl">
                        Gulmi baglung Jewellers
                    </h2>

                    <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-6" />
                </div>

                {/* 3 Column Grid */}
                <div className="grid md:grid-cols-3 gap-10 md:gap-12">

                    {/* Column 1 */}
                    <motion.div
                        variants={itemVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center p-8 border border-white/10 hover:border-[#d4af37]/50 transition rounded-sm bg-white/[0.02]"
                    >
                        <h3 className="text-white font-serif text-xl md:text-2xl mb-4">
                            Online Jewellers Store
                        </h3>

                        <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mb-6" />

                        <p className="text-white/70 text-sm leading-relaxed">
                            Gulmi baglung Jewellers brings the elegance of fine jewellery into
                            the digital world. Our online store allows customers to explore
                            beautifully crafted pieces that reflect heritage, luxury, and
                            timeless artistry. Every design is carefully curated to celebrate
                            tradition while embracing modern sophistication.
                        </p>
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div
                        variants={itemVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center p-8 border border-white/10 hover:border-[#d4af37]/50 transition rounded-sm bg-white/[0.02]"
                    >
                        <h3 className="text-white font-serif text-xl md:text-2xl mb-4">
                            Our Mission
                        </h3>

                        <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mb-6" />

                        <p className="text-white/70 text-sm leading-relaxed">
                            Our mission is to create jewellery that symbolizes authenticity,
                            elegance, and enduring value. By combining traditional
                            craftsmanship with premium materials, we aim to craft timeless
                            pieces that become cherished heirlooms passed down through
                            generations.
                        </p>
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div
                        variants={itemVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center p-8 border border-white/10 hover:border-[#d4af37]/50 transition rounded-sm bg-white/[0.02]"
                    >
                        <h3 className="text-white font-serif text-xl md:text-2xl mb-4">
                            Shopping at Gulmi baglung Jewellers
                        </h3>

                        <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mb-6" />

                        <p className="text-white/70 text-sm leading-relaxed">
                            Shopping with Gulmi baglung Jewellers offers a refined and
                            luxurious experience. Our platform allows customers to discover
                            exceptional jewellery collections with trust and convenience.
                            Whether selecting a meaningful gift or a bridal masterpiece,
                            every purchase reflects elegance and craftsmanship.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}