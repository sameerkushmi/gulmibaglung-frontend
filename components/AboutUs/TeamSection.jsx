"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiLinkedin, FiInstagram } from "react-icons/fi";

const teamMembers = [
    {
        name: "Jagendra Senchury",
        role: "Founder & Creative Director",
        quote: "Design is not just beauty — it's emotion crafted in gold.",
        image: "/images/team/founder.jpeg",
        linkedin: "#",
        instagram: "#",
    },
    {
        name: "Madan Senchury",
        role: "Co-founder & CEO",
        quote: "Trust, purity, and timeless value define our journey.",
        image: "/images/team/ceo.jpeg",
        linkedin: "#",
        instagram: "#",
    },
    {
        name: "Anita Senchury",
        role: "PR Manager",
        quote: "Every story we tell reflects elegance and heritage.",
        image: "/images/team/pr-manager.jpeg",
        linkedin: "#",
        instagram: "#",
    },
    {
        name: "Mamata Senchury",
        role: "Chairman",
        quote: "Luxury means making every client feel special.",
        image: "/images/team/chairman.jpeg",
        linkedin: "#",
        instagram: "#",
    },
    {
        name: "Mandeep Senchury",
        role: "Retail Executive",
        quote: "Luxury means making every client feel special.",
        image: "/images/team/retail-executive.jpeg",
        linkedin: "#",
        instagram: "#",
    },
    {
        name: "Menuka Senchury ",
        role: "Retail Executive",
        quote: "Luxury means making every client feel special.",
        image: "/images/team/retail-executive-1.jpeg",
        linkedin: "#",
        instagram: "#",
    },
];

export default function TeamSection() {
    return (
        <section className="relative py-24 bg-gradient-to-br from-[#081a2b] to-[#0d2b45] overflow-hidden">

            {/* Gold Glow */}
            <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-[#d4af37]/10 blur-[260px] rounded-full" />

            <div className="relative max-w-7xl mx-auto px-6 space-y-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-5xl font-extrabold text-[#d4af37]">
                        Meet Our Experts
                    </h2>
                    <p className="text-[#c9b37e] max-w-2xl mx-auto text-lg">
                        The minds and hearts behind our timeless jewellery creations.
                    </p>
                </motion.div>

                {/* Team Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-[#d4af37]/30 shadow-2xl text-center"
                        >
                            {/* Avatar */}
                            <div className="flex justify-center mb-5">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#d4af37]">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Quote */}
                            <p className="text-[#e6c984] italic text-sm leading-relaxed mb-6">
                                “{member.quote}”
                            </p>

                            {/* Name */}
                            <h4 className="text-[#d4af37] font-semibold text-lg">
                                {member.name}
                            </h4>
                            <p className="text-[#c9b37e] text-sm mb-4">
                                {member.role}
                            </p>

                            {/* Socials */}
                            <div className="flex justify-center gap-4 text-[#d4af37]">
                                <a href={member.linkedin} className="hover:text-[#ffd77a] transition">
                                    <FiLinkedin size={18} />
                                </a>
                                <a href={member.instagram} className="hover:text-[#ffd77a] transition">
                                    <FiInstagram size={18} />
                                </a>
                            </div>

                            {/* Gold shimmer */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                animate={{
                                    boxShadow: [
                                        "0 0 15px rgba(212,175,55,0.15)",
                                        "0 0 40px rgba(212,175,55,0.45)",
                                        "0 0 15px rgba(212,175,55,0.15)",
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
