"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
    {
        question: "What materials are used in your jewellery?",
        answer:
            "Our jewellery is crafted using premium quality gold, diamonds, and certified gemstones. Each piece undergoes strict quality checks to ensure purity and durability.",
    },
    {
        question: "Do you offer customization options?",
        answer:
            "Yes, we specialize in custom jewellery. You can personalize designs based on your preferences, occasions, or budget.",
    },
    {
        question: "How can I verify product authenticity?",
        answer:
            "All our products come with proper certification, including hallmarking and authenticity documents for diamonds and gemstones.",
    },
    {
        question: "What is your return policy?",
        answer:
            "We offer a hassle-free return policy within a specified period. Products must be unused and returned with original packaging.",
    },
    {
        question: "Do you provide nationwide delivery?",
        answer:
            "Yes, we deliver across Nepal with secure packaging and insured shipping to ensure safe delivery.",
    },
    {
        question: "Is cash on delivery available?",
        answer:
            "Cash on delivery is available for selected locations. Please check at checkout or contact support for confirmation.",
    },
];

export default function FAQPage() {
    const [active, setActive] = useState(null);

    const toggleFAQ = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <section className="relative min-h-screen bg-[#0D2B45] text-white py-20 md:py-28 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#d4af37] uppercase tracking-[0.4em] text-[10px] font-semibold">
                        Support
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif mt-4">
                        Frequently Asked <span className="italic text-[#d4af37]">Questions</span>
                    </h1>

                    <p className="text-white/60 mt-6 max-w-xl mx-auto text-sm md:text-base">
                        Everything you need to know about our products, services, and policies.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = active === index;

                        return (
                            <div
                                key={index}
                                className="border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-md overflow-hidden"
                            >
                                {/* Question */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                                >
                                    <span className="text-sm md:text-lg font-medium group-hover:text-[#d4af37] transition">
                                        {faq.question}
                                    </span>

                                    <span className="text-[#d4af37] text-lg">
                                        {isOpen ? <FiMinus /> : <FiPlus />}
                                    </span>
                                </button>

                                {/* Answer */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 md:px-6 pb-6 text-white/70 text-sm md:text-base leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Bottom gold line animation */}
                                <div className={`h-[1px] bg-[#d4af37] transition-all duration-500 ${isOpen ? "w-full" : "w-0"}`} />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-20">
                    <p className="text-white/50 text-sm mb-4">
                        Still have questions?
                    </p>

                    <a
                        href="/contact"
                        className="inline-block border border-[#d4af37] text-[#d4af37] px-6 py-3 text-sm uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all duration-300"
                    >
                        Contact Us
                    </a>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}