"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { FaFacebookMessenger, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MdEmail } from "react-icons/md";

export default function FloatingMessage() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [method, setMethod] = useState("email");

    const chatRef = useRef(null);

    // 👉 Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const sendMessage = () => {
        if (!message) return alert("Enter a message");

        const text = encodeURIComponent(`Hi, my name is ${name || "Anonymous"}.\n${message}`);

        if (method === "whatsapp") {
            const url = `https://wa.me/${process.env.NEXT_PUBLIC_SUPPORT_NUMBER}?text=${text}`;
            window.open(url, "_blank");
        } else if (method === "email") {
            const mailto = `mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}?subject=New Message from ${name || "Anonymous"}&body=${text}`;
            window.open(mailto, "_blank");
        } else if (method === "messenger") {
            const fbPageId = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID;
            const url = `https://m.me/${fbPageId}`;
            window.open(url, "_blank");
        } else if (method === "instagram") {
            const igUsername = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME;
            const url = `https://www.instagram.com/${igUsername}/`;
            window.open(url, "_blank");
        }

        setMessage("");
        setName("");
        setOpen(false);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setOpen(!open)}
                className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#d4af37] text-black shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition"
                animate={{ translateY: [0, 10, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open chat"
            >
                {open ? <FiChevronDown size={24} /> : <FiMessageCircle size={24} />}
            </motion.button>

            {/* Chat Box */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        className="fixed bottom-24 right-8 z-50 w-80 max-w-xs bg-white/10 backdrop-blur-xl rounded-2xl border border-[#d4af37]/30 shadow-2xl p-4 flex flex-col gap-3"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-[#d4af37] font-bold">Message Us</h4>
                            <FiX
                                size={20}
                                className="text-[#d4af37] cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded-xl bg-[#0d2b45]/80 text-[#e6c984]"
                        />

                        {/* Method Selector */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <button onClick={() => setMethod("email")} className={`py-1 rounded-full font-semibold ${method === "email" ? "bg-[#d4af37] text-black" : "bg-black/10 text-[#e6c984]"} flex items-center justify-center gap-1`}>
                                <MdEmail /> Email
                            </button>

                            <button onClick={() => setMethod("whatsapp")} className={`py-1 rounded-full font-semibold ${method === "whatsapp" ? "bg-[#d4af37] text-black" : "bg-black/10 text-[#e6c984]"} flex items-center justify-center gap-1`}>
                                <FaWhatsapp /> WhatsApp
                            </button>

                            <button onClick={() => setMethod("messenger")} className={`py-1 rounded-full font-semibold ${method === "messenger" ? "bg-[#d4af37] text-black" : "bg-black/10 text-[#e6c984]"} flex items-center justify-center gap-1`}>
                                <FaFacebookMessenger /> Messenger
                            </button>

                            <button onClick={() => setMethod("instagram")} className={`py-1 rounded-full font-semibold ${method === "instagram" ? "bg-[#d4af37] text-black" : "bg-black/10 text-[#e6c984]"} flex items-center justify-center gap-1`}>
                                <FaInstagram /> Instagram
                            </button>
                        </div>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            placeholder="Type your message..."
                            className="w-full p-3 rounded-xl bg-[#0d2b45]/80 text-[#e6c984]"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={!message.trim()}
                            className={`bg-[#d4af37] text-black py-2 rounded-full font-semibold flex items-center justify-center gap-2 ${!message.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Send <FiSend />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}