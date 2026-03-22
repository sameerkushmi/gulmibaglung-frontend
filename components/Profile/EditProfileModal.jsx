"use client";

import { useAuth } from "@/Context/AuthContext";
import Interceptor from "@/utils/Interceptor";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

const api = Interceptor()

function EditProfileModal({ isOpen, onClose }) {
    const { user, setUser, loading, setLoading } = useAuth()
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
        });
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (loading) return;
        try {
            setLoading(true)
            const { data } = await api.put('/api/user/update-profile', formData)
            setUser(data.user)
            toast.success("Profile updated!");
            onClose();
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || 'failed to update profile')
        } finally {
            setLoading(false)
        }
    };

    const resetState = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
        });
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-lg bg-white/20 backdrop-blur-xl border border-[#d4af37]/50 rounded-3xl p-8 shadow-2xl"
            >
                {/* CLOSE BUTTON */}
                <button
                    onClick={resetState}
                    className="absolute top-4 right-4 text-[#d4af37] hover:text-[#e6c984] transition text-2xl"
                >
                    <FiX />
                </button>

                <h2 className="text-3xl font-bold text-[#e6c984] mb-6 text-center">
                    Edit Profile
                </h2>

                <div className="space-y-5">
                    {["name", "email", "phone", "address"].map((field) => (
                        <div key={field} className="relative">
                            <input
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder=" "
                                className="w-full p-4 rounded-xl bg-white/10 text-white outline-none border border-transparent focus:border-[#d4af37] transition peer"
                            />
                            <label className="absolute left-4 top-1 text-white/70 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base transition-all">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all flex items-center gap-3
        ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#d4af37] to-[#e6c984] text-[#0a1f35] hover:scale-105 hover:shadow-xl"
                            }`}
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>

            </motion.div>
        </div>
    );
}

export default EditProfileModal;
