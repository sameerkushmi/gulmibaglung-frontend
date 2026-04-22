"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieModal() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) setShowModal(true);
  }, []);

  const closeModal = () => {
    localStorage.setItem("visited", "true");
    setShowModal(false);
  };

  // 👇 Close on outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          onClick={handleOutsideClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="relative w-[90%] max-w-md bg-gradient-to-br from-[#050B18] to-gray-900 border border-yellow-600 rounded-xl p-6 text-yellow-300 shadow-2xl"
          >
            {/* ❌ Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-yellow-300 hover:text-yellow-400 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-2">
              We use cookies 🍪
            </h2>

            <p className="text-sm mb-4 text-gray-300">
              We use cookies to enhance your luxury experience, improve performance,
              and analyze traffic.
            </p>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}