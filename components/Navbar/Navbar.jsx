"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiUser, FiShoppingCart, FiBookOpen, FiHeart, FiCreditCard } from "react-icons/fi";
import { IoCardOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdInventory } from "react-icons/md";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import UserMenu from "./UserMenu";
import TopHeader from "./TopHeader/TopHeader";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userMenuItems = {
    customer: [
      { label: "Profile", href: "/profile", icon: <FiUser /> },
      { label: "My Orders", href: "/user/orders", icon: <IoCardOutline /> },
      { label: "Cart", href: "/cart", icon: <FiShoppingCart /> },
      { label: "Wish List", href: "/wishlist", icon: <FiHeart /> },
    ],
    admin: [
      { label: "Dashboard", href: "/admin", icon: <AiFillProduct /> },
      { label: "Manage Products", href: "/admin/products", icon: <MdInventory /> },
      { label: "Manage Orders", href: "/admin/orders", icon: <FiShoppingCart /> },
      { label: "Manage Blogs", href: "/admin/blogs", icon: <FiBookOpen /> },
      { label: "Manage Users", href: "/admin/users", icon: <FiUser /> },
      { label: "Payments", href: "/admin/payments/payment-analytics", icon: <FiCreditCard /> },
    ],
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Premium feel: Trigger scrolled state slightly later for a cleaner transition
      setScrolled(currentScroll > 50);

      // Scrolling logic: Hide only on downward scroll after 200px
      if (currentScroll > lastScrollY.current && currentScroll > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier for "snappy luxury"
      className={`w-full fixed top-0 left-0 z-70 transition-all duration-500
        ${scrolled || open
          ? "bg-[#0d2b45]/90 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-md border-b border-[#d4af37]/10"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      {/* Premium Thin Accent Line (Top) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"
          />
        )}
      </AnimatePresence>

      {/* Top Headers */}
      <TopHeader />
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between transition-all duration-500
        ${scrolled ? "h-16" : "h-24"}
        `}
      >
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo scrolled={scrolled} />
        </div>

        {/* Desktop Menu - Centered for Premium Look */}
        <DesktopMenu />

        {/* User Menu & Mobile Trigger */}
        <div className="flex items-center gap-4 lg:gap-6">
          <UserMenu mounted={mounted} userMenuItems={userMenuItems} />

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 text-[#e6c984] relative"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <FiX size={26} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <FiMenu size={26} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Premium Slide-in */}
      <AnimatePresence>
        {open && (
          <MobileMenu
            mounted={mounted}
            open={open}
            userMenuItems={userMenuItems}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}