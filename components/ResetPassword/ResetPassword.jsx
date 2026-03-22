"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiCheckCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";

const passwordRules = {
    length: (p) => p.length >= 8,
    uppercase: (p) => /[A-Z]/.test(p),
    lowercase: (p) => /[a-z]/.test(p),
    number: (p) => /\d/.test(p),
    special: (p) => /[@$!%*?&]/.test(p),
};

const getStrength = (password) => {
    const passed = Object.values(passwordRules).filter((rule) =>
        rule(password)
    ).length;

    if (passed <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (passed <= 4) return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
};

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const api = Interceptor();
    const strength = getStrength(password);
    const isStrong = strength.label === "Strong";

    const handleReset = async (e) => {
        e.preventDefault();

        if (!isStrong)
            return toast.error("Password does not meet security requirements");

        if (password !== confirmPassword)
            return toast.error("Passwords do not match");

        try {
            setLoading(true);
            const { data } = await api.post("/api/auth/reset-password", {
                token,
                password,
            });
            toast.success(data.message || "Password reset successful!");
            router.push("/login");
        } catch {
            toast.error("Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#081a2b] via-[#03101d] to-black text-[#e6c984]">

            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-[#d4af37]/30 shadow-2xl"
            >
                <h2 className="text-3xl font-extrabold text-center text-[#d4af37] mb-8">
                    Reset Password
                </h2>

                <form onSubmit={handleReset} className="space-y-5">
                    {/* New Password */}
                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0d2b45]/80 py-3 pl-12 pr-12 rounded-full focus:ring-2 focus:ring-[#d4af37]"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#d4af37]"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-[#d4af37]" />
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#0d2b45]/80 py-3 pl-12 pr-12 rounded-full focus:ring-2 focus:ring-[#d4af37]"
                        />
                        <span
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#d4af37]"
                        >
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>

                    {/* Strength Bar */}
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${strength.color}`}
                            animate={{ width: strength.width }}
                        />
                    </div>
                    <p className="text-sm text-right">{strength.label}</p>

                    {/* Rules */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(passwordRules).map(([key, rule]) => (
                            <div key={key} className="flex items-center gap-2">
                                <FiCheckCircle
                                    className={rule(password) ? "text-green-400" : "text-gray-500"}
                                />
                                <span>
                                    {{
                                        length: "8+ chars",
                                        uppercase: "Uppercase",
                                        lowercase: "Lowercase",
                                        number: "Number",
                                        special: "Special",
                                    }[key]}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={!isStrong || loading}
                        className={`w-full py-3 rounded-full font-semibold transition ${isStrong
                                ? "bg-[#d4af37] text-black hover:scale-105"
                                : "bg-gray-600 cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
