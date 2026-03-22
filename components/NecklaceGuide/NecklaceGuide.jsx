"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NecklaceGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a1f35] via-[#0d2742] to-[#081829] text-[#e6c984] px-6 pb-16 pt-28">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Necklace Length Guide</h1>
                    <p className="text-[#ffffffaa] max-w-2xl mx-auto">
                        Learn how to choose the perfect necklace length for your style and comfort.
                    </p>
                </motion.div>

                {/* How to Measure */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">How to Measure Necklace Length</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Method 1 */}
                        <div className="bg-[#122f4d] rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-3">Method 1: Use an Existing Necklace</h3>
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#d4af37] text-[#0a1f35] font-bold text-lg shadow-lg">
                                    1
                                </div>
                                <Image
                                    src="/images/necklace-guide/step-1.png"
                                    alt="Measure existing necklace"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                                <li>Lay the necklace flat</li>
                                <li>Measure the total length in centimeters or inches</li>
                                <li>Compare with standard lengths below</li>
                            </ul>
                        </div>

                        {/* Method 2 */}
                        <div className="bg-[#122f4d] rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-3">Method 2: Measure on Your Neck</h3>
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#d4af37] text-[#0a1f35] font-bold text-lg shadow-lg">
                                    2
                                </div>
                                <Image
                                    src="/images/necklace-guide/step-2.png"
                                    alt="Measure necklace on neck"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                                <li>Use a soft measuring tape around your neck</li>
                                <li>Decide where you want the necklace to sit</li>
                                <li>Choose a necklace with that length</li>
                            </ul>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-[#ffffff88]">
                        Tip: Most women prefer 16"-18" necklaces for daily wear and 20"-24" for layering or pendants.
                    </p>
                </section>

                {/* Length Chart */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Standard Necklace Length Chart</h2>

                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full text-left border border-[#d4af37]/30">
                            <thead className="bg-[#122f4d]">
                                <tr>
                                    <th className="px-4 py-3">Length</th>
                                    <th className="px-4 py-3">Common Name</th>
                                    <th className="px-4 py-3">Where it Sits</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#ffffffcc]">
                                {[
                                    ["35-40 cm / 14-16\"", "Choker", "Base of the neck"],
                                    ["45-50 cm / 18-20\"", "Princess", "Around the collarbone"],
                                    ["55-60 cm / 22-24\"", "Matinee", "Top of the bust"],
                                    ["70-90 cm / 28-36\"", "Opera", "Mid-chest to under bust"],
                                    ["100-120 cm / 40-48\"", "Rope", "Below bust / layering"],
                                ].map((row, i) => (
                                    <tr key={i} className="border-t border-[#d4af37]/20">
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-4 py-3 whitespace-nowrap">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Tips */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Necklace Tips</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "Layer necklaces for a stylish look",
                            "Consider pendant size relative to necklace length",
                            "Measure before buying online for comfort",
                        ].map((tip, i) => (
                            <div key={i} className="bg-[#122f4d] p-5 rounded-xl text-center">
                                {tip}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Support */}
                <section className="text-center bg-[#122f4d] rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-3">Still Not Sure?</h2>
                    <p className="text-[#ffffffaa] mb-6">
                        Contact our team to find your perfect necklace length.
                    </p>
                    <Link
                        href="/contact-us"
                        className="inline-block px-8 py-3 rounded-full bg-[#d4af37] text-[#0a1f35] font-semibold hover:scale-105 transition"
                    >
                        Contact Us
                    </Link>
                </section>
            </div>
        </div>
    );
}
