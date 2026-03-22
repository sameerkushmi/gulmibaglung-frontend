"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-[#ffffffaa] max-w-2xl mx-auto">
                        Your privacy is important to us. This page outlines how we collect, use, and protect your information.
                    </p>
                </motion.div>

                {/* Content Sections */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                    <p className="text-[#ffffffcc] mb-2">
                        We may collect personal information including your name, email address, phone number, and payment information when you use our services.
                    </p>
                    <p className="text-[#ffffffcc]">
                        We also collect non-personal information like browser type, IP address, and pages visited to improve our website experience.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                    <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                        <li>To process orders and payments.</li>
                        <li>To send promotional emails if subscribed.</li>
                        <li>To improve website functionality and services.</li>
                        <li>To ensure compliance with legal requirements.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                    <p className="text-[#ffffffcc]">
                        We implement security measures including encryption and access restrictions to protect your personal data from unauthorized access or disclosure.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
                    <p className="text-[#ffffffcc]">
                        We may share information with trusted third-party service providers such as payment gateways, shipping partners, and analytics services to fulfill our services.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                    <ul className="list-disc list-inside text-[#ffffffcc] space-y-2">
                        <li>Access, update, or delete your personal information.</li>
                        <li>Opt-out of marketing communications at any time.</li>
                        <li>Request data portability or limitation of processing.</li>
                    </ul>
                </section>

                <section className="text-center mt-16">
                    <p className="text-[#ffffffaa] mb-4">
                        For any questions regarding our privacy practices, please contact us at <Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="text-[#d4af37] underline">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</Link>.
                    </p>
                </section>
            </div>
        </div>
    );
}
