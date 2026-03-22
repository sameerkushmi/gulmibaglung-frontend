"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import Interceptor from "@/utils/Interceptor";
import { FiX, FiUpload, FiLoader } from "react-icons/fi";


const api = Interceptor()

export default function ProfileImageModal({ isOpen, onClose }) {
    const { user, fetchUser, loading, setLoading } = useAuth();
    const [preview, setPreview] = useState(user?.profileImage);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const controller = new AbortController();

    const MAX_SIZE_MB = 2;

    const handleChange = (e) => {
        const img = e.target.files?.[0];

        if (!img) return;

        if (!img.type.startsWith("image/")) {
            toast.error("Select a valid image");
            return;
        }

        if (img.size > MAX_SIZE_MB * 1024 * 1024) {
            toast.error("Image must be under 2MB");
            return;
        }

        setFile(img);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(img);
    };



    const handleSave = async () => {
        if (!file) return;

        try {
            setLoading(true);
            setProgress(0);

            const formData = new FormData();
            formData.append("image", file);

            await api.put("/api/user/update/profile-image", formData, {
                signal: controller.signal,
                onUploadProgress: (e) => {
                    const percent = Math.round((e.loaded * 100) / e.total);
                    setProgress(percent);
                },
            });

            toast.success("Profile image updated");
            fetchUser();

            // ⏳ Auto close after success
            setTimeout(() => {
                onClose();
                setProgress(0);
            }, 1200);

        } catch (error) {
            if (error.name === "CanceledError") {
                toast("Upload cancelled");
            } else {
                toast.error("Upload failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setPreview(user?.profileImage || null);
        setFile(null);
        onClose();
    };

    const cancelUpload = () => {
        controller.abort();
        setLoading(false);
        setProgress(0);
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="relative bg-[#0d2b45] border border-[#d4af37]/40 rounded-2xl p-6 w-full max-w-sm shadow-xl"
                    >
                        <button
                            onClick={resetState}
                            disabled={loading}
                            className="absolute top-4 right-4 text-white/70 hover:text-white disabled:opacity-40"
                        >
                            <FiX size={20} />
                        </button>


                        <h3 className="text-lg font-bold text-[#e6c984] text-center mb-6">
                            Update Profile Photo
                        </h3>

                        <div className="flex flex-col items-center">
                            <div className="relative w-28 h-28 rounded-full border-4 border-[#d4af37] overflow-hidden">
                                <Image
                                    src={preview || "/images/profile/default-user.png"}
                                    alt="Preview"
                                    fill
                                    className={`object-cover ${loading ? "opacity-40" : ""}`}
                                />

                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <FiLoader className="text-[#d4af37] animate-spin" size={28} />
                                    </div>
                                )}
                            </div>
                            {loading && (
                                <div className="w-full mt-4">
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#d4af37] transition-all"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-center mt-1 text-white/70">
                                        Uploading {progress}%
                                    </p>
                                </div>
                            )}
                            <label className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37] text-[#0a1f35] font-semibold cursor-pointer hover:bg-[#e6c984] transition">
                                <FiUpload />
                                Choose Image
                                <input type="file" hidden accept="image/*" onChange={handleChange} />
                            </label>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={!file || loading}
                            className="mt-6 w-full py-3 rounded-xl bg-[#d4af37] text-[#0a1f35] font-semibold flex items-center justify-center gap-2 hover:bg-[#e6c984] transition disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <FiLoader className="animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                "Save Photo"
                            )}
                        </button>
                        {loading && (
                            <button
                                onClick={cancelUpload}
                                className="mt-3 w-full py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition"
                            >
                                Cancel Upload
                            </button>
                        )}


                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
