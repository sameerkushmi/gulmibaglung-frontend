"use client";

import { useState, useRef, useEffect } from "react";
import { FiDollarSign, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/Context/AuthContext";

export default function FloatingCurrencySelector({ onChange }) {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useAuth();

  const dropdownRef = useRef(null);

  const currencies = [
    { code: "NPR", flag: "🇳🇵" },
    { code: "USD", flag: "🇺🇸" },
    { code: "AUD", flag: "🇦🇺" },
    { code: "EUR", flag: "🇪🇺" },
  ];

  const handleSelect = (cur) => {
    setCurrency(cur);
    setOpen(false);
    if (onChange) onChange(cur);
  };

  // ✅ Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#f5e1a4] text-black shadow-2xl flex items-center justify-center cursor-pointer"
        animate={{ rotate: [0, 5, -5, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <FiChevronDown size={24} /> : <FiDollarSign size={24} />}
      </motion.button>

      {/* Currency Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-40 right-8 z-50 w-40 bg-white/10 backdrop-blur-xl border border-[#d4af37]/30 rounded-xl shadow-2xl p-2 flex flex-col gap-2"
          >
            {currencies.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelect(item.code)}
                className={`py-2 rounded-xl w-full text-center font-semibold transition ${currency === item.code
                    ? "bg-[#d4af37] text-black shadow-lg"
                    : "bg-white/20 text-[#e6c984]"
                  }`}
              >
                {item.flag} {item.code}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}