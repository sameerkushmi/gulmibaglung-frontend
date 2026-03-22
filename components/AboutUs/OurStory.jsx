"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <main className="bg-gradient-to-br from-[#081a2b] to-[#0d2b45] text-[#e6c984]">

      {/* HERO IMAGE */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src="/images/story/story-hero.png"
          alt="Our Story"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#d4af37]">
              Our Story
            </h1>
            <p className="mt-4 text-[#e6c984] max-w-2xl mx-auto text-lg">
              A legacy of craftsmanship, tradition, and timeless elegance
            </p>
          </div>
        </motion.div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-[#d4af37]">
            Crafted with Passion
          </h2>
          <p className="text-[#c9b37e] leading-relaxed">
            Our journey began with a simple belief — jewellery should tell a story.
            Rooted in tradition and elevated by modern design, every piece we
            create reflects artistry, devotion, and cultural heritage.
          </p>
          <p className="text-[#c9b37e] leading-relaxed">
            From sourcing the finest gold and silver to perfecting intricate
            craftsmanship, we honor generations of skill passed down through
            time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/story/story-1.png"
            alt="Craftsmanship"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-[#d4af37] mb-16">
          Our Journey
        </h2>

        <div className="space-y-14">
          {[
            { year: "2016", text: "Founded with a vision to preserve traditional jewellery craftsmanship." },
            { year: "2019", text: "Expanded into gold and silver collections loved across Nepal." },
            { year: "2023", text: "Introduced modern designs while honoring heritage aesthetics." },
            { year: "2026", text: "A trusted luxury jewellery brand with timeless elegance." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-6"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] font-bold">
                {item.year}
              </div>
              <p className="text-[#c9b37e] text-lg leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: "Authenticity", desc: "Pure metals, genuine craftsmanship, and honest values." },
          { title: "Excellence", desc: "Precision and perfection in every detail we create." },
          { title: "Legacy", desc: "jewellery that lasts generations, preserving memories." },
        ].map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-[#d4af37]/30 shadow-xl text-center"
          >
            <h3 className="text-2xl font-semibold text-[#d4af37] mb-4">
              {value.title}
            </h3>
            <p className="text-[#c9b37e]">
              {value.desc}
            </p>
          </motion.div>
        ))}
      </section>

    </main>
  );
}
