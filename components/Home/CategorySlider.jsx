"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const categories = [
  { title: "Bespoke Rings", slug: "rings", img: "/images/categories/ring.jpeg" },
  { title: "Signature Necklaces", slug: "necklaces", img: "/images/products/chandra-haar/3/1.png" },
  { title: "Artisan Bracelets", slug: "bracelets", img: "/images/categories/bracelet.jpeg" },
  { title: "Statement Earrings", slug: "earrings", img: "/images/categories/earring.png" },
  { title: "Fine Wedding Necklaces", slug: "mangalsutra", img: "/images/products/mangalsutra/1/5.png" },
  { title: "Bridal Bangles", slug: "bangles", img: "/images/products/gold-bala/2/2.png" },
];

export default function CategorySlider() {
  const router = useRouter();
  const x = useMotionValue(0);

  const containerRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  // Calculate width
  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      const firstHalfWidth = el.scrollWidth / 2;
      setContentWidth(firstHalfWidth);
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    if (!contentWidth) return;

    let controls;

    const startAnimation = () => {
      controls = animate(x, -contentWidth, {
        ease: "linear",
        duration: 40,
        onComplete: () => {
          x.set(0); // reset without jump
          startAnimation(); // loop again
        },
      });
    };

    if (!isHovering && !isDragging) {
      startAnimation();
    }

    return () => controls?.stop();
  }, [isHovering, isDragging, contentWidth, x]);

  const handleRoutes = (cat) => {
    const path = `/products/search?category=${cat.slug}`;

    router.push(path);
  };

  return (
    <section className="relative py-32 bg-[#0d2b45] overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[#d4af37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-2 block">
            Curated Selection
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Shop by <span className="italic text-[#d4af37]">Category</span>
          </h2>
        </div>
        <div className="hidden md:block w-1/3 h-[1px] bg-white/10 mb-4" />
      </div>

      {/* Slider */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="cursor-grab active:cursor-grabbing"
      >
        <motion.div
          ref={containerRef}
          className="flex gap-6 md:gap-10 px-6"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: -contentWidth,
            right: 0,
          }}
          dragMomentum={false}
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {[...categories, ...categories].map((cat, index) => (
            <CategoryCard
              key={index}
              cat={cat}
              onClick={() => handleRoutes(cat)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="relative flex-shrink-0 w-[220px] h-[280px] md:w-[320px] md:h-[460px] group overflow-hidden bg-[#0a111a]"
    >
      <div className="absolute inset-0 border border-white/5 group-hover:border-[#d4af37]/30 transition-colors duration-500 z-20" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={cat.img}
            alt={cat.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 w-full p-8 z-30">
        <p className="text-[#d4af37] text-[10px] tracking-[0.3em] uppercase mb-2">
          Explore Collection
        </p>

        <h3 className="text-white text-xl font-serif tracking-wide group-hover:translate-x-2 transition-transform duration-500">
          {cat.title}
        </h3>

        <div className="mt-4 w-0 group-hover:w-full h-[1px] bg-[#d4af37] transition-all duration-700" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
}