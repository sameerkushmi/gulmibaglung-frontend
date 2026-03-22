"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import Image from "next/image";

const testimonials = [
  {
    name: "Ramesh Karki",
    role: "Wedding Collection Client",
    message: "The craftsmanship is truly exceptional. Every detail reflects elegance and tradition. I couldn’t have chosen better jewellery for my wedding.",
    image: "/images/testimonials/user-1.png",
  },
  {
    name: "Shraddha Pokhrel",
    role: "Private Investor",
    message: "Pure gold, transparent pricing, and timeless designs. This brand has earned my complete trust over the years.",
    image: "/images/testimonials/user-2.png",
  },
  {
    name: "Sameer Kushmi",
    role: "Luxury Collector",
    message: "A perfect blend of modern elegance and traditional craftsmanship. Each piece feels personal and remarkably precious.",
    image: "/images/testimonials/user-3.png",
  },
];

export default function Testimonial() {
  return (
    <section
      className="relative py-32 bg-[#0d2b45] overflow-hidden"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Background Decorative Element */}

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[#d4af37] uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">
              Voices of Trust
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1]">
              Kind Words from our <br />
              <span className="italic text-[#d4af37] font-light">Patrons</span>
            </h2>
          </motion.div>
          <div className="hidden md:block w-32 h-[1px] bg-white/10 mb-6" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {testimonials.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 p-10 pt-16 rounded-sm hover:bg-white/[0.05] transition-all duration-700">

                {/* Large Decorative Quote Mark */}
                <span className="absolute top-6 left-8 text-6xl font-serif text-[#d4af37]/20 group-hover:text-[#d4af37]/40 transition-colors">
                  “
                </span>

                {/* Stars - Minimalist Style */}
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      <FiStar className="text-[#d4af37] text-xs fill-[#d4af37]" />
                    </motion.div>
                  ))}
                </div>

                {/* Message */}
                <p className="text-white/80 text-lg font-serif italic leading-relaxed mb-10 relative z-10">
                  {item.message}
                </p>

                {/* Footer Info */}
                <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                  <div className="relative w-14 h-18 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-serif tracking-wide text-lg">
                      {item.name}
                    </h4>
                    <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em] font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Subtle Hover Border Animation */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] group-hover:w-full transition-all duration-700" />
              </div>

              {/* SEO Meta Tags */}
              <meta itemProp="reviewRating" content="5" />
            </motion.article>
          ))}
        </div>

        {/* Brand Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase">
            Join 10,000+ satisfied families across Nepal
          </p>
        </motion.div>
      </div>

      {/* Background Soft Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}