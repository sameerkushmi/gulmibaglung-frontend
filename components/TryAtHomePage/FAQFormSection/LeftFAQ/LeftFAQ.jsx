import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const LeftFAQ = () => {

    const [active, setActive] = useState(null);
    const faqs = [
        {
            q: "Is Try at Home service free?",
            a: "Yes, our Try at Home service is completely free with no hidden charges.",
        },
        {
            q: "How many products can I try?",
            a: "You can try a curated selection of jewellery pieces during your appointment.",
        },
        {
            q: "Is it safe?",
            a: "Absolutely. Our trained professionals ensure a secure and premium experience.",
        },
        {
            q: "Can I buy instantly?",
            a: "Yes, you can purchase immediately using secure payment options.",
        },
        {
            q: "Which cities is this service available in?",
            a: "Our Try at Home service is currently available in selected cities. Please enter your location while booking to check availability.",
        },
        {
            q: "What if I don’t like any product?",
            a: "No worries! There is absolutely no obligation to purchase. You can explore and decide comfortably.",
        },
        {
            q: "Can I reschedule or cancel my appointment?",
            a: "Yes, you can easily reschedule or cancel your booking through our support team or confirmation message.",
        },
        {
            q: "Are the products certified?",
            a: "Yes, all our jewellery comes with proper certification and authenticity guarantees.",
        },
        {
            q: "What payment methods are available?",
            a: "We support multiple payment options including cash, card, e-wallets, and bank transfer.",
        },
        {
            q: "Will someone assist me during the visit?",
            a: "Yes, a trained jewellery expert will guide you, help you try pieces, and answer all your queries.",
        },
        {
            q: "How long does the appointment last?",
            a: "Typically, a session lasts between 30 to 60 minutes depending on your preferences.",
        },
        {
            q: "Can I request specific products?",
            a: "Yes, you can mention your preferences while booking, and we will try to bring relevant designs.",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <p className="uppercase tracking-[0.5em] text-[#e6c984] text-[11px] font-bold mb-3">
                    Concierge Support
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Frequently Asked <br /> Questions
                </h2>
            </div>

            <div className="flex flex-col gap-3">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="group border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-all duration-300 hover:border-white/20"
                    >
                        <button
                            onClick={() => setActive(active === i ? null : i)}
                            className="w-full flex justify-between items-center p-5 text-left text-white"
                        >
                            <span className={`font-medium transition-colors ${active === i ? "text-[#e6c984]" : "text-white/90"}`}>
                                {faq.q}
                            </span>
                            <FiChevronDown
                                className={`text-[#e6c984] transition-transform duration-300 ${active === i ? "rotate-180" : ""}`}
                            />
                        </button>

                        <AnimatePresence>
                            {active === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeftFAQ