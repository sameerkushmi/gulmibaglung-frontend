"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function DiamondShapesGuide() {
    const diamondShapes = [
        {
            name: "Round",
            image: "/images/diamond-shapes/round.png",
            description: "Classic round brilliant cut diamond with optimal sparkle and fire.",
            bestFor: "Timeless elegance, most popular choice.",
            details: "58-facet brilliant cut, maximizes sparkle, suitable for engagement rings, versatile and timeless."
        },
        {
            name: "Princess",
            image: "/images/diamond-shapes/princess.png",
            description: "Square-shaped diamond with sharp corners and contemporary style.",
            bestFor: "Modern and edgy styles.",
            details: "Sharp corners, modern brilliance, works well in square settings, ideal for bold engagement rings."
        },
        {
            name: "Cushion",
            image: "/images/diamond-shapes/cushion.png",
            description: "Square or rectangular diamond with rounded corners, vintage charm, and brilliance.",
            bestFor: "Romantic and vintage designs.",
            details: "Soft rounded edges, excellent fire, classic vintage appeal, works beautifully in halo or solitaire settings."
        },
        {
            name: "Emerald",
            image: "/images/diamond-shapes/emerald.png",
            description: "Rectangular step-cut diamond with elegant facets and subtle brilliance.",
            bestFor: "Sophisticated, clean look.",
            details: "Step-cut facets highlight clarity, elegant and understated brilliance, perfect for vintage and minimalist designs."
        },
        {
            name: "Oval",
            image: "/images/diamond-shapes/oval.png",
            description: "Elongated round shape offering a unique look and visual size advantage.",
            bestFor: "Slimming effect, unique brilliance.",
            details: "Creates finger elongation effect, visually larger than round diamonds of same carat, brilliant sparkle, versatile for rings and pendants."
        },
        {
            name: "Marquise",
            image: "/images/diamond-shapes/marquise.png",
            description: "Football-shaped diamond that maximizes carat weight and creates finger elongation.",
            bestFor: "Maximizes size appearance.",
            details: "Dramatic shape, elongates fingers, maximizes apparent carat size, vintage and statement jewelry."
        },
        {
            name: "Pear",
            image: "/images/diamond-shapes/pear.png",
            description: "Teardrop-shaped diamond combining round and marquise cuts for elegance.",
            bestFor: "Elegant and feminine.",
            details: "Teardrop shape, versatile for rings, earrings, and pendants, elegant and sophisticated appearance."
        },
        {
            name: "Asscher",
            image: "/images/diamond-shapes/asscher.png",
            description: "Square step-cut diamond with deep pavilion and vintage appeal.",
            bestFor: "Retro charm, Art Deco appeal.",
            details: "Step-cut facets with vintage charm, dramatic flashes, emphasizes clarity, low sparkle but high sophistication."
        },
        {
            name: "Radiant",
            image: "/images/diamond-shapes/radiant.png",
            description: "Square or rectangular diamond with brilliant-cut facets for sparkle and fire.",
            bestFor: "Modern brilliance with character.",
            details: "Hybrid of round and emerald cuts, very brilliant, geometric elegance, bold and contemporary design."
        },
        {
            name: "Heart",
            image: "/images/diamond-shapes/heart.png",
            description: "Diamond shaped like a heart, symbolizing love.",
            bestFor: "Romantic and bold statements.",
            details: "Unique and playful shape, ideal for romantic gifts, requires careful setting to enhance symmetry and brilliance."
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a1f35] via-[#0d2742] to-[#081829] text-[#e6c984] px-6 pb-16 pt-28">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Diamond Shapes Guide</h1>
                    <p className="text-[#ffffffaa] max-w-3xl mx-auto">
                        At Ashmi Jewellers, each diamond shape tells a unique story. Explore our curated selection to find the one that best reflects your individuality.
                    </p>
                </motion.div>

                {/* Diamond Shapes */}
                <section className="grid md:grid-cols-3 gap-8">
                    {diamondShapes.map((diamond, i) => (
                        <div key={i} className="bg-[#122f4d] rounded-2xl p-6 flex flex-col items-center text-center">
                            <div className="relative w-40 h-40 mb-4">
                                <Image src={diamond.image} alt={diamond.name} fill className="object-contain rounded-lg" />
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{diamond.name}</h3>
                            <p className="text-[#ffffffcc] text-sm mb-1">{diamond.description}</p>
                            <p className="text-[#ffffffaa] text-xs mb-1"><strong>Best For:</strong> {diamond.bestFor}</p>
                            <p className="text-[#ffffff88] text-xs">{diamond.details}</p>
                        </div>
                    ))}
                </section>

                {/* 4 Cs Section */}
                <section className="mt-16 bg-[#122f4d] rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-4">Discover the 4 Cs of Diamonds</h2>
                    <p className="text-[#ffffffaa] mb-6">
                        Diamonds tell a story of elegance and craftsmanship. The 4 Cs — Cut, Color, Clarity, and Carat — guide you in choosing the perfect gem.
                    </p>
                    <ul className="list-disc list-inside text-[#ffffffcc] space-y-3 text-sm">
                        <li><strong>Cut:</strong> Determines brilliance, fire, and scintillation. Precision angles and symmetry maximize sparkle.</li>
                        <li><strong>Color:</strong> From D (colorless) to Z (noticeable tint). Affects rarity and visual appeal.</li>
                        <li><strong>Clarity:</strong> Measures inclusions and blemishes. Higher clarity = more stunning brilliance.</li>
                        <li><strong>Carat:</strong> Diamond weight and visual size. Balancing with other Cs ensures beauty and value.</li>
                    </ul>
                </section>

                {/* Support */}
                <section className="text-center bg-[#122f4d] rounded-2xl p-8 mt-16">
                    <h2 className="text-2xl font-semibold mb-3">Need Help Choosing?</h2>
                    <p className="text-[#ffffffaa] mb-6">
                        Trust our experts at Ashmi Jewellers Global to guide you to the perfect diamond shape and quality.
                    </p>
                    <a
                        href="/contact-us"
                        className="inline-block px-8 py-3 rounded-full bg-[#d4af37] text-[#0a1f35] font-semibold hover:scale-105 transition"
                    >
                        Contact Us
                    </a>
                </section>
            </div>
        </div>
    );
}
