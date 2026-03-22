"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ExchangeReturnPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a1f35] via-[#0d2742] to-[#081829] text-[#e6c984] px-6 pb-16 pt-26">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Exchange & Return Policy</h1>
                    <p className="text-[#ffffffaa] max-w-2xl mx-auto">
                        Learn about our exchange and return policy to ensure a smooth shopping experience.
                    </p>
                </motion.div>

                {/* Content Sections */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Eligibility for Returns</h2>
                    <p className="text-[#ffffffcc]">
                        Products can be returned or exchanged within 14 days from the date of delivery. Items must be unused, in original packaging, and in the same condition as received.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
                    <p className="text-[#ffffffcc]">
                        Personalized or customized jewellery, gift cards, and clearance items cannot be returned or exchanged.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
                    <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                        <li>Contact our support team to initiate a return.</li>
                        <li>Package the item securely with all original accessories.</li>
                        <li>Ship the item to our return address (provided by support).</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Exchange Process</h2>
                    <p className="text-[#ffffffcc]">
                        Exchanges are subject to product availability. Once we receive the returned item, the new item will be shipped within 3-5 business days.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
                    <p className="text-[#ffffffcc]">
                        Refunds for eligible returns will be processed to the original payment method within 5-7 business days after we receive and inspect the returned product.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
                    <p className="text-[#ffffffcc] mb-4">
                        For any questions about returns or exchanges, please contact our support team at <Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="text-[#d4af37] underline">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</Link>.
                    </p>
                </section>
            </div>
        </div>
    );
}