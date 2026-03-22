"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const api = Interceptor();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email!");
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/forgot-password", { email });
      toast.success(data.message || "Reset link sent to your email!");
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#081a2b] via-[#03101d] to-black text-[#e6c984]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-[#d4af37]/30 shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center text-[#d4af37] mb-8">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0d2b45]/80 text-[#e6c984] py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:scale-105 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-[#c9b37e] text-sm">
          Remember your password?{" "}
          <a href="/login" className="text-[#d4af37] hover:underline">
            Login
          </a>
        </div>
      </motion.div>
    </main>
  );
}
