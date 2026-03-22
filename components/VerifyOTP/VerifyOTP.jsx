"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/Context/AuthContext";
import toast
    from "react-hot-toast";
import Interceptor from "@/utils/Interceptor";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const api = Interceptor();

export default function VerifyOTP() {
    const { user, login } = useAuth();
    const router = useRouter();

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const inputsRef = useRef([]);

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-[#e6c984]">
                <p className="text-gray-400">You Are Not Log in</p>
                <Link href="/login">
                    <button className="cursor-pointer">Go To Login</button>
                </Link>
            </div>
        );
    }


    /* 📧 Mask email */
    const maskEmail = (email = "") => {
        if (!email || !email.includes("@")) return "";
        const [name, domain] = email.split("@");
        return `${name[0]}****@${domain}`;
    };


    /* ⏱ Countdown */
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    /* 🔢 OTP change */
    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    /* 📋 Handle OTP paste */
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("Text").trim();
        if (!/^\d{6}$/.test(pastedData)) return; // only allow 6 digits

        const newOtp = pastedData.split("");
        setOtp(newOtp);
        inputsRef.current[5].focus(); // focus last input
    };


    /* ⌫ Backspace navigation */
    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    /* 🚀 AUTO SUBMIT WHEN 6 DIGITS ENTERED */
    useEffect(() => {
        if (otp.join("").length === 6) {
            verifyOTP();
        }
    }, [otp]);

    /* ✅ Verify OTP */
    const verifyOTP = async () => {
        if (loading) return;

        try {
            setLoading(true);
            const { data } = await api.post("/api/auth/verify-otp", {
                userId: user._id,
                otp: otp.join(""),
            });

            toast.success("Email verified successfully!");
            login(data.user)
            router.push("/");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Invalid OTP");
            setOtp(Array(6).fill(""));
            inputsRef.current[0].focus();
        } finally {
            setLoading(false);
        }
    };

    /* 🔄 Resend OTP */
    const resendOTP = async () => {
        try {
            await api.post("/api/auth/resend-otp", { userId: user._id });
            toast.success("OTP resent");
            setTimeLeft(60);
            setOtp(Array(6).fill(""));
            inputsRef.current[0].focus();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Try again later");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-fit bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-[#d4af37]/30 text-[#e6c984]"
            >
                <h2 className="text-2xl font-bold text-center text-[#d4af37] mb-2">
                    Verify Your Email
                </h2>

                <p className="text-center text-sm text-gray-300 mb-6">
                    Enter the code sent to{" "}
                    <span className="text-[#d4af37] font-medium">
                        {maskEmail(user?.email)}
                    </span>
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-between gap-2 mb-6">
                    {otp.map((digit, index) => (
                        <motion.input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                            onPaste={handlePaste}
                            className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold rounded-lg bg-[#0d2b45] text-white border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37]"
                        />

                    ))}
                </div>

                {/* Loader */}
                {loading && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-sm text-gray-300 mb-2"
                    >
                        Verifying...
                    </motion.p>
                )}

                {/* Resend */}
                <div className="text-center text-sm">
                    {timeLeft > 0 ? (
                        <span className="text-gray-400">
                            Resend OTP in{" "}
                            <span className="text-[#d4af37]">{timeLeft}s</span>
                        </span>
                    ) : (
                        <button
                            onClick={resendOTP}
                            className="text-[#d4af37] hover:underline"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
