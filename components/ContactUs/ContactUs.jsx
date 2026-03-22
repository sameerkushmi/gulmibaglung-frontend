"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import MapSection from "./MapSection/MapSection";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_NUMBER;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `
📩 *New Contact Message*

👤 Name: ${form.name}
📧 Email: ${form.email}
📝 Subject: ${form.subject}

💬 Message:
${form.message}
    `;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-32 overflow-hidden">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081a2b] to-[#0D2B45] -z-10" />

      {/* Soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] bg-[#d4af37]/10 blur-[100px] rounded-full" />

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 md:gap-16 items-start md:items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6 md:space-y-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e6c984] leading-tight">
            Let’s Create Something <br /> Beautiful Together
          </h1>

          <p className="text-[#c9b37e] max-w-md">
            Have a question, custom jewelry request, or collaboration idea?
            Our team is here to help you shine.
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <InfoCard icon={<FiMail />} text={process.env.NEXT_PUBLIC_SUPPORT_EMAIL} />
            <InfoCard icon={<FiPhone />} text="+82 1059379686" />
            <InfoCard icon={<FiMapPin />} text={process.env.NEXT_PUBLIC_OWNER_ADDRESS} />
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex-1 relative w-full bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl"
        >
          {/* Gold border shimmer */}
          <div className="absolute inset-0 rounded-3xl border border-[#d4af37]/40 pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl font-semibold text-[#e6c984] mb-5 sm:mb-6">
            Send a Message
          </h2>

          <div className="flex flex-col gap-4 sm:gap-5">
            <Input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
            <Input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
            <Textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8962e] text-[#081a2b] font-semibold shadow-lg"
            >
              Send via WhatsApp <FiSend />
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Map Section */}
      <div className="w-full mt-12 sm:mt-16 md:mt-20">
        <MapSection />
      </div>
    </section>
  );
}

/* ---------------- Reusable Components ---------------- */
function Input({ name, placeholder, type = "text", value, onChange }) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-black/30 text-[#e6c984] placeholder-[#c9b37e] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
    />
  );
}

function Textarea({ name, placeholder, value, onChange }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-black/30 text-[#e6c984] placeholder-[#c9b37e] px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
    />
  );
}

function InfoCard({ icon, text }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 w-fit">
      <span className="text-[#d4af37] text-lg sm:text-xl">{icon}</span>
      <span className="text-[#e6c984] text-sm sm:text-base">{text}</span>
    </div>
  );
}