"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import Interceptor from "@/utils/Interceptor";
import { useAuth } from "@/Context/AuthContext";

const api = Interceptor();

export default function ChangePasswordModal({ isOpen, onClose }) {
    const [strength, setStrength] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const { loading, setLoading } = useAuth()

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const checkPasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++; // symbol
        setStrength(score);
        setIsValid(score >= 4); // must satisfy all rules
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === "newPassword") {
            checkPasswordStrength(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) {
            toast.error("Password does not meet the rules");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.currentPassword === form.newPassword) {
            toast.error("New password must be different");
            return;
        }

        const formData = {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
        };

        try {
            setLoading(true)
            await api.post("/api/auth/change-password", formData);
            toast.success("Password updated successfully");
            setStrength(0)
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Change Password Failed!");
        } finally {
            setLoading(false)
        }
    };

    const getStrengthColor = () => {
        switch (strength) {
            case 0:
            case 1:
                return "bg-red-500";
            case 2:
            case 3:
                return "bg-yellow-400";
            case 4:
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    const resetState = () => {
        setStrength(0)
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-8 shadow-2xl"
                    >
                        {/* Loader */}
                        {loading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl z-50">
                                <div className="w-16 h-16 border-4 border-t-[#d4af37] border-gray-300 rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* Close */}
                        <button
                            onClick={resetState}
                            className="absolute top-4 right-4 text-white/70 hover:text-white"
                        >
                            <FiX size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-[#e6c984] text-center mb-6">
                            Change Password
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Current Password */}
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                                <input
                                    type={showPassword.current ? "text" : "password"}
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/30 border border-[#d4af37]/30 text-[#e6c984] placeholder-white/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePassword("current")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                                >
                                    {showPassword.current ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {/* New Password */}
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                                <input
                                    type={showPassword.new ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/30 border border-[#d4af37]/30 text-[#e6c984] placeholder-white/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePassword("new")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                                >
                                    {showPassword.new ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {/* Password Strength Meter */}
                            <div className="space-y-1">
                                <div className="flex gap-1 h-2">
                                    <div
                                        className={`flex-1 rounded-full ${strength >= 1 ? getStrengthColor() : "bg-white/20"}`}
                                    />
                                    <div
                                        className={`flex-1 rounded-full ${strength >= 2 ? getStrengthColor() : "bg-white/20"}`}
                                    />
                                    <div
                                        className={`flex-1 rounded-full ${strength >= 3 ? getStrengthColor() : "bg-white/20"}`}
                                    />
                                    <div
                                        className={`flex-1 rounded-full ${strength >= 4 ? getStrengthColor() : "bg-white/20"}`}
                                    />
                                </div>
                                <p className="text-xs text-white/60">
                                    {strength === 0 && "Enter a password"}
                                    {strength === 1 && "Weak password"}
                                    {strength === 2 && "Medium password"}
                                    {strength === 3 && "Good password"}
                                    {strength === 4 && "Strong password"}
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                                <input
                                    type={showPassword.confirm ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/30 border border-[#d4af37]/30 text-[#e6c984] placeholder-white/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePassword("confirm")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                                >
                                    {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {/* Password Rules */}
                            <p className="text-xs text-white/50">
                                Must be at least 8 characters, include unique symbol, uppercase & number
                            </p>

                            <button
                                type="submit"
                                disabled={
                                    !isValid || form.newPassword !== form.confirmPassword
                                }
                                className={`w-full py-3 rounded-full font-bold transition
                  ${!isValid || form.newPassword !== form.confirmPassword
                                        ? "bg-gray-500 cursor-not-allowed text-white/60"
                                        : "bg-[#d4af37] text-[#0a1f35] hover:bg-[#e6c984]"
                                    }`}
                            >
                                Update Password
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
