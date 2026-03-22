"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Interceptor from "@/utils/Interceptor";

const api = Interceptor();

export default function BlogPost() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Gold", "Silver", "Trends", "Platinum"];

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/api/blogs/get-all");
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredPosts = blogs.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || post.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-[#0D2B45] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2b45] via-[#081a2b] to-[#05111d] px-6 py-20 lg:px-20">

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#d4af37] uppercase tracking-[0.3em] text-sm font-medium"
        >
          The Journal
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-[#e6c984] font-light"
        >
          Refined <span className="italic font-normal">Perspectives</span>
        </motion.h2>
      </div>

      {/* Premium Filters */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#d4af37]/20 pb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 border ${category === cat
                ? "bg-[#d4af37] text-[#081a2b] border-[#d4af37]"
                : "text-[#c9b37e] border-[#d4af37]/30 hover:border-[#d4af37]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search our collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-[#d4af37]/40 py-2 pl-2 pr-10 text-[#e6c984] focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-[#c9b37e]/40"
          />
          <svg className="absolute right-2 top-2 w-5 h-5 text-[#d4af37]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* Blog Grid */}
      <motion.div
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              layout
              key={post._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative flex flex-col h-full"
            >
              {/* Card Container */}
              <div className="relative flex-grow overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-md">

                {/* Image Wrap */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Link
                    href={`/blog/${post._id}`}
                  >
                    <Image
                      src={post.image.url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-[#081a2b]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#d4af37] text-[10px] uppercase tracking-widest font-bold">{post.category}</span>
                    <span className="text-[#c9b37e]/60 text-[10px]">{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                  </div>

                  <h3 className="text-2xl font-serif text-[#e6c984] leading-tight group-hover:text-white transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[#c9b37e]/80 text-sm line-clamp-3 font-light leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post._id}`}
                    className="inline-flex items-center gap-2 text-[#d4af37] text-sm font-medium pt-4 group/link"
                  >
                    Explore Article
                    <span className="block w-0 h-[1px] bg-[#d4af37] group-hover/link:w-10 transition-all duration-500"></span>
                  </Link>
                </div>
              </div>

              {/* Decorative Subtle Glow */}
              <div className="absolute -inset-px rounded-2xl border border-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {!loading && filteredPosts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <p className="text-[#e6c984] font-serif text-xl italic opacity-60">No stories found in this collection.</p>
        </motion.div>
      )}
    </section>
  );
}