'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Luxury Redefined",
    image: "/images/home-hero/banner-1.png",
    mobile: "/images/home-hero/mobile-size/banner-1.jpg",
    link: "/products/search/?category=rings"
  },
  {
    id: 2,
    title: "Eco-Conscious Living",
    image: "/images/home-hero/banner-2.png",
    mobile: "/images/home-hero/mobile-size/banner-2.jpg",
    link: "/products/search?category=necklaces"
  },
  {
    id: 3,
    title: "Eco-Conscious Living",
    image: "/images/home-hero/banner-3.png",
    mobile: "/images/home-hero/mobile-size/banner-3.jpg",
    link: "/products/search?category=necklaces"
  },
  {
    id: 4,
    title: "Urban Sanctuary",
    image: "/images/home-hero/banner-4.png",
    mobile: "/images/home-hero/mobile-size/banner-4.jpg",
    link: "/products/search?category=earrings"
  },
];

export default function HomeHero() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndex = (page + slides.length) % slides.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginate = (dir) => {
    setDirection(dir);
    setPage((prev) => prev + dir);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setPage((prev) => prev + 1);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 80 : -80,
      scale: 1.02,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -80 : 80,
      scale: 1.02,
    })
  };

  return (
    <section className="relative w-full h-[70dvh] md:h-[100dvh] overflow-hidden bg-black">

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Link href={slides[activeIndex].link} className="block w-full h-full">

            {/* Smooth Ken Burns */}
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
            >
              <Image
                src={isMobile ? slides[activeIndex].mobile : slides[activeIndex].image}
                alt={slides[activeIndex].title}
                fill
                priority={activeIndex === 0}
                sizes="100vw"
                className="object-cover transform-gpu"
              />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            <div className="absolute inset-0 bg-[#0D2B45]/20 mix-blend-overlay" />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > activeIndex ? 1 : -1);
              setPage(i);
            }}
            className="group"
          >
            <div
              className={`h-[2px] transition-all duration-500 ${activeIndex === i
                ? "w-12 bg-white"
                : "w-6 bg-white/40 group-hover:bg-white/70"
                }`}
            />
          </button>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition"
        >
          ←
        </button>

        <button
          onClick={() => paginate(1)}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition"
        >
          →
        </button>
      </div>

    </section>
  );
}
