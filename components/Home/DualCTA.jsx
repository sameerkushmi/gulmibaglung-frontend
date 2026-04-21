"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
    {
        title: "Don't Know Which Design To Pick?",
        subtitle: "BOOK A FREE HOME TRIAL",
        button: "Book Appointment",
        link: "/try-at-home",
        image: "/images/try-at-home/home-try.png",
    },
    {
        title: "Gulmibaglung Jewellery Store",
        subtitle: process.env.NEXT_PUBLIC_OWNER_ADDRESS || "Visit our flagship store",
        button: `Call Us: +${process.env.NEXT_PUBLIC_SUPPORT_NUMBER || "Contact"}`,
        link: `tel:${process.env.NEXT_PUBLIC_SUPPORT_NUMBER}`,
        image: "/images/try-at-home/store.png",
    },
];

export default function DualCTA() {
    return (
        <section className="bg-[#0D2B45] py-20 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="group relative h-[400px] md:h-[500px] overflow-hidden border border-white/10"
                        >
                            {/* Image Container with Zoom Effect */}
                            <div className="absolute inset-0">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                />
                                {/* Sophisticated Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/90" />
                            </div>

                            {/* Content Layout */}
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                <div className="relative z-10">
                                    <span className="block text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                                        {card.subtitle}
                                    </span>

                                    <h3 className="text-white text-2xl md:text-3xl font-light leading-tight mb-8 max-w-[80%]">
                                        {card.title}
                                    </h3>

                                    <Link
                                        href={card.link}
                                        className="inline-flex items-center group/btn"
                                    >
                                        <span className="relative overflow-hidden bg-white text-[#0D2B45] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors duration-300 group-hover/btn:bg-[#d4af37] group-hover/btn:text-white">
                                            {card.button}
                                        </span>
                                        <div className="ml-4 h-[1px] w-8 bg-[#d4af37] transition-all duration-300 group-hover/btn:w-12" />
                                    </Link>
                                </div>
                            </div>

                            {/* Decorative Corner Element */}
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-8 h-8 border-t border-r border-[#d4af37]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}