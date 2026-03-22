"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RingGuidePage() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Ring Size Guide</h1>
                    <p className="text-[#ffffffaa] max-w-2xl mx-auto">
                        Find your perfect ring size with our easy-to-follow guide. Accurate sizing ensures comfort and elegance.
                    </p>
                </motion.div>

                {/* How to Measure */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">How to Measure Your Ring Size</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-[#122f4d] rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-3">Method 1: Measure an Existing Ring</h3>
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                <Image
                                    src="/images/ring-guide/step-1.png"
                                    alt="Measure ring diameter"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                                <li>Choose a ring that fits the intended finger</li>
                                <li>Measure the inner diameter in millimeters</li>
                                <li>Match it with the size chart below</li>
                            </ul>
                        </div>

                        <div className="bg-[#122f4d] rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-3">Method 2: Measure Your Finger</h3>
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                <Image
                                    src="/images/ring-guide/step-2.png"
                                    alt="Measure finger circumference"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                                <li>Wrap string or paper around finger base</li>
                                <li>Mark where it overlaps</li>
                                <li>Measure length in mm (circumference)</li>
                            </ul>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-[#ffffff88]">
                        Tip: Measure at the end of the day and avoid cold temperatures for best accuracy.
                    </p>
                </section>

                {/* Size Chart Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">International Ring Size Chart</h2>

                    {/* --- DESKTOP VIEW: Standard Table (Visible on md screens and up) --- */}
                    <div className="hidden md:block overflow-hidden rounded-lg border border-[#d4af37]/30">
                        <table className="min-w-full text-left">
                            <thead className="bg-[#122f4d]">
                                <tr>
                                    <th className="px-4 py-3">Diameter (mm)</th>
                                    <th className="px-4 py-3">Circumference (mm)</th>
                                    <th className="px-4 py-3">US</th>
                                    <th className="px-4 py-3">UK</th>
                                    <th className="px-4 py-3">Nepal/India</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#ffffffcc]">
                                {[
                                    ["15.7", "49.3", "5", "J 1/2", "10"],
                                    ["16.5", "51.9", "6", "L 1/2", "12"],
                                    ["17.3", "54.4", "7", "N 1/2", "14"],
                                    ["18.1", "57.0", "8", "P 1/2", "16"],
                                    ["18.9", "59.5", "9", "R 1/2", "18"],
                                    ["19.8", "62.1", "10", "T 1/2", "20"],
                                    ["20.6", "64.6", "11", "V 1/2", "22"],
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

                    {/* --- MOBILE VIEW: Info Cards (Visible only on small screens) --- */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {[
                            ["15.7", "49.3", "5", "J 1/2", "10"],
                            ["16.5", "51.9", "6", "L 1/2", "12"],
                            ["17.3", "54.4", "7", "N 1/2", "14"],
                            ["18.1", "57.0", "8", "P 1/2", "16"],
                            ["18.9", "59.5", "9", "R 1/2", "18"],
                            ["19.8", "62.1", "10", "T 1/2", "20"],
                            ["20.6", "64.6", "11", "V 1/2", "22"],
                        ].map((row, i) => (
                            <div key={i} className="bg-[#122f4d]/30 border border-[#d4af37]/30 rounded-lg p-4">
                                <div className="flex justify-between items-center border-b border-[#d4af37]/20 pb-2 mb-3">
                                    <span className=" font-bold">Size (Nepal/India): {row[4]}</span>
                                    <span className="text-xs bg-[#d4af37]/20 px-2 py-1 rounded text-[#d4af37]">US {row[2]}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <span className="text-gray-400">Diameter:</span>
                                    <span className="text-right text-white">{row[0]} mm</span>

                                    <span className="text-gray-400">Circumference:</span>
                                    <span className="text-right text-white">{row[1]} mm</span>

                                    <span className="text-gray-400">UK Size:</span>
                                    <span className="text-right text-white">{row[3]}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tips */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Ring Sizing Tips</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "Wide bands usually need half size larger",
                            "Comfort-fit rings feel looser",
                            "If between sizes, choose the larger one",
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
                        Contact our support team or choose resizable designs for worry-free shopping.
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
