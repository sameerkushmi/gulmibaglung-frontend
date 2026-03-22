"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import Interceptor from "@/utils/Interceptor";
const api = Interceptor();

export default function Subscribe() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const { data } = await api.post("/api/newsletter/subscribe", { email });
            toast.success(data.message);
            setEmail("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative w-full py-14 md:py-24 bg-[#0d2b45] overflow-hidden">

            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#d4af37]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />

            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="relative grid grid-cols-1 lg:grid-cols-2 bg-white/[0.02] border border-white/5 rounded-sm overflow-hidden backdrop-blur-sm">

                    {/* Image */}
                    <div className="relative h-[180px] sm:h-[220px] lg:h-auto overflow-hidden group">
                        <Image
                            src="/images/subsribe/jewellery.jpeg"
                            alt="Gulmi Baglung Jewelry Heritage"
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050b14] via-transparent to-transparent lg:hidden" />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 md:p-16 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[#d4af37] text-[9px] md:text-[10px] uppercase tracking-[0.35em] font-bold mb-3 block">
                                Exclusive Access
                            </span>

                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 leading-tight">
                                Join our <span className="italic text-[#d4af37] font-light">Inner Circle</span>
                            </h2>

                            <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed mb-6 md:mb-10 max-w-sm">
                                Receive private invitations to new collection launches, heritage stories,
                                and exclusive member-only benefits.
                            </p>

                            <form onSubmit={handleSubscribe} className="relative group">
                                <div className="flex flex-col sm:flex-row gap-3">

                                    <div className="relative flex-1">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent border-b border-white/10 py-3 md:py-4 text-white placeholder:text-white/20 text-xs md:text-sm outline-none focus:border-[#d4af37] transition-colors duration-500"
                                        />

                                        <div className="absolute bottom-0 left-0 h-[1px] bg-[#d4af37] w-0 group-focus-within:w-full transition-all duration-700" />
                                    </div>

                                    <button
                                        disabled={loading}
                                        className="relative px-6 md:px-10 py-3 md:py-4 bg-[#d4af37] text-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden group/btn"
                                    >
                                        <span className="relative z-10">
                                            {loading ? "Registering..." : "Join"}
                                        </span>

                                        <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                    </button>
                                </div>
                            </form>

                            <p className="mt-3 md:mt-8 text-[9px] md:text-xs text-white/20 uppercase tracking-widest leading-loose">
                                By joining, you agree to our{" "}
                                <Link
                                    href="/privacy-policy"
                                    className="underline cursor-pointer hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>. Unsubscribe anytime.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
        </section>
    );
}