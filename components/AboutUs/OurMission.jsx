"use client";

import { motion } from "framer-motion";
import { FiAward, FiHeart, FiShield } from "react-icons/fi";

export default function OurMission() {
  const missions = [
    {
      icon: <FiAward size={32} />,
      title: "Exceptional Craftsmanship",
      desc: "To create jewellery that reflects precision, artistry, and timeless beauty through skilled craftsmanship."
    },
    {
      icon: <FiHeart size={32} />,
      title: "Meaningful Design",
      desc: "To design pieces that celebrate emotions, traditions, and life’s most precious moments."
    },
    {
      icon: <FiShield size={32} />,
      title: "Trust & Purity",
      desc: "To uphold transparency, authenticity, and purity in every gold and silver creation."
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#081a2b] to-[#0d2b45] overflow-hidden">

      {/* Soft Gold Glow */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-[#d4af37]/10 blur-[260px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center space-y-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-5xl font-extrabold text-[#d4af37]">
            Our Mission
          </h2>
          <p className="text-[#c9b37e] max-w-2xl mx-auto text-lg">
            Driven by passion, guided by tradition, and committed to excellence in every creation.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {missions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-[#d4af37]/30 shadow-2xl group hover:scale-105 transition"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full border border-[#d4af37] text-[#d4af37] mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold text-[#e6c984] mb-4">
                {item.title}
              </h3>
              <p className="text-[#c9b37e] leading-relaxed">
                {item.desc}
              </p>

              {/* Gold Shimmer */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(212,175,55,0.2)",
                    "0 0 40px rgba(212,175,55,0.5)",
                    "0 0 15px rgba(212,175,55,0.2)"
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
