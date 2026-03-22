"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiLock } from "react-icons/fi";
import { useAuth } from "@/Context/AuthContext";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const { login } = useAuth();
  const router = useRouter();

  const api = Interceptor();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/login", { email, password });
      login(data.user);
      toast.success(data.message);
      router.push("/");
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
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0d2b45]/80 text-[#e6c984] py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0d2b45]/80 text-[#e6c984] py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#d4af37] text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm text-[#c9b37e] cursor-pointer hover:text-[#d4af37]">
            <Link href={`/forgot-password`}>
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full bg-[#d4af37] text-black font-semibold hover:scale-105 transition flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-[#c9b37e] text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#d4af37] hover:underline cursor-pointer"
          >
            Sign Up
          </a>
        </div>

        {/* Optional Gold Shimmer Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 20px rgba(212,175,55,0.15)",
              "0 0 50px rgba(212,175,55,0.35)",
              "0 0 20px rgba(212,175,55,0.15)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </main>
  );
}
