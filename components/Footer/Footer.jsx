'use client';

import { motion } from "framer-motion";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiFillTikTok } from "react-icons/ai";
import QRModal from "./QRModal/QRModal";
import MapModal from "./MapModal/MapModal";


const Loader = () => (
  <motion.div
    className="w-5 h-5 border-2 border-[#0a1f35] border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
  />
);

export default function Footer() {
  const [sparkles, setSparkles] = useState([]);
  const [activePayment, setActivePayment] = useState(null);
  const [mapOpen, setMapOpen] = useState(false); // <-- map modal state

  const payments = [
    { name: "eSewa", image: "/images/payments/esewa-logo.png", qr: "/images/payments/global-ime-qr.jpg" },
    { name: "Khalti", image: "/images/payments/khalti-logo.png", qr: "/images/payments/global-ime-qr.jpg" },
    { name: "FonePay", image: "/images/payments/fonepay.png", qr: "/images/payments/qr/fone-pay.jpeg" },
    { name: "Global IME Bank", image: "/images/payments/global-ime-bank.jpg", qr: "/images/payments/global-ime-qr.jpg" },
    { name: "Nepal Bank Limited", image: "/images/payments/nepal-bank.png", qr: "/images/payments/global-ime-qr.jpg" },
  ];

  const quickLinks = [
    { label: "home", link: "/" },
    { label: "about us", link: "/about-us" },
    { label: "blogs", link: "/blog" },
    { label: "contact us", link: "/contact-us" },
  ];

  const socialLinks = [
    { icon: FiFacebook, link: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID },
    { icon: FiInstagram, link: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME },
    { icon: AiFillTikTok, link: process.env.NEXT_PUBLIC_TIKTOK_ID },
  ];
  const guides = [
    { label: "Ring Guide", link: "/ring-guide" },
    { label: "Bangle Guide", link: "/bangle-guide" },
    { label: "Necklace Guide", link: "/necklace-guide" },
    { label: "Diamond Shapes Guide", link: "/diamond-guide" },
  ];

  const services = [
    { label: "Privacy Policy", link: "/privacy-policy" },
    { label: "Terms and Conditions", link: "/terms-conditions" },
    { label: "Exchange & Return Policy", link: "/exchange-return-policy" },
    { label: "Try At Home", link: "/try-at-home" },
    { label: "FAQ", link: "/faq" },
  ];

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));
    setSparkles(generated);
  }, []);



  return (
    <footer className="relative w-full bg-[#0d2b45] text-[#e6c984] pt-20 pb-10 overflow-hidden font-sans">

      {/* ─── BACKGROUND ACCENTS ─── */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#d4af37] rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      {/* ✨ Refined Sparkles */}
      {sparkles.map((s, idx) => (
        <motion.div
          key={idx}
          className="absolute z-[1] pointer-events-none"
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          style={{ top: s.top, left: s.left }}
        >
          <div className="bg-white/40 rotate-45" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-16">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/90 border-b border-[#d4af37]/30 pb-2 w-fit">Know Your Jewellery</h3>
            <div className="grid grid-cols-1 gap-3">
              {guides.map((item, i) => (
                <Link key={i} href={item.link} className="text-sm text-[#ffffffaa] hover:text-[#e6c984] transition-all hover:translate-x-1">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-5">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/90 border-b border-[#d4af37]/30 pb-2 w-fit">Customer Service</h3>
            <div className="grid grid-cols-1 gap-3">
              {services.map((item, i) => (
                <Link key={i} href={item.link} className="text-sm text-[#ffffffaa] hover:text-[#e6c984] transition-all hover:translate-x-1">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/90 border-b border-[#d4af37]/30 pb-2 w-fit">Company</h3>
            {quickLinks.map((item, i) => (
              <Link key={i} href={item.link} className="text-sm text-[#ffffffaa] hover:text-[#e6c984] transition-all hover:translate-x-1 capitalize">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* ─── CONTACT ─── */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/90 border-b border-[#d4af37]/30 pb-2 w-fit">Contact Us</h3>
              <div>
                <h4 className="text-sm font-semibold text-white">Gulmibaglung jewellers pvt ltd.</h4>
              <p className="text-sm text-white/70">{process.env.NEXT_PUBLIC_OWNER_ADDRESS}</p>
              </div>
              <p className="text-sm text-white/70">{process.env.NEXT_PUBLIC_SUPPORT_NUMBER}</p>
              <p className="text-sm text-white/70">Working Hours - 7 Days Week</p>
              <p className="text-sm text-white/70">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</p>

              <button onClick={() => setMapOpen(true)} className="mt-2 border border-[#e6c984] text-[#e6c984] px-3 py-1 text-xs rounded hover:bg-[#e6c984] hover:text-black transition">
                Locate Us
              </button>
            </div>
            <div className="flex gap-5 mt-2">
              {socialLinks.map((item, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, color: "#fff" }}
                  href={item.link}
                  target="_blank"
                  className="text-[#e6c984] transition-all"
                >
                  <item.icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── PAYMENT SECTION ─── */}
        <div className="pt-10 border-t border-[#ffffff11] flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 md:grayscale md:opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {payments.map((payment) => (
              <motion.div
                key={payment.name}
                whileHover={{ scale: 1.05 }}
                className="relative w-20 h-10 cursor-pointer bg-white"
                onClick={() => setActivePayment(payment)}
              >
                <Image src={payment.image} alt={payment.name} fill className="object-contain" />
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#ffffff44]">Secure Boutique Checkout</p>
        </div>

        {/* ─── COPYRIGHT ─── */}
        <div className="mt-12 text-center">
          <p className="text-[10px] tracking-widest text-[#ffffff33] uppercase">
            © 2026 {process.env.NEXT_PUBLIC_SITE_NAME} — Handcrafted Excellence
          </p>
        </div>
      </div>

      {/* MAP MODAL */}
      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
      {/* ─── PREMIUM QR MODAL ─── */}
      <QRModal
        activePayment={activePayment}
        setActivePayment={setActivePayment}
      />
    </footer>
  );
}