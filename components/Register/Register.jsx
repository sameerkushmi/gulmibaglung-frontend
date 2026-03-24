"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

const api = Interceptor();

const passwordRules = {
    length: (p) => p.length >= 8,
    uppercase: (p) => /[A-Z]/.test(p),
    lowercase: (p) => /[a-z]/.test(p),
    number: (p) => /[0-9]/.test(p),
    special: (p) => /[^A-Za-z0-9]/.test(p),
};

const getPasswordStrength = (password) => {
    const passed = Object.values(passwordRules).filter((rule) =>
        rule(password)
    ).length;

    if (passed <= 2) return { label: "Weak", color: "bg-red-500", glow: "" };
    if (passed <= 4) return { label: "Medium", color: "bg-yellow-400", glow: "" };
    return {
        label: "Strong",
        color: "bg-green-500",
        glow: "shadow-[0_0_25px_rgba(212,175,55,0.8)]",
    };
};


export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const isStrong = getPasswordStrength(form.password).label === "Strong";
    const [loading, setLoading] = useState();
    const router = useRouter();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // Add register API logic here
        try {
            setLoading(true);
            if (form.password !== form.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            await api.post('/api/auth/register', {
                name: form.name,
                email: form.email,
                password: form.password,
            });
            toast.success("Registration successful!");
            router.push("/login");
        } catch (error) {
            console.error("Registration failed:", error.response.data);
            toast.error(`Registration failed: ${error.response.data.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#081a2b] via-[#03101d] to-black text-[#e6c984]">
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-lg p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-[#d4af37]/30 shadow-2xl"
            >
                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-center text-[#d4af37] mb-8">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Full Name */}
                    <div className="relative">
                        <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0d2b45]/80 text-[#e6c984] py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0d2b45]/80 text-[#e6c984] py-3 pl-12 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                        />
                    </div>

                    {/* Password */}
                    <div
                        className={`relative transition-all rounded-full
                         ${getPasswordStrength(form.password).label === "Strong"
                                ? "ring-2 ring-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.7)]"
                                : "ring-0"
                            }`}
                    >

                        <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0d2b45]/80 text-[#e6c984] py-3 pl-12 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                        />
                        <div className="absolute right-12 top-1/2 -translate-y-1/2 group cursor-pointer">
                            <span className="text-[#d4af37] text-sm">?</span>

                            <div className="absolute right-0 top-6 w-56 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                <div className="bg-[#0d2b45] text-[#e6c984] text-xs p-3 rounded-lg shadow-xl border border-[#d4af37]/30">
                                    Use at least 8 characters with uppercase, lowercase, number, and special character for a strong password.
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Confirm Password */}
                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0d2b45]/80 text-[#e6c984] py-3 pl-12 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#d4af37] text-sm"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                    {/* Password Rules Checklist */}
                    <div className="mt-3 grid grid-cols-2 space-y-1 text-sm">
                        {[
                            { label: "At least 8 characters", rule: passwordRules.length },
                            { label: "One uppercase letter", rule: passwordRules.uppercase },
                            { label: "One lowercase letter", rule: passwordRules.lowercase },
                            { label: "One number", rule: passwordRules.number },
                            { label: "One special character", rule: passwordRules.special },
                        ].map((item, idx) => {
                            const passed = item.rule(form.password);
                            return (
                                <div key={idx} className="flex items-center gap-2">
                                    <span
                                        className={`w-4 h-4 flex items-center justify-center rounded-full text-xs
                                       ${passed ? "bg-[#d4af37] text-black" : "bg-white/20 text-gray-300"}`}
                                    >
                                        ✓
                                    </span>
                                    <span
                                        className={`${passed ? "text-[#d4af37]" : "text-gray-400"}`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!isStrong}
                        className={`w-full py-3 rounded-full font-semibold transition flex items-center justify-center
                        ${isStrong
                                ? "bg-[#d4af37] text-black hover:scale-105"
                                : "bg-gray-500/40 text-gray-300 cursor-not-allowed"
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
                            "Register"
                        )}
                    </button>

                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-[#c9b37e] text-sm">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-[#d4af37] hover:underline cursor-pointer"
                    >
                        Login
                    </a>
                </div>

                {/* Gold Glow Border */}
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
