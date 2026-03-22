'use client';

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Luxury Redefined",
    image: "/images/home-hero/banner-1.png",
    mobile: "/images/home-hero/mobile-size/banner-1.png",
    link: "/products/search/?category=rings"
  },
  {
    id: 2,
    title: "Eco-Conscious Living",
    image: "/images/home-hero/banner-2.png",
    mobile: "/images/home-hero/mobile-size/banner-2.png",
    link: "/products/search?category=necklaces"
  },
  {
    id: 3,
    title: "Eco-Conscious Living",
    image: "/images/home-hero/banner-3.png",
    mobile: "/images/home-hero/mobile-size/banner-3.png",
    link: "/products/search?category=necklaces"
  },
  {
    id: 4,
    title: "Urban Sanctuary",
    image: "/images/home-hero/banner-4.png",
    mobile: "/images/home-hero/mobile-size/banner-4.png",
    link: "/products/search?category=earrings"
  },
];

export default function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndex = (page + slides.length) % slides.length;

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide pagination
  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [paginate]);

  // Framer Motion variants
  const variants = {
    enter: (direction) => ({
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: { duration: 0.8 }
    })
  };

  return (
    <section className="relative w-full h-[90dvh] md:h-[100dvh] overflow-hidden bg-slate-950 font-sans">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Link href={slides[activeIndex].link} className="block w-full h-full">
            {/* Ken Burns Effect Image */}
            <motion.img
              src={isMobile ? slides[activeIndex].mobile : slides[activeIndex].image}
              alt={slides[activeIndex].title}
              initial={{ scale: 1.2, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 10, ease: "linear" }}
              className="w-full h-full object-cover object-center max-h-[90vh] md:max-h-full"
            />

            {/* Premium Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            <div className="absolute inset-0 bg-[#0D2B45]/30 mix-blend-overlay" />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > activeIndex ? 1 : -1])}
            className="group relative py-4"
          >
            <div className={`h-[2px] transition-all duration-500 bg-white ${activeIndex === i ? "w-12 opacity-100" : "w-6 opacity-30 group-hover:opacity-60"}`} />
            <span className={`absolute -top-2 left-0 text-[10px] font-mono text-white transition-opacity ${activeIndex === i ? "opacity-100" : "opacity-0"}`}>
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <button
          onClick={() => paginate(-1)}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
        </button>
        <button
          onClick={() => paginate(1)}
          className="pointer-events-auto w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all group"
        >
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
}