"use client";

import { motion } from "framer-motion";
import { GiCutDiamond, GiGoldBar, GiShield, GiWorld } from "react-icons/gi";

const highlights = [
  {
    icon: <GiGoldBar size={28} />, // ✅ Heritage + gold legacy
    title: "A Legacy of Excellence",
    subtitle: "10 Years of Trust",
    desc: "A heritage brand built on the pillars of transparency and artisanal mastery.",
  },
  {
    icon: <GiWorld size={28} />, // ✅ global + local identity
    title: "Global Standards, Local Soul",
    subtitle: "100% Certified & Free Shipping",
    desc: "Our jewellery always comes with a certificate of authentication.",
  },
  {
    icon: <GiCutDiamond size={28} />, // ✅ craftsmanship + quality
    title: "Uncompromising Quality",
    subtitle: "15 Day Money-Back Guarantee",
    desc: "Get 100% refund if you don't like your jewellery.",
  },
  {
    icon: <GiShield size={28} />, // ✅ protection + security
    title: "Peace of Mind Promise",
    subtitle: "Lifetime Exchange & Buyback",
    desc: "Exchange your old designs anytime you want an upgrade.",
  },
  {
    icon: <GiWorld size={32} />, // ✅ crafted locally, global reach
    title: "Crafted in Nepal, Loved Worldwide",
    subtitle: "One Year Warranty",
    desc: "If your jewellery has a defect, we will fix it.",
  },
];

export default function BrandAboutSection() {
  return (
    <section className="relative py-12 md:py-32 bg-[#0d2b45] overflow-hidden">
      {/* Heritage Watermark */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="text-[15vw] font-serif text-white/[0.02] leading-none uppercase tracking-tighter">
          Heritage
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-24 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="text-[#d4af37] uppercase tracking-[0.5em] text-xs font-bold mb-4 block">
              The Essence of Gulmi Baglung
            </span>
            <h2 className="text-3xl md:text-7xl font-serif text-white leading-[1.1]">
              Crafting <span className="italic text-[#d4af37] font-light text-4xl md:text-8xl">Legacy</span>
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
              className="group p-6 md:p-12 border-b border-r border-white/5 hover:bg-white/[0.02] transition-colors duration-500 relative overflow-hidden"
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