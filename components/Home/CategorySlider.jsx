"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

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
  const trackRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);

  const position = useRef(0);
  const velocity = useRef(0); // 🔥 inertia
  const lastTime = useRef(0);

  const [speed, setSpeed] = useState(60); // px per second

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeed(window.innerWidth < 768 ? 40 : 70);
    }
  }, []);

  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleRoutes = (cat) => {
    router.push(`/products/search?category=${cat.slug}`);
  };

  // 🔥 SMOOTH AUTO SCROLL (time-based)
  useEffect(() => {
    let animationFrame;

    const animate = (time) => {
      if (!lastTime.current) lastTime.current = time;
      const delta = (time - lastTime.current) / 1000; // seconds
      lastTime.current = time;

      if (!isPaused && !isDragging.current) {
        position.current -= speed * delta;
      }

      // Apply inertia
      if (!isDragging.current && Math.abs(velocity.current) > 0.1) {
        position.current += velocity.current * delta;
        velocity.current *= 0.95; // friction
      }

      const track = trackRef.current;
      if (track) {
        const width = track.scrollWidth / 2;

        if (Math.abs(position.current) >= width) {
          position.current += width; // smoother reset
        }

        track.style.transform = `translate3d(${position.current}px,0,0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, speed]);

  // 🔥 DRAG WITH MOMENTUM
  const handleDragStart = (e) => {
    isDragging.current = true;
    setIsPaused(true);
    velocity.current = 0;

    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = x - startX.current;

    position.current += delta;
    velocity.current = delta * 10; // 🔥 momentum feel
    startX.current = x;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  return (
    <section className="relative py-20 md:py-32 bg-[#0d2b45] overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[#d4af37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-2 block">
            Curated Selection
          </span>
          <h2 className="text-2xl md:text-5xl font-serif text-white tracking-tight">
            Shop by <span className="italic text-[#d4af37]">Category</span>
          </h2>
        </div>
        <div className="hidden md:block w-1/3 h-[1px] bg-white/10 mb-4" />
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeaveCapture={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-10 px-6 will-change-transform transform-gpu"
        >
          {[...categories, ...categories].map((cat, index) => (
            <CategoryCard
              key={index}
              cat={cat}
              onClick={() => handleRoutes(cat)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 w-[180px] h-[240px] md:w-[320px] md:h-[460px] group overflow-hidden bg-[#0a111a] cursor-pointer"
    >
      {/* Border */}
      <div className="absolute inset-0 border border-white/5 group-hover:border-[#d4af37]/30 transition-colors duration-500 z-20" />

      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full relative transition-transform duration-700 md:group-hover:scale-105">
          <Image
            src={cat.img}
            alt={cat.title}
            fill
            sizes="(max-width: 768px) 180px, 320px"
            quality={75}
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-30">
        <p className="text-[#d4af37] text-[10px] tracking-[0.3em] uppercase mb-1 md:mb-2">
          Explore Collection
        </p>

        <h3 className="text-white text-sm md:text-xl font-serif tracking-wide md:group-hover:translate-x-2 transition-transform duration-500">
          {cat.title}
        </h3>

        <div className="mt-2 md:mt-4 w-0 md:group-hover:w-full h-[1px] bg-[#d4af37] transition-all duration-700" />
      </div>

      {/* Shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full md:group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
}