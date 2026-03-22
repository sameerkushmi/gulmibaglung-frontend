"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BangleGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a1f35] via-[#0d2742] to-[#081829] text-[#e6c984] px-6 pb-16 pt-32">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Bangle Size Guide</h1>
                    <p className="text-[#ffffffaa] max-w-2xl mx-auto">
                        Find your perfect bangle size with simple measuring steps. The right size ensures comfort, elegance, and ease of wear.
                    </p>
                </motion.div>

                {/* How to Measure */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">How to Measure Your Bangle Size</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Method 1 */}
                        <div className="bg-[#122f4d] rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-3">Method 1: Measure an Existing Bangle</h3>
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#d4af37] text-[#0a1f35] font-bold text-lg shadow-lg">
                                    1
                                </div>
                                <Image
                                    src="/images/bangle-guide/step-1.png"
                                    alt="Measure bangle diameter"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                                <li>Place the bangle on a flat surface</li>
                                <li>Measure the inner diameter in millimeters</li>
                                <li>Match it with the size chart below</li>
                            </ul>
                        </div>

                        {/* Method 2 */}
                        <div className="bg-[#122f4d] rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-3">Method 2: Measure Your Hand</h3>
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#d4af37] text-[#0a1f35] font-bold text-lg shadow-lg">
                                    2
                                </div>
                                <Image
                                    src="/images/bangle-guide/step-2.png"
                                    alt="Measure hand width for bangle"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                                <li>Bring fingers together with thumb touching little finger</li>
                                <li>Measure the widest part of your hand</li>
                                <li>Use the measurement to find your bangle size</li>
                            </ul>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-[#ffffff88]">
                        Tip: If your hand measurement falls between sizes, choose the larger size for comfort.
                    </p>
                </section>

                {/* Bangle Size Chart */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Bangle Size Chart</h2>

                    {/* --- DESKTOP VIEW: Standard Table (Visible on md+ screens) --- */}
                    <div className="hidden md:block overflow-hidden rounded-lg border border-[#d4af37]/30">
                        <table className="min-w-full text-left">
                            <thead className="bg-[#122f4d]">
                                <tr className="text-[#d4af37]">
                                    <th className="px-4 py-3">Diameter (mm)</th>
                                    <th className="px-4 py-3">Inches</th>
                                    <th className="px-4 py-3">India / Nepal</th>
                                    <th className="px-4 py-3">US</th>
                                    <th className="px-4 py-3">UK</th>
                                    <th className="px-4 py-3">EU</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#ffffffcc]">
                                {[
                                    ["57.2", "2.25", "2-4", "6", "L", "52"],
                                    ["60.3", "2.38", "2-6", "7", "N", "54"],
                                    ["63.5", "2.50", "2-8", "8", "P", "57"],
                                    ["66.7", "2.63", "2-10", "9", "R", "60"],
                                    ["69.9", "2.75", "2-12", "10", "T", "62"],
                                ].map((row, i) => (
                                    <tr key={i} className="border-t border-[#d4af37]/20 hover:bg-[#d4af37]/5 transition-colors">
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-4 py-3">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- MOBILE VIEW: Card Layout (Visible only on small screens) --- */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {[
                            ["57.2", "2.25", "2-4", "6", "L", "52"],
                            ["60.3", "2.38", "2-6", "7", "N", "54"],
                            ["63.5", "2.50", "2-8", "8", "P", "57"],
                            ["66.7", "2.63", "2-10", "9", "R", "60"],
                            ["69.9", "2.75", "2-12", "10", "T", "62"],
                        ].map((row, i) => (
                            <div key={i} className="bg-[#122f4d]/40 border border-[#d4af37]/30 rounded-lg p-5 shadow-lg">
                                <div className="flex justify-between items-center border-b border-[#d4af37]/20 pb-3 mb-4">
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Nepal/India Size</span>
                                        <span className="text-xl font-bold text-[#d4af37]">{row[2]}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Diameter</span>
                                        <span className="text-white font-medium">{row[0]} mm / {row[1]}"</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase">US</p>
                                        <p className="text-white font-semibold">{row[3]}</p>
                                    </div>
                                    <div className="border-x border-[#d4af37]/10">
                                        <p className="text-[10px] text-gray-400 uppercase">UK</p>
                                        <p className="text-white font-semibold">{row[4]}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase">EU</p>
                                        <p className="text-white font-semibold">{row[5]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tips */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Bangle Sizing Tips</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "Always measure your dominant hand",
                            "Wider bangles need slightly more clearance",
                            "Oval bangles fit more comfortably than round ones",
                        ].map((tip, i) => (
                            <div key={i} className="bg-[#122f4d] p-5 rounded-xl text-center">
                                {tip}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Support */}
                <section className="text-center bg-[#122f4d] rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-3">Need Help Choosing?</h2>
                    <p className="text-[#ffffffaa] mb-6">
                        Our team is happy to help you select the perfect bangle size.
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
