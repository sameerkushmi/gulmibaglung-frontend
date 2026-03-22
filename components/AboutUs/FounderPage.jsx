"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiLinkedin, FiInstagram } from "react-icons/fi";

export default function FounderPage() {
    const founder = {
        name: "Jagendra Senchury",
        role: "Founder & Creative Director",
        dob: "January 15, 1985",
        image: "/images/team/story.jpeg",
        linkedin: "#",
        instagram: "#",
        quote: "Design is not just beauty — it's emotion crafted in gold.",
        bio: `Jagendra Senchury is the visionary behind Gulmi Baglung. With a passion for crafting timeless 
          jewellery, Aarav blends traditional craftsmanship with modern elegance. Each design tells a 
          story of heritage, luxury, and precision. Over the years, Aarav has led the brand to become a 
          symbol of trust, quality, and sophistication in the world of fine jewellery.`,
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-[#081a2b] to-[#0d2b45] overflow-hidden pb-18">

            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-[#d4af37]/10 blur-[280px] rounded-full pointer-events-none"></div>

            {/* Quote Banner */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto mt-16 text-center px-6 relative"
            >
                <p className="text-2xl md:text-3xl italic text-[#ffd77a] mb-4">
                    “{founder.quote}”
                </p>

                {/* Animated Signature */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 600 100"
                    className="mx-auto w-72 h-16 overflow-visible"
                >
                    <motion.path
                        d="M10 60 C120 10, 480 90, 590 60" // Handwritten-like curve
                        fill="transparent"
                        stroke="#ffd77a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.text
                        x="0"
                        y="75"
                        fill="#ffd77a"
                        fontSize="32"
                        fontFamily="Brush Script MT, cursive"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        {founder.name}
                    </motion.text>
                </motion.svg>
            </motion.div>

            {/* Main Container */}
            <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 mt-20">

                {/* Founder Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full md:w-96 h-96 rounded-3xl overflow-hidden border-4 border-[#d4af37] shadow-2xl"
                >
                    <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover"
                    />

                    {/* DOB Badge */}
                    <div className="absolute bottom-4 right-4 bg-[#d4af37]/20 backdrop-blur-lg text-[#ffd77a] font-semibold px-4 py-1 rounded-full text-sm border border-[#d4af37]/50">
                        DOB: {founder.dob}
                    </div>

                    {/* Gold Sparkle Overlay */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(212,175,55,0.1)",
                                "0 0 50px rgba(212,175,55,0.4)",
                                "0 0 20px rgba(212,175,55,0.1)",
                            ],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </motion.div>

                {/* Founder Details */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 space-y-6"
                >
                    <h1 className="text-5xl font-extrabold text-[#d4af37]">{founder.name}</h1>
                    <p className="text-[#c9b37e] text-xl font-medium">{founder.role}</p>

                    <p className="text-[#e6c984] leading-relaxed text-lg">{founder.bio}</p>

                    {/* Social Links */}
                    <div className="flex gap-6 mt-4 text-[#d4af37]">
                        <a href={founder.linkedin} className="hover:text-[#ffd77a] transition">
                            <FiLinkedin size={28} />
                        </a>
                        <a href={founder.instagram} className="hover:text-[#ffd77a] transition">
                            <FiInstagram size={28} />
                        </a>
                    </div>

                    {/* Highlight Cards */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-[#d4af37]/30 shadow-lg flex items-center gap-4"
                        >
                            <div className="text-[#d4af37] font-bold text-2xl">💎</div>
                            <div>
                                <p className="text-[#e6c984] font-semibold">Experience</p>
                                <p className="text-[#c9b37e] text-sm">Over 20 years of luxury design</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-[#d4af37]/30 shadow-lg flex items-center gap-4"
                        >
                            <div className="text-[#d4af37] font-bold text-2xl">🏆</div>
                            <div>
                                <p className="text-[#e6c984] font-semibold">Awards</p>
                                <p className="text-[#c9b37e] text-sm">Multiple national & international recognitions</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
