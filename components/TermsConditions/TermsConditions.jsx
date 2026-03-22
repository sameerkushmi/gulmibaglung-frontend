"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsConditions() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-[#ffffffaa] max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services. They outline your rights and responsibilities.
          </p>
        </motion.div>

        {/* Content Sections */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-[#ffffffcc]">
            By accessing or using our website, you agree to be bound by these terms and conditions. If you disagree with any part, please do not use our services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
          <p className="text-[#ffffffcc]">
            You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Products and Orders</h2>
          <p className="text-[#ffffffcc]">
            We strive for accuracy in product descriptions and pricing. Orders are subject to availability. We reserve the right to cancel or refuse any order.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Payments</h2>
          <p className="text-[#ffffffcc]">
            Payments must be completed through the available secure methods. All transactions are subject to applicable laws and fees.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
          <p className="text-[#ffffffcc]">
            Please refer to our Exchange & Return Policy for detailed information on returns, exchanges, and refunds.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="text-[#ffffffcc]">
            All content on this website including images, logos, text, and designs are our property or used with permission. Unauthorized use is prohibited.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-[#ffffffcc]">
            We are not liable for any direct or indirect damages arising from the use or inability to use our services. Use our services at your own risk.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="text-[#ffffffcc]">
            These terms are governed by the laws of the country in which our business operates. Any disputes will be subject to the jurisdiction of the local courts.
          </p>
        </section>

        <section className="text-center mt-16">
          <p className="text-[#ffffffaa] mb-4">
            For any questions regarding our terms, please contact us at <Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="text-[#d4af37] underline">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
