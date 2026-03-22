"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import Interceptor from "@/utils/Interceptor";
import { useAuth } from "@/Context/AuthContext";
import Loading from "../Shared/Loading/Loading";
import toast from "react-hot-toast";

const api = Interceptor();

export default function BlogDetail({ slug }) {
  const id = slug;
  const [blogPosts, setBlogPosts] = useState(null);
  const { loading, setLoading } = useAuth();

  // Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/blogs/get-by-id/${id}`);
      setBlogPosts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load masterpiece journal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <article className="bg-[#0D2B45] min-h-screen text-[#f4f1ea] font-serif selection:bg-[#d4af37]/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#d4af37] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section - Full Height Cinematic */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {blogPosts?.image?.url && (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={blogPosts.image.url}
              alt={blogPosts.title || "Editorial"}
              fill
              className="object-cover opacity-50 transition-opacity duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D2B45]/40 to-[#0D2B45]" />
          </motion.div>
        )}

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="uppercase tracking-[0.4em] text-[#d4af37] text-xs mb-6 block font-sans font-semibold">
              {blogPosts?.category || "Heritage Journal"}
            </span>
            <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-[1.1] text-white mb-8">
              {blogPosts?.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-[#d4af37]/60 font-sans tracking-widest text-[10px] uppercase">
              <span>{blogPosts?.date}</span>
              <span className="h-1 w-1 rounded-full bg-[#d4af37]/40" />
              <span>5 Min Read</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#d4af37]/40"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#d4af37] to-transparent" />
        </motion.div>
      </header>

      {/* Editorial Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pb-32 pt-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Intro Text / Drop Cap */}
          <div
            dangerouslySetInnerHTML={{ __html: blogPosts?.content }}
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-light prose-headings:tracking-tight prose-headings:text-white
              prose-p:text-[#f4f1ea]/80 prose-p:leading-relaxed prose-p:font-light
              prose-strong:text-[#d4af37] prose-strong:font-semibold
              prose-blockquote:border-l-[#d4af37] prose-blockquote:italic prose-blockquote:text-[#d4af37]/90
              prose-img:rounded-sm prose-img:shadow-2xl
              first-letter:text-7xl first-letter:font-light first-letter:text-[#d4af37] 
              first-letter:mr-3 first-letter:float-left first-letter:mt-3"
          />

          {/* Footer Signature */}
          <footer className="mt-20 pt-10 border-t border-[#d4af37]/20 flex flex-col items-center">
            <div className="text-[#d4af37] italic font-serif text-lg mb-8">
              Fin.
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-sans uppercase tracking-[0.3em] text-[10px] text-[#d4af37]/60 hover:text-[#d4af37] transition-colors"
            >
              Back to top
            </button>
          </footer>
        </motion.div>
      </main>

      {/* Subtle Grain Overlay for Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </article>
  );
}