"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) setShowBanner(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("visited", "true");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("visited", "declined"); // optional, remembers choice
    setShowBanner(false);
  };

  return (
    <AnimatePresence key="1">
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-yellow-300 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-50 shadow-lg border-t border-yellow-600"
        >
          <p className="text-sm sm:text-base font-semibold">
            We use cookies to enhance your luxury experience.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="relative overflow-hidden px-4 py-1 rounded text-gray-900 font-medium bg-yellow-300 hover:bg-yellow-400 transition shadow-md before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white before:opacity-10 before:blur-lg before:animate-[shine_2s_linear_infinite]"
            >
              Accept
            </button>

            <button
              onClick={handleDecline}
              className="px-4 py-1 rounded text-yellow-300 font-medium border border-yellow-300 hover:bg-yellow-300 hover:text-black transition"
            >
              Decline
            </button>

            <Link
              href="/privacy-policy"
              className="text-sm underline text-yellow-300 hover:text-yellow-400 font-medium"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      )}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
