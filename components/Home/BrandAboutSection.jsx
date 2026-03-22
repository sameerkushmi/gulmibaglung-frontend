"use client";

import { motion } from "framer-motion";
import { MdVerified, MdSecurity } from "react-icons/md";
import { FaGlobe, FaGlobeAmericas } from "react-icons/fa";
import {  GiGoldBar } from "react-icons/gi";
import { FaDiamond } from "react-icons/fa6";

const highlights = [
  {
    icon: <GiGoldBar size={28} />,
    title: "Generations of Excellence",
    subtitle: "10 Years of Trust",
    desc: "A heritage brand built on the pillars of transparency and artisanal mastery.",
  },
  {
    icon: <FaGlobeAmericas size={24} />,
    title: "Global Standards",
    subtitle: "ISO Quality Control",
    desc: "Every gemstone and gold alloy meets rigorous international certification.",
  },
  {
    icon: <FaDiamond size={28} />,
    title: "Artisan Handcrafted",
    subtitle: "Bespoke Precision",
    desc: "Our master smiths spend hundreds of hours on every single silhouette.",
  },
  {
    icon: <MdSecurity size={28} />,
    title: "Secure Investment",
    subtitle: "Exchange & Cashback",
    desc: "Unrivaled 100% exchange and 95% buyback policy for your peace of mind.",
  },
  {
    icon: <FaGlobe size={32} />,
    title: "Spirit of the Himalayas",
    subtitle: "Crafted in Nepal",
    desc: "Thoughtfully designed and poured in Nepal, celebrating local soul.",
  },
  {
    icon: <MdVerified size={28} />,
    title: "Ethically Sourced",
    subtitle: "Conflict-Free Gems",
    desc: "We ensure every diamond and stone is traceable and ethically mined.",
  },
];

export default function BrandAboutSection() {
  return (
    <section className="relative py-32 bg-[#0d2b45] overflow-hidden">
      {/* Heritage Watermark */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="text-[15vw] font-serif text-white/[0.02] leading-none uppercase tracking-tighter">
          Heritage
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="text-[#d4af37] uppercase tracking-[0.5em] text-xs font-bold mb-4 block">
              The Essence of Gulmi Baglung
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1]">
              Crafting <span className="italic text-[#d4af37] font-light text-6xl md:text-8xl">Legacy</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 max-w-sm text-sm leading-relaxed border-l border-white/10 pl-8"
          >
            Since our founding, we have been dedicated to the pursuit of perfection,
            blending traditional Nepalese techniques with modern luxury aesthetics.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/5 border-l border-white/5">
          {highlights.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-12 border-b border-r border-white/5 hover:bg-white/[0.02] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Subtle Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-px bg-[#d4af37]/0 group-hover:bg-[#d4af37]/40 transition-all duration-700" />
              <div className="absolute top-0 left-0 w-px h-8 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/40 transition-all duration-700" />

              {/* Icon & Title Group */}
              <div className="mb-8 text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors duration-500">
                {item.icon}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[#d4af37] text-[10px] tracking-[0.3em] uppercase font-bold mb-1">
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-serif text-white group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              {/* Background Numbering */}
              <span className="absolute bottom-4 right-8 text-6xl font-serif text-white/[0.03] group-hover:text-white/[0.06] transition-colors">
                0{index + 1}
              </span>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-[#d4af37]/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}