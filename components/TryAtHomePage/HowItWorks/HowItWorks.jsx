'use client';

import { motion } from "framer-motion";
import { FiCalendar, FiHome, FiShoppingBag, FiCheckCircle } from "react-icons/fi";

const steps = [
    {
        icon: FiCalendar,
        title: "Book Appointment",
        desc: "Choose your preferred date and time to schedule a personalized home visit.",
    },
    {
        icon: FiHome,
        title: "We Visit You",
        desc: "Our expert arrives at your doorstep with curated jewellery collections.",
    },
    {
        icon: FiShoppingBag,
        title: "Try & Select",
        desc: "Explore, try, and compare pieces in the comfort of your home.",
    },
    {
        icon: FiCheckCircle,
        title: "Buy with Confidence",
        desc: "Make your purchase securely with trusted payment options.",
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full bg-[#0d2b45] py-20 px-6 md:px-12">

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="uppercase tracking-[0.4em] text-[#e6c984] text-xs mb-3">
                    Simple Process
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                    How It Works
                </h2>
                <p className="text-white/70 mt-4 text-sm md:text-base">
                    Experience luxury jewellery shopping from the comfort of your home in just a few simple steps.
                </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">

                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Card */}
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 h-full hover:border-[#e6c984]/50 transition-all">

                            {/* Step Number */}
                            <div className="text-[#e6c984] text-sm mb-3 font-semibold">
                                Step {index + 1}
                            </div>

                            {/* Icon */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e6c984]/10 text-[#e6c984] mb-4 group-hover:scale-110 transition">
                                <step.icon size={22} />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-white/70 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </div>

                        {/* Connector Line (desktop only) */}
                        {index !== steps.length - 1 && (
                            <div className="hidden md:block absolute top-1/2 right-[-20px] w-10 h-[1px] bg-[#e6c984]/40" />
                        )}
                    </motion.div>
                ))}

            </div>
        </section>
    );
}