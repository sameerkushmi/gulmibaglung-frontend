"use client";

import { useAuth } from "@/Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiSearch, FiX, FiLogOut } from "react-icons/fi";
import MenuItems from "./MenuItems";

const MobileMenu = ({ mounted, open, userMenuItems, onClose }) => {
  const { user, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState({});
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const toggleDropdown = (name) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0d2b45] backdrop-blur-md z-[90] md:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-[380px] bg-[#0d2b45] z-[100] md:hidden flex flex-col shadow-2xl border-l border-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-bold">
                Menu
              </span>

              <button
                onClick={onClose}
                className="text-white p-2 hover:rotate-90 transition"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto px-8 py-8">
              <ul className="flex flex-col gap-6">
                {MenuItems.map((item) => (
                  <li key={item.name}>
                    <div onClick={() => toggleDropdown(item.name)} className="flex items-center justify-between">
                      <button
                        className="text-xl font-serif text-white hover:text-[#d4af37] transition"
                      >
                        {item.name}
                      </button>

                      {item.submenu && (
                        <button
                          className="text-[#d4af37]"
                        >
                          <FiChevronDown
                            className={`transition-transform ${dropdownOpen[item.name] ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu */}
                    <AnimatePresence>
                      {item.submenu && dropdownOpen[item.name] && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pl-4 border-l border-[#d4af37]/20 flex flex-col gap-4 overflow-hidden"
                        >
                          {item.submenu.map((sub, i) => (
                            <Link
                              key={i}
                              href={sub.path}
                              onClick={onClose}
                              className="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
              {mounted && !loading && user && (
                <div className="mb-6">
                  <h4 className="text-[9px] text-gray-500 uppercase tracking-[0.3em] mb-3">
                    Account
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    {userMenuItems[user.role]?.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        onClick={onClose}
                        className="text-white/70 hover:text-[#d4af37] text-[11px]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Link href="/products/search" onClick={onClose}>
                  <FiSearch size={22} className="text-white" />
                </Link>

                {!user ? (
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="text-[#d4af37] text-xs uppercase tracking-[0.2em] font-bold"
                  >
                    Sign In
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="flex items-center gap-2 text-red-500 text-xs uppercase tracking-widest font-bold"
                  >
                    <FiLogOut /> Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;